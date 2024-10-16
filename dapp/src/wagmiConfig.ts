import { http, createConfig } from "wagmi";
import { arbitrumNova, arbitrumSepolia } from "wagmi/chains";
import { sequenceCrossAppEmbeddedWallet } from "@0xsequence/cross-app-embedded-wallet-connector";

const connector = sequenceCrossAppEmbeddedWallet({
  projectAccessKey: import.meta.env.VITE_PROJECT_ACCESS_KEY,
  walletUrl: import.meta.env.VITE_WALLET_URL,
  chainId: 42170,
});

export const config = createConfig({
  chains: [arbitrumNova, arbitrumSepolia],
  connectors: [connector],
  transports: {
    [arbitrumNova.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
