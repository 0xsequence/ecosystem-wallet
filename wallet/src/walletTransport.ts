import { proxy, subscribe } from "valtio";

type SignedInState = { address: string } | null;

interface ConnectedOrigin {
  origin: string;
  walletAddress: string;
}

export enum HandlerType {
  SEND_TRANSACTION = "SEND_TRANSACTION",
  SIGN = "SIGN",
}

const HandlerMethods = {
  [HandlerType.SEND_TRANSACTION]: ["eth_sendTransaction"],
  [HandlerType.SIGN]: [
    "eth_sign",
    "eth_signTypedData",
    "eth_signTypedData_v4",
    "personal_sign",
  ],
};

interface WalletTransportState {
  connectedOrigins: ConnectedOrigin[];
  signedInState: SignedInState;
  areHandlersReady: boolean;
  pendingEventOrigin: string | undefined;
}

export class WalletTransport {
  private state: WalletTransportState;
  private connectionPromptCallback:
    | ((origin: string) => Promise<boolean>)
    | undefined;
  private handlers: Map<HandlerType, (params: any[]) => Promise<any>> =
    new Map();
  private pendingEvent: MessageEvent | undefined;

  constructor() {
    this.state = proxy<WalletTransportState>({
      connectedOrigins: localStorage.getItem("connectedOrigins")
        ? JSON.parse(localStorage.getItem("connectedOrigins")!)
        : [],
      signedInState: null,
      areHandlersReady: false,
      pendingEventOrigin: undefined,
    });

    window.addEventListener("message", this.handleMessage);

    this.sendReadyMessage();

    const unsubscribe = subscribe(this.state, () => {
      if (
        this.state.signedInState &&
        this.state.areHandlersReady &&
        this.pendingEvent
      ) {
        unsubscribe();

        console.log("processing pending event", this.pendingEvent);
        // If the pending event is not a connection request, we can continue because user has already signed in to come to this point
        // and saw connection prompt on sign in screen
        if (this.pendingEvent.data.type !== "connection") {
          this.state.connectedOrigins = [
            {
              origin: this.pendingEvent.origin,
              walletAddress: this.state.signedInState.address,
            },
          ];
        }
        this.handleMessage(this.pendingEvent as MessageEvent);
        this.pendingEvent = undefined;
        this.state.pendingEventOrigin = undefined;
      }
    });
  }

  private handleMessage = (event: MessageEvent) => {
    const data = event.data;

    if (data.type !== "connection" && data.type !== "request") {
      return;
    }

    console.log("Received message data:", data);

    if (!this.state.signedInState || !this.state.areHandlersReady) {
      console.log("Not ready to process event, saving as pending event");
      this.pendingEvent = event;
      this.state.pendingEventOrigin = event.origin;
    } else {
      console.log("Ready, processing event");
      if (data.type === "connection") {
        this.handleConnectionRequest(event);
      } else {
        this.handleRequest(event);
      }
    }
  };

  setSignedInState(state: SignedInState) {
    this.state.signedInState = state;
  }

  setConnectionPromptCallback(callback: (origin: string) => Promise<boolean>) {
    this.connectionPromptCallback = callback;
  }

  registerHandler(type: HandlerType, handler: (params: any[]) => Promise<any>) {
    console.log("registering handler", type);
    this.handlers.set(type, handler);
    if (this.areAllHandlersRegistered(this.handlers)) {
      this.state.areHandlersReady = true;
    }
  }

  private async handleConnectionRequest(event: MessageEvent) {
    const { id } = event.data;
    const origin = event.origin;

    if (this.isConnectedToOrigin(origin)) {
      this.sendConnectionResponse(event, id, "accepted");
      return;
    }

    if (!this.connectionPromptCallback) {
      this.sendConnectionResponse(
        event,
        id,
        "rejected",
        "Connection prompt callback not set"
      );
      return;
    }

    try {
      const userAccepted = await this.connectionPromptCallback(origin);
      if (userAccepted) {
        this.addConnectedOrigin(origin);
        this.sendConnectionResponse(event, id, "accepted");
      } else {
        this.sendConnectionResponse(
          event,
          id,
          "rejected",
          "User rejected connection"
        );
      }
    } catch (error) {
      this.sendConnectionResponse(
        event,
        id,
        "rejected",
        (error as Error).message
      );
    }
  }

  private async handleRequest(event: MessageEvent) {
    const request = event.data;

    if (request.type !== "request" || !this.isConnectedToOrigin(event.origin)) {
      this.sendErrorResponse(event, request.id, "Not connected to this origin");
      return;
    }

    const handlerType = this.getHandlerTypeForMethod(request.method);
    if (!handlerType || !this.handlers.has(handlerType)) {
      this.sendErrorResponse(
        event,
        request.id,
        `Unsupported method: ${request.method}`
      );
      return;
    }

    try {
      const handler = this.handlers.get(handlerType);
      if (handler) {
        const result = await handler(request.params);
        this.sendResponse(event, request.id, result);
      }
    } catch (error) {
      this.sendErrorResponse(event, request.id, (error as Error).message);
    }
  }

  private getHandlerTypeForMethod(method: string): HandlerType | undefined {
    for (const [type, methods] of Object.entries(HandlerMethods)) {
      if (methods.includes(method)) {
        return type as HandlerType;
      }
    }
    return undefined;
  }

  private sendConnectionResponse(
    event: MessageEvent,
    id: string,
    status: "accepted" | "rejected",
    reason?: string
  ) {
    const response: any = { type: "connection", id, status };
    if (status === "accepted" && this.state.signedInState) {
      response.walletAddress = this.state.signedInState.address;
    } else if (status === "rejected" && reason) {
      response.reason = reason;
    }
    event.source?.postMessage(response, { targetOrigin: event.origin });
  }

  private sendResponse(event: MessageEvent, id: string, result: any) {
    event.source?.postMessage(
      { type: "request", id, result },
      { targetOrigin: event.origin }
    );
  }

  private sendErrorResponse(
    event: MessageEvent,
    id: string,
    errorMessage: string
  ) {
    event.source?.postMessage(
      { type: "request", id, error: { message: errorMessage } },
      { targetOrigin: event.origin }
    );
  }

  private isConnectedToOrigin(origin: string): boolean {
    console.log("state.connectedOrigins", this.state.connectedOrigins);
    console.log("origin", origin);
    return this.state.connectedOrigins.some((co) => co.origin === origin);
  }

  private addConnectedOrigin(origin: string) {
    if (this.state.signedInState) {
      this.state.connectedOrigins.push({
        origin,
        walletAddress: this.state.signedInState.address,
      });
      this.saveConnectedOrigins();
    }
  }

  private saveConnectedOrigins() {
    localStorage.setItem(
      "connectedOrigins",
      JSON.stringify(this.state.connectedOrigins)
    );
  }

  private areAllHandlersRegistered(
    handlers: Map<HandlerType, (params: any[]) => Promise<any>>
  ): boolean {
    return Object.values(HandlerType).every((type) => handlers.has(type));
  }

  private sendReadyMessage() {
    if (window.opener) {
      window.opener.postMessage("ready", "*");
    }
  }

  disconnect(origin: string) {
    this.state.connectedOrigins = this.state.connectedOrigins.filter(
      (co) => co.origin !== origin
    );
    this.saveConnectedOrigins();
  }

  isConnected(origin: string): boolean {
    return this.isConnectedToOrigin(origin) && !!this.state.signedInState;
  }

  getWalletAddress(): string | undefined {
    return this.state.signedInState?.address;
  }
}
