import { UserPreferenceLocalStore } from './pages/InventoryRoutes/types'

export const SEARCH_KEYS = [
  'title',
  'name',
  'symbol',
  'nativeToken.symbol',
  'nativeToken.name',
  'contractInfo.name',
  'contractInfo.symbol',
  'tokenMetadata.name',
  'tokenMetadata.description',
  'tokenMetadata.properties'
]
export const FUSE_OPTIONS = {
  keys: SEARCH_KEYS,
  threshold: 0.3, // Adjust for sensitivity
  includeScore: false,
  ignoreLocation: true // Ignores position relevance (useful for flexible matching)
}

export const localStoreDefaults: {
  favorites: string[]
  watchlist: string[]
  favoriteTokens: string[]
  userPrefs: UserPreferenceLocalStore
  address: string
} = {
  userPrefs: {
    hideBalance: false,
    inventoryDisplayMode: 'grid',
    currency: 'USD'
  },
  watchlist: [],
  favorites: [],
  favoriteTokens: [],
  address: ''
}

export const ERC_1155_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes'
      }
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export const ERC_20_ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export const ERC_721_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
