export type ThemeProps = {
  name: string
  mode: 'dark' | 'light'
  favicon?: string
  appBackground?: string
  headerLogo?: string
  backgroundMode: string
  css?: string
  inventory: {
    empty: string
  }
  auth: {
    welcome: string
    logo: string
    size: { w: number; h: number }
    cover?: string
    color?: string
    title?: string
    message?: string
  }
}

function theme() {
  const css = import.meta.env.VITE_PROJECT_THEME_CSS_VARIABLES

  // const assetPath = import.meta.env.VITE_PROJECT_ASSET_PATH

  const name = import.meta.env.VITE_PROJECT_NAME
  const welcome = import.meta.env.VITE_AUTH_WELCOME_MESSAGE || `Sign in to ${name}`
  const mode = import.meta.env.VITE_PROJECT_BASE_THEME || 'dark'
  const favicon = import.meta.env.VITE_PROJECT_FAVICON || import.meta.env.VITE_PROJECT_SMALL_LOGO

  const headerLogo = import.meta.env.VITE_PROJECT_HEADER_LOGO || import.meta.env.VITE_PROJECT_HEADER_LOGO_DARK
  const appBackground =
    import.meta.env.VITE_PROJECT_BACKGROUND || import.meta.env.VITE_PROJECT_BACKGROUND_DARK
  const backgroundMode = import.meta.env.VITE_PROJECT_BACKGROUND_MODE || 'cover'

  const inventory = {
    empty:
      import.meta.env.VITE_PROJECT_EMPTY_INVENTORY_MESSAGE ||
      'Discover the apps and games to grow your collection'
  }

  const logoSize = import.meta.env.VITE_PROJECT_AUTH_LOGO_SIZE?.split('x') ||
    import.meta.env.VITE_PROJECT_LOGO_SIZE?.split('x') || [80, 80]

  return {
    css,
    name,
    mode,
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
      cover: import.meta.env.VITE_PROJECT_AUTH_COVER,
      color: import.meta.env.VITE_PROJECT_AUTH_MESSAGE_COLOR || 'white',
      title: import.meta.env.VITE_PROJECT_AUTH_TITLE,
      message: import.meta.env.VITE_PROJECT_AUTH_MESSAGE
    }
  }
}

export const THEME = theme() as ThemeProps
