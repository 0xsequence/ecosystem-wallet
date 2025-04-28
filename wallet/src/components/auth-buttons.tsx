import { Image, PasskeyIcon, Spinner, Text } from '@0xsequence/design-system'
import { useAuth } from '../context/AuthContext'
import { AppleAuthButton } from './auth-apple'
import { GoogleAuthButton } from './auth-google'

const AuthMethods = new Map([
  ['metamask', { title: 'Metamask', name: 'metamask', image: './metamask@2x.png', handler: () => {} }],
  ['rainbow', { title: 'Rainbow', name: 'rainbow', image: './rainbow@2x.png', handler: () => {} }],
  ['rabby', { title: 'Rabby', name: 'rabby', image: './rabby@2x.png', handler: () => {} }],
  ['google', { title: 'Google', name: 'google', Component: GoogleAuthButton, handler: () => {} }],
  [
    'apple',
    {
      title: 'Apple',
      name: 'apple',
      Component: AppleAuthButton
    }
  ],
  ['passkey', { title: 'Passkey', name: 'passkey', Icon: PasskeyIcon, handler: () => {} }]
])

type AuthButton = {
  name: string
  mode?: 'PRIMARY' | 'SECONDARY'
}

export function AuthButton(props: AuthButton) {
  const { name, mode = 'SECONDARY' } = props

  const { isSocialLoginInProgress, setIsSocialLoginInProgress } = useAuth()
  if (!AuthMethods.has(name)) return null

  const { handler, title, image, Icon, Component } = AuthMethods.get(name)!

  function clickHandler() {
    if (handler && typeof handler === 'function') {
      handler()
    }

    setIsSocialLoginInProgress(name)
  }

  if (Component) {
    return <Component mode={mode} />
  }

  return (
    <button
      type="button"
      onClick={clickHandler}
      disabled={!!isSocialLoginInProgress}
      className="flex flex-col gap-1 items-center text-center disabled:cursor-default cursor-pointer hover:opacity-80"
    >
      <span
        className="rounded-sm relative w-full bg-[var(--seq-color-button-glass)] gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3"
        data-component="auth-button"
      >
        {isSocialLoginInProgress === name ? (
          <Spinner size="sm" />
        ) : (
          <span className="flex items-center gap-2">
            <>{Icon ? <Icon /> : <Image src={image} width="48" className="size-7" />}</>
            {mode === 'PRIMARY' ? <Text>Sign in with {title}</Text> : null}
          </span>
        )}
      </span>
      {mode === 'SECONDARY' ? (
        <Text variant="small" color="secondary">
          {title}
        </Text>
      ) : null}
    </button>
  )
}
