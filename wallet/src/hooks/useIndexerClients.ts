import { SequenceIndexer } from "@0xsequence/indexer"
import { ChainId, networks } from "@0xsequence/network"
import { projectAccessKey } from "../waasSetup"

const INDEXER_CLIENTS = new Map<ChainId, SequenceIndexer>()

export const useIndexerClients = (chainIds: ChainId[]) => {
  const result = new Map<ChainId, SequenceIndexer>()

  for (const chainId of chainIds) {
    const network = networks[chainId]
    const clientUrl = `https://${network.name}-indexer.sequence.app`

    if (!INDEXER_CLIENTS.has(chainId)) {
      INDEXER_CLIENTS.set(chainId, new SequenceIndexer(clientUrl, projectAccessKey))
    }

    const indexerClient = INDEXER_CLIENTS.get(chainId)

    if (!indexerClient) {
      throw new Error(`Indexer client not found for chainId: ${chainId}, did you forget to add this Chain?`)
    }

    result.set(chainId, indexerClient)
  }

  return result
}
