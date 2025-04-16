import { Text } from '@0xsequence/design-system'

export type TestnetBadgeProps = { isTestnet?: boolean }

export function TestnetBadge(props: TestnetBadgeProps) {
  const { isTestnet } = props
  if (!isTestnet) return null
  return (
    <span className="rounded-full inline-flex px-1.5 py-0.5 bg-background-contrast self-center">
      <Text variant="xsmall" color="muted">
        Testnet
      </Text>
    </span>
  )
}
