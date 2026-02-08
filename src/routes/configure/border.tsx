/**
 * Border Overlay Configurator
 * Visual configuration UI for border overlay parameters
 */

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { URLGenerator } from '../../components/configure/URLGenerator'
import { BORDER_DEFAULTS } from '../../types/border.types'
import type { BorderOverlayParams } from '../../types/border.types'
import type { CSSProperties } from 'react'

export const Route = createFileRoute('/configure/border')({
  component: BorderConfigurator,
})

function BorderConfigurator() {
  const [params, setParams] = useState<BorderOverlayParams>(BORDER_DEFAULTS)

  const updateParam = <K extends keyof BorderOverlayParams>(
    key: K,
    value: BorderOverlayParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const containerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  }

  const sectionStyle: CSSProperties = {
    background: 'rgba(30, 30, 40, 0.5)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
  }

  const titleStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: '#fff',
  }

  const fieldStyle: CSSProperties = {
    marginBottom: '1.25rem',
  }

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#9ca3af',
    marginBottom: '0.5rem',
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '0.625rem',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.875rem',
  }

  const selectStyle: CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
  }

  const previewStyle: CSSProperties = {
    position: 'sticky',
    top: '2rem',
  }

  const iframeStyle: CSSProperties = {
    width: '100%',
    height: '400px',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '12px',
    background: '#000',
    marginBottom: '1.5rem',
  }

  // Generate preview URL
  const previewUrl = `${window.location.origin}/overlays/border?${new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== BORDER_DEFAULTS[key as keyof BorderOverlayParams]) {
        acc[key] = String(value)
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()}`

  return (
    <div style={containerStyle}>
      {/* Configuration Form */}
      <div>
        <div style={sectionStyle}>
          <h2 style={titleStyle}>Border Configuration</h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>Shape</label>
            <select
              style={selectStyle}
              value={params.shape}
              onChange={(e) => updateParam('shape', e.target.value as any)}
            >
              <option value="rect">Rectangle</option>
              <option value="circle">Circle</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Style</label>
            <select
              style={selectStyle}
              value={params.style}
              onChange={(e) => updateParam('style', e.target.value as any)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="neon">Neon</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Animation</label>
            <select
              style={selectStyle}
              value={params.animation}
              onChange={(e) => updateParam('animation', e.target.value as any)}
            >
              <option value="none">None</option>
              <option value="dash">Dash</option>
              <option value="rotate">Rotate</option>
              <option value="pulse">Pulse</option>
              <option value="breathe">Breathe</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Gradient</label>
            <select
              style={selectStyle}
              value={params.gradient}
              onChange={(e) => updateParam('gradient', e.target.value as any)}
            >
              <option value="indigo">Indigo</option>
              <option value="cyan">Cyan</option>
              <option value="sunset">Sunset</option>
              <option value="emerald">Emerald</option>
              <option value="neon">Neon</option>
              <option value="fire">Fire</option>
              <option value="ocean">Ocean</option>
              <option value="purple">Purple</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Thickness (px)</label>
            <input
              style={inputStyle}
              type="number"
              value={params.thickness}
              onChange={(e) => updateParam('thickness', Number(e.target.value))}
              min="1"
              max="50"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Speed</label>
            <input
              style={inputStyle}
              type="number"
              value={params.speed}
              onChange={(e) => updateParam('speed', Number(e.target.value))}
              min="0.1"
              max="10"
              step="0.1"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Corner Radius (0-50)</label>
            <input
              style={inputStyle}
              type="number"
              value={params.r}
              onChange={(e) => updateParam('r', Number(e.target.value))}
              min="0"
              max="50"
            />
          </div>
        </div>
      </div>

      {/* Preview & URL Generator */}
      <div style={previewStyle}>
        <div style={sectionStyle}>
          <h3 style={{ ...titleStyle, fontSize: '1.25rem' }}>Live Preview</h3>
          <iframe src={previewUrl} style={iframeStyle} title="Border Preview" />
        </div>

        <URLGenerator
          overlayPath="/overlays/border"
          params={params}
          defaults={BORDER_DEFAULTS}
        />
      </div>
    </div>
  )
}
