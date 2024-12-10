import {
  ArrowRightIcon,
  Box,
  Button,
  Card,
  Divider,
  Image,
  Modal,
  PINCodeInput,
  Spinner,
  Text,
  TextInput
} from '@0xsequence/design-system'
import { EmailConflictInfo } from '@0xsequence/waas'
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { SetStateAction, useRef, useState } from 'react'
import { appleAuthHelpers, useScript } from 'react-apple-signin-auth'

import { randomName } from '../utils/string'

import { useAuth } from '../context/AuthContext'

import { useEmailAuth } from '../hooks/useEmailAuth'

import { AppleLogo } from '../components/AppleLogo'
import { EmailConflictWarning } from '../components/EmailConflictWarning'
import { GoogleLogo } from '../components/GoogleLogo'

import { googleClientId, sequenceWaas } from '../waasSetup'

const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME
const PROJECT_LOGO = import.meta.env.VITE_PROJECT_LOGO

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID
const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI

const BUTTON_SIZE = '14'
const ICON_SIZE = '10'

interface AppleAuthResponse {
  authorization: {
    id_token: string
  }
}

export const Auth: React.FC = () => {
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC)

  const { setWalletAddress, pendingEventOrigin } = useAuth()
  const [isSocialLoginInProgress, setIsSocialLoginInProgress] = useState(false)

  const handleGoogleLogin = async (tokenResponse: CredentialResponse) => {
    try {
      setIsSocialLoginInProgress(true)
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
      setIsSocialLoginInProgress(true)
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
  const isEmailValid = inputRef.current?.validity.valid
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

  return (
    <Box padding="4">
      <Box alignItems="center" justifyContent="center">
        <Box
          flexDirection="column"
          gap="2"
          marginY="4"
          alignItems="center"
          justifyContent="center"
          style={{ maxWidth: '400px' }}
        >
          <Box alignItems="center" flexDirection="column" marginBottom="2">
            {PROJECT_LOGO && <Image src={PROJECT_LOGO} maxWidth="1/2" maxHeight="1/4" aspectRatio="1/1" />}

            {isPopup && (
              <Text variant="normal" color="text100" textAlign="center" marginTop="4">
                Sign in to your <Text fontWeight="bold">{PROJECT_NAME}</Text> wallet to give access to dapp
                with origin <Text fontWeight="bold">{pendingEventOrigin}</Text>
              </Text>
            )}
            {!isPopup && (
              <Text variant="medium" color="text80" marginTop="4">
                Sign in to your <Text color="text100">{PROJECT_NAME}</Text> wallet
              </Text>
            )}
          </Box>

          <Card marginTop="4" paddingBottom="4">
            {!emailAuthInProgress && (
              <>
                <Box justifyContent="center">
                  <Text variant="medium" color="text100">
                    Sign in with social login
                  </Text>
                </Box>
                <Box
                  flexDirection="row"
                  gap="2"
                  marginY="5"
                  justifyContent="center"
                  alignItems="center"
                  height={BUTTON_SIZE}
                >
                  {isSocialLoginInProgress ? (
                    <Spinner size="md" />
                  ) : (
                    <>
                      {GOOGLE_CLIENT_ID && (
                        <GoogleOAuthProvider clientId={googleClientId}>
                          <Card
                            clickable
                            background="transparent"
                            borderRadius="xs"
                            padding="0"
                            width={BUTTON_SIZE}
                            height={BUTTON_SIZE}
                            position="relative"
                          >
                            <Box
                              width="full"
                              height="full"
                              overflow="hidden"
                              borderRadius="sm"
                              alignItems="center"
                              justifyContent="center"
                              style={{ opacity: 0.0000001, transform: 'scale(1.4)' }}
                            >
                              <GoogleLogin
                                type="icon"
                                size="large"
                                width="56"
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed')
                                  setIsSocialLoginInProgress(false)
                                }}
                              />
                            </Box>
                            <Box
                              background="backgroundSecondary"
                              borderRadius="xs"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              position="absolute"
                              pointerEvents="none"
                              width="full"
                              height="full"
                              top="0"
                              right="0"
                            >
                              <Box as={GoogleLogo} width={ICON_SIZE} height={ICON_SIZE} />
                            </Box>
                          </Card>
                        </GoogleOAuthProvider>
                      )}

                      {APPLE_CLIENT_ID && (
                        <Card
                          clickable
                          background="transparent"
                          borderRadius="xs"
                          padding="0"
                          width={BUTTON_SIZE}
                          height={BUTTON_SIZE}
                          position="relative"
                          onClick={handleAppleLogin}
                        >
                          <Box
                            background="backgroundSecondary"
                            borderRadius="xs"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="full"
                            height="full"
                          >
                            <Box as={AppleLogo} width={ICON_SIZE} height={ICON_SIZE} />
                          </Box>
                        </Card>
                      )}
                    </>
                  )}
                </Box>
                <Box position="relative" width="full">
                  <Divider background="buttonGlass" width="full" />
                </Box>
              </>
            )}

            <Box justifyContent="center">
              <Text variant="medium" color="text100">
                Sign in with email
              </Text>
            </Box>

            {sendChallengeAnswer ? (
              <Box flexDirection="column" marginTop="6" padding="4">
                <Box>
                  <Text variant="normal" color="text80" alignItems="center" justifyContent="center">
                    Enter code received in email.
                  </Text>
                </Box>
                <Box marginTop="4">
                  <PINCodeInput value={code} digits={6} onChange={setCode} />
                </Box>

                <Box gap="2" marginTop="4" alignItems="center" justifyContent="center">
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
                </Box>
              </Box>
            ) : (
              <Box marginTop="2">
                <Text variant="normal" color="text80">
                  Enter your email to receive a code to login and create your wallet.
                </Text>

                <Box flexDirection="row" gap="2">
                  <Box marginTop="4" width="full">
                    <TextInput
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
                      placeholder="hello@example.com"
                      required
                      data-id="loginEmail"
                    />
                    {showEmailWarning && (
                      <Text as="p" variant="small" color="negative" marginY="2">
                        Invalid email address
                      </Text>
                    )}
                  </Box>
                  <Box gap="2" marginTop="4" alignItems="center" justifyContent="center">
                    {emailAuthLoading ? (
                      <Spinner />
                    ) : (
                      <Button
                        variant="primary"
                        shape="circle"
                        disabled={!isEmailValid}
                        leftIcon={ArrowRightIcon}
                        onClick={() => initiateEmailAuth(email)}
                        data-id="continueButton"
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Card>
        </Box>
      </Box>

      {isEmailConflictModalOpen && emailConflictInfo && (
        <Modal size="small" onClose={() => setIsEmailConflictModalOpen(false)}>
          <EmailConflictWarning
            info={emailConflictInfo}
            onCancel={() => {
              setIsEmailConflictModalOpen(false)
              setEmailConflictInfo(undefined)
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
    </Box>
  )
}
