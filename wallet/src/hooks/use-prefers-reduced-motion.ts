import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)

    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  return reducedMotion
}
