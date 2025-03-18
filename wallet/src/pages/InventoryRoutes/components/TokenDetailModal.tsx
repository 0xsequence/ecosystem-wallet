import { Modal } from '@0xsequence/design-system'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'

export function TokenDetailModal() {
  const { tokenId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  function close() {
    navigate('/inventory')
  }

  if (!tokenId) return null

  if (location.state && location.state.modal) {
    return (
      <Modal scroll={true} autoHeight onClose={() => close()}>
        <Outlet />
      </Modal>
    )
  }

  return <Outlet />
}
