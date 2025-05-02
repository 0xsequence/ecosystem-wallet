import { useEffect, useRef } from 'react'

export function usePauseOnScroll(options?: IntersectionObserverInit) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 1) {
          video.pause()
        } else {
          video.play().catch(() => {
            // Playback might fail silently due to autoplay restrictions
          })
        }
      },
      {
        threshold: [0, 1],
        ...options
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return videoRef
}
