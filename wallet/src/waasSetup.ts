import { SequenceWaaS } from '@0xsequence/waas'
import { THEME } from './utils/theme'

export const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY
export const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY
export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

export const sequenceWaas = new SequenceWaaS({
  network: 'polygon',
  projectAccessKey: projectAccessKey,
  waasConfigKey: waasConfigKey
})
const walletConnectProjectId = 'c65a6cb1aa83c4e24500130f23a437d8'

export const config = {
  projectAccessKey,
  chainIds: THEME.chains || [1, 137],
  defaultChainId: 1,
  appName: 'Ecosystemwallet',
  waasConfigKey,
  walletConnect: {
    projectId: walletConnectProjectId
  }
}
