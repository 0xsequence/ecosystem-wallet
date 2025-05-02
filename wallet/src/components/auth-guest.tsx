import { randomName } from '../utils/string'
import { ProfileIcon, Spinner, Text } from '@0xsequence/design-system'

import { sequenceWaas } from '../waasSetup'
import { useUser } from '../hooks/user-provider'
import { useAuth } from '../context/AuthContext'
export function LoginGuest() {
  const { status, set } = useUser()
  const { setWalletAddress } = useAuth()
  async function handleGuest() {
    set.status('pending')
    set.method('guest')

    try {
      const signInResponse = await sequenceWaas.signIn({ guest: true }, randomName())
      set.status('connected')
      setTimeout(() => {
        setWalletAddress(signInResponse.wallet)
        set.wallet(signInResponse.wallet as `0x${string}`)
      }, 800)
    } catch (e) {
      console.warn(e)
      set.status('error')
    }
  }

  return (
    <button
      type="button"
      onClick={handleGuest}
      data-status={status}
      className="flex flex-col gap-1 items-center text-center disabled:cursor-default cursor-pointer hover:opacity-80"
    >
      <span
        className="rounded-md relative w-full bg-[var(--seq-color-button-glass)] gap-3 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-4"
        data-component="auth-button"
      >
        {status === 'pending' ? (
          <Spinner size="sm" className="mx-auto" />
        ) : (
          <span className="flex items-center gap-2">
            <ProfileIcon />
            <Text> Continue as a guest</Text>
          </span>
        )}
      </span>
    </button>
  )
}
