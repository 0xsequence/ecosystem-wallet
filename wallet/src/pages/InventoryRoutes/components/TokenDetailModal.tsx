import { Modal } from '@0xsequence/design-system'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'
import { SendTokens } from './SendTokens'
import { useState } from 'react'

export function TokenDetailModal() {
  const { chainId, contractAddress, tokenId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [send, setSend] = useState(false)

  function close() {
    navigate(location?.state?.referer || '/inventory', {
      state: {
        keepPosition: true
      }
    })
  }

  if (!tokenId) return null

  if (location.state && location.state.modal) {
    return (
      <>
        <Modal scroll={true} autoHeight onClose={() => close()}>
          <Outlet context={{ setSend }} />
        </Modal>
        {send ? (
          <SendTokens close={setSend} chainId={chainId} contractAddress={contractAddress} tokenId={tokenId} />
        ) : null}
      </>
    )
  }

  return (
    <>
      <Outlet />
      {/* <SendTokens /> */}
    </>
  )
}
