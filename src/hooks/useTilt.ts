import { useRef, useState, useCallback } from 'react'

interface TiltState {
  rotateX: number
  rotateY: number
}

export function useTilt(maxRotation = 10) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxRotation
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxRotation

    setTilt({ rotateX, rotateY })
  }, [maxRotation])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return {
    ref,
    tilt,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
