type ConnectionState = "disconnected" | "connected";

interface ApprovedOrigin {
  origin: string;
  walletAddress: string;
}

type ConnectionPromptCallback = (origin: string) => Promise<boolean>;

export class WalletTransport {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handlers: Map<string, (params: any[]) => Promise<any>> = new Map();
  private connectionState: ConnectionState = "disconnected";
  private approvedOrigins: ApprovedOrigin[] = [];
  private currentOrigin: string | undefined;
  private walletAddress: string | undefined;
  private connectionPromptCallback: ConnectionPromptCallback | undefined;

  constructor() {
    window.addEventListener("message", this.handleMessage);
    this.loadApprovedOrigins();

    // Send ready message when the wallet is loaded
    if (window.opener) {
      console.log("Wallet loaded, sending ready message");
      window.opener.postMessage("ready", "*");
    }
  }

  setWalletAddress(address: string) {
    this.walletAddress = address;
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
  registerHandler(method: string, handler: (params: any[]) => Promise<any>) {
    this.handlers.set(method, handler);
  }

  private handleMessage = async (event: MessageEvent) => {
    console.log("Received message in wallet:", event.data);
    const message = event.data;

    if (message.type === "connection") {
      await this.handleConnectionRequest(event);
    } else if (message.type === "request") {
      await this.handleRequest(event);
    }
  };

  private async handleConnectionRequest(event: MessageEvent) {
    // Add a small delay to wait for the wallet address to be set
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { id } = event.data;
    const origin = event.origin;

    const existingApproval = this.approvedOrigins.find(
      (ao) => ao.origin === origin
    );
    if (existingApproval && this.walletAddress) {
      this.approveConnection(event, id, origin);
      return;
    }

    if (this.connectionPromptCallback === undefined) {
      throw new Error("Connection prompt callback not set");
    }

    const userAccepted = await this.connectionPromptCallback(origin);
    if (userAccepted) {
      this.approveConnection(event, id, origin);
    } else {
      this.rejectConnection(event, id, origin);
    }
  }

  private approveConnection(event: MessageEvent, id: string, origin: string) {
    if (!this.walletAddress) {
      throw new Error("Wallet address not set");
    }

    this.connectionState = "connected";
    this.currentOrigin = origin;
    event.source?.postMessage(
      {
        type: "connection",
        id,
        status: "accepted",
        walletAddress: this.walletAddress,
      },
      { targetOrigin: origin }
    );

    this.approvedOrigins.push({ origin, walletAddress: this.walletAddress });
    this.saveApprovedOrigins();
  }

  private rejectConnection(event: MessageEvent, id: string, origin: string) {
    event.source?.postMessage(
      { type: "connection", id, status: "rejected" },
      { targetOrigin: origin }
    );
  }

  private async handleRequest(event: MessageEvent) {
    if (
      this.connectionState !== "connected" ||
      event.origin !== this.currentOrigin
    ) {
      return;
    }

    const request = event.data;
    if (request.type === "request" && this.handlers.has(request.method)) {
      const handler = this.handlers.get(request.method);
      if (handler) {
        try {
          const result = await handler(request.params);
          event.source?.postMessage(
            {
              type: "request",
              id: request.id,
              result,
            },
            { targetOrigin: event.origin }
          );
        } catch (error) {
          event.source?.postMessage(
            {
              type: "request",
              id: request.id,
              error: {
                message: (error as Error).message,
              },
            },
            { targetOrigin: event.origin }
          );
        }
      }
    }
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
}
