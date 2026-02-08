/**
 * Exit Animation Component
 * Provides exit animations for overlay elements with callback support
 */

import React, { useEffect, useState, type CSSProperties } from 'react'
import type { ExitAnimation as ExitAnimationType } from '../../types/brand.types'

interface ExitAnimationProps {
  children: React.ReactNode
  type?: ExitAnimationType
  trigger: boolean
  duration?: number
  onComplete?: () => void
  className?: string
}

/**
 * Exit Animation Component
 * Wraps children with exit animation effects
 *
 * @param type - Animation type (fade, slideDown, slideUp, etc.)
 * @param trigger - When true, starts exit animation
 * @param duration - Animation duration in seconds
 * @param onComplete - Callback function called when animation completes
 */
export function ExitAnimation({
  children,
  type = 'fade',
  trigger,
  duration = 0.6,
  onComplete,
  className = '',
}: ExitAnimationProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (trigger && !isExiting) {
      setIsExiting(true)

      // Call onComplete after animation duration
      if (onComplete) {
        const timer = setTimeout(() => {
          onComplete()
        }, duration * 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [trigger, duration, onComplete, isExiting])

  if (type === 'none') {
    return <>{children}</>
  }

  const getAnimationStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
      opacity: 1,
      transform: 'translate(0) scale(1) rotate(0)',
    }

    if (!isExiting) {
      return baseStyle
    }

    // Exiting state
    switch (type) {
      case 'fade':
        return { ...baseStyle, opacity: 0 }

      case 'slideDown':
        return { ...baseStyle, opacity: 0, transform: 'translateY(30px)' }

      case 'slideUp':
        return { ...baseStyle, opacity: 0, transform: 'translateY(-30px)' }

      case 'slideLeft':
        return { ...baseStyle, opacity: 0, transform: 'translateX(-30px)' }

      case 'slideRight':
        return { ...baseStyle, opacity: 0, transform: 'translateX(30px)' }

      case 'fadeLeft':
        return { ...baseStyle, opacity: 0, transform: 'translateX(-50px)' }

      case 'scale':
        return { ...baseStyle, opacity: 0, transform: 'scale(0.9)' }

      case 'zoomOut':
        return { ...baseStyle, opacity: 0, transform: 'scale(0.3)' }

      case 'rotateOut':
        return { ...baseStyle, opacity: 0, transform: 'rotate(180deg) scale(0.5)' }

      case 'flipOut':
        return { ...baseStyle, opacity: 0, transform: 'rotateY(90deg)' }

      default:
        return { ...baseStyle, opacity: 0 }
    }
  }

  return (
    <div className={className} style={getAnimationStyle()}>
      {children}
    </div>
  )
}

/**
 * Hook to manage exit animation with delay
 *
 * @param exitAfter - Delay in seconds before triggering exit (0 = never)
 * @returns shouldExit boolean
 */
export function useDelayedExit(exitAfter: number): boolean {
  const [shouldExit, setShouldExit] = useState(false)

  useEffect(() => {
    if (exitAfter > 0) {
      const timer = setTimeout(() => {
        setShouldExit(true)
      }, exitAfter * 1000)

      return () => clearTimeout(timer)
    }
  }, [exitAfter])

  return shouldExit
}
