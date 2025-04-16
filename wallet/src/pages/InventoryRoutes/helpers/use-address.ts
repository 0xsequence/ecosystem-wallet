import { useAuth } from '../../../context/AuthContext'
import { useLocalStore } from '../../../utils/local-store'

export function useAddress() {
  const [altAddress] = useLocalStore<string>('address')

  const { address = '' } = useAuth()

  return altAddress && altAddress.length > 0 ? altAddress : address
}
