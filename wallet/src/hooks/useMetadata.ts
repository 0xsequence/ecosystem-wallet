import { GetContractInfoArgs, GetTokenMetadataArgs, SequenceMetadata } from '@0xsequence/metadata'
import { SequenceIndexerGateway, IndexerGateway } from '@0xsequence/indexer'

import { useQuery } from '@tanstack/react-query'

import { TIME } from '../utils/time.const'
import { INDEXER_CLIENT_GATEWAY } from '../utils/indexer'

const client = new SequenceMetadata('https://metadata.sequence.app', import.meta.env.VITE_PROJECT_ACCESS_KEY)

export const fetchTokenBalancesByContract = async (
  client: SequenceIndexerGateway,
  args: IndexerGateway.GetTokenBalancesByContractArgs
) => {
  const res = await client.getTokenBalancesByContract(args)
  return res || {}
}

export const useTokenBalancesByContract = ({ ...args }: IndexerGateway.GetTokenBalancesByContractArgs) => {
  return useQuery({
    queryKey: ['tokenBalancesByContract', args],
    queryFn: () => fetchTokenBalancesByContract(INDEXER_CLIENT_GATEWAY, args),
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: true,
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
}

export const getMeta = async (client: SequenceMetadata, args: GetContractInfoArgs) => {
  const res = await client.getContractInfo(args)
  return res || {}
}

export const getTokenMetadata = async (client: SequenceMetadata, args: GetTokenMetadataArgs) => {
  const res = await client.getTokenMetadata(args)
  return res || {}
}

export const useContractInfo = ({ ...args }: GetContractInfoArgs) => {
  return useQuery({
    queryKey: ['contactInfoMetadata', args],
    queryFn: () => getMeta(client, args),
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: true,
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
}

export const useTokenMetadata = ({ ...args }: GetTokenMetadataArgs) => {
  return useQuery({
    queryKey: ['tokenMetadata', args],
    queryFn: () => getTokenMetadata(client, args),
    retry: true,
    staleTime: 30 * TIME.SECOND,
    enabled: true,
    refetchInterval: 30 * TIME.SECOND,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
}
