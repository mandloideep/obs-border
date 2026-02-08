/**
 * Counter Overlay Configurator
 * Visual configuration UI for counter overlay parameters
 */

import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { ConfigLayout } from '../../components/configure/ConfigLayout'
import { URLGenerator } from '../../components/configure/URLGenerator'
import { CollapsibleSection } from '../../components/configure/form/CollapsibleSection'
import { NumberSlider } from '../../components/configure/form/NumberSlider'
import { ColorArrayInput } from '../../components/configure/form/ColorArrayInput'
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'
import { COUNTER_DEFAULTS } from '../../types/counter.types'
import type { CounterOverlayParams } from '../../types/counter.types'

export const Route = createFileRoute('/configure/counter')({
  component: CounterConfigurator,
})

function CounterConfigurator() {
  const [params, setParams] = useState<CounterOverlayParams>(COUNTER_DEFAULTS)

  const updateParam = <K extends keyof CounterOverlayParams>(
    key: K,
    value: CounterOverlayParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  // API key persistence state
  const [persistApiKeys, setPersistApiKeys] = useState<boolean>(() => {
    return localStorage.getItem('obs-counter-persist-keys') === 'true'
  })

  // Load persisted keys on mount
  useEffect(() => {
    if (persistApiKeys) {
      const savedKey = localStorage.getItem('obs-counter-apikey')
      const savedUserId = localStorage.getItem('obs-counter-userid')
      const savedMetric = localStorage.getItem('obs-counter-metric')

      if (savedKey) updateParam('apikey', savedKey)
      if (savedUserId) updateParam('userid', savedUserId)
      if (savedMetric) updateParam('metric', savedMetric)
    }
  }, []) // Run once on mount

  // Save/clear keys when params or persist toggle changes
  useEffect(() => {
    if (persistApiKeys) {
      // Save to localStorage
      if (params.apikey) localStorage.setItem('obs-counter-apikey', params.apikey)
      if (params.userid) localStorage.setItem('obs-counter-userid', params.userid)
      if (params.metric) localStorage.setItem('obs-counter-metric', params.metric)
      localStorage.setItem('obs-counter-persist-keys', 'true')
    } else {
      // Clear from localStorage
      localStorage.removeItem('obs-counter-apikey')
      localStorage.removeItem('obs-counter-userid')
      localStorage.removeItem('obs-counter-metric')
      localStorage.removeItem('obs-counter-persist-keys')
    }
  }, [params.apikey, params.userid, params.metric, persistApiKeys])

  const handlePersistToggle = (checked: boolean) => {
    setPersistApiKeys(checked)
    if (!checked) {
      // If turning off, immediately clear stored keys
      localStorage.removeItem('obs-counter-apikey')
      localStorage.removeItem('obs-counter-userid')
      localStorage.removeItem('obs-counter-metric')
      localStorage.removeItem('obs-counter-persist-keys')
    }
  }

  // Helper to generate URL with optional param exclusions
  const generateUrl = useCallback((excludeParams: string[] = []) => {
    const searchParams = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        // Skip excluded params
        if (excludeParams.includes(key)) {
          return acc
        }

        // Skip defaults
        if (value !== COUNTER_DEFAULTS[key as keyof CounterOverlayParams]) {
          acc[key] = String(value)
        }
        return acc
      }, {} as Record<string, string>)
    )
    return `${window.location.origin}/overlays/counter?${searchParams.toString()}`
  }, [params])

  // Preview URL: Includes API key for live testing
  const previewUrl = useMemo(() => generateUrl([]), [generateUrl])

  // Fullscreen URL: Excludes API key for security
  const fullscreenUrl = useMemo(() => generateUrl(['apikey']), [generateUrl])

  const configSections = (
    <>
      {/* Section 1: Display */}
      <CollapsibleSection title="Display" defaultOpen={true} storageKey="counter-display">
        <div>
          <label className="config-label">Value</label>
          <input
            className="config-input"
            type="number"
            value={params.value}
            onChange={(e) => updateParam('value', Number(e.target.value))}
            min="0"
          />
          <p className="text-xs text-dark-muted mt-1">
            Current counter value (used when service is "Custom")
          </p>
        </div>

        <div>
          <label className="config-label">Label</label>
          <input
            className="config-input"
            type="text"
            value={params.label}
            onChange={(e) => updateParam('label', e.target.value)}
            placeholder="e.g., Subscribers"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="config-label">Prefix</label>
            <input
              className="config-input"
              type="text"
              value={params.prefix}
              onChange={(e) => updateParam('prefix', e.target.value)}
              placeholder="e.g., $"
            />
          </div>
          <div>
            <label className="config-label">Suffix</label>
            <input
              className="config-input"
              type="text"
              value={params.suffix}
              onChange={(e) => updateParam('suffix', e.target.value)}
              placeholder="e.g., K"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <NumberSlider
            label="Number Size"
            value={params.size}
            onChange={(val) => updateParam('size', val)}
            min={12}
            max={200}
            unit="px"
            help="Font size for the counter number"
          />
          <NumberSlider
            label="Label Size"
            value={params.labelsize}
            onChange={(val) => updateParam('labelsize', val)}
            min={8}
            max={100}
            unit="px"
            help="Font size for the label text"
          />
        </div>
      </CollapsibleSection>

      {/* Section 2: Icon Customization */}
      <CollapsibleSection title="Icon Customization" defaultOpen={true} storageKey="counter-icon">
        <div>
          <label className="config-label">Icon Type</label>
          <select
            className="config-select"
            value={params.icon}
            onChange={(e) => updateParam('icon', e.target.value as any)}
          >
            <option value="none">None</option>
            <option value="star">Star</option>
            <option value="heart">Heart</option>
            <option value="fire">Fire</option>
            <option value="trophy">Trophy</option>
            <option value="users">Users</option>
            <option value="eye">Eye</option>
            <option value="trending">Trending Up</option>
            <option value="zap">Zap / Lightning</option>
          </select>
        </div>

        {params.icon !== 'none' && (
          <div>
            <label className="config-label">Icon Color</label>
            <input
              className="config-input"
              type="text"
              value={params.iconcolor}
              onChange={(e) => updateParam('iconcolor', e.target.value)}
              placeholder="Leave empty for gradient color"
            />
            <p className="text-xs text-dark-muted mt-1">
              Hex color (e.g., FF0000) or leave empty for gradient color
            </p>
          </div>
        )}
      </CollapsibleSection>

      {/* Section 3: Layout */}
      <CollapsibleSection title="Layout" defaultOpen={false} storageKey="counter-layout">
        <div>
          <label className="config-label">Layout Style</label>
          <select
            className="config-select"
            value={params.layout}
            onChange={(e) => updateParam('layout', e.target.value as any)}
          >
            <option value="stack">Stack (vertical)</option>
            <option value="inline">Inline (horizontal)</option>
          </select>
        </div>

        <div>
          <label className="config-label">Alignment</label>
          <select
            className="config-select"
            value={params.align}
            onChange={(e) => updateParam('align', e.target.value as any)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <NumberSlider
            label="Padding X"
            value={params.counterpadx}
            onChange={(val) => updateParam('counterpadx', val)}
            min={0}
            max={100}
            unit="px"
            help="Horizontal padding around counter"
          />
          <NumberSlider
            label="Padding Y"
            value={params.counterpady}
            onChange={(val) => updateParam('counterpady', val)}
            min={0}
            max={100}
            unit="px"
            help="Vertical padding around counter"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="config-label">Width</label>
            <input
              className="config-input"
              type="text"
              value={params.width}
              onChange={(e) => updateParam('width', e.target.value)}
              placeholder="auto"
            />
            <p className="text-xs text-dark-muted mt-1">
              CSS width (auto, 200px, 50%, etc.)
            </p>
          </div>
          <div>
            <label className="config-label">Height</label>
            <input
              className="config-input"
              type="text"
              value={params.height}
              onChange={(e) => updateParam('height', e.target.value)}
              placeholder="auto"
            />
            <p className="text-xs text-dark-muted mt-1">
              CSS height (auto, 100px, etc.)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="bg">Show Background Panel</Label>
          <Switch
            id="bg"
            checked={params.bg}
            onCheckedChange={(checked) => updateParam('bg', checked)}
          />
        </div>
      </CollapsibleSection>

      {/* Section 4: Typography */}
      <CollapsibleSection title="Typography" defaultOpen={false} storageKey="counter-typography">
        <div>
          <label className="config-label">Font Family</label>
          <select
            className="config-select"
            value={params.font}
            onChange={(e) => updateParam('font', e.target.value as any)}
          >
            <option value="display">Display (Orbitron)</option>
            <option value="body">Body (Inter)</option>
            <option value="mono">Mono (JetBrains Mono)</option>
            <option value="custom1">Custom Font 1</option>
            <option value="custom2">Custom Font 2</option>
            <option value="custom3">Custom Font 3</option>
            <option value="custom4">Custom Font 4</option>
            <option value="custom5">Custom Font 5</option>
          </select>
        </div>

        <div>
          <label className="config-label">Number Color</label>
          <input
            className="config-input"
            type="text"
            value={params.numbercolor}
            onChange={(e) => updateParam('numbercolor', e.target.value)}
            placeholder="Leave empty for gradient color"
          />
          <p className="text-xs text-dark-muted mt-1">
            Hex color (e.g., FF0000) or leave empty for gradient color
          </p>
        </div>
      </CollapsibleSection>

      {/* Section 5: Number Formatting */}
      <CollapsibleSection title="Number Formatting" defaultOpen={false} storageKey="counter-formatting">
        <div className="flex items-center justify-between">
          <Label htmlFor="separator">Thousands Separator</Label>
          <Switch
            id="separator"
            checked={params.separator}
            onCheckedChange={(checked) => updateParam('separator', checked)}
          />
        </div>
        <p className="text-xs text-dark-muted -mt-2">Format as 1,000 instead of 1000</p>

        <NumberSlider
          label="Decimal Places"
          value={params.decimals}
          onChange={(val) => updateParam('decimals', val)}
          min={0}
          max={3}
          help="Number of decimal places to show"
        />

        <div>
          <label className="config-label">Notation Style</label>
          <select
            className="config-select"
            value={params.notation}
            onChange={(e) => updateParam('notation', e.target.value as any)}
          >
            <option value="standard">Standard (1,234,567)</option>
            <option value="compact">Compact (1.2M)</option>
            <option value="scientific">Scientific (1.23e6)</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="abbreviate">Abbreviate Large Numbers</Label>
          <Switch
            id="abbreviate"
            checked={params.abbreviate}
            onCheckedChange={(checked) => updateParam('abbreviate', checked)}
          />
        </div>
        <p className="text-xs text-dark-muted -mt-2">Display as 1K, 1M, 1B</p>
      </CollapsibleSection>

      {/* Section 6: Animation */}
      <CollapsibleSection title="Animation" defaultOpen={false} storageKey="counter-animation">
        <div className="flex items-center justify-between">
          <Label htmlFor="animate">Animate Count-Up</Label>
          <Switch
            id="animate"
            checked={params.animate}
            onCheckedChange={(checked) => updateParam('animate', checked)}
          />
        </div>
        <p className="text-xs text-dark-muted -mt-2">Animate number changes with smooth counting</p>

        {params.animate && (
          <NumberSlider
            label="Animation Duration"
            value={params.duration}
            onChange={(val) => updateParam('duration', val)}
            min={0.1}
            max={10}
            step={0.1}
            unit="s"
            help="Duration of count-up animation"
          />
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="trend">Show Trend Arrow</Label>
          <Switch
            id="trend"
            checked={params.trend}
            onCheckedChange={(checked) => updateParam('trend', checked)}
          />
        </div>
        <p className="text-xs text-dark-muted -mt-2">Display up/down arrow for value changes</p>

        {params.trend && (
          <div>
            <label className="config-label">Trend Arrow Color</label>
            <input
              className="config-input"
              type="text"
              value={params.trendcolor}
              onChange={(e) => updateParam('trendcolor', e.target.value)}
              placeholder="10b981"
            />
            <p className="text-xs text-dark-muted mt-1">
              Hex color for trend arrow (e.g., 10b981 for green)
            </p>
          </div>
        )}
      </CollapsibleSection>

      {/* Section 7: API Integration */}
      <CollapsibleSection title="API Integration" defaultOpen={false} storageKey="counter-api">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-200 font-medium">⚠️ Security Notice</p>
          <p className="text-xs text-yellow-200/80 mt-2 mb-2">
            <strong>Important:</strong> API keys will be included in the generated URL and visible in:
          </p>
          <ul className="text-xs text-yellow-200/70 ml-4 list-disc space-y-1">
            <li>OBS Browser Source settings (plain text)</li>
            <li>Browser address bar and history</li>
            <li>OBS configuration files</li>
            <li>Screen recordings if you share your OBS setup</li>
          </ul>
          <p className="text-xs text-yellow-200/80 mt-3 mb-2">
            <strong>Best Practices:</strong>
          </p>
          <ul className="text-xs text-yellow-200/70 ml-4 list-disc space-y-1">
            <li>Create separate API keys specifically for streaming</li>
            <li>Use keys with minimal permissions (read-only access only)</li>
            <li>Set expiration dates when possible</li>
            <li>Never use your main account's API credentials</li>
            <li>Rotate keys regularly if you stream frequently</li>
          </ul>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-dark-surface/30 border border-dark-border">
          <div className="flex-1">
            <Label htmlFor="persist-keys" className="text-sm font-medium">
              Remember API credentials on this device
            </Label>
            <p className="text-xs text-dark-muted mt-1">
              Store API key, username, and metric in browser storage. Disable if sharing this computer.
            </p>
          </div>
          <Switch
            id="persist-keys"
            checked={persistApiKeys}
            onCheckedChange={handlePersistToggle}
          />
        </div>

        <div>
          <label className="config-label">Service</label>
          <select
            className="config-select"
            value={params.service}
            onChange={(e) => updateParam('service', e.target.value as any)}
          >
            <option value="custom">Custom (manual value)</option>
            <option value="youtube">YouTube</option>
            <option value="twitch">Twitch</option>
            <option value="github">GitHub</option>
            <option value="poll">Custom API (polling)</option>
          </select>
        </div>

        {params.service !== 'custom' && (
          <>
            <div>
              <label className="config-label">User ID / Username</label>
              <input
                className="config-input"
                type="text"
                value={params.userid}
                onChange={(e) => updateParam('userid', e.target.value)}
                placeholder="Enter username or channel ID"
              />
            </div>

            <div>
              <label className="config-label">API Key</label>
              <input
                className="config-input"
                type="password"
                value={params.apikey}
                onChange={(e) => updateParam('apikey', e.target.value)}
                placeholder="Enter API key (if required)"
              />
              <p className="text-xs text-dark-muted mt-1">
                Required for YouTube and Twitch. GitHub works without API key but has rate limits.
              </p>
            </div>

            <div>
              <label className="config-label">Metric</label>
              <input
                className="config-input"
                type="text"
                value={params.metric}
                onChange={(e) => updateParam('metric', e.target.value)}
                placeholder="e.g., followers, subscribers, stars"
              />
              <p className="text-xs text-dark-muted mt-1">
                Specify which metric to track (service-dependent)
              </p>
            </div>

            {params.service === 'poll' && (
              <>
                <div>
                  <label className="config-label">Custom API URL</label>
                  <input
                    className="config-input"
                    type="text"
                    value={params.poll}
                    onChange={(e) => updateParam('poll', e.target.value)}
                    placeholder="https://api.example.com/stats"
                  />
                </div>

                <div>
                  <label className="config-label">JSON Path</label>
                  <input
                    className="config-input"
                    type="text"
                    value={params.pollkey}
                    onChange={(e) => updateParam('pollkey', e.target.value)}
                    placeholder="e.g., data.count or value"
                  />
                  <p className="text-xs text-dark-muted mt-1">
                    Path to extract value from JSON response (dot notation)
                  </p>
                </div>
              </>
            )}

            <NumberSlider
              label="Poll Rate"
              value={params.pollrate}
              onChange={(val) => updateParam('pollrate', val)}
              min={5}
              max={300}
              unit="s"
              help="How often to fetch new data from API"
            />
          </>
        )}
      </CollapsibleSection>

      {/* Section 8: API Key Setup Guides */}
      <CollapsibleSection title="How to Get API Keys" defaultOpen={false} storageKey="counter-api-guides">
        <p className="text-sm text-dark-muted mb-4">
          Step-by-step instructions for obtaining API keys from each service:
        </p>

        {/* YouTube Guide */}
        <div className="bg-dark-surface/30 border border-dark-border rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-red-400">▶</span> YouTube Data API
          </h4>
          <ol className="text-xs text-dark-muted space-y-2 ml-5 list-decimal">
            <li>
              Go to{' '}
              <a
                href="https://console.cloud.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Google Cloud Console
              </a>
            </li>
            <li>Create a new project (name it "OBS Stream Counter" or similar)</li>
            <li>
              Enable the <strong>YouTube Data API v3</strong> in the API Library
            </li>
            <li>
              Go to <strong>Credentials</strong> → Create Credentials → <strong>API Key</strong>
            </li>
            <li>
              Restrict the key: Application restrictions → <strong>None</strong>, API restrictions →{' '}
              <strong>YouTube Data API v3</strong>
            </li>
            <li>
              Find your Channel ID: YouTube Studio → Settings → Channel → Advanced Settings
            </li>
            <li>
              Metric to use: <code className="bg-dark-bg px-1.5 py-0.5 rounded">subscriberCount</code>
            </li>
          </ol>
        </div>

        {/* Twitch Guide */}
        <div className="bg-dark-surface/30 border border-dark-border rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-purple-400">◆</span> Twitch API
          </h4>
          <ol className="text-xs text-dark-muted space-y-2 ml-5 list-decimal">
            <li>
              Go to{' '}
              <a
                href="https://dev.twitch.tv/console/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Twitch Developer Console
              </a>
            </li>
            <li>Register a new application (name it "OBS Counter")</li>
            <li>
              OAuth Redirect URL: <code className="bg-dark-bg px-1.5 py-0.5 rounded">http://localhost</code>
            </li>
            <li>Category: Broadcasting Suite</li>
            <li>
              Copy the <strong>Client ID</strong> (this is your API key)
            </li>
            <li>
              Get your User ID from{' '}
              <a
                href="https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                this tool
              </a>
            </li>
            <li>
              Metric to use: <code className="bg-dark-bg px-1.5 py-0.5 rounded">followers</code> or{' '}
              <code className="bg-dark-bg px-1.5 py-0.5 rounded">views</code>
            </li>
          </ol>
        </div>

        {/* GitHub Guide */}
        <div className="bg-dark-surface/30 border border-dark-border rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-gray-400">◉</span> GitHub API
          </h4>
          <p className="text-xs text-green-400 mb-3 italic">
            ✓ API key is optional for GitHub (works without, but has lower rate limits)
          </p>
          <ol className="text-xs text-dark-muted space-y-2 ml-5 list-decimal">
            <li>
              (Optional) Go to{' '}
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                GitHub Personal Access Tokens
              </a>
            </li>
            <li>Generate new token (classic)</li>
            <li>
              <strong>No scopes needed</strong> for public data
            </li>
            <li>Your username is your GitHub handle (e.g., "octocat")</li>
            <li>
              Metrics: <code className="bg-dark-bg px-1.5 py-0.5 rounded">followers</code>,{' '}
              <code className="bg-dark-bg px-1.5 py-0.5 rounded">public_repos</code>
            </li>
          </ol>
        </div>

        {/* Custom API Guide */}
        <div className="bg-dark-surface/30 border border-dark-border rounded-lg p-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-cyan-400">⚙</span> Custom API (Polling)
          </h4>
          <p className="text-xs text-dark-muted mb-3">
            For custom endpoints that return JSON data:
          </p>
          <ol className="text-xs text-dark-muted space-y-2 ml-5 list-decimal">
            <li>
              Your API must return JSON (e.g.,{' '}
              <code className="bg-dark-bg px-1.5 py-0.5 rounded">{`{"followers": 1234}`}</code>)
            </li>
            <li>
              Enable CORS headers if calling from OBS browser:{' '}
              <code className="bg-dark-bg px-1.5 py-0.5 rounded">Access-Control-Allow-Origin: *</code>
            </li>
            <li>
              Enter the full URL in <strong>Custom API URL</strong>
            </li>
            <li>
              Set <strong>JSON Path</strong> to extract the value (e.g.,{' '}
              <code className="bg-dark-bg px-1.5 py-0.5 rounded">data.count</code> for nested objects)
            </li>
            <li>Adjust Poll Rate based on your API's rate limits</li>
          </ol>
        </div>
      </CollapsibleSection>

      {/* Section 9: Theme & Colors */}
      <CollapsibleSection title="Theme & Colors" defaultOpen={false} storageKey="counter-theme">
        <div>
          <label className="config-label">Theme</label>
          <select
            className="config-select"
            value={params.theme}
            onChange={(e) => updateParam('theme', e.target.value as any)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="config-label">Gradient Preset</label>
          <select
            className="config-select"
            value={params.gradient}
            onChange={(e) => updateParam('gradient', e.target.value as any)}
          >
            <option value="indigo">Indigo</option>
            <option value="cyan">Cyan</option>
            <option value="sunset">Sunset</option>
            <option value="emerald">Emerald</option>
            <option value="purple">Purple</option>
            <option value="neon">Neon</option>
            <option value="fire">Fire</option>
            <option value="ocean">Ocean</option>
          </select>
        </div>

        <ColorArrayInput
          label="Custom Colors"
          colors={params.colors}
          onChange={(colors) => updateParam('colors', colors)}
          maxColors={5}
        />
      </CollapsibleSection>
    </>
  )

  return (
    <ConfigLayout
      configContent={configSections}
      previewUrl={previewUrl}
      fullscreenUrl={fullscreenUrl}
      overlayTitle="Counter Overlay"
      urlGeneratorComponent={
        <URLGenerator
          overlayPath="/overlays/counter"
          params={params}
          defaults={COUNTER_DEFAULTS}
          sensitiveParams={['apikey']}
        />
      }
    />
  )
}
