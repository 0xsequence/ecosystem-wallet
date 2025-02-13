import { SequenceWaaS } from '@0xsequence/waas'

export const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY
export const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY
export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

export const sequenceWaas = new SequenceWaaS({
  // TODO: network switch to be added
  network: 'polygon',
  projectAccessKey: projectAccessKey,
  waasConfigKey: waasConfigKey
})
