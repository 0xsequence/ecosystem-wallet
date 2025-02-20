import {
  ArrowRightIcon,
  Button,
  Card,
  Divider,
  Image,
  Modal,
  PINCodeInput,
  Spinner
} from '@0xsequence/design-system'
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

const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME
// const PROJECT_LOGO = import.meta.env.VITE_PROJECT_LOGO

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI

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
    <div className="flex flex-col flex-1 items-center justify-center">
      <AuthCoverWrapper>
        <Card className="w-full bg-black gap-6 flex flex-col px-6 py-[5rem] rounded-none">
          {!emailAuthInProgress && (
            <>
              <div className="flex items-center gap-4 flex-col">
                <Image src={import.meta.env.VITE_PROJECT_LOGO} className="size-16" />
                <span>
                  Sign in to <span className="font-bold">{PROJECT_NAME}</span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  {GOOGLE_CLIENT_ID ? (
                    <GoogleOAuthProvider clientId={googleClientId}>
                      <div
                        className="rounded-sm relative bg-white/10 gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3 data-[disabled=='true
                            :disabled:cursor-default cursor-pointer"
                      >
                        {isSocialLoginInProgress === 'google' ? (
                          <Spinner className="text-white" size="md" />
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
                      className="rounded-sm relative bg-white/10 gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3 disabled:cursor-default cursor-pointer"
                      onClick={handleAppleLogin}
                      disabled={!!isSocialLoginInProgress}
                    >
                      {isSocialLoginInProgress === 'apple' ? (
                        <Spinner className="text-white" size="md" />
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
                <Divider className="bg-white/10 flex-1" />
                <span className="text-seq-grey-200 text-sm font-medium">or</span>
                <Divider className="bg-white/10 flex-1" />
              </div>
            </>
          )}

          {sendChallengeAnswer ? (
            <div className="flex flex-col  p-4 items-center justify-center">
              <div>
                <span className="text-white text-sm">Check your email for your access code</span>
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
                <div className="relative border border-seq-grey-500 rounded-md w-full min-h-[3.25rem] flex items-stretch justify-end focus-within:ring-1 focus-within:border-seq-purple-700 ring-seq-purple-700 overflow-clip">
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
                  <div className="flex items-center justify-center size-12 z-50 bg-gradient-to-r from-black/0 from-0% to-35% to-black pointer-events-none">
                    {emailAuthLoading ? (
                      <Spinner />
                    ) : (
                      <Button
                        variant={isEmailValid ? 'primary' : ''}
                        shape="circle"
                        disabled={!isEmailValid}
                        leftIcon={ArrowRightIcon}
                        onClick={() => initiateEmailAuth(email)}
                        data-id="continueButton"
                        className="size-8 pointer-events-auto"
                      />
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
  const coverImage = import.meta.env.VITE_PROJECT_AUTH_COVER
  const title = import.meta.env.VITE_PROJECT_AUTH_TITLE
  const message = import.meta.env.VITE_PROJECT_AUTH_MESSAGE

  if (!coverImage) {
    return <div className="w-full max-w-[24rem] rounded-lg overflow-clip">{children}</div>
  }

  const style = {
    '--background': `url(${coverImage})`
  } as React.CSSProperties

  return (
    <div className="flex w-full md:w-auto px-4 pd:mx-0">
      <div className="flex w-full overflow-clip rounded-lg">
        <div className="md:max-w-[24rem] w-full">{children}</div>
        <div
          className="hidden sm:flex flex-col items-end justify-end p-8  w-[500px] flex-shrink [background-image:var(--background)] bg-cover bg-no-repeat"
          style={style}
        >
          {title || message ? (
            <div className="max-w-[16rem] w-full text-black text-right">
              {title ? <p className="font-bold mb-3">{title}</p> : null}
              {message ? <p className="text-style-sm">{message}</p> : null}
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
