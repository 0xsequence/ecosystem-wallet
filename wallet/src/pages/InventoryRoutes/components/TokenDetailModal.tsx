import { Modal } from '@0xsequence/design-system'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'
import { SendTokens } from './SendTokens'

export function TokenDetailModal() {
  const { tokenId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  function close() {
    navigate(location?.state?.referer || '/inventory')
  }

  if (!tokenId) return null

  if (location.state && location.state.modal) {
    return (
      <>
        <Modal scroll={true} autoHeight onClose={() => close()}>
          <Outlet />
        </Modal>
        <SendTokens />
      </>
    )
  }

  return (
    <>
      <Outlet />
      <SendTokens />
    </>
  )
}
