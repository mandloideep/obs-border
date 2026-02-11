/**
 * Entrance Animation Component
 * Provides entrance animations for overlay elements with configurable timing
 */

import React, { useEffect, useState, type CSSProperties } from 'react'
import type { EntranceAnimation as EntranceAnimationType } from '../../types/brand.types'

interface EntranceAnimationProps {
  children: React.ReactNode
  type?: EntranceAnimationType
  delay?: number
  speed?: number
  className?: string
}

/**
 * Entrance Animation Component
 * Wraps children with entrance animation effects
 *
 * @param type - Animation type (fade, slideUp, slideDown, etc.)
 * @param delay - Initial delay in seconds before animation starts
 * @param speed - Animation duration in seconds
 */
export function EntranceAnimation({
  children,
  type = 'fade',
  delay = 0,
  speed = 0.8,
  className = '',
}: EntranceAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  if (type === 'none') {
    return <>{children}</>
  }

  const getAnimationStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      transition: `all ${speed}s cubic-bezier(0.4, 0, 0.2, 1)`,
    }

    if (!isVisible) {
      switch (type) {
        case 'fade':
          return { ...baseStyle, opacity: 0 }

        case 'slideUp':
          return { ...baseStyle, opacity: 0, transform: 'translateY(30px)' }

        case 'slideDown':
          return { ...baseStyle, opacity: 0, transform: 'translateY(-30px)' }

        case 'slideLeft':
          return { ...baseStyle, opacity: 0, transform: 'translateX(30px)' }

        case 'slideRight':
          return { ...baseStyle, opacity: 0, transform: 'translateX(-30px)' }

        case 'scale':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.9)' }

        case 'bounce':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.8)' }

        case 'flipIn':
          return { ...baseStyle, opacity: 0, transform: 'rotateY(90deg)' }

        case 'zoomBounce':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.5)' }

        case 'rotateIn':
          return { ...baseStyle, opacity: 0, transform: 'rotate(-180deg) scale(0.5)' }

        case 'zoomIn':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.3)' }

        case 'stagger':
          return { ...baseStyle, opacity: 0, transform: 'translateY(20px)' }

        default:
          return { ...baseStyle, opacity: 0 }
      }
    }

    // Visible state - apply bounce effect for certain animations
    const visibleStyle: CSSProperties = {
      ...baseStyle,
      opacity: 1,
      transform: 'translate(0) scale(1) rotate(0)',
    }

    // Add bounce keyframe animation for specific types
    if (type === 'bounce' || type === 'zoomBounce') {
      visibleStyle.animation = `bounce ${speed}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`
    }

    return visibleStyle
  }

  return (
    <div className={className} style={getAnimationStyle()}>
      {children}
    </div>
  )
}

// Export animation keyframes as a CSS string for injection
export const entranceAnimationKeyframes = `
@keyframes bounce {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideUpBounce {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  60% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
`
