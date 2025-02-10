import QrScanner from 'qr-scanner'
import { useEffect, useRef, useState } from 'react'

interface QRScannerProps {
  onScan: (result: string) => void
  onError?: (error: Error) => void
  containerStyle?: React.CSSProperties
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError, containerStyle }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)

  // Keep stable references to the callbacks
  const callbacksRef = useRef({
    onScan,
    onError
  })

  // Update callback refs when props change
  useEffect(() => {
    callbacksRef.current = {
      onScan,
      onError
    }
  }, [onScan, onError])

  // Initialize scanner only once and clean up on unmount
  useEffect(() => {
    if (!videoRef.current || scannerRef.current) return

    const handleScan = (result: QrScanner.ScanResult) => {
      if (result.data.startsWith('wc:')) {
        callbacksRef.current.onScan(result.data)
      }
    }

    const handleError = (error: Error) => {
      console.error('Failed to start scanner:', error)
      callbacksRef.current.onError?.(error)
    }

    // Create scanner instance
    scannerRef.current = new QrScanner(videoRef.current, handleScan, {
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true
    })

    // Start scanning and wait for camera
    scannerRef.current
      .start()
      .then(() => {
        // Add a small delay to ensure camera is fully initialized
        setTimeout(() => setIsCameraReady(true), 300)
      })
      .catch(handleError)

    // Cleanup only on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy()
        scannerRef.current = null
        setIsCameraReady(false)
      }
    }
  }, []) // Empty dependency array - only run on mount/unmount

  return (
    <video
      ref={videoRef}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 'inherit',
        opacity: isCameraReady ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
        ...containerStyle
      }}
    />
  )
}
