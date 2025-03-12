import { Button } from '@0xsequence/design-system'

import { useConnectionHandler } from '../../../hooks/useConnectionHandler'
import { getAuthInfo } from '../../../utils/auth'

import { CheckmarkIcon, CloseIcon } from '../../../design-system-patch/icons'

export function ConnectionRequestPanel({ handler }: { handler: ReturnType<typeof useConnectionHandler> }) {
  const { connectionRequest, emailFromAuxData, handleApproveConnection, handleRejectConnection } = handler
  const authInfo = getAuthInfo()

  console.log('emailfromaux', emailFromAuxData)

  return (
    <>
      <div className="flex flex-col flex-1 items-start px-6 py-6 gap-2">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-xl font-bold">Connection Request</h2>

          <p className="text-sm font-medium text-seq-grey-500">
            Connection request from dapp with origin {connectionRequest}
          </p>
        </div>
        <ul className="flex flex-col gap-4 mt-6 text-md">
          <li className="flex gap-3">
            <span className="flex-shrink-0 size-6 flex items-center justify-center rounded-full text-white bg-[#14a554]">
              <CheckmarkIcon className="size-4" />
            </span>{' '}
            This will share your wallet address with the dapp
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 size-6 flex items-center justify-center rounded-full text-white bg-[#d66020]">
              <CloseIcon className="size-4" />
            </span>
            This will NOT allow the dapp to do any operations without your confirmation
          </li>
        </ul>

        {authInfo && emailFromAuxData && authInfo.email !== emailFromAuxData && (
          <div className="mt-6 p-4 bg-warning rounded-lg">
            <p className="text-sm font-medium text-black">
              You are logged in with <span className="capitalize font-bold">{authInfo.method}</span> -{' '}
              <span className="font-bold">{authInfo.email}</span> but requested to connect with{' '}
              <span className="font-bold">{emailFromAuxData}</span>, approve this connection request to
              continue with your current account.
            </p>
          </div>
        )}
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
