import { Modal } from '@0xsequence/design-system'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'
import { SendTokens } from './SendTokens'
import { useState } from 'react'

export function TokenDetailModal() {
  const { chainId, contractAddress, tokenId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [sendModal, setSendModal] = useState(false)

  function close() {
    navigate(location?.state?.referer || '/inventory', {
      state: {
        keepPosition: true
      }
    })
  }

  if (location.state && location.state.modal) {
    return (
      <>
        <Modal scroll={true} autoHeight onClose={() => close()}>
          <Outlet />
        </Modal>
        {sendModal && chainId && contractAddress && tokenId ? (
          <SendTokens
            close={setSendModal}
            chainId={chainId}
            contractAddress={contractAddress}
            tokenId={tokenId.toString()}
          />
        ) : null}
      </>
    )
  }

  return (
    <>
      <Outlet />
      {sendModal && chainId && contractAddress && tokenId ? (
        <SendTokens
          close={setSendModal}
          chainId={chainId}
          contractAddress={contractAddress}
          tokenId={tokenId}
        />
      ) : null}
    </>
  )
}
