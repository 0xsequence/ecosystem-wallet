import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { sequenceWaasTransportWallet } from "./waasTransportConnector";

const connector = sequenceWaasTransportWallet({
  projectAccessKey: "AQAAAAAAAEGvyZiWA9FMslYeG_yayXaHnSI",
  walletUrl: "http://localhost:4444",
  chainId: 137,
});

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [connector],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
