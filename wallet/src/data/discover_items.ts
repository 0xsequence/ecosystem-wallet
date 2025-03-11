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
    const parsed = JSON.parse(envVar)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (e) {
    console.error('Failed to parse VITE_DISCOVER_ITEMS:', e)
    return []
  }
}

export const DISCOVER_ITEMS = parseDiscoverItems(import.meta.env.VITE_DISCOVER_ITEMS) as DiscoverItem[]
