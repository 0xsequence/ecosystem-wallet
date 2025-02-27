import SignClient from '@walletconnect/sign-client'
import { SessionTypes, SignClientTypes } from '@walletconnect/types'
import { proxy, subscribe } from 'valtio'

import { walletTransport } from '../context/AuthContext'
import { THEME } from '../utils/theme'

if (!import.meta.env.VITE_WALLETCONNECT_PROJECT_ID) {
  throw new Error('VITE_WALLETCONNECT_PROJECT_ID is required')
}

interface WalletConnectState {
  isReady: boolean
  sessions: SessionTypes.Struct[]
}

class WalletConnectStore {
  private signClient?: SignClient
  private currentRequestInfo?: { id: number; topic: string }
  state: WalletConnectState

  constructor() {
    this.state = proxy<WalletConnectState>({
      isReady: false,
      sessions: []
    })

    this.createSignClient()
  }

  private createSignClient = async () => {
    this.signClient = await SignClient.init({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string,
      metadata: {
        name: THEME.name || 'Sequence Wallet',
        description: 'Sequence Cross-App Embedded Wallet',
        url: window.location.origin,
        icons: [THEME.favicon || '']
      }
    })

    this.signClient.on('session_proposal', this.onSessionProposal)
    this.signClient.on('session_request', this.onSessionRequest)
    this.signClient.on('session_ping', this.onSessionPing)
    this.signClient.on('session_event', this.onSessionEvent)
    this.signClient.on('session_update', this.onSessionUpdate)
    this.signClient.on('session_delete', this.onSessionDelete)

    this.state.sessions = this.signClient.session.getAll()
    this.state.isReady = true
  }

  pair = async (uri: string) => {
    if (!this.signClient) {
      throw new Error('WalletConnect signClient not initialized.')
    }

    await this.signClient.core.pairing.pair({ uri })
  }

  disconnectSession = async (topic: string) => {
    try {
      if (!this.signClient) return

      await this.signClient.disconnect({
        topic,
        reason: {
          code: 6000,
          message: 'User disconnected'
        }
      })

      this.state.sessions = this.signClient.session.getAll()
    } catch (error) {
      console.error('Failed to disconnect session:', error)
    }
  }

  private onSessionProposal = async (event: SignClientTypes.EventArguments['session_proposal']) => {
    try {
      const { id, params } = event
      const { proposer, requiredNamespaces, optionalNamespaces } = params

      const walletAddress = walletTransport.getWalletAddress()
      if (!walletAddress || !this.signClient) {
        throw new Error('Wallet not ready')
      }

      const chainsInRequiredNamespaces =
        Object.keys(requiredNamespaces).length === 0 ? [] : requiredNamespaces.eip155?.chains ?? []
      const chainsInOptionalNamespaces =
        Object.keys(optionalNamespaces || {}).length === 0 ? [] : optionalNamespaces.eip155?.chains ?? []
      const allChains = [...new Set([...chainsInRequiredNamespaces, ...chainsInOptionalNamespaces])]

      // Use existing connection handler to get user approval
      const approved = await new Promise<boolean>(resolve => {
        walletTransport.setConnectionPromptCallback(async (origin: string) => {
          resolve(walletTransport.isConnected(origin))
          return true
        })

        if (!walletTransport.isConnected(proposer.metadata.url)) {
          resolve(true)
        } else {
          resolve(true)
        }
      })

      if (approved) {
        const chains = allChains.length > 0 ? allChains : ['eip155:1', 'eip155:42161']
        const accounts = chains.map(chain => `${chain}:${walletAddress}`)

        await this.signClient.approve({
          id,
          namespaces: {
            eip155: {
              accounts,
              methods: [
                'eth_sendTransaction',
                'eth_signTransaction',
                'eth_sign',
                'personal_sign',
                'eth_signTypedData',
                'eth_signTypedData_v4'
              ],
              events: ['chainChanged', 'accountsChanged'],
              chains
            }
          }
        })

        this.state.sessions = this.signClient.session.getAll()

        // Clean up old pairings with the same URL
        const pairings = this.signClient.core.pairing.getPairings()
        for (const pairing of pairings) {
          if (
            event.params.pairingTopic !== pairing.topic &&
            proposer.metadata.url === pairing.peerMetadata?.url
          ) {
            await this.signClient.core.pairing.disconnect({
              topic: pairing.topic
            })
          }
        }
      } else {
        await this.signClient.reject({
          id,
          reason: {
            code: 4001,
            message: 'User rejected'
          }
        })
      }
    } catch (error) {
      console.error('Failed to handle session proposal:', error)
    }
  }

  private onSessionDelete = () => {
    if (this.signClient) {
      this.state.sessions = this.signClient.session.getAll()
    }
  }

  rejectRequest = () => {
    if (this.currentRequestInfo) {
      this.signClient?.respond({
        topic: this.currentRequestInfo.topic,
        response: {
          id: this.currentRequestInfo.id,
          jsonrpc: '2.0',
          error: {
            code: 4001,
            message: 'User rejected.'
          }
        }
      })
    }
  }

  disconnectAllSessions = async () => {
    if (!this.signClient) return

    const sessions = this.signClient.session.getAll()
    for (const session of sessions) {
      await this.signClient.disconnect({
        topic: session.topic,
        reason: {
          code: 6000,
          message: 'User disconnected'
        }
      })
    }

    this.state.sessions = []
  }

  private onSessionRequest = async (event: SignClientTypes.EventArguments['session_request']) => {
    console.log('Session request:', event)

    try {
      const { topic, id, params } = event
      console.log('WalletConnect session request:', { topic, id, params })

      if (!walletTransport.state.signedInState || !walletTransport.state.areHandlersReady) {
        console.log('Waiting for handlers and sign in...')
        await new Promise<void>(resolve => {
          const unsubscribe = subscribe(walletTransport.state, () => {
            if (walletTransport.state.signedInState && walletTransport.state.areHandlersReady) {
              unsubscribe()
              resolve()
            }
          })
        })
        console.log('All handlers and sign in ready')
      }

      this.currentRequestInfo = { topic, id }

      const session = this.signClient?.session.get(topic)
      if (!session) throw new Error('Session not found')

      console.log('Session url:', session.peer.metadata)

      // Send request and wait for response
      const chainId =
        params.request.method === 'eth_sendTransaction' && Array.isArray(params.request.params)
          ? params.request.params[0].chainId
            ? parseInt(params.request.params[0].chainId, 16)
            : Number(params.chainId.split(':').pop())
          : Number(params.chainId.split(':').pop())

      const requestParams =
        params.request.method === 'eth_sendTransaction' && Array.isArray(params.request.params)
          ? params.request.params.map(({ chainId: _, ...rest }) => rest) // eslint-disable-line @typescript-eslint/no-unused-vars
          : params.request.params

      console.log('Sending request:', {
        chainId,
        method: params.request.method,
        params: requestParams
      })

      // For eth_sign, first parameter is address and second is message
      // For personal_sign, first parameter is message and second is address
      const formattedParams =
        params.request.method === 'eth_sign' && Array.isArray(requestParams) && requestParams.length === 2
          ? [requestParams[1], requestParams[0]] // Swap parameters for eth_sign
          : requestParams

      const result = await walletTransport.handleWalletConnectRequest(
        {
          data: {
            type: 'request',
            id,
            method: params.request.method,
            params: formattedParams,
            chainId
          },
          origin: session.peer.metadata.url
        } as any // eslint-disable-line @typescript-eslint/no-explicit-any
      )

      // Check if result is an error
      if (result instanceof Error) {
        throw result
      }

      // Format and send response back through WalletConnect
      let formattedResult = result

      // Handle signing method responses
      if (
        params.request.method === 'personal_sign' ||
        params.request.method === 'eth_sign' ||
        params.request.method === 'eth_signTypedData' ||
        params.request.method === 'eth_signTypedData_v4'
      ) {
        // Extract signature from result object
        if (
          (result?.code === 'signedMessage' || result?.code === 'signedTypedData') &&
          result?.data?.signature
        ) {
          formattedResult = result.data.signature
        }
      }
      // Handle transaction responses
      else if (params.request.method === 'eth_sendTransaction') {
        // Extract transaction hash from result object
        if (result?.code === 'transactionReceipt' && result?.data?.txHash) {
          formattedResult = result.data.txHash
        }
      }

      this.signClient?.respond({
        topic,
        response: {
          id,
          jsonrpc: '2.0',
          result: formattedResult
        }
      })
    } catch (err) {
      if (!this.currentRequestInfo) return

      const error = err as { code?: number; message?: string }
      this.signClient?.respond({
        topic: this.currentRequestInfo.topic,
        response: {
          id: this.currentRequestInfo.id,
          jsonrpc: '2.0',
          error: {
            code: error.code || 4001,
            message: error.message || 'User rejected.'
          }
        }
      })
    } finally {
      this.currentRequestInfo = undefined
    }
  }

  private onSessionPing = (event: SignClientTypes.EventArguments['session_ping']) => {
    console.log('Session ping:', event)
  }

  private onSessionEvent = (event: SignClientTypes.EventArguments['session_event']) => {
    console.log('Session event:', event)
  }

  private onSessionUpdate = (event: SignClientTypes.EventArguments['session_update']) => {
    console.log('Session update:', event)
  }
}

export const walletConnectStore = new WalletConnectStore()
