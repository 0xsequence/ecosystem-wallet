import {
  Button,
  Card,
  Divider,
  Image,
  Modal,
  PINCodeInput,
  Spinner,
  Text,
  ThemeProvider
} from '@0xsequence/design-system'
import { EmailConflictInfo } from '@0xsequence/waas'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { randomName } from '../utils/string'
import { isValidEmail } from '../utils/validation'

import { useAuth } from '../context/AuthContext'
import { useEmailAuth } from '../hooks/useEmailAuth'

import { EmailConflictWarning } from '../components/EmailConflictWarning'

import { ROUTES } from '../routes'
import { sequenceWaas } from '../waasSetup'
import { ArrowRightIcon } from '../design-system-patch/icons'
import { THEME } from '../utils/theme'
import { PendingConnectionEventData } from '../walletTransport'
import { UserProvider } from '../hooks/user-provider'
import { LoginGuest } from '../components/auth-guest'
import { AuthButton } from '../components/auth-buttons'

const getCSSVariable = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

export const Auth: React.FC = () => {
  const navigate = useNavigate()

  const { setWalletAddress, authState, pendingEvent, setIsSocialLoginInProgress } = useAuth()

  const pendingEventOrigin = pendingEvent?.origin
  const pendingConnectionEventData: PendingConnectionEventData =
    pendingEvent?.data as PendingConnectionEventData

  useEffect(() => {
    if (authState.status === 'signedIn') {
      navigate(ROUTES.HOME)
    }
  }, [authState.status, navigate])

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
    <ThemeProvider theme={THEME.auth.theme} root="#auth-root">
      <UserProvider>
        <div className="flex flex-col flex-1 items-center justify-center text-primary" id="auth-root">
          <AuthCoverWrapper>
            <Card className="bg-transparent w-full gap-6 flex flex-col px-6 rounded-none flex-1">
              {!emailAuthInProgress && (
                <>
                  <div className="flex items-center gap-4 flex-col flex-1">
                    <div className="flex-1">
                      <Image src={THEME.auth.logo} width={THEME.auth.size.w} height={THEME.auth.size.h} />
                    </div>
                    <span>
                      {isPopup && pendingEventOrigin ? (
                        <span>
                          Sign in to your <Text fontWeight="bold">{THEME.name}</Text> wallet to give access to
                          dapp with origin <Text fontWeight="bold">{pendingEventOrigin}</Text>
                        </span>
                      ) : (
                        <Text variant="normal" color="prmary">
                          {THEME.auth.welcome}
                        </Text>
                      )}
                    </span>
                  </div>

                  <AuthList />
                  <AuthGrid />
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
                <>
                  {THEME.auth.methods.email ? (
                    <div className="mt-2">
                      <div className="flex flex-col gap-2">
                        <div className="relative border border-border rounded-md w-full min-h-[3.25rem] flex items-stretch justify-end focus-within:ring-1 focus-within:border-border-focus ring-border-focus overflow-clip">
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
                          <p className="text-negative text-sm font-medium">
                            Please enter a valid email address
                          </p>
                        )}
                      </div>
                    </div>
                  ) : null}
                  {THEME.auth.methods.guest ? (
                    <>
                      <div className="flex gap-4 items-center">
                        <Divider className="flex-1 bg-[var(--color-background-raised)]" />
                        <Text variant="small" fontWeight="bold" color="primary">
                          or
                        </Text>
                        <Divider className="flex-1 bg-[var(--color-background-raised)]" />
                      </div>

                      <LoginGuest />
                    </>
                  ) : null}
                </>
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
      </UserProvider>
    </ThemeProvider>
  )
}

function AuthList() {
  const entries = THEME.auth.methods.list

  if (!entries || entries.length < 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      {entries.map(method => (
        <AuthButton mode="LIST" name={method} key={method} />
      ))}
    </div>
  )
}

function AuthGrid() {
  const style = {
    'grid-template-columns': THEME?.auth?.methods?.grid
      ? THEME.auth.methods.grid.length > 3
        ? 'repeat(4, 1fr)'
        : `repeat(${THEME.auth.methods.grid.length}, 1fr)`
      : '1'
  } as React.CSSProperties

  const entries = THEME.auth.methods.grid

  if (!entries || entries.length < 1) {
    return null
  }

  return (
    <div className="grid gap-2" style={style}>
      {entries.map(method => (
        <AuthButton mode="GRID" name={method} key={method} />
      ))}
    </div>
  )
}

function AuthCoverWrapper({ children }: { children: React.ReactNode }) {
  if (!THEME.auth.cover) {
    return (
      <div className="w-full max-w-[24rem] rounded-lg overflow-clip border border-[var(--color-auth-border,transparent)]">
        {children}
      </div>
    )
  }

  const style = {
    '--background': `url(${THEME.auth.cover})`
  } as React.CSSProperties

  const hasBorder = !!getCSSVariable('--color-auth-border')
  const hasBackground = !!getCSSVariable('--color-auth-bg')

  return (
    <div
      className="flex w-[calc(100%-32px)] md:w-auto mx-4 min-h-[40rem] overflow-clip rounded-lg group bg-background-primary data-[background='true']:bg-[var(--color-auth-bg)] data-[border='true']:border data-[border='true']:border-[var(--color-auth-border,transparent)]"
      data-border={hasBorder}
      data-background={hasBackground}
      data-component="auth-container"
    >
      <div className="grid auth-grid-template max-w-screen-lg w-full">
        <div className="flex flex-col items-center flex-1 place-self-center w-full">{children}</div>
        <div
          className="hidden sm:flex flex-col items-end justify-end p-8 flex-shrink [background-image:var(--background)] bg-cover bg-no-repeat group-data-[border='true']:border-l group-data-[border='true']:border-[var(--color-auth-border,transparent)]"
          style={style}
          data-component="auth-cover"
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
