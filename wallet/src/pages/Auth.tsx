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
import { ExtendedConnector, useWallets } from '@0xsequence/connect'

import { EmailConflictInfo } from '@0xsequence/waas'
import React, { Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { randomName } from '../utils/string'
import { isValidEmail } from '../utils/validation'

import { useAuth } from '../context/AuthContext'
import { useEmailAuth } from '../hooks/useEmailAuth'

import { EmailConflictWarning } from '../components/EmailConflictWarning'

import { sequenceWaas } from '../waasSetup'
import { ArrowRightIcon } from '../design-system-patch/icons'
import { THEME } from '../utils/theme'
import { PendingConnectionEventData } from '../walletTransport'
import { UserProvider } from '../hooks/user-provider'
import { LoginGuest } from '../components/auth-guest'
import { AuthButton } from '../components/auth-buttons'
import { useConnect } from 'wagmi'
import { ConnectButton } from '../components/connect-button'
import { ROUTES } from '../routes'

const getCSSVariable = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

export const Auth: React.FC = () => {
  const navigate = useNavigate()

  const { wallets } = useWallets()
  const { setWalletAddress, authState, pendingEvent, setIsSocialLoginInProgress } = useAuth()

  useEffect(() => {
    if (wallets?.[0]?.address && authState.status !== 'signedIn') {
      setWalletAddress(wallets?.[0]?.address)
    }
  }, [authState, wallets])

  const { connectors, connect } = useConnect()
  // const connectors = getDefaultConnectors('waas', config)

  const injectedConnectors: ExtendedConnector[] = connectors
    .filter(c => c.type === 'injected')
    // Remove the injected connectors when another connector is already in the base connectors
    .filter(connector => {
      if (connector.id === 'com.coinbase.wallet') {
        return !connectors.find(
          connector => (connector as ExtendedConnector)?._wallet?.id === 'coinbase-wallet'
        )
      }
      if (connector.id === 'io.metamask') {
        return !connectors.find(
          connector => (connector as ExtendedConnector)?._wallet?.id === 'metamask-wallet'
        )
      }

      return true
    })
    .map(connector => {
      const Logo = () => {
        return <Image src={connector.icon} alt={connector.name} disableAnimation />
      }

      return {
        ...connector,
        _wallet: {
          id: connector.id,
          name: connector.name,
          logoLight: Logo,
          logoDark: Logo,
          type: 'wallet'
        }
      }
    })
  const baseConnectors = connectors
    .filter(connector => connector._wallet)
    .filter(connector => connector.id !== 'sequence-waas')

  const walletConnectors = [...baseConnectors, ...injectedConnectors] as ExtendedConnector[]

  const handleConnect = async (connector: ExtendedConnector) => {
    connect(
      { connector },
      {
        onError: error => {
          console.warn(error)
        },
        onSettled: result => {
          if (result?.accounts && result?.accounts?.length > 0) {
            setWalletAddress(result?.accounts[0])
          }
        }
      }
    )
  }

  const onConnect = (connector: ExtendedConnector) => {
    handleConnect(connector)
  }

  const pendingEventOrigin = pendingEvent?.origin
  const pendingConnectionEventData: PendingConnectionEventData =
    pendingEvent?.data as PendingConnectionEventData
  useEffect(() => {
    if (authState.status === 'signedIn') {
      navigate(ROUTES.HOME)
    }
  }, [authState, navigate])

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
                <div className="flex flex-col gap-4 mt-4">
                  <AuthAppleGoogle />

                  {THEME.auth.methods.email ? (
                    <>
                      <div className="flex gap-4 items-center my-4">
                        <Divider className="flex-1 bg-[var(--color-background-raised)] my-0" />
                        <Text variant="small" fontWeight="bold" color="primary">
                          or
                        </Text>
                        <Divider className="flex-1 bg-[var(--color-background-raised)] my-0" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="relative isolate border border-background-raised rounded-md w-full min-h-[3.25rem] flex items-stretch justify-end focus-within:ring-1 focus-within:border-border-focus ring-border-focus overflow-clip">
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
                          <div className="flex items-center justify-center size-12 z-50 pointer-events-none">
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
                      <AuthList />
                      {THEME.auth.methods.guest ? <LoginGuest /> : null}
                      <AuthGrid connectors={walletConnectors} onConnect={onConnect} />
                    </>
                  ) : null}
                  {/* {THEME.auth.methods.guest ? (


                      <LoginGuest />
                  ) : null} */}
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
      </UserProvider>
    </ThemeProvider>
  )
}

function AuthList() {
  const entries = THEME.auth.methods.primary

  if (!entries || entries.length < 1) {
    return null
  }

  return (
    <div className="flex *:flex-1 gap-2">
      {entries
        .filter(item => !['apple', 'google'].includes(item.toLowerCase()))
        .map(method => (
          <AuthButton mode="PRIMARY" name={method} key={method} />
        ))}
    </div>
  )
}

function AuthAppleGoogle() {
  const entries = THEME.auth.methods.primary

  if (!entries || entries.length < 1) {
    return null
  }

  return (
    <div className="flex *:flex-1 gap-2">
      {entries
        .filter(item => ['apple', 'google'].includes(item.toLowerCase()))
        .map(method => (
          <AuthButton mode="SECONDARY" name={method} key={method} />
        ))}
    </div>
  )
}

function AuthGrid({
  connectors,
  onConnect
}: {
  connectors: ExtendedConnector[]
  onConnect: (connector: ExtendedConnector) => void
}) {
  const style = {
    gridTemplateColumns: connectors
      ? connectors.length > 3
        ? 'repeat(4, 1fr)'
        : `repeat(${connectors.length}, 1fr)`
      : '1'
  } as React.CSSProperties

  return (
    <div className="grid gap-2" style={style}>
      {connectors.map(method => (
        <ConnectButton key={method.id} connector={method} onConnect={onConnect} />
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
