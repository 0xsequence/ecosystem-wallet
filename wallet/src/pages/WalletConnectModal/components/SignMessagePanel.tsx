import { Button } from '@0xsequence/design-system'
import React from 'react'

import { NetworkInfo } from '../../../components/NetworkInfo'
import { useSignMessageHandler } from '../../../hooks/useSignMessageHandler'

export function SignMessagePanel({ handler }: { handler: ReturnType<typeof useSignMessageHandler> }) {
  const { signRequest, requestOrigin, requestChainId, handleApproveSign, handleRejectSign } = handler

  const message = signRequest ? signRequest.message : ''

  const isJson = React.useMemo(() => {
    try {
      return JSON.parse(message)
    } catch {
      return false
    }
  }, [message])

  return (
    <>
      <div className="flex flex-col flex-1 items-start px-4  py-6 gap-2 text-black">
        <div className="flex flex-col gap-1 mb-4 px-4">
          <h2 className="text-xl font-bold">Signature Request</h2>
          <p className="text-sm font-medium text-seq-grey-500">
            Signature request from origin <span className="font-bold">{requestOrigin}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <dl className="flex mt-2 flex-col gap-2 w-full">
            {requestChainId && <NetworkInfo chainId={requestChainId} />}

            <div className="flex flex-col gap-1 text-black text-start overflow-x-scroll p-4 rounded-lg bg-black/10">
              <dt className="text-sm font-medium text-seq-grey-700">Message to sign</dt>
              {isJson ? (
                <dd>
                  <pre className="text-black text-start text-xs overflow-x-scroll">
                    {JSON.stringify(isJson, null, 2)}
                  </pre>
                </dd>
              ) : (
                <dd className="break-words text-start">{message}</dd>
              )}
            </div>
          </dl>
        </div>
      </div>
      <div className="flex mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-white/80 backdrop-blur-xl p-4 shadow-[0_-1px_3px_-1.5px_theme(color.black/10%)]">
        <Button
          label="Reject"
          onClick={handleRejectSign}
          className="bg-black/20 text-black flex-1 rounded-md"
        />
        <Button
          label="Approve"
          className="flex-1 bg-black text-white rounded-md"
          onClick={handleApproveSign}
        />
      </div>
    </>
  )
}
