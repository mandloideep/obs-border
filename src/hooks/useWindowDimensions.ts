/**
 * Window Dimensions Hook
 * Tracks window dimensions with RAF-throttled resize handling
 */

import { useState, useEffect } from 'react'

export interface WindowDimensions {
  width: number
  height: number
}

/**
 * Hook to track window dimensions with resize handling
 *
 * Uses requestAnimationFrame to throttle resize events to 60fps max,
 * preventing excessive re-renders while maintaining smooth responsiveness.
 *
 * @returns Current window dimensions {width, height}
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowDimensions()
 * // Use width/height for calculations or rendering
 * ```
 */
export function useWindowDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  })

  useEffect(() => {
    let rafId: number | null = null

    const handleResize = () => {
      // If RAF already scheduled, skip this event
      if (rafId !== null) return

      // Schedule update on next animation frame
      rafId = requestAnimationFrame(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
        rafId = null
      })
    }

    // Listen to resize events
    window.addEventListener('resize', handleResize)

    // Initial call to ensure correct dimensions
    handleResize()

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return dimensions
}
