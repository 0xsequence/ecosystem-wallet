import { Button, Image, Modal, TokenImage, cn } from '@0xsequence/design-system'
import { ContractVerificationStatus, type NativeTokenBalance, type TokenBalance } from '@0xsequence/indexer'
import { networks, type NetworkMetadata, type ChainId } from '@0xsequence/network'
import { formatUnits } from 'ethers'

import { useAuth } from '../context/AuthContext'

import { useConfig } from '../hooks/useConfig'
import { useTokenBalancesDetails } from '../hooks/useTokenBalancesDetails'

import { NetworkImage } from '../components/NetworkImage'
import { ComponentProps, createContext, useContext, useState } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '../routes'
import { AnimatePresence } from 'framer-motion'

function padArray<T>(arr: T[], item: T, minLength = 12): T[] {
  return arr.concat(Array(Math.max(0, minLength - arr.length)).fill(item))
}

type InventoryContext = {
  showInventoryItem: { contractAddress: string; tokenId?: string } | false
  setShowInventoryItem: (show: { contractAddress: string; tokenId?: string } | false) => void
  contractInfo: (contractAddress: string, tokenId: string) => unknown
  inventoryItems: InventoryItemTypeProps['item'][]
}

const Inventory = createContext<InventoryContext | null>(null)

function useInventory() {
  const context = useContext(Inventory)

  if (!context) {
    console.error('useInventory must be used within a InventoryProvider')
    return null
  }

  return context
}

export const InventoryPage = () => {
  const { hideUnlistedTokens } = useConfig()
  const { address: accountAddress = '' } = useAuth()
  const { data } = useTokenBalancesDetails({
    omitMetadata: false,
    filter: {
      omitNativeBalances: false,
      accountAddresses: accountAddress ? [accountAddress] : [],
      contractStatus: hideUnlistedTokens
        ? ContractVerificationStatus.VERIFIED
        : ContractVerificationStatus.ALL,
      contractWhitelist: [],
      contractBlacklist: []
    }
  })

  // Remove any chains with no balance
  const balances =
    data?.balances
      .filter(balance => balance?.results?.length > 0)
      .flatMap(balance => balance.results)
      .map(item => {
        /* @ts-expect-error WIP */
        const chain = networks[item.chainId] as NetworkMetadata
        return { ...item, chain }
      }) || []

  // Get ERC20 contracts
  const erc20Balances = balances
    .filter(({ balance, contractType }) => contractType === 'ERC20' && balance !== '0')
    .map(item => ({ ...item, inventoryCategory: 'erc20' }))

  // Get ERC721 & ERC1155 contracts
  const collectibleBalances = balances
    .filter(({ balance, contractType }) => ['ERC721', 'ERC1155'].includes(contractType) && balance !== '0')
    .map(item => ({ ...item, inventoryCategory: 'collectable' }))

  // Get native balance
  const nativeBalances = (
    data?.nativeBalances
      .filter(balance => balance.results?.length > 0 && balance.results[0].balance !== '0')
      .flatMap(
        balance =>
          balance.results as (NativeTokenBalance & {
            chainId: ChainId
          })[]
      ) || []
  ).map(balance => {
    const chain = networks[balance.chainId] as NetworkMetadata
    return { ...balance, ...chain, inventoryCategory: 'nativeBalance' }
  })

  // Merge
  let inventoryItems = [
    ...nativeBalances,
    ...erc20Balances,
    ...collectibleBalances
  ] as unknown as InventoryItemTypeProps['item'][]

  const isInventoryEmpty = !inventoryItems?.length

  const [showInventoryItem, setShowInventoryItem] = useState<
    { contractAddress: string; tokenId: string } | false
  >(false)

  if (isInventoryEmpty) {
    return <InventoryEmpty />
  }

  // Create empty inventory slots
  inventoryItems = padArray(inventoryItems, { inventoryCategory: 'empty' }, 12)

  function contractInfo(contractAddress: string, tokenId?: string) {
    const result = inventoryItems.find(item => {
      /* @ts-expect-error WIP */

      if (!item.contractAddress || !item.tokenID) return false
      if (contractAddress && tokenId) {
        /* @ts-expect-error WIP */

        if (item.contractAddress === contractAddress && item.tokenID === tokenId) {
          return item
        }
      }

      if (contractAddress && !tokenId) {
        /* @ts-expect-error WIP */

        if (item.contractAddress === contractAddress) {
          return item
        }
      }
    })

    console.log(result)
    return result
  }

  return (
    /* @ts-expect-error WIP */

    <Inventory.Provider value={{ showInventoryItem, setShowInventoryItem, inventoryItems, contractInfo }}>
      <div className="grid w-full max-w-screen-md grid-cols-2 sm:grid-cols-4 gap-2 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
        {inventoryItems.map((item, index) => (
          /* @ts-expect-error native token overload issue */
          <InventoryItemType key={index} item={item} />
        ))}
      </div>

      <AnimatePresence>
        {showInventoryItem && (
          <Modal scroll={false} onClose={() => setShowInventoryItem(false)} className="bg-white">
            <InventoryItemDetails {...showInventoryItem} />
          </Modal>
        )}
      </AnimatePresence>
    </Inventory.Provider>
  )
}

function InventoryItemDetails({ contractAddress, tokenId }: { contractAddress: string; tokenId: string }) {
  const inventory = useInventory()
  const item = inventory?.contractInfo(contractAddress, tokenId)

  console.log(item)

  if (!item) {
    return null
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-center bg-black/20">
        {/* @ts-expect-error WIP */}
        <Image src={item?.tokenMetadata?.image} className="max-w-[300px]" />
      </div>
      <div className="p-6 flex flex-col gap-1 text-center justify-center">
        <span className="text-seq-grey-500 text-sm font-bold">
          {/* @ts-expect-error WIP */}
          {item?.contractInfo?.extensions?.description}
        </span>
        {/* @ts-expect-error WIP */}
        <span className="text-xl font-bold">{item?.tokenMetadata?.name}</span>
        {/* @ts-expect-error WIP */}
        <span className="text-seq-grey-500 text-sm font-bold">#{item?.tokenID}</span>
        <span className="inline-flex mx-auto items-center gap-2 font-bold text-xs">
          {/* @ts-expect-error WIP */}
          <NetworkImage chainId={item?.chain?.chainId} size="xs" /> {item?.chain?.title}
        </span>
        <Button>Send</Button>
      </div>
    </div>
  )
}

function InventoryEmpty() {
  return (
    <div className="grid w-full max-w-screen-md grid-cols-2 sm:grid-cols-4 gap-1 mx-auto mt-2 sm:mt-18 sm:px-2 p-8 sm:py-0">
      <EmptyInventoryCell />
      <EmptyInventoryCell />
      <EmptyInventoryCell className="hidden sm:block" />
      <EmptyInventoryCell className="hidden sm:block" />
      <EmptyInventoryCell className="hidden sm:block" />
      <div className="col-span-4 py-12 sm:col-span-2 flex flex-col items-center justify-center px-8 sm:py-4 text-center gap-1">
        <span className="font-bold text-style-normal">You have no items</span>
        <p className="font-bold text-style-sm text-seq-grey-100">
          Discover the apps and games of Soneium and grow your collection
        </p>
        <Button asChild size="sm" className="mt-2">
          <Link to={ROUTES.DISCOVER}>Discover</Link>
        </Button>
      </div>
      <EmptyInventoryCell />
      <EmptyInventoryCell />
      <EmptyInventoryCell className="hidden sm:block" />
      <EmptyInventoryCell className="hidden sm:block" />
      <EmptyInventoryCell className="hidden sm:block" />
    </div>
  )
}

type EmptyInventoryCellProps = ComponentProps<'div'>

function EmptyInventoryCell(props: EmptyInventoryCellProps) {
  const { className = '', ...rest } = props

  return <div className={cn('aspect-square bg-black/5 rounded-md', className)} {...rest}></div>
}

type InventoryItemTypeProps =
  | { item: NativeBalanceItemProps & { inventoryCategory: 'nativeBalance' } }
  | { item: TokenBalance & { inventoryCategory: 'erc20' } }
  | { item: TokenBalance & { inventoryCategory: 'collectable' } }
  | { item: { inventoryCategory: 'empty' } }

// function InventoryItemType(props: { item: NativeBalanceItemProps & { inventoryCategory: "nativeBalance" } }): JSX.Element | null;
// function InventoryItemType(props: { item: TokenBalance & { inventoryCategory: "erc20" } }): JSX.Element | null;
// function InventoryItemType(props: { item: TokenBalance & { inventoryCategory: "collectable" } }): JSX.Element | null;
// function InventoryItemType(props: { item: { inventoryCategory: "empty" } }): JSX.Element | null;

// Implementation
function InventoryItemType(props: InventoryItemTypeProps) {
  const { item } = props

  switch (item.inventoryCategory) {
    case 'nativeBalance':
      return <NativeBalanceItem {...item} />
    case 'collectable':
      return <CollectableItem {...item} />
    case 'erc20':
      return <Erc20Item {...item} />
    default:
      return <EmptyInventoryCell />
  }
}

function Erc20Item(props: TokenBalance) {
  const { chainId, balance, contractInfo, contractAddress, tokenID } = props

  return (
    <InventoryItem
      contractAddress={contractAddress}
      tokenId={tokenID}
      className="p-4 flex flex-col items-start gap-3"
    >
      {contractInfo?.logoURI ? (
        <TokenImage src={contractInfo.logoURI} size="lg" withNetwork={chainId} />
      ) : null}
      <div className="flex flex-col flex-1 justify-end">
        {contractInfo?.decimals && contractInfo?.symbol ? (
          <div>
            <span className="text-style-lg font-bold">{formatUnits(balance, contractInfo.decimals)}</span>{' '}
            <span className="text-style-sm">{contractInfo.symbol}</span>
          </div>
        ) : null}
      </div>
    </InventoryItem>
  )
}

function InventoryItem(
  props: { children: React.ReactNode; contractAddress: string; tokenId?: string } & ComponentProps<'button'>
) {
  const { children, contractAddress, tokenId, className = '', ...rest } = props

  const inventory = useInventory()

  return (
    <button
      type="button"
      onClick={() => inventory?.setShowInventoryItem({ contractAddress, tokenId })}
      className={cn('aspect-square  rounded-md overflow-clip bg-black/20 text-black', className)}
      {...rest}
    >
      {children}
    </button>
  )
}

function CollectableItem(props: TokenBalance) {
  const { tokenMetadata, contractAddress, tokenID } = props

  return (
    <InventoryItem contractAddress={contractAddress} tokenId={tokenID}>
      <Image src={tokenMetadata?.image} />
    </InventoryItem>
  )
}

type NativeBalanceItemProps = NativeTokenBalance &
  NetworkMetadata & {
    chainId: ChainId
  }

function NativeBalanceItem({ chainId, title, balance, nativeToken }: NativeBalanceItemProps) {
  const contractAddress = ''
  const tokenID = ''

  return (
    <InventoryItem
      contractAddress={contractAddress}
      tokenId={tokenID}
      className="p-4 flex flex-col items-start gap-3"
    >
      <NetworkImage chainId={chainId} size="lg" />
      <div className="flex flex-col flex-1 justify-end items-start">
        <span className="text-style-normal font-bold text-seq-grey-500">{title}</span>
        <div>
          <span className="text-style-lg font-bold">{formatUnits(balance, nativeToken.decimals)}</span>{' '}
          <span className="text-style-sm">{nativeToken.symbol}</span>
        </div>
      </div>
    </InventoryItem>
  )
}
