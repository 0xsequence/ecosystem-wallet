type DiscoverItem = {
  id?: string
  title: string
  img: string
  href?: string | null
  description: string
  categories?: string[]
}

export const DISCOVER_ITEMS = [
  {
    id: 'mining-quest',
    title: 'Mining Quest',
    img: 'https://sequence.tor1.digitaloceanspaces.com/n64-pickaxe-mining-game-coverart.jpg',
    href: 'https://mining-quest.pages.dev/',
    categories: ['Games'],
    description:
      'Mining Quest is an addictive clicker game where you smash through rocks to uncover valuable treasures, rare gems, and hidden relics! Upgrade your tools, harness powerful boosts, and dig deeper into the depths to uncover legendary artifacts. Can you break through the toughest stones and become the ultimate miner? Start your journey and strike it rich in Mining Quest!'
  },
  {
    id: 'sonex',
    title: 'Sonex',
    description:
      'Bringing liquidity to All IPs. Configurable pool system accepts not only ERC-20 tokens but all types of on-chain assets including but not limited to ERC-721&1155',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/sonex.png',
    href: 'https://app.sonex.so',
    categories: ['DiFi']
  },
  {
    id: 'tiltplay',
    title: 'Tiltplay',
    description:
      "TiltPlay is a gaming platform where the focus is on fun and skill. It's not about grinding; it's about proving your mastery.",
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/tiltplay.png',
    href: 'https://www.tiltplay.gg/',
    categories: ['Games']
  },
  {
    id: 'elfin-metaverse',
    title: 'Elfin Metaverse',
    description: 'An all-in-one eSports gaming platform and open-world metaverse built on Elfin Lands',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/elfin-metaverse.png',
    href: 'https://elfinmetaverse.com/',
    categories: ['Games']
  },
  {
    id: 'kyo-testnet',
    title: 'Kyo (Testnet)',
    description:
      'Bringing liquidity to All IPs. Configurable pool system accepts not only ERC-20 tokens but all types of on-chain assets including but not limited to ERC-721&1155',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/kyo.png',
    href: 'https://testnet.kyo.finance',
    categories: ['DiFi']
  },

  {
    id: 'spot-zero',
    title: 'Spot Zero',
    description:
      'Spot Zero is a symphony of high fantasy and mechanical ingenuity—a 3D anime-style action role play game. ',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/spotzero.png',
    href: 'https://spotzero.tartagames.com/',
    categories: ['Games']
  },
  {
    id: 'shadow-rift',
    title: 'Shadow Rift',
    description: 'A fast-paced hack-and-slash where you battle ancient creatures in a ruined world.',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/shadow-rift.png',
    categories: ['Coming soon'],

    href: null
  },
  {
    id: 'neon-striker',
    title: 'Neon Striker',
    description: 'A cyberpunk shooter with high-speed combat and parkour mechanics.',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/neon-striker.png',
    categories: ['Coming soon'],

    href: null
  },
  {
    id: 'bubble-bouncer',
    title: 'Bubble Bouncer',
    description: 'Tap to bounce bubbles in a relaxing arcade challenge.',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/bubble-bouncer.png',
    categories: ['Coming soon']
  }
] as DiscoverItem[]
