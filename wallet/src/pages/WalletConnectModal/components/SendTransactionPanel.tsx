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
      <div className="flex flex-col flex-1 items-start px-4 py-6 gap-2 ">
        <div className="flex flex-col gap-1 mb-4 px-4">
          <h2 className="text-xl font-bold">Transaction Request</h2>
          <p className="text-sm font-medium">
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
