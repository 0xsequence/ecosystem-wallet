export type ThemeModeProps = {
  headerLogo?: string
  appBackground?: string
}

export type ThemeProps = {
  name: string
  mode: 'dark' | 'light'
  favicon?: string
  modes: {
    dark: ThemeModeProps
    light: ThemeModeProps
  }
  backgroundMode: string
  inventory: {
    empty: string
  }
  auth: {
    logo: string
    size: { w: number; h: number }
    cover?: string
    color?: string
    title?: string
    message?: string
  }
} & ThemeModeProps

function theme() {
  const name = import.meta.env.VITE_PROJECT_NAME
  const mode = import.meta.env.VITE_PROJECT_BASE_THEME || 'dark'
  const favicon = import.meta.env.VITE_PROJECT_SMALL_LOGO

  const modes = { dark: {}, light: {} }
  modes.dark = {
    headerLogo: import.meta.env.VITE_PROJECT_HEADER_LOGO_DARK,
    appBackground: import.meta.env.VITE_PROJECT_BACKGROUND_DARK
  }

  modes.light = {
    headerLogo: import.meta.env.VITE_PROJECT_HEADER_LOGO,
    appBackground: import.meta.env.VITE_PROJECT_BACKGROUND
  }
  const backgroundMode = import.meta.env.VITE_PROJECT_BACKGROUND_MODE || 'cover'

  const inventory = {
    empty:
      import.meta.env.VITE_PROJECT_EMPTY_INVENTORY_MESSAGE ||
      'Discover the apps and games to grow your collection'
  }

  const logoSize = import.meta.env.VITE_PROJECT_LOGO_SIZE?.split('x') || [80, 80]

  return {
    name,
    mode,
    favicon,
    ...(mode === 'dark' ? modes.dark : modes.light),
    modes,
    inventory,
    backgroundMode,
    auth: {
      logo: import.meta.env.VITE_PROJECT_LOGO,
      size: {
        w: logoSize[0] ?? undefined,
        h: logoSize[1] ?? undefined
      },
      cover: import.meta.env.VITE_PROJECT_AUTH_COVER,
      color: 'dark',
      title: import.meta.env.VITE_PROJECT_AUTH_TITLE,
      message: import.meta.env.VITE_PROJECT_AUTH_MESSAGE
    }
  }
}

console.log(theme())

export const THEME = theme() as ThemeProps
