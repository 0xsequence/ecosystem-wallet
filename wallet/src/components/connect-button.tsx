import { ExtendedConnector, WalletProperties } from '@0xsequence/connect'
import { THEME } from '../utils/theme'
import { Tooltip } from '@0xsequence/design-system'
// import { Text } from '@0xsequence/design-system'

function Logo({ walletProps }: { walletProps: WalletProperties }) {
  const Logo = THEME.mode === 'light' ? walletProps.logoLight : walletProps.logoDark
  console.log(walletProps.id)
  switch (walletProps.id) {
    case 'wallet-connect':
      return <img src="/WalletConnectSquareColorIcon.svg" className="size-8" />
    case 'metamask-wallet':
      return <img src="/MetamaskSquareColorIcon.svg" className="size-8" />
    case 'coinbase-wallet':
      return <img src="/CoinbaseSquareColorIcon.svg" className="size-8" />
    case 'io.rabby':
      return <img src="/RabbySquareColorIcon.svg" className="size-8" />
    case 'me.rainbow':
      return <img src="/RainbowSquareColorIcon.svg" className="size-8" />

    default:
      return <Logo />
  }
}

export const ConnectButton = (props: {
  connector: ExtendedConnector
  onConnect: (connector: ExtendedConnector) => void
}) => {
  const { connector, onConnect } = props
  const walletProps = connector._wallet

  return (
    <Tooltip message={walletProps.name}>
      <button
        type="button"
        onClick={() => onConnect(connector)}
        className="flex flex-col gap-1 items-center text-center disabled:cursor-default cursor-pointer hover:opacity-80"
      >
        <span
          className="rounded-md relative w-full bg-[var(--seq-color-button-glass)] gap-2 items-center text-style-normal font-bold inline-flex justify-center min-h-[3rem] py-2 px-3"
          data-component="auth-button"
        >
          <span className="flex items-center gap-2">
            <span className="size-6 items-center flex justify-center">
              <Logo walletProps={walletProps} />
            </span>
          </span>
        </span>
      </button>
    </Tooltip>
  )
}
