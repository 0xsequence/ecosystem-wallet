# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules
  }
})
```

## Theme Customization Environment Variables

These environment variables allow you to customize the appearance and content of your project.

### General Settings

- **`VITE_PROJECT_NAME`** – Sets the project name, used in page titles.
- **`VITE_FAVICON`** – Specifies an image for the site favicon.
- **`VITE_PROJECT_BASE_THEME`** – Sets the base theme for the design system. Options: `dark` (default) or `light`.
- **`VITE_PROJECT_HEADER_LOGO`** – Specifies the logo used in the header/navigation (top left).
- **`VITE_PROJECT_BACKGROUND`** – Defines the background image used across the site.
- **`VITE_PROJECT_BACKGROUND_MODE`** – Determines how the background is displayed. Options: `cover` (default) or `tile` (repeat).
- **`VITE_PROJECT_AUTH_LOGO`** – Logo to be used on the authentication card.

### Optional Authentication Screen & Messaging Customization

- **`VITE_PROJECT_AUTH_LOGO_SIZE`** – Dimensions of the authentication logo in `{width}x{height}` format (e.g., `48x48`).
- **`VITE_PROJECT_AUTH_COVER`** – A marketing image displayed next to the login methods.
- **`VITE_PROJECT_AUTH_TITLE`** – A marketing title shown on the authentication screen.
- **`VITE_PROJECT_AUTH_MESSAGE`** – A marketing message displayed on the authentication screen.
- **`VITE_PROJECT_AUTH_MESSAGE_COLOR`** – Defines the color of the authentication message. Options: `black` or `white` (default: `white`).
- **`VITE_PROJECT_EMPTY_INVENTORY_MESSAGE`** - A message that the user sees when they have no inventory


### Discover Page Content

- **`VITE_DISCOVER_ITEMS`** – A JSON array of objects to populate the discover page.

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
