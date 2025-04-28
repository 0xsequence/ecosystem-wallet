import { appleAuthHelpers, useScript } from 'react-apple-signin-auth'
import { sequenceWaas } from '../waasSetup'
import { useAuth } from '../context/AuthContext'
import { randomName } from '../utils/string'
import { AppleLogo } from './AppleLogo'
import { Spinner, Text } from '@0xsequence/design-system'
import { saveAuthInfo } from '../utils/auth'

const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI
interface AppleAuthResponse {
  authorization: {
    id_token: string
  }
}

function useAppleAuthCallback() {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC)

  const { setIsSocialLoginInProgress, setWalletAddress } = useAuth()
  if (!APPLE_CLIENT_ID || !APPLE_REDIRECT_URI) {
    throw new Error(
      'To use the Apple auth methods, please include the APPLE_CLIENT_ID and APPLE_REDIRECT_URI in your environment variables'
    )
  }

  return async function handleAppleLogin() {
    try {
      setIsSocialLoginInProgress('apple')
      await appleAuthHelpers.signIn({
        authOptions: {
          clientId: APPLE_CLIENT_ID,
          redirectURI: APPLE_REDIRECT_URI,
          scope: 'openid email',
          usePopup: true
        },
        onSuccess: async (response: AppleAuthResponse) => {
          try {
            const res = await sequenceWaas.signIn(
              {
                idToken: response.authorization.id_token
              },
              randomName()
            )

            saveAuthInfo('apple', res.email)
            setWalletAddress(res.wallet)
          } catch (error) {
            console.error(error)
          } finally {
            setIsSocialLoginInProgress(false)
          }
        }
      })
    } catch (error) {
      console.error(error)
      setIsSocialLoginInProgress(false)
    }
  }
}

export function AppleAuthButton({ mode = 'LIST' }: { mode: 'LIST' | 'GRID' }) {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC)
  const { isSocialLoginInProgress } = useAuth()
  const handleAppleLogin = useAppleAuthCallback()

  return (
    <button
      type="button"
      onClick={handleAppleLogin}
      disabled={!!isSocialLoginInProgress}
      className="flex flex-col gap-1 items-center text-center disabled:cursor-default cursor-pointer hover:opacity-80"
      data-component="auth-button"
    >
      <span className="rounded-sm w-full relative bg-[var(--seq-color-button-glass)] gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3">
        {isSocialLoginInProgress === 'apple' ? (
          <Spinner size="sm" />
        ) : (
          <>
            <AppleLogo className="size-8 flex-shrink-0" />
            <>{mode === 'LIST' ? <Text>Continue with Apple</Text> : null}</>
          </>
        )}
      </span>
      {mode === 'GRID' ? (
        <Text variant="small" color="secondary">
          Apple
        </Text>
      ) : null}
    </button>
  )
}
