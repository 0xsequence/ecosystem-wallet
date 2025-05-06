export type DiscoverItem = {
  id: string
  title: string
  img: string
  href?: string | null
  description: string
  categories?: string[]
  contracts?: string[]
  chains?: string[]
}

function parseDiscoverItems<T>(envVar: string | undefined): T[] {
  if (!envVar) return []
  try {
    const parsed = JSON.parse(envVar)

    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (e) {
    console.error('Failed to parse VITE_DISCOVER_ITEMS:', e)
    return []
  }
}

function parseChainItems<T>(envVar: string | undefined): T | undefined {
  if (!envVar) return undefined
  try {
    const parsed = JSON.parse(envVar)

    return parsed
  } catch (e) {
    console.error('Failed to parse VITE_CHAIN_ITEMS:', e)
    return undefined
  }
}

export type ChainItem = { name: string; icon: string }

export const DISCOVER_CHAINS =
  parseChainItems<Record<string, ChainItem>>(import.meta.env.VITE_DISCOVER_CHAINS) || {}

export const DISCOVER_ITEMS = parseDiscoverItems<DiscoverItem>(
  import.meta.env.VITE_DISCOVER_ITEMS
) as DiscoverItem[]
function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // trim hyphens from start/end
}

export const DISCOVER_CATEGORIES = Array.from(
  DISCOVER_ITEMS.reduce((acc, item) => {
    if (item.categories) {
      item.categories.forEach(category => acc.add(category))
    }
    return acc
  }, new Set<string>())
).map(category => ({
  id: toKebabCase(category),
  name: toKebabCase(category),
  label: category
}))
