import { sequenceCrossAppEmbeddedWallet } from '@0xsequence/cross-app-embedded-wallet-connector'
import { createConfig, http } from 'wagmi'
import { arbitrumNova, arbitrumSepolia } from 'wagmi/chains'

const urlParams = new URLSearchParams(window.location.search)
const walletAppUrl = urlParams.get('walletAppUrl') ?? import.meta.env.VITE_WALLET_URL

const connector = sequenceCrossAppEmbeddedWallet({
  projectAccessKey: import.meta.env.VITE_PROJECT_ACCESS_KEY,
  walletUrl: walletAppUrl,
  chainId: arbitrumNova.id
})

export const config = createConfig({
  chains: [arbitrumNova, arbitrumSepolia],
  connectors: [connector],
  transports: {
    [arbitrumNova.id]: http(),
    [arbitrumSepolia.id]: http()
  }
})
