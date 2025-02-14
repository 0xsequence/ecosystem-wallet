import { SequenceIndexerGateway } from '@0xsequence/indexer'

const PROJECT_ACCESS_KEY = import.meta.env.VITE_PROJECT_ACCESS_KEY

export const getIndexerClient = () => {
  const hostname = `https://indexer.sequence.app`

  return new SequenceIndexerGateway(hostname, PROJECT_ACCESS_KEY)
}
