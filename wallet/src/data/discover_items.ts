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
    categories: ['clicker'],
    description:
      'Mining Quest is an addictive clicker game where you smash through rocks to uncover valuable treasures, rare gems, and hidden relics! Upgrade your tools, harness powerful boosts, and dig deeper into the depths to uncover legendary artifacts. Can you break through the toughest stones and become the ultimate miner? Start your journey and strike it rich in Mining Quest!'
  },

  {
    id: 'shadow-rift',
    title: 'Shadow Rift',
    description: 'A fast-paced hack-and-slash where you battle ancient creatures in a ruined world.',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/shadow-rift.png',
    href: null
  },
  {
    id: 'neon-striker',
    title: 'Neon Striker',
    description: 'A cyberpunk shooter with high-speed combat and parkour mechanics.',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/neon-striker.png',
    href: null
  },
  {
    id: 'bubble-bouncer',
    title: 'Bubble Bouncer',
    description: 'Tap to bounce bubbles in a relaxing arcade challenge.',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/bubble-bouncer.png'
  },
  {
    id: 'elfin-metaverse',
    title: 'Elfin Metaverse',
    description: 'An all-in-one eSports gaming platform and open-world metaverse built on Elfin Lands',
    img: 'https://sequence.tor1.digitaloceanspaces.com/dapp/elfin-metaverse.png',
    href: 'https://elfinmetaverse.com/'
  },
  {
    id: 'kyo-testnet',
    title: 'Kyo (Testnet)',
    description:
      'Bringing liquidity to All IPs. Configurable pool system accepts not only ERC-20 tokens but all types of on-chain assets including but not limited to ERC-721&1155',
    img: 'zero_hour_tactics.jpg',
    href: 'https://testnet.kyo.finance/swap'
  },
  {
    title: 'Blade Tempest',
    description: 'A rogue-like melee combat game with evolving skill trees.',
    img: 'blade_tempest.jpg',
    href: 'https://example.com/blade-tempest'
  },
  {
    title: 'Dark Horizon',
    description: 'An open-world sci-fi survival game set on an alien planet.',
    img: 'dark_horizon.jpg',
    href: 'https://example.com/dark-horizon'
  },
  {
    title: 'Titan Brawl',
    description: 'A 3v3 real-time battle arena with destructible environments.',
    img: 'titan_brawl.jpg',
    href: 'https://example.com/titan-brawl'
  },
  {
    title: 'Reactor Havoc',
    description: 'A time-based puzzle action game where you stop a meltdown.',
    img: 'reactor_havoc.jpg',
    href: 'https://example.com/reactor-havoc'
  },
  {
    title: 'Quantum Logic',
    description: 'Solve mind-bending quantum puzzles to restore balance to the universe.',
    img: 'quantum_logic.jpg',
    href: 'https://example.com/quantum-logic'
  },
  {
    title: 'HexaGrid',
    description: 'A minimalistic, relaxing hexagon puzzle game with increasing complexity.',
    img: 'hexagrid.jpg',
    href: 'https://example.com/hexagrid'
  },
  {
    title: 'Fractal Fusion',
    description: 'A mesmerizing game where you manipulate fractal patterns.',
    img: 'fractal_fusion.jpg',
    href: 'https://example.com/fractal-fusion'
  },
  {
    title: 'Portal Chains',
    description: 'Use teleportation and physics to connect the right pathways.',
    img: 'portal_chains.jpg',
    href: 'https://example.com/portal-chains'
  },
  {
    title: 'Synapse Link',
    description: 'A neuron-connecting puzzle game that enhances memory skills.',
    img: 'synapse_link.jpg',
    href: 'https://example.com/synapse-link'
  },
  {
    title: 'Code Breaker X',
    description: 'A cryptographic puzzle game where you decode hidden messages.',
    img: 'code_breaker_x.jpg',
    href: 'https://example.com/code-breaker-x'
  },
  {
    title: 'Orbital Shifters',
    description: 'Rotate planetary orbits to align constellations in this space puzzler.',
    img: 'orbital_shifters.jpg',
    href: 'https://example.com/orbital-shifters'
  },
  {
    title: 'Neon Reflex',
    description: 'A fast-paced shape-matching puzzle with electronic beats.',
    img: 'neon_reflex.jpg',
    href: 'https://example.com/neon-reflex'
  }
] as DiscoverItem[]
