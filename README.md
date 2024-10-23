# Cross App Embedded Wallet

- `./wallet` contains a react app with embedded wallet integration + `walletTransport` that allows it to act as a wallet.
- `.dapp` contains a react demo dapp that uses `@0xsequence/cross-app-embedded-wallet-connector` wagmi connector to use communicate to and use `./wallet` with user permission.

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

### Authentication & Configuration

- `VITE_PROJECT_ACCESS_KEY`: Sequence project access key for authentication
- `VITE_WAAS_CONFIG_KEY`: WaaS (Wallet-as-a-Service) configuration key from sequence.build
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID for social authentication

### Customization

- `VITE_PROJECT_NAME`: Display name for the wallet application
- `VITE_PROJECT_LOGO`: URL to the main logo image
- `VITE_PROJECT_SMALL_LOGO`: URL to a smaller version of the logo, also used for favicon

Create a `.env` file in the `./wallet` directory and copy these variables from `.env.example`, replacing the values as needed for your configuration.
