export type ThemeModeProps = {
  authLogo?: string
  headerLogo?: string
  appBackground?: string
  authCover?: string
}

export type ThemeProps = {
  name: string
  mode: 'dark' | 'light'
  favicon?: string
  modes: {
    dark: ThemeModeProps
    light: ThemeModeProps
  }
  messages: {
    emptyInventory: string
    authTitle?: string
    authMessage?: string
  }
} & ThemeModeProps

function theme() {
  const name = import.meta.env.VITE_PROJECT_NAME
  const mode = import.meta.env.VITE_PROJECT_BASE_THEME || 'dark'
  const favicon = import.meta.env.VITE_PROJECT_SMALL_LOGO

  const modes = { dark: {}, light: {} }
  modes.dark = {
    authLogo: import.meta.env.VITE_PROJECT_LOGO_DARK,
    headerLogo: import.meta.env.VITE_PROJECT_HEADER_LOGO_DARK,
    appBackground: import.meta.env.VITE_PROJECT_BACKGROUND_DARK,
    authCover: import.meta.env.VITE_PROJECT_AUTH_COVER_DARK
  }

  modes.light = {
    authLogo: import.meta.env.VITE_PROJECT_LOGO,
    headerLogo: import.meta.env.VITE_PROJECT_HEADER_LOGO,
    appBackground: import.meta.env.VITE_PROJECT_BACKGROUND,
    authCover: import.meta.env.VITE_PROJECT_AUTH_COVER
  }

  const messages = {
    emptyInventory:
      import.meta.env.VITE_PROJECT_EMPTY_INVENTORY_MESSAGE ||
      'Discover the apps and games to grow your collection',
    authTitle: import.meta.env.VITE_PROJECT_AUTH_TITLE,
    authMessage: import.meta.env.VITE_PROJECT_AUTH_MESSAGE
  }

  return {
    name,
    mode,
    favicon,
    ...(mode === 'dark' ? modes.dark : modes.light),
    modes,
    messages
  }
}

export const THEME = theme() as ThemeProps
