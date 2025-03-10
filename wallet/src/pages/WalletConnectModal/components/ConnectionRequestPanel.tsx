import { Button } from '@0xsequence/design-system'

import { useConnectionHandler } from '../../../hooks/useConnectionHandler'

import { CheckmarkIcon, CloseIcon } from '../../../design-system-patch/icons'

export function ConnectionRequestPanel({ handler }: { handler: ReturnType<typeof useConnectionHandler> }) {
  const { connectionRequest, handleApproveConnection, handleRejectConnection } = handler

  return (
    <>
      <div className="flex flex-col flex-1 items-start px-4 py-6 gap-2 ">
        <div className="flex flex-col gap-1 mb-4 px-4">
          <h2 className="text-xl font-bold">Connection Request</h2>

          <p className="text-sm font-medium text-seq-grey-500">
            Connection request from dapp with origin {connectionRequest}
          </p>
        </div>
        <ul className="flex flex-col gap-4 mt-6 text-md px-4">
          <li className="flex gap-3">
            <span className="flex-shrink-0 bg-seq-green-600 size-6 flex items-center justify-center rounded-full text-white bg-[#d66020]">
              <CheckmarkIcon className="size-4" />
            </span>{' '}
            This will share your wallet address with the dapp
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 bg-seq-red-600 size-6 flex items-center justify-center rounded-full text-white bg-[#14a554]">
              <CloseIcon className="size-4" />
            </span>
            This will NOT allow the dapp to do any operations without your confirmation
          </li>
        </ul>
      </div>
      <div className="flex mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-background-primary p-4">
        <Button
          label="Reject"
          onClick={handleRejectConnection}
          className="flex-1   rounded-md"
          variant="glass"
        />
        <Button
          label="Connect"
          onClick={handleApproveConnection}
          className="flex-1  rounded-md"
          variant="primary"
        />
      </div>
    </>
  )
}
