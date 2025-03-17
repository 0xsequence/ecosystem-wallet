import { Button, Card, Divider, Image, Modal, PINCodeInput, Spinner, Text } from '@0xsequence/design-system'
import { EmailConflictInfo } from '@0xsequence/waas'
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { appleAuthHelpers, useScript } from 'react-apple-signin-auth'
import { useNavigate } from 'react-router'

import { randomName } from '../utils/string'
import { isValidEmail } from '../utils/validation'

import { useAuth } from '../context/AuthContext'
import { useEmailAuth } from '../hooks/useEmailAuth'

import { AppleLogo } from '../components/AppleLogo'
import { EmailConflictWarning } from '../components/EmailConflictWarning'
import { GoogleLogo } from '../components/GoogleLogo'

import { ROUTES } from '../routes'
import { googleClientId, sequenceWaas } from '../waasSetup'
import { ArrowRightIcon } from '../design-system-patch/icons'
import { saveAuthInfo } from '../utils/auth'
import { THEME } from '../utils/theme'
import { PendingConnectionEventData } from '../walletTransport'

const getCSSVariable = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI

interface AppleAuthResponse {
  authorization: {
    id_token: string
  }
}

export const Auth: React.FC = () => {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC)
  const navigate = useNavigate()

  const { setWalletAddress, authState, pendingEvent } = useAuth()
  const [isSocialLoginInProgress, setIsSocialLoginInProgress] = useState<false | string>(false)

  const pendingEventOrigin = pendingEvent?.origin
  const pendingConnectionEventData: PendingConnectionEventData =
    pendingEvent?.data as PendingConnectionEventData

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

      saveAuthInfo('google', res.email)
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
  const isEmailInputValid = inputRef.current?.validity.valid && isValidEmail(email)
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

  const isPopup = window.opener !== null

  const emailHandled = useRef(false)

  useEffect(() => {
    if (!emailHandled.current && pendingConnectionEventData?.auxData?.email) {
      emailHandled.current = true
      const email = pendingConnectionEventData.auxData.email as string

      if (isValidEmail(email)) {
        setEmail(email)
        initiateEmailAuth(email)
      }
    }
  }, [pendingConnectionEventData])

  return (
    <div className="flex flex-col flex-1 items-center justify-center text-primary" data-theme="dark">
      <AuthCoverWrapper>
        <Card className="bg-transparent w-full gap-6 flex flex-col px-6 py-[5rem] rounded-none">
          {!emailAuthInProgress && (
            <>
              <div className="flex items-center gap-4 flex-col">
                <Image src={THEME.auth.logo} width={THEME.auth.size.w} height={THEME.auth.size.h} />
                <span>
                  {isPopup && pendingEventOrigin ? (
                    <span>
                      Sign in to your <Text fontWeight="bold">{THEME.name}</Text> wallet to give access to
                      dapp with origin <Text fontWeight="bold">{pendingEventOrigin}</Text>
                    </span>
                  ) : (
                    <span>
                      Sign in to <span className="font-bold">{THEME.name}</span>
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                  {GOOGLE_CLIENT_ID ? (
                    <GoogleOAuthProvider clientId={googleClientId}>
                      <div className="rounded-sm relative bg-button-glass gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3 disabled:cursor-default cursor-pointer hover:opacity-80">
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
                      className="rounded-sm relative bg-button-glass gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3 disabled:cursor-default cursor-pointer hover:opacity-80"
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
              <div className="mb-4">
                <Image src={THEME.auth.logo} width={THEME.auth.size.w} height={THEME.auth.size.h} />
              </div>
              <div>
                <span className="text-sm">
                  Check your email <Text fontWeight="bold">{email}</Text> for your access code
                </span>
              </div>
              <div className="mt-4">
                <PINCodeInput value={code} digits={6} onChange={setCode} />
              </div>

              <div className="flex gap-2 mt-4 items-center justify-center min-h-[50px]">
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
                    onBlur={() => setEmailWarning(!!email && !isEmailInputValid)}
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
                        disabled={!isEmailInputValid}
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

function AuthCoverWrapper({ children }: { children: React.ReactNode }) {
  if (!THEME.auth.cover) {
    return (
      <div className="w-full max-w-[24rem] rounded-lg overflow-clip bg-black border border-[var(--color-auth-border,transparent)]">
        {children}
      </div>
    )
  }

  const style = {
    '--background': `url(${THEME.auth.cover})`
  } as React.CSSProperties

  const hasBorder = !!getCSSVariable('--color-auth-border')

  return (
    <div
      className="flex w-[calc(100%-32px)] md:w-auto mx-4 min-h-[40rem] bg-[var(--color-auth-bg,black)] overflow-clip rounded-lg data-[border='true']:border data-[border='true']:border-[var(--color-auth-border,transparent)] group"
      data-border={hasBorder}
    >
      <div className="grid auth-grid-template max-w-screen-lg w-full">
        <div className="flex flex-col items-center flex-1 place-self-center w-full">{children}</div>
        <div
          className="hidden sm:flex flex-col items-end justify-end p-8 flex-shrink [background-image:var(--background)] bg-cover bg-no-repeat group-data-[border='true']:border-l group-data-[border='true']:border-[var(--color-auth-border,transparent)]"
          style={style}
        >
          {THEME.auth.title || THEME.auth.message ? (
            <div
              className={`flex-shrink text-right max-w-[60%]  ${
                THEME.auth.color === 'black' ? 'text-black' : 'text-white'
              }`}
            >
              {THEME.auth.title ? <p className="font-bold text-lg mb-3">{THEME.auth.title}</p> : null}
              {THEME.auth.message ? <p className="text-sm">{THEME.auth.message}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
