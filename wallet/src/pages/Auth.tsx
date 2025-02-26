import { Button, Card, Divider, Image, Modal, PINCodeInput, Spinner } from '@0xsequence/design-system'
import { EmailConflictInfo } from '@0xsequence/waas'
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { appleAuthHelpers, useScript } from 'react-apple-signin-auth'
import { useNavigate } from 'react-router'

import { randomName } from '../utils/string'

import { useAuth } from '../context/AuthContext'

import { useEmailAuth } from '../hooks/useEmailAuth'

import { AppleLogo } from '../components/AppleLogo'
import { EmailConflictWarning } from '../components/EmailConflictWarning'
import { GoogleLogo } from '../components/GoogleLogo'

import { ROUTES } from '../routes'
import { googleClientId, sequenceWaas } from '../waasSetup'
import { ArrowRightIcon } from '../design-system-patch/icons'
import { THEME } from '../utils/theme'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI

console.log(THEME)
// const BUTTON_SIZE = '14'

interface AppleAuthResponse {
  authorization: {
    id_token: string
  }
}

export const Auth: React.FC = () => {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC)
  const navigate = useNavigate()

  const { setWalletAddress, authState } = useAuth()
  const [isSocialLoginInProgress, setIsSocialLoginInProgress] = useState<false | string>(false)

  useEffect(() => {
    if (authState.status === 'signedIn') {
      navigate(ROUTES.HOME)
    }
  }, [authState.status, navigate])

  const handleGoogleLogin = async (tokenResponse: CredentialResponse) => {
    try {
      setIsSocialLoginInProgress('google')
      const res = await sequenceWaas.signIn(
        {
          idToken: tokenResponse.credential!
        },
        randomName()
      )
      setWalletAddress(res.wallet)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSocialLoginInProgress(false)
    }
  }

  const handleAppleLogin = async () => {
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

  const {
    inProgress: emailAuthInProgress,
    loading: emailAuthLoading,
    initiateAuth: initiateEmailAuth,
    sendChallengeAnswer,
    cancel: cancelEmailAuth
  } = useEmailAuth({
    sessionName: randomName(),
    onSuccess: async ({ wallet }) => {
      setWalletAddress(wallet)
    }
  })

  const [email, setEmail] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isEmailValid = inputRef.current?.validity.valid && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const [showEmailWarning, setEmailWarning] = useState(false)
  const [code, setCode] = useState<string[]>([])

  const [emailConflictInfo, setEmailConflictInfo] = useState<EmailConflictInfo | undefined>()
  const [isEmailConflictModalOpen, setIsEmailConflictModalOpen] = useState(false)
  const forceCreateFuncRef = useRef<(() => Promise<void>) | null>(null)

  sequenceWaas.onEmailConflict(async (info, forceCreate) => {
    forceCreateFuncRef.current = forceCreate
    setEmailConflictInfo(info)
    setIsEmailConflictModalOpen(true)
  })

  // const isPopup = window.opener !== null

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center text-primary bg-inverse"
      data-theme="dark"
    >
      <AuthCoverWrapper>
        <Card className="bg-[theme(colors.white/10%)] w-full gap-6 flex flex-col px-6 py-[5rem] rounded-none">
          {!emailAuthInProgress && (
            <>
              <div className="flex items-center gap-4 flex-col">
                <Image src={THEME.modes.dark.authLogo} className="size-24" />
                <span>
                  Sign in to <span className="font-bold">{THEME.name}</span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  {GOOGLE_CLIENT_ID ? (
                    <GoogleOAuthProvider clientId={googleClientId}>
                      <div
                        className="rounded-sm relative bg-button-glass gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3 data-[disabled=='true
                            :disabled:cursor-default cursor-pointer"
                      >
                        {isSocialLoginInProgress === 'google' ? (
                          <Spinner size="md" />
                        ) : (
                          <>
                            {/* @ts-expect-error logo doesn't want className, but accepts it */}
                            <GoogleLogo className="size-6 flex-shrink-0" />
                            Continue with Google
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
                    </GoogleOAuthProvider>
                  ) : null}

                  {APPLE_CLIENT_ID ? (
                    <button
                      type="button"
                      className="rounded-sm relative bg-button-glass gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3 disabled:cursor-default cursor-pointer"
                      onClick={handleAppleLogin}
                      disabled={!!isSocialLoginInProgress}
                    >
                      {isSocialLoginInProgress === 'apple' ? (
                        <Spinner size="md" />
                      ) : (
                        <>
                          <AppleLogo className="size-8 flex-shrink-0" />
                          Continue with Apple
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Divider className="bg-background-raised flex-1" />
                <span className="text-sm font-medium">or</span>
                <Divider className="bg-background-raised flex-1" />
              </div>
            </>
          )}

          {sendChallengeAnswer ? (
            <div className="flex flex-col p-4 items-center justify-center">
              <div>
                <span className="text-sm">Check your email for your access code</span>
              </div>
              <div className="mt-4">
                <PINCodeInput value={code} digits={6} onChange={setCode} />
              </div>

              <div className="flex gap-2 mt-4 items-center justify-center">
                {emailAuthLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    variant="primary"
                    disabled={code.includes('')}
                    label="Verify"
                    onClick={() => sendChallengeAnswer(code.join(''))}
                    data-id="verifyButton"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <div className="flex flex-col gap-2">
                <div className="relative border border-border-normal rounded-md w-full min-h-[3.25rem] flex items-stretch justify-end focus-within:ring-1 focus-within:border-border-focus ring-border-focus overflow-clip">
                  <input
                    name="email"
                    type="email"
                    onChange={(ev: { target: { value: SetStateAction<string> } }) => {
                      setEmail(ev.target.value)
                    }}
                    ref={inputRef}
                    onKeyDown={(ev: { key: string }) => {
                      if (email && ev.key === 'Enter') {
                        initiateEmailAuth(email)
                      }
                    }}
                    onBlur={() => setEmailWarning(!!email && !isEmailValid)}
                    value={email}
                    placeholder="Email address"
                    required
                    className="absolute w-full h-full p-4 outline-none placeholder:text-seq-grey-200 sm:text-style-normal font-medium"
                    data-id="loginEmail"
                  />
                  <div className="flex items-center justify-center size-12 z-50  pointer-events-none">
                    {emailAuthLoading ? (
                      <Spinner />
                    ) : (
                      <button
                        type="button"
                        disabled={!isEmailValid}
                        onClick={() => initiateEmailAuth(email)}
                        className="size-8 pointer-events-auto disabled:opacity-25 rounded-full flex items-center justify-center bg-button-glass"
                      >
                        <ArrowRightIcon />
                      </button>
                    )}
                  </div>
                </div>
                {showEmailWarning && (
                  <p className="text-negative text-sm font-medium">Please enter a valid email address</p>
                )}
              </div>
            </div>
          )}
        </Card>
      </AuthCoverWrapper>
      {isEmailConflictModalOpen && emailConflictInfo && (
        <Modal size="small" onClose={() => setIsEmailConflictModalOpen(false)}>
          <EmailConflictWarning
            info={emailConflictInfo}
            onCancel={() => {
              setIsEmailConflictModalOpen(false)
              setEmailConflictInfo(undefined)
              setIsSocialLoginInProgress(false)
              if (emailAuthInProgress) {
                setCode([])
                cancelEmailAuth()
                setEmail('')
              }
            }}
            onConfirm={async () => {
              setIsEmailConflictModalOpen(false)
              setEmailConflictInfo(undefined)
              await forceCreateFuncRef.current?.()
            }}
          />
        </Modal>
      )}
    </div>
  )
}

// {isPopup ? <Text className="text-center mt-4" variant="normal" color="text100">
//   Sign in to your <Text fontWeight="bold">{PROJECT_NAME}</Text> wallet to give access to dapp
//   with origin <Text fontWeight="bold">{pendingEventOrigin}</Text>
// </Text>
// : <span>Sign in to <span className="font-bold">{PROJECT_NAME}</span></span>
// }

function AuthCoverWrapper({ children }: { children: React.ReactNode }) {
  if (!THEME.authCover) {
    return (
      <div className="w-full max-w-[24rem] rounded-lg overflow-clip bg-black" data-theme="dark">
        {children}
      </div>
    )
  }

  const style = {
    '--background': `url(${THEME.authCover})`
  } as React.CSSProperties

  return (
    <div className="flex w-full md:w-auto px-4 pd:mx-0" data-theme="dark">
      <div className="overflow-clip rounded-lg grid auth-grid-template max-w-screen-lg w-full min-h-[32rem] aspect-video bg-background-secondary">
        <div className="flex flex-col items-center flex-1 place-self-center w-full ">{children}</div>
        <div
          className="hidden sm:flex flex-col items-end justify-end p-8 flex-shrink [background-image:var(--background)] bg-cover bg-no-repeat"
          style={style}
        >
          {THEME.messages.authTitle || THEME.messages.authMessage ? (
            <div className="flex-shrink text-right max-w-[60%] text-inverse">
              {THEME.messages.authTitle ? <p className="font-bold mb-3">{THEME.messages.authTitle}</p> : null}
              {THEME.messages.authMessage ? (
                <p className="text-style-sm">{THEME.messages.authMessage}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

// {isPopup && (
//   <Text className="text-center mt-4" variant="normal" color="text100">
//     Sign in to your <Text fontWeight="bold">{PROJECT_NAME}</Text> wallet to give access to dapp
//     with origin <Text fontWeight="bold">{pendingEventOrigin}</Text>
//   </Text>
// )}
