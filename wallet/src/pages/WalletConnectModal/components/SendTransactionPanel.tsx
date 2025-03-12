import { Collapsible, truncateAddress, GradientAvatar } from '@0xsequence/design-system'
import { NetworkInfo } from '../../../components/NetworkInfo'
import { FeeOptionSelector } from '../../../components/FeeOptionSelector'

import { useTransactionHandler } from '../../../hooks/useTransactionHandler'
import { useAuth } from '../../../context/AuthContext'

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

  const { address = '' } = useAuth()
  const isPopup = window.opener !== null
  return (
    <>
      <div className="flex flex-col flex-1 items-start px-6 py-6 gap-2 ">
        <div className="flex">
          <img
            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${requestOrigin}&size=128&type=png`}
            width={48}
            height={48}
            className="flex-shrink-0 size-10 mr-4"
          />
          <div className="flex flex-col gap-0.5 mb-4">
            <h2 className="text-xl font-bold">Transaction Request</h2>
            <span className="text-sm font-medium">{requestOrigin}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {transactionRequest?.map((txn, index) => (
            <div className="flex flex-col gap-2 w-full" key={index}>
              <div className="flex mt-2 flex-col gap-2 w-full">
                {requestChainId && <NetworkInfo chainId={requestChainId} />}
              </div>
              {!isPopup ? (
                <div className="flex flex-col gap-1 text-start p-4 rounded-lg bg-background-secondary backdrop-blur-2xl">
                  <dt className="text-sm font-medium text-seq-grey-700">Wallet</dt>
                  <dd className="flex gap-2 items-center text-white">
                    <GradientAvatar address={address} className="size-5" />
                    {truncateAddress(String(address), 4, 8)}
                  </dd>
                </div>
              ) : null}

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

      <div className="flex flex-col mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-background-primary p-4">
        <button
          type="button"
          className="flex-1 rounded-md min-h-[3rem] bg-gradient-primary font-semibold text-[15px] cursor-pointer hover:opacity-80 focus:opacity-80"
          onClick={handleRejectTxn}
          disabled={!hasCheckedFeeOptions}
        >
          Send Transaction
        </button>
        <button
          type="button"
          className="flex-1 rounded-md min-h-[3rem] bg-button-glass font-semibold text-[15px] cursor-pointer hover:opacity-80 focus:opacity-80"
          onClick={handleApproveTxn}
          disabled={
            !hasCheckedFeeOptions || (txnFeeOptions && txnFeeOptions.length > 0 && !selectedFeeOptionAddress)
          }
        >
          UserRejectedRequestError
        </button>
      </div>
    </>
  )
}
