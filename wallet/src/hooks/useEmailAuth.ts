import { useToast } from '@0xsequence/design-system'
import { Challenge } from '@0xsequence/waas'
import { useEffect, useState } from 'react'

import { sequenceWaas } from '../waasSetup'
import { saveAuthInfo } from '../utils/auth'

export const isAccountAlreadyLinkedError = (e: unknown): boolean => {
  return typeof e === 'object' && e !== null && 'name' in e && e.name === 'AccountAlreadyLinked'
}

export function useEmailAuth({
  onSuccess,
  sessionName,
  linkAccount = false
}: {
  onSuccess: (res: { wallet: string; sessionId: string }) => void
  sessionName: string
  linkAccount?: boolean
}) {
  const toast = useToast()

  const [error, setError] = useState<unknown>()
  const [loading, setLoading] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [respondWithCode, setRespondWithCode] = useState<((code: string) => Promise<void>) | null>()

  const [challenge, setChallenge] = useState<Challenge | undefined>()

  useEffect(() => {
    return sequenceWaas.onEmailAuthCodeRequired(async respondWithCode => {
      setLoading(false)
      setRespondWithCode(() => respondWithCode)
    })
  }, [setLoading, setRespondWithCode])

  const initiateAuth = async (email: string) => {
    setLoading(true)
    setInProgress(true)
    try {
      if (linkAccount) {
        const challenge = await sequenceWaas.initAuth({ email })
        setChallenge(challenge)
        setLoading(false)
      } else {
        const res = await sequenceWaas.signIn({ email }, sessionName)

        saveAuthInfo('email', email)
        onSuccess(res)
      }
    } catch (e: unknown) {
      setError(
        typeof e === 'object' && e !== null && 'message' in e ? (e.message as string) : 'Unknown error'
      )
    } finally {
      if (!linkAccount) {
        setLoading(false)
        setInProgress(false)
      }
    }
  }

  const sendChallengeAnswer = async (answer: string) => {
    if (linkAccount && challenge) {
      try {
        await sequenceWaas.linkAccount(challenge.withAnswer(answer))
      } catch (e) {
        if (isAccountAlreadyLinkedError(e)) {
          toast({
            title: 'Account already linked',
            description: 'This account is already linked to another wallet',
            variant: 'error'
          })
        }
      }
      setLoading(false)
      setInProgress(false)
      return
    }
    if (respondWithCode) {
      try {
        await respondWithCode(answer)
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        toast({
          title: 'Challange code error',
          description: (error as Error).message,
          variant: 'error'
        })
      }
    }
  }

  const cancel = () => {
    setInProgress(false)
    setLoading(false)
    setChallenge(undefined)
    setRespondWithCode(null)
  }

  return {
    inProgress,
    initiateAuth,
    loading,
    error,
    sendChallengeAnswer: inProgress ? sendChallengeAnswer : undefined,
    cancel
  }
}
