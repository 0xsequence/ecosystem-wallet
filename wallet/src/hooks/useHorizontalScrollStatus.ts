import { useEffect, useRef, useState } from 'react'

export function useHorizontalScrollStatus<T extends HTMLElement>() {
  const [canScroll, setCanScroll] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)

  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const checkScroll = () => {
      setCanScroll(el.scrollWidth > el.clientWidth)
      setHasScrolled(el.scrollLeft > 0)
      setHasReachedEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth)
    }

    checkScroll() // Initial check

    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [ref])

  const start = canScroll && !hasScrolled
  const end = canScroll && hasReachedEnd
  const progress = canScroll && hasScrolled && !hasReachedEnd

  const attributes = {
    'data-scroll': canScroll || undefined,
    'data-scroll-start': start || undefined,
    'data-scroll-end': end || undefined,
    'data-scroll-progress': progress || undefined
  }

  return { ref, can: canScroll, attributes, start, end, progress }
}
