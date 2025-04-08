import * as constants from './constants'

type networkDefinition = {
  authChain?: boolean
  disabled?: boolean // The chain is disabled at 0xSequence scope per env

  wsEnabled?: boolean
  wsUrl?: string

  currencies?: currencyDefinition[]
}

export type currencyDefinition = {
  contractAddress: string
  name: string
  symbol: string
  decimals: number
  imageUrl?: string // Automatically filled for native currencies
  default?: boolean // Default currency for our chains
  group?: CurrencyGroup
}

// Grouping currencies for cross chain purchases
export enum CurrencyGroup {
  NONE = 'none',
  USDC = 'usdc',
  USDC_TESTNET = 'usdc_testnet',
  WETH = 'weth'
}

// Nodes
export const networksMap: Record<number | string, networkDefinition> = {
  // Ethereum
  [constants.ChainId.MAINNET]: {
    currencies: [
      {
        contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        name: 'Ether (Wrapped)',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true,
        group: CurrencyGroup.WETH
      }
    ]
  },
  [constants.ChainId.ROPSTEN]: {},
  [constants.ChainId.RINKEBY]: {
    currencies: [
      {
        contractAddress: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0xc778417e063141139fce010982780140aa0cd5ab',
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18
      }
    ]
  },
  [constants.ChainId.GOERLI]: {
    currencies: [
      {
        contractAddress: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18
      }
    ]
  },
  [constants.ChainId.KOVAN]: {},
  [constants.ChainId.SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC_TESTNET
      }
    ]
  },

  // Polygon
  [constants.ChainId.POLYGON]: {
    currencies: [
      {
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        name: 'Ether (Wrapped)',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true,
        group: CurrencyGroup.WETH
      }
    ]
  },
  [constants.ChainId.POLYGON_MUMBAI]: {
    currencies: [
      {
        contractAddress: '0xe11A86849d99F524cAC3E7A0Ec1241828e332C62',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true,
        group: CurrencyGroup.WETH
      },
      {
        contractAddress: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        name: 'WMATIC',
        symbol: 'WMATIC',
        decimals: 18
      }
    ]
  },
  [constants.ChainId.POLYGON_AMOY]: {
    currencies: [
      {
        contractAddress: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC_TESTNET
      }
    ]
  },
  [constants.ChainId.POLYGON_ZKEVM]: {
    currencies: [
      {
        contractAddress: '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      }
    ]
  },

  // BSC
  [constants.ChainId.BSC]: {
    currencies: [
      {
        contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 18,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true
      },
      {
        contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        name: 'Wrapped BNB',
        symbol: 'WBNB',
        decimals: 18,
        imageUrl: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850'
      }
    ]
  },
  [constants.ChainId.BSC_TESTNET]: {
    currencies: [
      {
        contractAddress: '0x64544969ed7EBf5f083679233325356EbE738930',
        name: 'USDC Token',
        symbol: 'USDC',
        decimals: 18,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true
      }
    ]
  },

  // Optimism
  [constants.ChainId.OPTIMISM]: {
    currencies: [
      {
        contractAddress: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      }
    ]
  },
  [constants.ChainId.OPTIMISM_KOVAN]: {},
  [constants.ChainId.OPTIMISM_GOERLI]: {},
  [constants.ChainId.OPTIMISM_SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC_TESTNET
      }
    ]
  },

  // Arbitrum One
  [constants.ChainId.ARBITRUM]: {
    currencies: [
      {
        contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        name: 'Bridged USDC',
        symbol: 'USDC.e',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true
      },
      {
        contractAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true,
        group: CurrencyGroup.WETH
      }
    ]
  },
  [constants.ChainId.ARBITRUM_GOERLI]: {},
  [constants.ChainId.ARBITRUM_SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC_TESTNET
      }
    ]
  },

  // Arbitrum Nova
  [constants.ChainId.ARBITRUM_NOVA]: {
    currencies: [
      {
        contractAddress: '0x750ba8b76187092B0D1E87E28daaf484d1b5273b',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0x722e8bdd2ce80a4422e880164f2079488e115365',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true
      }
    ]
  },

  // Avalanche
  [constants.ChainId.AVALANCHE]: {
    currencies: [
      {
        contractAddress: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      }
    ]
  },
  [constants.ChainId.AVALANCHE_TESTNET]: {
    currencies: [
      {
        contractAddress: '0x5425890298aed601595a70AB815c96711a31Bc65',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC_TESTNET
      }
    ]
  },

  // Gnosis Chain (XDAI)
  [constants.ChainId.GNOSIS]: {
    currencies: [
      {
        contractAddress: '0xddafbb505ad214d7b80b1f830fccc89b60fb7a83',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true
      }
    ]
  },

  // BASE
  [constants.ChainId.BASE]: {
    currencies: [
      {
        contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0x0555E30da8f98308EdB960aa94C0Db47230d2B9c',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
        imageUrl:
          'https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857',
        default: false
      },
      {
        contractAddress: '0x4200000000000000000000000000000000000006',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true,
        group: CurrencyGroup.WETH
      }
    ]
  },
  [constants.ChainId.BASE_GOERLI]: {},
  [constants.ChainId.BASE_SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC_TESTNET
      },
      {
        contractAddress: '0xd4fa4de9d8f8db39eaf4de9a19bf6910f6b5bd60',
        name: 'USDG',
        symbol: 'USDG',
        decimals: 18,
        default: true
      }
    ]
  },

  // HOMEVERSE
  [constants.ChainId.HOMEVERSE]: {
    currencies: [
      {
        contractAddress: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xd07df0da6e67B31DB33cDE4A6893E06BD87f8a08',
        name: 'Wrapped OAS',
        symbol: 'WOAS',
        decimals: 18,
        default: true
      }
    ]
  },
  [constants.ChainId.HOMEVERSE_TESTNET]: {
    currencies: [
      {
        contractAddress: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
        default: true
      }
    ]
  },

  // Xai
  [constants.ChainId.XAI]: {
    currencies: [
      {
        contractAddress: '0x1E3769Bd5fB2e9e9e7D4ED8667c947661F9A82E3',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      }
    ]
  },
  [constants.ChainId.XAI_SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0xbd8c9bfbb225bff89c7884060338150daa626edb',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      }
    ]
  },

  // XR
  [constants.ChainId.XR_SEPOLIA]: {},

  // TELOS
  [constants.ChainId.TELOS]: {
    currencies: [
      {
        contractAddress: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
        name: 'Wrapped Telos',
        symbol: 'WTLOS',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0x8D97Cea50351Fb4329d591682b148D43a0C3611b',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0xA0fB8cd450c8Fd3a11901876cD5f17eB47C6bc50',
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
        default: true
      }
    ]
  },
  [constants.ChainId.TELOS_TESTNET]: {
    currencies: [
      {
        contractAddress: '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9',
        name: 'Wrapped TLOS',
        symbol: 'WTLOS',
        decimals: 18,
        default: true
      }
    ]
  },
  [constants.ChainId.ETHERLINK]: {},
  [constants.ChainId.ETHERLINK_TESTNET]: {},

  // B3 Sepolia
  [constants.ChainId.B3]: {
    currencies: [
      {
        contractAddress: '0x4FaCAeAB0b044617A94e94a54A8D6644A7f9E41B',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        imageUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        default: true,
        group: CurrencyGroup.USDC
      },
      {
        contractAddress: '0x4200000000000000000000000000000000000006',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        imageUrl:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        default: true,
        group: CurrencyGroup.WETH
      }
    ]
  },
  [constants.ChainId.B3_SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0x79b4c9cebd2c45f7c40d605868af6ac08b8554c2',
        name: 'PEWPEW 💥💥',
        symbol: 'PEWPEW',
        decimals: 18,
        default: true
      }
    ]
  },

  // APE Chain
  [constants.ChainId.APECHAIN]: {
    currencies: [
      {
        contractAddress: '0x48b62137EdfA95a428D35C09E44256a739F6B557',
        name: 'Wrapped ApeCoin',
        symbol: 'WAPE',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xcF800F4948D16F23333508191B1B1591daF70438',
        name: 'Ape ETH',
        symbol: 'ApeETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xA2235d059F80e176D931Ef76b6C51953Eb3fBEf4',
        name: 'Ape USD',
        symbol: 'ApeUSD',
        decimals: 18,
        default: true
      }
    ]
  },
  [constants.ChainId.APECHAIN_TESTNET]: {
    currencies: [
      {
        contractAddress: '0x34b097B133bF3Fe3B7daD0d65E8f18DD5bf1a57B',
        name: 'Wrapped APE',
        symbol: 'wAPE',
        decimals: 18,
        default: true
      }
    ]
  },

  // Blast
  [constants.ChainId.BLAST]: {
    currencies: [
      {
        contractAddress: '0x4300000000000000000000000000000000000004',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xb1a5700fA2358173Fe465e6eA4Ff52E36e88E2ad',
        name: 'Blast',
        symbol: 'BLAST',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0x4300000000000000000000000000000000000003',
        name: 'USDB',
        symbol: 'USDB',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xF7bc58b8D8f97ADC129cfC4c9f45Ce3C0E1D2692',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
        default: true
      },
      {
        contractAddress: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34',
        name: 'USDe',
        symbol: 'USDe',
        decimals: 18,
        default: false
      }
    ]
  },
  [constants.ChainId.BLAST_SEPOLIA]: {
    currencies: [
      {
        contractAddress: '0x4200000000000000000000000000000000000023',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        default: true
      }
    ]
  },

  // Borne
  [constants.ChainId.BORNE_TESTNET]: {},

  // SKALE Nebula
  [constants.ChainId.SKALE_NEBULA]: {
    currencies: [
      {
        contractAddress: '0xaB01BAd2C86e24D371A13eD6367bdCa819589C5D',
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0x7F73B66d4e6e67bCdeaF277b9962addcDabBFC4d',
        name: 'SKL',
        symbol: 'SKL',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xCC205196288B7A26f6D43bBD68AaA98dde97276d',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0x932427E1f1Ea096e2bb05C7dE937d083ddb8Ff83',
        name: 'USDT',
        symbol: 'USDT',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0x64d2EebA8B02f2aB19e2238f1655A8409dB64817',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
        default: true
      }
    ]
  },
  [constants.ChainId.SKALE_NEBULA_TESTNET]: {
    currencies: [
      {
        contractAddress: '0xB07A8a7F534AbCfF942767326e073DC1E8f89536',
        name: 'TestPlayBits',
        symbol: 'TPB',
        decimals: 18,
        default: true
      }
    ]
  },

  // Soneium Minato
  [constants.ChainId.SONEIUM]: {
    currencies: [
      {
        contractAddress: '0xbA9986D2381edf1DA03B0B9c1f8b00dc4AacC369',
        name: 'Bridged USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0x3A337a6adA9d885b6Ad95ec48F9b75f197b5AE35',
        name: 'USDT',
        symbol: 'USDT',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0x0555E30da8f98308EdB960aa94C0Db47230d2B9c',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
        default: true
      }
    ]
  },
  [constants.ChainId.SONEIUM_MINATO]: {
    currencies: [
      {
        contractAddress: '0x5717d6a621aa104b0b4cad32bfe6ad3b659f269e',
        name: 'Wrapped liquid staked Ether 2.0',
        symbol: 'wstETH',
        decimals: 18,
        default: false
      },
      {
        contractAddress: '0x4200000000000000000000000000000000000006',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xe9a198d38483ad727abc8b0b1e16b2d338cf0391',
        name: 'Bridged USDC',
        symbol: 'USDC.e',
        decimals: 6,
        default: true
      }
    ]
  },

  // TOY Testnet
  [constants.ChainId.TOY_TESTNET]: {},

  // Immutable zkEVM
  [constants.ChainId.IMMUTABLE_ZKEVM]: {
    currencies: [
      {
        contractAddress: '0x52A6c53869Ce09a731CD772f245b97A4401d3348',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0x6de8aCC0D406837030CE4dd28e7c08C5a96a30d2',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        default: true
      },
      {
        contractAddress: '0x3A0C2Ba54D6CBd3121F01b96dFd20e99D1696C9D',
        name: 'Wrapped IMX',
        symbol: 'WIMX',
        decimals: 18
      }
    ]
  },
  [constants.ChainId.IMMUTABLE_ZKEVM_TESTNET]: {
    currencies: [
      {
        contractAddress: '0xe13ab8DF93aFa68F7C8CAe609C49bDA2a68bfdCE',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xcBD623D30e679656655A34EbBac91F5e2bdEBb63',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0x1CcCa691501174B4A623CeDA58cC8f1a76dc3439',
        name: 'Wrapped IMX',
        symbol: 'WIMX',
        decimals: 18
      }
    ]
  },

  // MONAD_TESTNET
  [constants.ChainId.MONAD_TESTNET]: {
    currencies: [
      {
        contractAddress: '2f7c149069383e5c3491613930e9e20e9aa2a93c',
        name: 'MON',
        symbol: 'MON',
        decimals: 18,
        default: true
      }
    ]
  },

  // The Root Network
  [constants.ChainId.ROOT_NETWORK]: {
    currencies: [
      {
        contractAddress: '0xcCcCCccC00000001000000000000000000000000',
        name: 'ROOT',
        symbol: 'ROOT',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xCCCCcCCc00000002000000000000000000000000',
        name: 'XRP',
        symbol: 'XRP',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xccCcCccC00000464000000000000000000000000',
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xCCcCCcCC00000C64000000000000000000000000',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      }
    ]
  },
  [constants.ChainId.ROOT_NETWORK_PORCINI]: {},

  // HARDHAT TESTNETS
  [constants.ChainId.HARDHAT]: {},
  [constants.ChainId.HARDHAT_2]: {},

  // LAOS
  [constants.ChainId.LAOS]: {},
  [constants.ChainId.LAOS_SIGMA_TESTNET]: {},

  // Moonbeam
  [constants.ChainId.MOONBEAM]: {
    currencies: [
      {
        contractAddress: '0x922D641a426DcFFaeF11680e5358F34d97d112E1',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
        default: true
      },
      {
        contractAddress: '0xab3f0245B83feB11d15AAffeFD7AD465a59817eD',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
        default: true
      },
      {
        contractAddress: '0xFFfffffF7D2B0B761Af01Ca8e25242976ac0aD7D',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        default: true
      }
    ]
  },
  [constants.ChainId.MOONBASE_ALPHA]: {
    currencies: [
      {
        contractAddress: '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080',
        name: 'xcUNIT',
        symbol: 'xcUNIT',
        decimals: 12,
        default: true
      },
      {
        contractAddress: '0xD909178CC99d318e4D46e7E66a972955859670E1',
        name: 'Wrapped ETH',
        symbol: 'WETH',
        decimals: 18,
        default: true
      }
    ]
  },

  // XR1
  [constants.ChainId.XR1]: {},

  // SOMNIA_TESTNET
  [constants.ChainId.SOMNIA_TESTNET]: {},

  // FREQUENCY_TESTNET
  [constants.ChainId.FREQUENCY_TESTNET]: {}
}
