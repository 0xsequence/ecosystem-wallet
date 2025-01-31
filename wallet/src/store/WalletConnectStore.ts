import SignClient from '@walletconnect/sign-client'
import { SessionTypes, SignClientTypes } from '@walletconnect/types'
import { proxy } from 'valtio'

import { walletTransport } from '../context/AuthContext'

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
        name: import.meta.env.VITE_PROJECT_NAME || 'Sequence Wallet',
        description: 'Sequence Cross-App Embedded Wallet',
        url: window.location.origin,
        icons: [import.meta.env.VITE_PROJECT_LOGO || '']
      }
    })

    this.signClient.on('session_proposal', this.onSessionProposal)
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
      const { proposer, requiredNamespaces } = params

      const walletAddress = walletTransport.getWalletAddress()
      if (!walletAddress || !this.signClient) {
        throw new Error('Wallet not ready')
      }

      // Use existing connection handler to get user approval
      const approved = await new Promise<boolean>(resolve => {
        walletTransport.setConnectionPromptCallback(async (origin: string) => {
          resolve(walletTransport.isConnected(origin))
          return true
        })

        if (!walletTransport.isConnected(proposer.metadata.url)) {
          resolve(true) // Auto-approve for now, the UI will handle the actual approval
        } else {
          resolve(true)
        }
      })

      if (approved) {
        const chains = ['eip155:1', 'eip155:42161']
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
                'eth_signTypedData'
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
}

export const walletConnectStore = new WalletConnectStore()
