/**
 * URL Generator Component
 * Generates OBS-ready URLs from overlay parameters
 * Shows only non-default parameters for clean URLs
 */

import React, { useMemo, useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import type { CSSProperties } from 'react'

interface URLGeneratorProps {
  overlayPath: string
  params: Record<string, any>
  defaults: Record<string, any>
  baseUrl?: string
}

export function URLGenerator({ overlayPath, params, defaults, baseUrl }: URLGeneratorProps) {
  const [copied, setCopied] = useState(false)

  // Generate URL with only non-default parameters
  const url = useMemo(() => {
    const base = baseUrl || window.location.origin
    const searchParams = new URLSearchParams()

    // Only add parameters that differ from defaults
    Object.keys(params).forEach((key) => {
      const value = params[key]
      const defaultValue = defaults[key]

      // Skip if value matches default
      if (JSON.stringify(value) === JSON.stringify(defaultValue)) {
        return
      }

      // Skip empty strings, empty arrays, null, undefined
      if (value === '' || value === null || value === undefined) {
        return
      }
      if (Array.isArray(value) && value.length === 0) {
        return
      }

      // Convert value to string
      let stringValue: string
      if (Array.isArray(value)) {
        stringValue = value.join(',')
      } else if (typeof value === 'boolean') {
        stringValue = value ? 'true' : 'false'
      } else {
        stringValue = String(value)
      }

      searchParams.set(key, stringValue)
    })

    const queryString = searchParams.toString()
    return `${base}${overlayPath}${queryString ? `?${queryString}` : ''}`
  }, [overlayPath, params, defaults, baseUrl])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openPreview = () => {
    window.open(url, '_blank', 'width=1920,height=1080')
  }

  const containerStyle: CSSProperties = {
    background: 'rgba(30, 30, 40, 0.5)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
  }

  const labelStyle: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#9ca3af',
    marginBottom: '0.5rem',
    display: 'block',
  }

  const urlBoxStyle: CSSProperties = {
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '0.85rem',
    color: '#a5b4fc',
    wordBreak: 'break-all',
    fontFamily: 'monospace',
    marginBottom: '1rem',
  }

  const buttonGroupStyle: CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
  }

  const buttonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '8px',
    color: '#a5b4fc',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  const successButtonStyle: CSSProperties = {
    ...buttonStyle,
    background: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    color: '#6ee7b7',
  }

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>OBS Browser Source URL</label>
      <div style={urlBoxStyle}>{url}</div>

      <div style={buttonGroupStyle}>
        <button
          onClick={copyToClipboard}
          style={copied ? successButtonStyle : buttonStyle}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
            }
          }}
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy URL</span>
            </>
          )}
        </button>

        <button
          onClick={openPreview}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
          }}
        >
          <ExternalLink size={16} />
          <span>Preview</span>
        </button>
      </div>
    </div>
  )
}
