import { SequenceIndexer, SequenceIndexerGateway } from '@0xsequence/indexer'
import { ChainId, networks } from '@0xsequence/network'

const PROJECT_ACCESS_KEY = import.meta.env.VITE_PROJECT_ACCESS_KEY

export const IndexerClientGateway = new SequenceIndexerGateway(`https://indexer.sequence.app`, PROJECT_ACCESS_KEY)

export const getIndexerClient = (chainId: ChainId) => {
  const network = networks[chainId]
  if (!network) {
    throw new Error(`Unknown chainId: ${chainId}`)
  }

  const hostname = `https://${network.name}-indexer.sequence.app`

  return new SequenceIndexer(hostname, PROJECT_ACCESS_KEY)
}

