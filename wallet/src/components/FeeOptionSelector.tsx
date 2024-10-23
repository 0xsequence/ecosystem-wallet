import { Box, Button, Text } from '@0xsequence/design-system'
import { FeeOption } from '@0xsequence/waas'
import { ZeroAddress, formatUnits, parseUnits } from 'ethers'
import React, { ComponentProps } from 'react'

interface FeeOptionSelectorProps {
  txnFeeOptions: FeeOption[]
  feeOptionBalances: { tokenName: string; decimals: number; balance: string }[]
  selectedFeeOptionAddress: string | undefined
  setSelectedFeeOptionAddress: (address: string) => void
  checkTokenBalancesForFeeOptions: () => void
  isRefreshingBalance: boolean
}

const isBalanceSufficient = (balance: string, fee: string, decimals: number) => {
  const balanceBN = parseUnits(balance, decimals)
  const feeBN = parseUnits(fee, decimals)
  return balanceBN >= feeBN
}

export const FeeOptionSelector: React.FC<FeeOptionSelectorProps> = ({
  txnFeeOptions,
  feeOptionBalances,
  selectedFeeOptionAddress,
  setSelectedFeeOptionAddress,
  checkTokenBalancesForFeeOptions,
  isRefreshingBalance
}) => {
  const [feeOptionAlert, setFeeOptionAlert] = React.useState<AlertProps | undefined>()

  const sortedOptions = [...txnFeeOptions].sort((a, b) => {
    const balanceA = feeOptionBalances.find(balance => balance.tokenName === a.token.name)
    const balanceB = feeOptionBalances.find(balance => balance.tokenName === b.token.name)
    const isSufficientA = balanceA
      ? isBalanceSufficient(balanceA.balance, a.value, a.token.decimals || 0)
      : false
    const isSufficientB = balanceB
      ? isBalanceSufficient(balanceB.balance, b.value, b.token.decimals || 0)
      : false
    return isSufficientA === isSufficientB ? 0 : isSufficientA ? -1 : 1
  })

  return (
    <Box marginY="3" width="full">
      <Text variant="medium" color="text100" fontWeight="bold">
        Select a fee option
      </Text>
      <Box flexDirection="column" marginTop="2" gap="2">
        {sortedOptions.map((option, index) => {
          console.log(option)
          const balance = feeOptionBalances.find(b => b.tokenName === option.token.name)
          const isSufficient = isBalanceSufficient(
            balance?.balance || '0',
            option.value,
            option.token.decimals || 0
          )
          return (
            <Box
              key={index}
              padding="3"
              borderRadius="md"
              background={
                selectedFeeOptionAddress === (option.token.contractAddress ?? ZeroAddress)
                  ? 'gradientBackdrop'
                  : 'backgroundRaised'
              }
              onClick={() => {
                if (isSufficient) {
                  console.log('set selected fee option')
                  setSelectedFeeOptionAddress(option.token.contractAddress ?? ZeroAddress)
                  setFeeOptionAlert(undefined)
                } else {
                  setFeeOptionAlert({
                    title: 'Insufficient balance',
                    description: `You do not have enough balance to pay the fee with ${option.token.name}.`,
                    secondaryDescription: 'Please select another fee option or add funds to your wallet.',
                    variant: 'warning'
                  })
                }
              }}
              cursor={isSufficient ? 'pointer' : 'default'}
              opacity={isSufficient ? '100' : '50'}
            >
              <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Box flexDirection="column">
                  <Text variant="small" color="text100" fontWeight="bold">
                    {option.token.name}
                  </Text>
                  <Text variant="xsmall" color="text80">
                    Fee:{' '}
                    {parseFloat(formatUnits(BigInt(option.value), option.token.decimals || 0)).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 6 }
                    )}
                  </Text>
                </Box>
                <Box flexDirection="column" alignItems="flex-end">
                  <Text variant="xsmall" color="text80">
                    Balance:
                  </Text>
                  <Text variant="xsmall" color="text100">
                    {parseFloat(
                      formatUnits(BigInt(balance?.balance || '0'), option.token.decimals || 0)
                    ).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </Text>
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box marginY="2" alignItems="flex-end" justifyContent="center" flexDirection="column">
        <Button
          size="sm"
          onClick={checkTokenBalancesForFeeOptions}
          label={isRefreshingBalance ? 'Refreshing...' : 'Refresh Balance'}
          disabled={isRefreshingBalance}
        />
        {feeOptionAlert && (
          <Box marginTop="3">
            <Alert
              title={feeOptionAlert.title}
              description={feeOptionAlert.description}
              secondaryDescription={feeOptionAlert.secondaryDescription}
              variant={feeOptionAlert.variant}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export type AlertProps = {
  title: string
  description: string
  secondaryDescription?: string
  variant: 'negative' | 'warning' | 'positive'
  buttonProps?: ComponentProps<typeof Button>
  children?: React.ReactNode
}

export const Alert = ({
  title,
  description,
  secondaryDescription,
  variant,
  buttonProps,
  children
}: AlertProps) => {
  return (
    <Box borderRadius="md" background={variant}>
      <Box
        background="backgroundOverlay"
        borderRadius="md"
        paddingX={{ sm: '4', md: '5' }}
        paddingY="4"
        width="full"
        flexDirection="column"
        gap="3"
      >
        <Box width="full" flexDirection={{ sm: 'column', md: 'row' }} gap="2" justifyContent="space-between">
          <Box flexDirection="column" gap="1">
            <Text variant="normal" color="text100" fontWeight="medium">
              {title}
            </Text>

            <Text variant="normal" color="text50" fontWeight="medium">
              {description}
            </Text>

            {secondaryDescription && (
              <Text variant="normal" color="text80" fontWeight="medium">
                {secondaryDescription}
              </Text>
            )}
          </Box>

          {buttonProps ? (
            <Box background={variant} borderRadius="sm" width={'min'} height={'min'}>
              <Button variant="emphasis" shape="square" flexShrink="0" {...buttonProps} />
            </Box>
          ) : null}
        </Box>

        {children}
      </Box>
    </Box>
  )
}
