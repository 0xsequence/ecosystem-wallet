import { Button, Collapsible } from '@0xsequence/design-system'
import { NetworkInfo } from '../../../components/NetworkInfo'
import { FeeOptionSelector } from '../../../components/FeeOptionSelector'
import { TransferTxnDetailView } from '../../../components/TransferTxnDetailView'

import { useTransactionHandler } from '../../../hooks/useTransactionHandler'
import { useEffect, useState } from 'react'
import { decoderService } from '../../../services/TransactionDecoder'
import { useAuth } from '../../../context/AuthContext'

import { ContractType, TxnTransferType } from '@0xsequence/indexer'

type TransactionHandler = ReturnType<typeof useTransactionHandler>

interface DecodedTransferBase {
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
  methodName: string
  target: string
}

export function SendTransactionPanel({ handler }: { handler: TransactionHandler }) {
  const { address: accountAddress } = useAuth()
  const {
    transactionRequest,
    requestOrigin,
    requestChainId,
    txnFeeOptions,
    feeOptionBalances,
    selectedFeeOptionAddress,
    setSelectedFeeOptionAddress,
    hasCheckedFeeOptions,
    handleApproveTxn,
    handleRejectTxn
  } = handler

  const [decodedTransactions, setDecodedTransactions] = useState<DecodedTransferBase[]>([])

  useEffect(() => {
    if (accountAddress && transactionRequest && requestChainId) {
      setDecodedTransactions([])
      const sequenceTxns = transactionRequest.map(tx => ({
        delegateCall: false,
        revertOnError: true,
        gasLimit: tx.gasLimit || 0n,
        to: tx.to || '',
        value: tx.value || 0n,
        data: tx.data || '0x'
      }))

      // Pass requestChainId as the second argument
      decoderService
        .decodeTransactions(accountAddress, requestChainId, sequenceTxns)
        .then(decodedTxns => {
          console.log('decodedTxns', JSON.stringify(decodedTxns, null, 2))
          const transferTxns = decodedTxns.filter(
            d =>
              d &&
              [
                'native-transfer',
                'erc20-transfer',
                'erc1155-single-transfer',
                'erc1155-batch-transfer'
              ].includes(d.type)
          )
          setDecodedTransactions(transferTxns)
        })
        .catch(error => {
          console.error('Error decoding transactions:', error)
          setDecodedTransactions([])
        })
    }
  }, [accountAddress, transactionRequest])

  return (
    <>
      <div className="flex flex-col flex-1 items-start px-6 py-6 gap-2 ">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-xl font-bold">Transaction Request</h2>
          <p className="text-sm font-medium">
            Transaction request from origin <span className="font-bold">{requestOrigin}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {transactionRequest?.map((txn, index) => (
            <div className="flex flex-col gap-4 w-full" key={index}>
              {index === 0 && requestChainId && (
                <div className="flex mt-2 flex-col gap-2 w-full">
                  <NetworkInfo chainId={requestChainId} />
                </div>
              )}

              {decodedTransactions[index] && requestChainId && (
                <TransferTxnDetailView transfer={decodedTransactions[index]} chainId={requestChainId} />
              )}

              <div
                style={
                  {
                    '--theme-rounded-xl': '1rem'
                  } as React.CSSProperties
                }
                className="w-full"
              >
                <Collapsible label="Transaction data" className="backdrop-blur-2xl">
                  <pre className=" text-start text-xs overflow-x-scroll p-4 rounded-lg bg-background-secondary backdrop-blur-2xl">
                    {JSON.stringify(txn, null, 2)}
                  </pre>
                </Collapsible>
              </div>
            </div>
          ))}
        </div>

        {txnFeeOptions && feeOptionBalances.length > 0 && (
          <FeeOptionSelector
            txnFeeOptions={txnFeeOptions}
            feeOptionBalances={feeOptionBalances}
            selectedFeeOptionAddress={selectedFeeOptionAddress}
            setSelectedFeeOptionAddress={setSelectedFeeOptionAddress}
          />
        )}
      </div>

      <div className="flex mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-background-primary  p-4">
        <Button
          label="Reject"
          onClick={handleRejectTxn}
          className="  flex-1 rounded-md"
          disabled={!hasCheckedFeeOptions}
          variant="glass"
        />
        <Button
          label="Send Transaction"
          variant="primary"
          className="flex-1 rounded-md"
          onClick={handleApproveTxn}
          disabled={
            !hasCheckedFeeOptions || (txnFeeOptions && txnFeeOptions.length > 0 && !selectedFeeOptionAddress)
          }
        />
      </div>
    </>
  )
}
