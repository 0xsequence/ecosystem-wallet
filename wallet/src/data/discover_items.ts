export type DiscoverItem = {
  id: string
  title: string
  img: string
  href?: string | null
  description: string
  categories?: string[]
  contracts?: string[]
}

function parseDiscoverItems(envVar: string | undefined): DiscoverItem[] {
  if (!envVar) return []
  try {
    console.log(envVar)
    const parsed = JSON.parse(envVar)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (e) {
    console.error('Failed to parse VITE_DISCOVER_ITEMS:', e)
    return []
  }
}

export const DISCOVER_ITEMS = parseDiscoverItems(import.meta.env.VITE_DISCOVER_ITEMS) as DiscoverItem[]
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
