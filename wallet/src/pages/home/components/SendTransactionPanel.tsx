import { Button, Collapsible } from '@0xsequence/design-system'
import { NetworkInfo } from '../../../components/NetworkInfo'
import { FeeOptionSelector } from '../../../components/FeeOptionSelector'

import { useTransactionHandler } from '../../../hooks/useTransactionHandler'

type TransactionHandler = ReturnType<typeof useTransactionHandler>

export function SendTransactionPanel({ handler }: { handler: TransactionHandler }) {
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

  return (
    <>
      <div className="flex flex-col flex-1 items-start px-4 py-6 gap-2 text-black">
        <div className="flex flex-col gap-1 mb-4 px-4">
          <h2 className="text-xl font-bold">Transaction Request</h2>
          <p className="text-sm font-medium text-seq-grey-500">
            Transaction request from origin <span className="font-bold">{requestOrigin}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {transactionRequest?.map((txn, index) => (
            <div className="flex flex-col gap-2 w-full" key={index}>
              <dl className="flex mt-2 flex-col gap-2 w-full">
                {requestChainId && <NetworkInfo chainId={requestChainId} />}
              </dl>
              <div
                style={
                  {
                    '--theme-rounded-xl': '1rem',
                    '--color-background-secondary': 'rgba(0, 0, 0, 0.1)'
                  } as React.CSSProperties
                }
                className="w-full"
              >
                <Collapsible label="Transaction data">
                  <pre className="text-black text-start text-xs overflow-x-scroll p-4 rounded-lg bg-black/10">
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

      <div className="flex mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-white/80 backdrop-blur-xl p-4 shadow-[0_-1px_3px_-1.5px_theme(color.black/10%)]">
        <Button
          label="Reject"
          onClick={handleRejectTxn}
          className="bg-black/20 text-black flex-1 "
          disabled={!hasCheckedFeeOptions}
        />
        <Button
          label="Approve"
          className="flex-1 bg-black text-white"
          onClick={handleApproveTxn}
          disabled={
            !hasCheckedFeeOptions || (txnFeeOptions && txnFeeOptions.length > 0 && !selectedFeeOptionAddress)
          }
        />
      </div>
    </>
  )
}
