/**
 * Overlay Panel Component
 * Background panel with blur, border, and shadow effects
 */

import React, { type CSSProperties } from 'react'
import { useTheme } from '../../hooks/useBrand'

interface OverlayPanelProps {
  children: React.ReactNode
  padding?: number
  borderRadius?: number
  blur?: number
  className?: string
}

/**
 * Overlay Panel
 * Theme-aware background panel with glassmorphism effect
 *
 * @param padding - Internal padding in pixels
 * @param borderRadius - Corner radius in pixels
 * @param blur - Backdrop blur amount in pixels
 */
export function OverlayPanel({
  children,
  padding = 24,
  borderRadius = 14,
  blur = 12,
  className = '',
}: OverlayPanelProps) {
  const theme = useTheme()

  const panelStyle: CSSProperties = {
    backgroundColor: `${theme.surface}e6`, // 90% opacity
    border: `1px solid ${theme.border}`,
    borderRadius: `${borderRadius}px`,
    padding: `${padding}px`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`, // Safari support
    boxShadow: `
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      0 0 0 1px ${theme.border}40
    `,
  }

  return (
    <div style={panelStyle} className={className}>
      {children}
    </div>
  )
}
