/**
 * Dashboard Home Page
 * Landing page with overlay cards and quick navigation
 */

import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Square,
  Type,
  Hash,
  Megaphone,
  Users,
  ArrowRight,
  Sparkles,
  Palette,
  Zap,
} from 'lucide-react'
import type { CSSProperties, MouseEvent } from 'react'

export const Route = createFileRoute('/')({ component: Dashboard })

interface OverlayCard {
  name: string
  description: string
  icon: React.FC<any>
  configPath: string
  previewPath: string
  color: string
  features: string[]
}

const overlays: OverlayCard[] = [
  {
    name: 'Border',
    description: 'Animated borders with shapes, styles, and effects',
    icon: Square,
    configPath: '/configure/border',
    previewPath: '/overlays/border',
    color: '#6366f1',
    features: ['5 Shapes', '5 Styles', '4 Animations', 'Multicolor'],
  },
  {
    name: 'Text',
    description: 'Name plates, lower thirds, and stream screens',
    icon: Type,
    configPath: '/configure/text',
    previewPath: '/overlays/text',
    color: '#8b5cf6',
    features: ['6 Presets', 'Loop Mode', 'Typewriter', 'Signature Lines'],
  },
  {
    name: 'Counter',
    description: 'Live counters with API polling and animations',
    icon: Hash,
    configPath: '/configure/counter',
    previewPath: '/overlays/counter',
    color: '#ec4899',
    features: ['API Polling', 'Count-up', 'Trend Arrows', '8 Icons'],
  },
  {
    name: 'CTA',
    description: 'Call-to-action overlays with animated icons',
    icon: Megaphone,
    configPath: '/configure/cta',
    previewPath: '/overlays/cta',
    color: '#f59e0b',
    features: ['5 Presets', '7 Icon Anims', 'Loop Mode', 'Decorations'],
  },
  {
    name: 'Socials',
    description: 'Social media links with flexible display modes',
    icon: Users,
    configPath: '/configure/socials',
    previewPath: '/overlays/socials',
    color: '#10b981',
    features: ['9 Platforms', 'Stagger', 'One-by-One', '4 Color Modes'],
  },
]

function Dashboard() {
  const heroStyle: CSSProperties = {
    padding: '4rem 2rem 2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
    borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
  }

  const titleStyle: CSSProperties = {
    fontSize: '3rem',
    fontWeight: 700,
    margin: '0 0 1rem',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const subtitleStyle: CSSProperties = {
    fontSize: '1.25rem',
    color: '#9ca3af',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  }

  const featuresStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
    flexWrap: 'wrap',
  }

  const featureStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#9ca3af',
  }

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  }

  const cardStyle: CSSProperties = {
    background: 'rgba(30, 30, 40, 0.5)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }

  const cardHeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const iconWrapperStyle = (color: string): CSSProperties => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `${color}22`,
    border: `1px solid ${color}44`,
  })

  const cardTitleStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
  }

  const cardDescStyle: CSSProperties = {
    fontSize: '0.95rem',
    color: '#9ca3af',
    lineHeight: 1.5,
    margin: 0,
  }

  const featureListStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  }

  const featureBadgeStyle: CSSProperties = {
    fontSize: '0.75rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '6px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    color: '#a5b4fc',
  }

  const buttonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '8px',
    color: '#a5b4fc',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={titleStyle}>OBS Overlay Toolkit</h1>
        <p style={subtitleStyle}>
          Professional stream overlays with React, TypeScript, and 140+ customizable parameters.
          Configure visually or copy URLs directly to OBS.
        </p>

        <div style={featuresStyle}>
          <div style={featureStyle}>
            <Palette size={16} />
            <span>21 Gradient Presets</span>
          </div>
          <div style={featureStyle}>
            <Zap size={16} />
            <span>60fps Animations</span>
          </div>
          <div style={featureStyle}>
            <Sparkles size={16} />
            <span>Type-Safe Configuration</span>
          </div>
        </div>
      </div>

      {/* Overlay Cards */}
      <div style={gridStyle}>
        {overlays.map((overlay) => (
          <Link
            key={overlay.name}
            to={overlay.configPath}
            style={cardStyle}
            onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderColor = overlay.color
              e.currentTarget.style.boxShadow = `0 8px 24px ${overlay.color}33`
            }}
            onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={cardHeaderStyle}>
              <div style={iconWrapperStyle(overlay.color)}>
                <overlay.icon size={24} color={overlay.color} />
              </div>
              <ArrowRight size={20} color="#9ca3af" />
            </div>

            <div>
              <h2 style={cardTitleStyle}>{overlay.name} Overlay</h2>
              <p style={cardDescStyle}>{overlay.description}</p>
            </div>

            <div style={featureListStyle}>
              {overlay.features.map((feature) => (
                <span key={feature} style={featureBadgeStyle}>
                  {feature}
                </span>
              ))}
            </div>

            <div style={buttonStyle}>
              <span>Configure</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
