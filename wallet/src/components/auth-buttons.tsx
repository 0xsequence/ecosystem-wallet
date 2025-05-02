import { Image, Modal, PasskeyIcon, Spinner, Text } from '@0xsequence/design-system'
import { useAuth } from '../context/AuthContext'
import { AppleAuthButton } from './auth-apple'
import { GoogleAuthButton } from './auth-google'
import { useState } from 'react'
import { THEME } from '../utils/theme'

const Connectors = new Map([
  ['metamask', { title: 'Metamask', name: 'metamask', image: './metamask@2x.png', handler: () => {} }],
  ['rainbow', { title: 'Rainbow', name: 'rainbow', image: './rainbow@2x.png', handler: () => {} }],
  ['rabby', { title: 'Rabby', name: 'rabby', image: './rabby@2x.png', handler: () => {} }],
  ['google', { title: 'Google', name: 'google', Component: GoogleAuthButton }],
  [
    'apple',
    {
      title: 'Apple',
      name: 'apple',
      Component: AppleAuthButton
    }
  ],
  [
    'passkey',
    {
      available: false,
      soonTitle: 'Passkey Authentication',
      soonTagline: 'Arriving soon in Sequence V3',
      title: 'Passkey',
      name: 'passkey',
      Icon: PasskeyIcon,
      handler: () => {}
    }
  ]
])

type AuthButton = {
  name: string
  mode?: 'PRIMARY' | 'SECONDARY'
}

export function AuthButton(props: AuthButton) {
  const { name, mode = 'SECONDARY' } = props

  const { isSocialLoginInProgress, setIsSocialLoginInProgress } = useAuth()
  const [showMessage, setShowMessage] = useState(false)
  if (!Connectors.has(name)) return null

  const { available, handler, title, image, Icon, Component, ...connector } = Connectors.get(name)!

  function clickHandler() {
    if (!available) {
      setShowMessage(true)
      return
    }

    if (handler && typeof handler === 'function') {
      handler()
    }

    setIsSocialLoginInProgress(name)
  }

  if (Component) {
    return <Component mode={mode} />
  }

  return (
    <>
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
              {mode === 'PRIMARY' ? <Text>Continue with {title}</Text> : null}
            </span>
          )}
        </span>
        {/* {mode === 'SECONDARY' ? (
          <Text variant="small" color="secondary">
            {title}
          </Text>
        ) : null} */}
      </button>
      {!available && showMessage ? (
        <Modal scroll={false} autoHeight={true} onClose={() => setShowMessage(false)}>
          <div className="size-full flex items-center justify-center flex-col gap-0.5 aspect-video">
            {Icon ? (
              <span
                className="size-16 flex items-center justify-center
                data-[mode='dark']:bg-gradient-primary
                data-[mode='light']:bg-gradient-primary rounded-full mb-4
                data-[mode='dark']:shadow-[0_2px_64px_0_theme(colors.indigo-300)]
                data-[mode='light']:shadow-[0_2px_64px_0_theme(colors.indigo-300)]"
                data-mode={THEME.auth.theme}
              >
                <Icon className="size-10 data-[mode='light']:text-inverse" data-mode={THEME.auth.theme} />
              </span>
            ) : null}
            <h2 className="text-xl font-semibold max-w-[320px] text-center">{connector.soonTitle}</h2>
            <p className="text-secondary">{connector.soonTagline}</p>
          </div>
        </Modal>
      ) : null}
    </>
  )
}
