import { truncateAddress } from '@0xsequence/design-system'
import { ContractType } from '@0xsequence/indexer'
import React from 'react'
import { CopyButton } from './CopyButton'

type TokenMetadataSingle = {
  tokenId: string
  name?: string
  image?: string
  description?: string
  properties?: Record<string, unknown>
  attributes?: Record<string, unknown>[]
  updatedAt?: string
  status?: string
  queuedAt?: string | null
  source?: string
}

export type DecodedMintTxn = {
  type: string
  target: string
  value?: string
  methodName: string
  signature: string
  contractAddress: string
  contractType: ContractType.ERC1155
  tokenIds: string[]
  amounts: string[]
  tokenMetadata?: TokenMetadataSingle[]
}

interface MintTxnDetailViewProps {
  txn: DecodedMintTxn
  chainId: number
}

export const MintTxnDetailView: React.FC<MintTxnDetailViewProps> = ({ txn }) => {
  const renderMintedTokens = () => {
    if (!txn.tokenIds || !txn.amounts) {
      return <span>Mint details unavailable.</span>
    }

    const metadataMap = new Map((txn.tokenMetadata || []).map(meta => [meta.tokenId, meta]))

    return (
      <div className="flex flex-col gap-2">
        <ul className="list-none text-xs space-y-2">
          {txn.tokenIds.map((tokenId, index) => {
            const meta = metadataMap.get(tokenId)
            const amount = txn.amounts[index] ?? 'N/A'

            return (
              <li key={`${tokenId}-${index}`} className="flex items-center gap-2 py-1">
                {meta?.image ? (
                  <img
                    src={meta.image}
                    alt={meta.name || `Token ${tokenId}`}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-background-tertiary flex items-center justify-center text-text-secondary text-[10px]">
                    ?
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-text-primary">
                    {meta?.name || `Token ID: ${tokenId}`}
                  </span>
                  <span className="text-text-secondary">Amount Minted: {amount}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-background-secondary text-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium text-text-primary">Mint</span>
        <span className="text-xs px-2 py-1 rounded bg-background-tertiary text-text-secondary">
          {txn.methodName}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-text-secondary mb-1">Contract</span>
        <div className="flex items-center gap-1">
          <span className="font-mono text-text-primary">{truncateAddress(txn.contractAddress)}</span>
          <CopyButton text={txn.contractAddress} />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs text-text-secondary mb-2">Minted Assets</span>
        {renderMintedTokens()}
      </div>
    </div>
  )
}
