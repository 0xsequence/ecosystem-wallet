import { ExtendedConnector } from '@0xsequence/connect'
import { THEME } from '../utils/theme'
import { Text } from '@0xsequence/design-system'

export const ConnectButton = (props: {
  connector: ExtendedConnector
  onConnect: (connector: ExtendedConnector) => void
}) => {
  const { connector, onConnect } = props
  const walletProps = connector._wallet

  const Logo = THEME.mode === 'light' ? walletProps.logoLight : walletProps.logoDark

  return (
    <button
      type="button"
      onClick={() => onConnect(connector)}
      className="flex flex-col gap-1 items-center text-center disabled:cursor-default cursor-pointer hover:opacity-80"
    >
      <span
        className="rounded-sm relative w-full bg-[var(--seq-color-button-glass)] gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3"
        data-component="auth-button"
      >
        <span className="flex items-center gap-2">
          <span className="size-6 items-center flex justify-center">
            <Logo />
          </span>
        </span>
      </span>

      <Text variant="small" color="secondary">
        {walletProps.name}
      </Text>
    </button>
  )
}
