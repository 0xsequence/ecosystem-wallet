import { TokenImage, truncateAddress } from '@0xsequence/design-system'
import { ContractInfo, ContractType, TxnTransferType } from '@0xsequence/indexer'
import React from 'react'
import { formatUnits, zeroAddress } from 'viem'

import { NetworkImage } from './NetworkImage'

import { useNativeToken } from '../utils/nativeToken'
import { CopyButton } from './CopyButton'
import { formatDisplay } from '../utils/helpers'

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

export type DecodedTransfer = {
  type: string
  transferType: TxnTransferType
  contractAddress: string
  contractType: ContractType
  from: string
  to: string
  value?: string
  amount?: string
  tokenId?: string
  tokenIds?: string[]
  amounts?: string[]
  tokenMetadata?: TokenMetadataSingle[] | TokenMetadataSingle // Allow array or single object
  contractInfo?: ContractInfo // for ERC20
  methodName: string
  target: string
}

interface TransferTxnDetailViewProps {
  transfer: DecodedTransfer
  chainId: number
}

export const TransferTxnDetailView: React.FC<TransferTxnDetailViewProps> = ({ transfer, chainId }) => {
  const isSend = transfer.transferType === TxnTransferType.SEND
  const isReceive = transfer.transferType === TxnTransferType.RECEIVE
  const nativeTokenInfo = useNativeToken(chainId)

  const renderTokenInfo = () => {
    switch (transfer.contractType) {
      case ContractType.NATIVE:
        return (
          <div className="flex items-center gap-2">
            <NetworkImage chainId={chainId} size="sm" />
            {transfer.value && (
              <span className="font-medium">
                {formatDisplay(formatUnits(BigInt(transfer.value), 18), { maximumFractionDigits: 5 })}
              </span>
            )}
            <span className="font-bold">{nativeTokenInfo.symbol}</span>
          </div>
        )

      case ContractType.ERC20: {
        const decimals = transfer.contractInfo?.decimals ?? 18 // Default to 18 if decimals unknown
        const symbol = transfer.contractInfo?.symbol ?? 'Token'
        const logoURI = transfer.contractInfo?.logoURI
        const formattedAmount = transfer.amount ? formatUnits(BigInt(transfer.amount), decimals) : '?'

        return (
          <div className="flex items-center gap-2">
            <TokenImage src={logoURI} symbol={symbol} />
            <span className="font-medium">
              {formatDisplay(formattedAmount, { maximumFractionDigits: 5 })}
            </span>
            <span className="font-bold">{symbol}</span>
            <CopyButton text={transfer.contractAddress} />
          </div>
        )
      }
      case ContractType.ERC721:
      case ContractType.ERC1155:
        if (transfer.tokenIds && transfer.amounts) {
          const metadataArray = Array.isArray(transfer.tokenMetadata) ? transfer.tokenMetadata : []

          return (
            <div className="flex flex-col gap-2">
              <ul className="list-none text-xs space-y-2">
                {metadataArray.length > 0
                  ? metadataArray.map((meta: TokenMetadataSingle, index: number) => (
                      <li key={index} className="flex items-center gap-2 py-1">
                        {meta.image ? (
                          <img
                            src={meta.image}
                            alt={meta.name || `Token ${meta.tokenId}`}
                            className="w-8 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-background-tertiary flex items-center justify-center text-text-secondary text-[10px]">
                            ?
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-text-primary">
                            {meta.name || `Token ID: ${meta.tokenId}`}
                          </span>
                          <span className="text-text-secondary">
                            Amount: {transfer.amounts?.[index] ?? 'N/A'}
                          </span>
                        </div>
                      </li>
                    ))
                  : transfer.tokenIds?.map((id, index) => (
                      <li key={index} className="py-1">
                        ID: {id} - Amount: {transfer.amounts?.[index] ?? 'N/A'}
                      </li>
                    ))}
              </ul>
            </div>
          )
        } else if (transfer.tokenId) {
          // Handle single token transfer
          // Check if tokenMetadata is a single object
          if (transfer.tokenMetadata && !Array.isArray(transfer.tokenMetadata)) {
            const meta = transfer.tokenMetadata
            return (
              <div className="flex items-center gap-2">
                {meta.image ? (
                  <img
                    src={meta.image}
                    alt={meta.name || `Token ${meta.tokenId}`}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-background-tertiary flex items-center justify-center text-text-secondary text-[10px]">
                    ?
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-text-primary">
                    {meta.name || `Token ID: ${meta.tokenId}`}
                  </span>
                  {transfer.contractType === ContractType.ERC1155 && transfer.amount && (
                    <span className="text-text-secondary">Amount: {transfer.amount}</span>
                  )}
                </div>
                <CopyButton text={transfer.contractAddress} />
              </div>
            )
          } else {
            // Fallback if single tokenMetadata is not available
            return (
              <div className="flex items-center gap-2">
                <NetworkImage chainId={chainId} size="sm" />
                <span>{transfer.contractType}</span>
                <span>ID: {transfer.tokenId}</span>
                {transfer.contractType === ContractType.ERC1155 && transfer.amount && (
                  <span className="font-medium">Amount: {transfer.amount}</span>
                )}
                <CopyButton text={transfer.contractAddress} />
              </div>
            )
          }
        }
        return <span>Collectible Transfer (Unknown format)</span>
      default:
        return <span>Unknown Token Type</span>
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-background-secondary text-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium text-text-primary">
          {isSend ? 'Send' : isReceive ? 'Receive' : 'Interact with'}
        </span>
        <span className="text-xs px-2 py-1 rounded bg-background-tertiary text-text-secondary">
          {transfer.methodName}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-text-secondary mb-2">Asset</span>
        {renderTokenInfo()}
      </div>
      {transfer.from && transfer.from !== zeroAddress && (
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-xs text-text-secondary">From</span>
          <div className="flex items-center gap-1">
            <span className="font-mono text-text-primary">{truncateAddress(transfer.from)}</span>
            <CopyButton text={transfer.from} />
          </div>
        </div>
      )}
      {transfer.to && transfer.to !== zeroAddress && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-text-secondary">To</span>
          <div className="flex items-center gap-1">
            <span className="font-mono text-text-primary">{truncateAddress(transfer.to)}</span>
            <CopyButton text={transfer.to} />
          </div>
        </div>
      )}
    </div>
  )
}
