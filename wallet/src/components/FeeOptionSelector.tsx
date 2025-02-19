import { TokenImage } from '@0xsequence/design-system'
import { ZeroAddress, formatUnits, parseUnits } from 'ethers'
import React from 'react'

import { Alert, AlertProps } from './Alert'

export interface FeeOption {
  token: FeeToken
  to: string
  value: string
  gasLimit: number
}
export interface FeeToken {
  chainId: number
  name: string
  symbol: string
  decimals?: number
  logoURL: string
  contractAddress?: string
  tokenID?: string
}

export interface FeeOptionBalance {
  tokenName: string
  decimals: number
  balance: string
}

export interface FeeOptionSelectorProps {
  txnFeeOptions: FeeOption[]
  feeOptionBalances: FeeOptionBalance[]
  selectedFeeOptionAddress: string | undefined
  setSelectedFeeOptionAddress: (address: string) => void
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
  setSelectedFeeOptionAddress
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
    <div className=" w-full flex flex-col gap-4 text-black bg-black/10 p-4 rounded-xl">
      <h3 className="text-style-md text-[15px]">Select a fee option</h3>

      <div className="flex flex-col gap-4 text-black">
        {sortedOptions.map((option, index) => {
          const isSelected = selectedFeeOptionAddress === (option.token.contractAddress ?? ZeroAddress)
          const balance = feeOptionBalances.find(b => b.tokenName === option.token.name)
          const isSufficient = isBalanceSufficient(
            balance?.balance || '0',
            option.value,
            option.token.decimals || 0
          )
          return (
            <div
              key={index}
              data-selected={isSelected}
              data-nsf={!isSufficient}
              className="cursor-pointer opacity-100 data-nsf:cursor-default data-nsf:opacity-50"
              onClick={() => {
                if (isSufficient) {
                  setSelectedFeeOptionAddress(option.token.contractAddress ?? ZeroAddress)
                  setFeeOptionAlert(undefined)
                } else {
                  setSelectedFeeOptionAddress('')
                  setFeeOptionAlert({
                    title: `Insufficient ${option.token.name} balance`,
                    description: `Please select another fee option or add funds to your wallet.`,
                    variant: 'warning'
                  })
                }
              }}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                  <TokenImage
                    src={option.token.logoURL}
                    symbol={option.token.name}
                    className="size-7 data-nsf:[&>img]:grayscale"
                    data-nsf={!isSufficient}
                  />
                  <div className="flex flex-col">
                    <span className="text-black text-sm font-bold">{option.token.name}</span>

                    <span className="text-style-xs text-seq-grey-600">
                      Fee:{' '}
                      {parseFloat(
                        formatUnits(BigInt(option.value), option.token.decimals || 0)
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 6
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-style-xs">Balance</span>

                  <span>
                    {parseFloat(
                      formatUnits(BigInt(balance?.balance || '0'), option.token.decimals || 0)
                    ).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {feeOptionAlert && (
        <div className="items-end justify-center flex flex-col">
          <Alert
            title={feeOptionAlert.title}
            description={feeOptionAlert.description}
            secondaryDescription={feeOptionAlert.secondaryDescription}
            variant={feeOptionAlert.variant}
          />
        </div>
      )}
    </div>
  )
}
