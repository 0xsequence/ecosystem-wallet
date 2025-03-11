import { proxy, subscribe } from 'valtio'

type SignedInState = { address: string } | null

interface ConnectedOrigin {
  origin: string
  walletAddress: string
}

export enum HandlerType {
  SEND_TRANSACTION = 'SEND_TRANSACTION',
  SIGN = 'SIGN'
}

const HandlerMethods = {
  [HandlerType.SEND_TRANSACTION]: ['eth_sendTransaction'],
  [HandlerType.SIGN]: ['eth_sign', 'eth_signTypedData', 'eth_signTypedData_v4', 'personal_sign']
}

export interface PendingEvent {
  origin: string
  data: unknown
  isInitialSignIn: boolean
}

export interface PendingConnectionEventData {
  type: 'connection'
  id: string
  auxData?: {
    email?: unknown
  }
}

interface WalletTransportState {
  connectedOrigins: ConnectedOrigin[]
  signedInState: SignedInState
  areHandlersReady: boolean
  pendingEvent?: PendingEvent
}

export class WalletTransport {
  state: WalletTransportState
  private connectionPromptCallback: ((origin: string) => Promise<boolean>) | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers: Map<HandlerType, (request: any) => Promise<any>> = new Map()

  // We need to keep a copy of original to be able to respond
  private originalPendingEvent: MessageEvent | undefined

  constructor() {
    this.state = proxy<WalletTransportState>({
      connectedOrigins: localStorage.getItem('connectedOrigins')
        ? JSON.parse(localStorage.getItem('connectedOrigins')!)
        : [],
      signedInState: null,
      areHandlersReady: false,
      pendingEvent: undefined
    })

    window.addEventListener('message', this.handleEvent)

    this.sendReadyMessage()

    const unsubscribe = subscribe(this.state, () => {
      if (this.state.signedInState && this.state.areHandlersReady && this.originalPendingEvent) {
        unsubscribe()

        this.handleEvent(this.originalPendingEvent, this.state.pendingEvent)
        this.originalPendingEvent = undefined
        this.state.pendingEvent = undefined
      }
    })
  }

  private handleEvent = (event: MessageEvent, pending?: PendingEvent) => {
    const data = event.data

    if (data.type !== 'connection' && data.type !== 'request') {
      return
    }

    // Connection and request handling flow
    if (!this.state.signedInState || !this.state.areHandlersReady) {
      this.originalPendingEvent = event
      this.state.pendingEvent = {
        data: event.data,
        origin: event.origin?.toString(),
        isInitialSignIn: this.state.signedInState === null
      } as PendingEvent
    } else {
      if (data.type === 'connection') {
        this.handleConnectionRequest(event, pending?.isInitialSignIn || false)
      } else {
        this.handleRequest(event, false, pending?.isInitialSignIn || false)
      }
    }
  }

  setSignedInState(state: SignedInState) {
    this.state.signedInState = state
  }

  setConnectionPromptCallback(callback: (origin: string) => Promise<boolean>) {
    this.connectionPromptCallback = callback
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerHandler(type: HandlerType, handler: (request: any) => Promise<any>) {
    this.handlers.set(type, handler)
    if (this.areAllHandlersRegistered(this.handlers)) {
      this.state.areHandlersReady = true
    }
  }

  private async handleConnectionRequest(event: MessageEvent, isInitialSignIn: boolean) {
    const { id } = event.data as PendingConnectionEventData
    const origin = event.origin

    // If already connected, accept immediately
    if (this.isConnectedToOrigin(origin)) {
      this.sendConnectionResponse(event, id, 'accepted')
      return
    }

    // Normal connection flow
    if (!this.connectionPromptCallback) {
      this.sendConnectionResponse(event, id, 'rejected', 'Connection prompt callback not set')
      return
    }

    // If we have a PendingEvent with isInitialSignIn, we can add directly since user signed in which means they have already accepted the connection
    if (isInitialSignIn) {
      this.addConnectedOrigin(origin)
      this.sendConnectionResponse(event, id, 'accepted')
      return
    }

    try {
      const userAccepted = await this.connectionPromptCallback(origin)
      if (userAccepted) {
        this.addConnectedOrigin(origin)
        this.sendConnectionResponse(event, id, 'accepted')
      } else {
        this.sendConnectionResponse(event, id, 'rejected', 'User rejected connection')
      }
    } catch (error) {
      this.sendConnectionResponse(event, id, 'rejected', (error as Error).message)
    }
  }

  private async handleRequest(
    event: MessageEvent,
    isWalletConnectRequest: boolean,
    isInitialSignIn: boolean
  ) {
    const request = event.data

    if (request.type !== 'request') {
      this.sendErrorResponse(event, request.id, 'Wrong type, expected "request"')
      return
    }

    // If we have a PendingEvent with isInitialSignIn, we can add directly since user signed in which means they have already accepted the connection
    if (isInitialSignIn) {
      this.addConnectedOrigin(event.origin)
    }

    if (!this.isConnectedToOrigin(event.origin) && !isWalletConnectRequest) {
      this.sendErrorResponse(event, request.id, 'Not connected to this origin')
      return
    }

    const handlerType = this.getHandlerTypeForMethod(request.method)
    if (!handlerType || !this.handlers.has(handlerType)) {
      this.sendErrorResponse(event, request.id, `Unsupported method: ${request.method}`)
      return
    }

    try {
      const handler = this.handlers.get(handlerType)
      if (handler) {
        request.origin = event.origin
        const result = await handler(request)
        if (isWalletConnectRequest) {
          return result
        } else {
          // We need wallet address to make sure we keep it in sync.
          // This is to handle the case where connector thinks it is still connected
          // to a previous wallet address but then user signs in with a different one
          result.walletAddress = this.state.signedInState?.address

          this.sendResponse(event, request.id, result)
        }
      }
    } catch (error) {
      if (isWalletConnectRequest) {
        throw error
      } else {
        this.sendErrorResponse(event, request.id, (error as Error).message)
      }
    }
  }

  handleWalletConnectRequest(event: MessageEvent) {
    return this.handleRequest(event, true, false)
  }

  private getHandlerTypeForMethod(method: string): HandlerType | undefined {
    for (const [type, methods] of Object.entries(HandlerMethods)) {
      if (methods.includes(method)) {
        return type as HandlerType
      }
    }
    return undefined
  }

  private sendConnectionResponse(
    event: MessageEvent,
    id: string,
    status: 'accepted' | 'rejected',
    reason?: string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = { type: 'connection', id, status }
    if (status === 'accepted' && this.state.signedInState) {
      response.walletAddress = this.state.signedInState.address
    } else if (status === 'rejected' && reason) {
      response.reason = reason
    }
    event.source?.postMessage(response, { targetOrigin: event.origin })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sendResponse(event: MessageEvent, id: string, result: any) {
    event.source?.postMessage({ type: 'request', id, result }, { targetOrigin: event.origin })
  }

  private sendErrorResponse(event: MessageEvent, id: string, errorMessage: string) {
    event.source?.postMessage(
      { type: 'request', id, error: { message: errorMessage } },
      { targetOrigin: event.origin }
    )
  }

  private isConnectedToOrigin(origin: string): boolean {
    return this.state.connectedOrigins.some(co => co.origin === origin)
  }

  private addConnectedOrigin(origin: string) {
    if (this.state.signedInState) {
      this.state.connectedOrigins.push({
        origin,
        walletAddress: this.state.signedInState.address
      })
      this.saveConnectedOrigins()
    }
  }

  private saveConnectedOrigins() {
    localStorage.setItem('connectedOrigins', JSON.stringify(this.state.connectedOrigins))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private areAllHandlersRegistered(handlers: Map<HandlerType, (request: any) => Promise<any>>): boolean {
    return Object.values(HandlerType).every(type => handlers.has(type))
  }

  private sendReadyMessage() {
    if (window.opener) {
      window.opener.postMessage('ready', '*')
    }
  }

  disconnect(origin: string) {
    this.state.connectedOrigins = this.state.connectedOrigins.filter(co => co.origin !== origin)
    this.saveConnectedOrigins()
  }

  isConnected(origin: string): boolean {
    return this.isConnectedToOrigin(origin) && !!this.state.signedInState
  }

  getWalletAddress(): string | undefined {
    return this.state.signedInState?.address
  }
}
