import { Spinner, Text } from '@0xsequence/design-system'
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { sequenceWaas } from '../waasSetup'
import { useAuth } from '../context/AuthContext'
import { randomName } from '../utils/string'
import { saveAuthInfo } from '../utils/auth'
import { GoogleLogo } from './GoogleLogo'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export function GoogleAuthButton({ mode }: { mode: 'PRIMARY' | 'SECONDARY' }) {
  const { setWalletAddress, setIsSocialLoginInProgress, isSocialLoginInProgress } = useAuth()

  if (!GOOGLE_CLIENT_ID) return null

  const handleGoogleLogin = async (tokenResponse: CredentialResponse) => {
    try {
      setIsSocialLoginInProgress('google')
      const res = await sequenceWaas.signIn(
        {
          idToken: tokenResponse.credential!
        },
        randomName()
      )

      saveAuthInfo('google', res.email)
      setWalletAddress(res.wallet)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSocialLoginInProgress(false)
    }
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div
        className="flex flex-col gap-1 items-center text-center disabled:cursor-default cursor-pointer hover:opacity-80"
        data-component="auth-button"
      >
        <div className="rounded-sm w-full relative bg-[var(--seq-color-button-glass)] gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3">
          {isSocialLoginInProgress === 'google' ? (
            <Spinner size="md" />
          ) : (
            <>
              {/* @ts-expect-error logo doesn't want className, but accepts it */}
              <GoogleLogo className="size-6 flex-shrink-0" />
              <>{mode === 'PRIMARY' ? <Text>Continue with Google</Text> : null}</>
              <div
                className="opacity-0 absolute w-full h-full pointer-events-auto overflow-clip "
                data-id="googleAuth"
              >
                <div className="scale-150">
                  <GoogleLogin
                    type="standard"
                    shape="rectangular"
                    theme="filled_black"
                    size="large"
                    width="1000"
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log('Login Failed')
                      setIsSocialLoginInProgress(false)
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {mode === 'SECONDARY' ? (
          <Text variant="small" color="secondary">
            Google
          </Text>
        ) : null}
      </div>
    </GoogleOAuthProvider>
  )
}
