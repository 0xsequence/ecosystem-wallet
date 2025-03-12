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
        <div className="flex">
          <img
            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${connectionRequest}&size=128&type=png`}
            width={48}
            height={48}
            className="flex-shrink-0 size-10 mr-4"
          />

          <div className="flex flex-col gap-0.5 mb-4">
            <h2 className="text-xl font-bold">Connection Request</h2>

            <span className="text-sm font-medium">{connectionRequest}</span>
          </div>
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
      <div className="flex flex-col mt-auto mb-0 gap-2 w-full sticky bottom-0 bg-background-primary p-4">
        <button
          type="button"
          className="flex-1 rounded-md min-h-[3rem] bg-gradient-primary font-semibold text-[15px] cursor-pointer hover:opacity-80 focus:opacity-80"
          onClick={handleApproveConnection}
        >
          Connect
        </button>
        <button
          type="button"
          className="flex-1 rounded-md min-h-[3rem] bg-button-glass font-semibold text-[15px] cursor-pointer hover:opacity-80 focus:opacity-80"
          onClick={handleRejectConnection}
        >
          Reject
        </button>
      </div>
    </>
  )
}
