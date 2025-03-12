import { GradientAvatar, truncateAddress } from '@0xsequence/design-system'
import React from 'react'

import { NetworkInfo } from '../../../components/NetworkInfo'
import { useSignMessageHandler } from '../../../hooks/useSignMessageHandler'
import { useAuth } from '../../../context/AuthContext'

export function SignMessagePanel({ handler }: { handler: ReturnType<typeof useSignMessageHandler> }) {
  const { signRequest, requestOrigin, requestChainId, handleApproveSign, handleRejectSign } = handler
  const { address = '' } = useAuth()

  const message = signRequest ? signRequest.message : ''

  const isPopup = window.opener !== null

  const isJson = React.useMemo(() => {
    try {
      return JSON.parse(message)
    } catch {
      return false
    }
  }, [message])

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
            <h2 className="text-xl font-bold">Signature Request</h2>
            <span className="text-sm font-medium text-seq-grey-500">{requestOrigin}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <dl className="flex mt-2 flex-col gap-2 w-full">
            {requestChainId && <NetworkInfo chainId={requestChainId} />}

            {!isPopup ? (
              <div className="flex flex-col gap-1 text-start p-4 rounded-lg bg-background-secondary backdrop-blur-2xl">
                <dt className="text-sm font-medium text-seq-grey-700">Wallet</dt>
                <dd className="flex gap-2 items-center text-white">
                  <GradientAvatar address={address} className="size-5" />
                  {truncateAddress(String(address), 4, 8)}
                </dd>
              </div>
            ) : null}

            <div className="flex flex-col gap-1 text-start p-4 rounded-lg bg-background-secondary backdrop-blur-2xl">
              <dt className="text-sm font-medium text-seq-grey-700">Message to sign</dt>
              {isJson ? (
                <dd>
                  <pre className=" text-start text-xs">{JSON.stringify(isJson, null, 2)}</pre>
                </dd>
              ) : (
                <dd className="break-words text-start">{message}</dd>
              )}
            </div>
          </dl>
        </div>
      </div>
      <div className="flex flex-col mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-background-primary p-4">
        <button
          type="button"
          className="flex-1 rounded-md min-h-[3rem] bg-gradient-primary font-semibold text-[15px] cursor-pointer hover:opacity-80 focus:opacity-80"
          onClick={handleApproveSign}
        >
          Approve
        </button>
        <button
          type="button"
          className="flex-1 rounded-md min-h-[3rem] bg-button-glass font-semibold text-[15px] cursor-pointer hover:opacity-80 focus:opacity-80"
          onClick={handleRejectSign}
        >
          Reject
        </button>
      </div>
    </>
  )
}
