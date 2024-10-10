type ConnectionState = "disconnected" | "connecting" | "connected";

interface ApprovedOrigin {
  origin: string;
  walletAddress: string;
}

type ConnectionPromptCallback = (origin: string) => Promise<boolean>;

type SignedInStatus = { address: string } | false | undefined;

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

export class WalletTransport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers: Map<HandlerType, (params: any[]) => Promise<any>> =
    new Map();
  private connectionState: ConnectionState = "disconnected";
  private approvedOrigins: ApprovedOrigin[] = [];
  private currentOrigin: string | undefined;
  private signedInStatus: SignedInStatus = undefined;
  private connectionPromptCallback: ConnectionPromptCallback | undefined;

  constructor() {
    window.addEventListener("message", this.handleMessage);
    this.loadApprovedOrigins();
  }

  setSignedInStatus(status: SignedInStatus) {
    this.signedInStatus = status;
    console.log(`Signed in status set:`, status);

    if (status && "address" in status) {
      const currentOrigin = window.location.origin;
      const approvedOrigin = this.approvedOrigins.find(
        (ao) => ao.origin === currentOrigin
      );
      if (approvedOrigin && status.address === approvedOrigin.walletAddress) {
        this.connectionState = "connected";
        this.currentOrigin = currentOrigin;
      }
    }
  }

  async waitForSignedInStatus(): Promise<void> {
    while (this.signedInStatus === undefined || this.signedInStatus === false) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms before checking again
    }
    return;
  }

  setConnectionPromptCallback(callback: ConnectionPromptCallback) {
    this.connectionPromptCallback = callback;
  }

  private loadApprovedOrigins() {
    const savedOrigins = localStorage.getItem("approvedOrigins");
    if (savedOrigins) {
      this.approvedOrigins = JSON.parse(savedOrigins);
    }
  }

  private saveApprovedOrigins() {
    localStorage.setItem(
      "approvedOrigins",
      JSON.stringify(this.approvedOrigins)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerHandler(type: HandlerType, handler: (params: any[]) => Promise<any>) {
    this.handlers.set(type, handler);

    if (this.isAllHandlersRegistered()) {
      this.sendReadyMessage();
    }
  }

  private isAllHandlersRegistered(): boolean {
    return Object.values(HandlerType).every((type) => this.handlers.has(type));
  }

  private sendReadyMessage() {
    if (window.opener) {
      window.opener.postMessage("ready", "*");
    }
  }

  private handleMessage = async (event: MessageEvent) => {
    const message = event.data;

    if (message.type === "connection" || message.type === "request") {
      console.log("Received message in wallet:", event.data);
    }

    if (message.type === "connection") {
      await this.handleConnectionRequest(event);
    } else if (message.type === "request") {
      await this.handleRequest(event);
    }
  };

  private async handleConnectionRequest(event: MessageEvent) {
    const { id } = event.data;
    const origin = event.origin;

    if (this.connectionState !== "disconnected") {
      this.rejectConnection(
        event,
        id,
        origin,
        "Already connected or connecting"
      );
      return;
    }

    this.connectionState = "connecting";

    try {
      const userAccepted = await this.promptForConnection(origin);
      if (userAccepted) {
        this.approveConnection(event, id, origin);
      } else {
        this.rejectConnection(event, id, origin, "User rejected connection");
      }
    } catch (error) {
      this.rejectConnection(event, id, origin, (error as Error).message);
    }
  }

  private async promptForConnection(origin: string): Promise<boolean> {
    if (!this.connectionPromptCallback) {
      throw new Error("Connection prompt callback not set");
    }
    return await this.connectionPromptCallback(origin);
  }

  private approveConnection(event: MessageEvent, id: string, origin: string) {
    if (!this.signedInStatus || !("address" in this.signedInStatus)) {
      throw new Error("Not signed in");
    }

    this.connectionState = "connected";
    this.currentOrigin = origin;
    event.source?.postMessage(
      {
        type: "connection",
        id,
        status: "accepted",
        walletAddress: this.signedInStatus.address,
      },
      { targetOrigin: origin }
    );

    this.approvedOrigins = this.approvedOrigins.filter(
      (ao) => ao.origin !== origin
    );
    this.approvedOrigins.push({
      origin,
      walletAddress: this.signedInStatus.address,
    });
    this.saveApprovedOrigins();
  }

  private rejectConnection(
    event: MessageEvent,
    id: string,
    origin: string,
    reason: string
  ) {
    this.connectionState = "disconnected";
    this.currentOrigin = undefined;
    event.source?.postMessage(
      { type: "connection", id, status: "rejected", reason },
      { targetOrigin: origin }
    );
  }

  private async handleRequest(event: MessageEvent) {
    const request = event.data;

    if (request.type !== "request") {
      return;
    }

    const handlerType = this.getHandlerTypeForMethod(request.method);
    if (!handlerType || !this.handlers.has(handlerType)) {
      console.log(`No handler registered for method: ${request.method}`);
      return;
    }

    try {
      await this.waitForConnection(event.origin);

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

  private async waitForConnection(
    origin: string,
    timeoutMs: number = 300000
  ): Promise<void> {
    await Promise.race([
      this.waitForSignedInStatus(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), timeoutMs)
      ),
    ]);

    if (this.connectionState === "connected" && this.currentOrigin === origin) {
      return;
    }

    if (this.connectionState === "disconnected") {
      const approvedOrigin = this.approvedOrigins.find(
        (ao) => ao.origin === origin
      );
      if (
        approvedOrigin &&
        this.signedInStatus &&
        "address" in this.signedInStatus &&
        this.signedInStatus.address === approvedOrigin.walletAddress
      ) {
        console.log("Auto-connecting to approved origin");
        this.connectionState = "connected";
        this.currentOrigin = origin;
        return;
      }
    }

    throw new Error(
      "Connection failed: Not an approved origin or wallet address mismatch"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  disconnect() {
    if (this.currentOrigin) {
      this.approvedOrigins = this.approvedOrigins.filter(
        (ao) => ao.origin !== this.currentOrigin
      );
      this.saveApprovedOrigins();
    }
    this.connectionState = "disconnected";
    this.currentOrigin = undefined;
  }

  isConnected(): boolean {
    return (
      this.connectionState === "connected" &&
      !!this.currentOrigin &&
      !!this.signedInStatus &&
      "address" in this.signedInStatus
    );
  }

  getCurrentOrigin(): string | undefined {
    return this.currentOrigin;
  }

  getWalletAddress(): string | undefined {
    return this.signedInStatus && "address" in this.signedInStatus
      ? this.signedInStatus.address
      : undefined;
  }
}
