# Ecosystem Wallet

- `./wallet` contains a react app with embedded wallet integration + `walletTransport` that allows it to act as a wallet.
- `.dapp` contains a react demo dapp that uses [`@0xsequence/cross-app-embedded-wallet-connector`](https://github.com/0xsequence/cross-app-embedded-wallet-connector) wagmi connector to use communicate to and use `./wallet` with user permission.

## Architecture Overview

![Cross App Embedded Wallet Architecture](./docs/architecture.png)

The cross-app embedded wallet implements a communication flow between dApps and the wallet application:

1. The dApp communicates with the wallet through the cross-app embedded wallet connector for Wagmi
2. The connector uses a ProviderTransport to handle communication
3. Messages are sent between the ProviderTransport and WalletTransport
4. The Wallet component handles three main functionalities:
   - User Authentication
   - Transaction Signing
   - Message Signing

The wallet can be opened and send messages back to the dApp through the transport layer, enabling secure cross-application communication.

## Wallet Environment Variables

The wallet application requires the following environment variables to be set:

### Configuration

- `VITE_PROJECT_ACCESS_KEY`: Sequence project access key
- `VITE_WAAS_CONFIG_KEY`: WaaS (Wallet-as-a-Service) configuration key from sequence.build
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID for social authentication
- `VITE_APPLE_CLIENT_ID`: Apple client ID
- `VITE_APPLE_REDIRECT_URI`: Apple redirect URI


### Theme Customization

These environment variables allow you to customize the appearance and content of your project.

#### General Settings

- `VITE_PROJECT_NAME` - Sets the project name, used in page titles.
- `VITE_FAVICON` - Specifies an image for the site favicon.
- `VITE_PROJECT_BASE_THEME` - Sets the base theme for the design system. Options: `dark` (default) or `light`.
- `VITE_PROJECT_HEADER_LOGO` - Specifies the logo used in the header/navigation (top left).
- `VITE_PROJECT_BACKGROUND` - Defines the background image used across the site.
- `VITE_PROJECT_BACKGROUND_MODE` - Determines how the background is displayed. Options: `cover` (default) or `tile` (repeat).
- `VITE_PROJECT_AUTH_LOGO` - Logo to be used on the authentication card.

#### Optional Authentication Screen & Messaging Customization

- `VITE_PROJECT_AUTH_LOGO_SIZE` - Dimensions of the authentication logo in `{width}x{height}` format (e.g., `48x48`).
- `VITE_PROJECT_AUTH_COVER` - A marketing image displayed next to the login methods.
- `VITE_PROJECT_AUTH_TITLE` - A marketing title shown on the authentication screen.
- `VITE_PROJECT_AUTH_MESSAGE` - A marketing message displayed on the authentication screen.
- `VITE_PROJECT_AUTH_MESSAGE_COLOR` - Defines the color of the authentication message. Options: `black` or `white` (default: `white`).
- `VITE_PROJECT_EMPTY_INVENTORY_MESSAGE`** - A message that the user sees when they have no inventory

Create a `.env` file in the `./wallet` directory and copy these variables from `.env.example`, replacing the values as needed for your configuration.

### Discover Section Items

The discover items (apps/games) are configured via the `VITE_DISCOVER_ITEMS` environment variable. To update the items:

1. Add `discover-items.json` with your items under /wallet
2. Run `node stringify-discover-items.cjs`
3. Copy the output into your `.env` file as `VITE_DISCOVER_ITEMS`

The resulting format will be,

```json
[
  {
    "id":"mining-quest",
    "title":"Mining Quest",
    "img":"https://sequence.tor1.digitaloceanspaces.com/n64-pickaxe-mining-game-coverart.jpg",
    "href":"https://arbitrum-game.ecosystem-demo.xyz/",
    "categories":["Games"],
    "description":"Mining Quest is an addictive clicker game where you smash through rocks to uncover valuable treasures, rare gems, and hidden relics! Upgrade your tools, harness powerful boosts, and dig deeper into the depths to uncover legendary artifacts. Can you break through the toughest stones and become the ultimate miner? Start your journey and strike it rich in Mining Quest!"
  }
]
```