export type ThemeProps = {
  css?: string
  name: string
  mode: 'dark' | 'light'
  favicon?: string
  appBackground?: string
  headerLogo?: string
  header: {
    size: { w: number; h: number }
  }
  chains: number[]
  backgroundMode: string
  inventory: {
    empty: string
  }
  auth: {
    welcome: string
    logo: string
    theme: 'dark' | 'light'
    size: { w: number; h: number }
    cover?: string
    color?: string
    title?: string
    message?: string
    methods: {
      primary: string[]
      secondary: string[]
      email: boolean
      guest: boolean
    }
  }
  chainSwitcher?: number[] | number[][]
}

function theme() {
  const css = import.meta.env.VITE_PROJECT_THEME_CSS_VARIABLES

  let chainSwitcher: number[] | number[][] | null = null
  try {
    chainSwitcher = JSON.parse(import.meta.env.VITE_PROJECT_CHAIN_SWITCHER)
  } catch {
    //
  }

  let chains: number[] | null = null
  try {
    chains = JSON.parse(import.meta.env.VITE_PROJECT_CHAINS)
  } catch {
    //
  }

  // const assetPath = import.meta.env.VITE_PROJECT_ASSET_PATH

  const name = import.meta.env.VITE_PROJECT_NAME
  const welcome = import.meta.env.VITE_AUTH_WELCOME_MESSAGE || `Sign in to ${name}`
  const mode = import.meta.env.VITE_PROJECT_BASE_THEME || 'dark'
  const favicon = import.meta.env.VITE_PROJECT_FAVICON || import.meta.env.VITE_PROJECT_SMALL_LOGO

  const headerLogo = import.meta.env.VITE_PROJECT_HEADER_LOGO || import.meta.env.VITE_PROJECT_HEADER_LOGO_DARK
  const appBackground =
    import.meta.env.VITE_PROJECT_BACKGROUND || import.meta.env.VITE_PROJECT_BACKGROUND_DARK
  const backgroundMode = import.meta.env.VITE_PROJECT_BACKGROUND_MODE || 'cover'

  const authTheme = import.meta.env.VITE_PROJECT_AUTH_THEME || 'dark'

  const inventory = {
    empty:
      import.meta.env.VITE_PROJECT_EMPTY_INVENTORY_MESSAGE ||
      'Discover the apps and games to grow your collection'
  }

  const logoSize = import.meta.env.VITE_PROJECT_AUTH_LOGO_SIZE?.split('x') ||
    import.meta.env.VITE_PROJECT_LOGO_SIZE?.split('x') || [80, 80]

  const methods = {
    primary: import.meta.env.VITE_PROJECT_AUTH_METHODS_PRIMARY
      ? import.meta.env.VITE_PROJECT_AUTH_METHODS_PRIMARY.split(',')
      : ['google', 'apple'],
    secondary: import.meta.env.VITE_PROJECT_AUTH_METHODS_SECONDARY
      ? import.meta.env.VITE_PROJECT_AUTH_METHODS_SECONDARY.split(',')
      : [],
    email: import.meta.env.VITE_PROJECT_AUTH_METHODS_EMAIL
      ? import.meta.env.VITE_PROJECT_AUTH_METHODS_EMAIL === 'true'
        ? true
        : false
      : true,
    guest: import.meta.env.VITE_PROJECT_AUTH_METHODS_GUEST
      ? import.meta.env.VITE_PROJECT_AUTH_METHODS_GUEST === 'true'
        ? true
        : false
      : false
  }

  return {
    css,
    name,
    mode,
    chains,
    favicon,
    inventory,
    headerLogo,
    appBackground,
    backgroundMode,
    auth: {
      welcome,
      logo: import.meta.env.VITE_PROJECT_AUTH_LOGO || import.meta.env.VITE_PROJECT_LOGO,
      size: {
        w: logoSize[0] ?? undefined,
        h: logoSize[1] ?? undefined
      },
      methods,
      theme: authTheme,
      cover: import.meta.env.VITE_PROJECT_AUTH_COVER,
      color: import.meta.env.VITE_PROJECT_AUTH_MESSAGE_COLOR || 'white',
      title: import.meta.env.VITE_PROJECT_AUTH_TITLE,
      message: import.meta.env.VITE_PROJECT_AUTH_MESSAGE
    },
    chainSwitcher
  }
}

export const THEME = theme() as ThemeProps
