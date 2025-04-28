import { randomName } from '../utils/string'
import { Spinner } from '@0xsequence/design-system'

import clsx from 'clsx'
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
    <div className="grid grid-cols-1 grid-rows-1">
      <span
        data-status={status}
        className={clsx([
          'col-start-1 row-start-1 items-center justify-center text-sm inline-flex gap-2 relative',
          'translate-y-2 opacity-0 transition-all duration-300',
          "data-[status='idle']:invisible data-[status='idle']:z-[-1] data-[status='idle']:pointer-events-none",
          "data-[status='pending']:translate-y-0 data-[status='pending']:opacity-100"
        ])}
      >
        <Spinner size="sm" />
        Connecting
      </span>

      <span
        data-status={status}
        className={clsx([
          'col-start-1 row-start-1 items-center justify-center text-sm inline-flex gap-2 relative',
          'translate-y-2 opacity-0 transition-all duration-300',
          "data-[status='idle']:invisible data-[status='idle']:z-[-1] data-[status='idle']:pointer-events-none",
          "data-[status='connected']:translate-y-0 data-[status='connected']:opacity-100"
        ])}
      >
        {/* <span className="flex items-center justify-center size-3 bg-green-500 rounded-full">
            <Svg name="Checkmark" className="size-2.5" />
          </span>{" "} */}
        Connected
      </span>

      <button
        type="button"
        onClick={handleGuest}
        data-status={status}
        className="text-sm col-start-1 row-start-1 data-[status='pending']:opacity-0 data-[status='pending']:-translate-y-2 data-[status='connected']:opacity-0 data-[status='connected']:-translate-y-2 transition-all duration-300 underline text-style-normal cursor-pointer"
      >
        Continue as a guest
      </button>
    </div>
  )
}
