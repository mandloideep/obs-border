/**
 * Socials Overlay Configurator
 * Visual configuration UI for social media overlay parameters
 */

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ConfigLayout } from '../../components/configure/ConfigLayout'
import { URLGenerator } from '../../components/configure/URLGenerator'
import { CollapsibleSection } from '../../components/configure/form/CollapsibleSection'
import { NumberSlider } from '../../components/configure/form/NumberSlider'
import { ColorArrayInput } from '../../components/configure/form/ColorArrayInput'
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'
import { SOCIALS_DEFAULTS } from '../../types/socials.types'
import type { SocialsOverlayParams } from '../../types/socials.types'

export const Route = createFileRoute('/configure/socials')({
  component: SocialsConfigurator,
})

function SocialsConfigurator() {
  const [params, setParams] = useState<SocialsOverlayParams>(SOCIALS_DEFAULTS)

  const updateParam = <K extends keyof SocialsOverlayParams>(
    key: K,
    value: SocialsOverlayParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const previewUrl = `${window.location.origin}/overlays/socials?${new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== SOCIALS_DEFAULTS[key as keyof SocialsOverlayParams]) {
        acc[key] = String(value)
      }
      return acc
    }, {} as Record<string, string>)
  ).toString()}`

  const configSections = (
    <>
      {/* Section 1: Platforms */}
      <CollapsibleSection title="Platforms" defaultOpen={true} storageKey="socials-platforms">
        <div>
          <label className="config-label">Show Platforms (comma-separated)</label>
          <input
            className="config-input"
            type="text"
            value={params.show}
            onChange={(e) => updateParam('show', e.target.value)}
            placeholder="e.g., github,twitter,youtube"
          />
          <p className="text-xs text-dark-muted mt-1">
            Available: github, twitter, linkedin, youtube, instagram, twitch, kick, discord, website
          </p>
        </div>

        <div>
          <label className="config-label">Custom Handles (optional)</label>
          <input
            className="config-input"
            type="text"
            value={params.handles}
            onChange={(e) => updateParam('handles', e.target.value)}
            placeholder="e.g., github:user,youtube:@channel"
          />
          <p className="text-xs text-dark-muted mt-1">
            Override default handles: platform:handle,platform:handle
          </p>
        </div>
      </CollapsibleSection>

      {/* Section 2: Platform Ordering (Hidden Parameters) */}
      <CollapsibleSection title="Platform Ordering" defaultOpen={false} storageKey="socials-ordering">
        <div>
          <label className="config-label">Order Mode</label>
          <select
            className="config-select"
            value={params.order}
            onChange={(e) => updateParam('order', e.target.value as any)}
          >
            <option value="default">Default Order</option>
            <option value="priority">Priority Order</option>
          </select>
        </div>

        {params.order === 'priority' && (
          <div>
            <label className="config-label">Platform Priority</label>
            <input
              className="config-input"
              type="text"
              value={params.priority}
              onChange={(e) => updateParam('priority', e.target.value)}
              placeholder="e.g., youtube:1,github:2,twitter:3"
            />
            <p className="text-xs text-dark-muted mt-1">
              Set priority: platform:rank,platform:rank (lower rank appears first)
            </p>
          </div>
        )}
      </CollapsibleSection>

      {/* Section 3: Layout */}
      <CollapsibleSection title="Layout" defaultOpen={true} storageKey="socials-layout">
        <div>
          <label className="config-label">Layout Direction</label>
          <select
            className="config-select"
            value={params.layout}
            onChange={(e) => updateParam('layout', e.target.value as any)}
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
            <option value="grid">Grid</option>
          </select>
        </div>

        <div>
          <label className="config-label">Size Preset</label>
          <select
            className="config-select"
            value={params.size}
            onChange={(e) => updateParam('size', e.target.value as any)}
          >
            <option value="sm">Small (icon: 20px, text: 13px)</option>
            <option value="md">Medium (icon: 24px, text: 15px)</option>
            <option value="lg">Large (icon: 32px, text: 18px)</option>
            <option value="xl">Extra Large (icon: 40px, text: 22px)</option>
          </select>
        </div>

        <NumberSlider
          label="Gap Between Items"
          value={params.gap}
          onChange={(val) => updateParam('gap', val)}
          min={0}
          max={100}
          unit="px"
          help="Spacing between platform items"
        />

        <div className="flex items-center justify-between">
          <Label htmlFor="showtext">Show Platform Handles</Label>
          <Switch
            id="showtext"
            checked={params.showtext}
            onCheckedChange={(checked) => updateParam('showtext', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="bg">Show Background Panels</Label>
          <Switch
            id="bg"
            checked={params.bg}
            onCheckedChange={(checked) => updateParam('bg', checked)}
          />
        </div>

        {params.bg && (
          <NumberSlider
            label="Border Radius"
            value={params.borderradius}
            onChange={(val) => updateParam('borderradius', val)}
            min={0}
            max={32}
            unit="px"
            help="Corner radius for background panels"
          />
        )}
      </CollapsibleSection>

      {/* Section 4: Icon Customization (Hidden Parameters) */}
      <CollapsibleSection title="Icon Customization" defaultOpen={false} storageKey="socials-icons">
        <div>
          <label className="config-label">Icon Color Mode</label>
          <select
            className="config-select"
            value={params.iconcolor}
            onChange={(e) => updateParam('iconcolor', e.target.value as any)}
          >
            <option value="brand">Brand Colors (each platform's color)</option>
            <option value="platform">Platform Colors</option>
            <option value="gradient">Gradient</option>
            <option value="white">White</option>
          </select>
        </div>

        <NumberSlider
          label="Icon Size Override"
          value={params.iconsize}
          onChange={(val) => updateParam('iconsize', val)}
          min={0}
          max={64}
          unit="px"
          help="0 = use size preset, otherwise custom size"
        />

        <NumberSlider
          label="Icon Padding"
          value={params.iconpadding}
          onChange={(val) => updateParam('iconpadding', val)}
          min={0}
          max={32}
          unit="px"
          help="Padding around icons"
        />

        <div>
          <label className="config-label">Custom Icons</label>
          <input
            className="config-input"
            type="text"
            value={params.icons}
            onChange={(e) => updateParam('icons', e.target.value)}
            placeholder="e.g., github:star,twitter:bird"
          />
          <p className="text-xs text-dark-muted mt-1">
            Override icons: platform:iconname,platform:iconname (Lucide icon names)
          </p>
        </div>
      </CollapsibleSection>

      {/* Section 5: Text Styling (Hidden Parameters) */}
      <CollapsibleSection title="Text Styling" defaultOpen={false} storageKey="socials-text">
        <NumberSlider
          label="Font Size Override"
          value={params.fontsize}
          onChange={(val) => updateParam('fontsize', val)}
          min={0}
          max={32}
          unit="px"
          help="0 = use size preset, otherwise custom size"
        />

        <NumberSlider
          label="Font Weight"
          value={params.fontweight}
          onChange={(val) => updateParam('fontweight', val)}
          min={100}
          max={900}
          step={100}
          help="Boldness of text (400 = normal, 700 = bold)"
        />

        <NumberSlider
          label="Letter Spacing"
          value={params.letterspacing}
          onChange={(val) => updateParam('letterspacing', val)}
          min={-2}
          max={4}
          step={0.1}
          unit="px"
          help="Space between letters"
        />
      </CollapsibleSection>

      {/* Section 6: Entrance Animation */}
      <CollapsibleSection title="Entrance Animation" defaultOpen={false} storageKey="socials-entrance">
        <div>
          <label className="config-label">Animation Type</label>
          <select
            className="config-select"
            value={params.entrance}
            onChange={(e) => updateParam('entrance', e.target.value as any)}
          >
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="slideUp">Slide Up</option>
            <option value="slideDown">Slide Down</option>
            <option value="slideLeft">Slide Left</option>
            <option value="slideRight">Slide Right</option>
            <option value="scale">Scale</option>
            <option value="stagger">Stagger (one by one)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <NumberSlider
            label="Speed"
            value={params.speed}
            onChange={(val) => updateParam('speed', val)}
            min={0.1}
            max={5}
            step={0.1}
            unit="s"
            help="Animation duration"
          />
          <NumberSlider
            label="Delay"
            value={params.delay}
            onChange={(val) => updateParam('delay', val)}
            min={0}
            max={10}
            step={0.1}
            unit="s"
            help="Delay before animation starts"
          />
        </div>
      </CollapsibleSection>

      {/* Section 7: Exit Animation */}
      <CollapsibleSection title="Exit Animation" defaultOpen={false} storageKey="socials-exit">
        <div>
          <label className="config-label">Exit Animation</label>
          <select
            className="config-select"
            value={params.exit}
            onChange={(e) => updateParam('exit', e.target.value as any)}
          >
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="slideDown">Slide Down</option>
            <option value="slideUp">Slide Up</option>
            <option value="scale">Scale</option>
          </select>
        </div>

        {params.exit !== 'none' && (
          <div className="grid grid-cols-2 gap-4">
            <NumberSlider
              label="Exit Speed"
              value={params.exitspeed}
              onChange={(val) => updateParam('exitspeed', val)}
              min={0.1}
              max={5}
              step={0.1}
              unit="s"
              help="Duration of exit animation"
            />
            <NumberSlider
              label="Exit After"
              value={params.exitafter}
              onChange={(val) => updateParam('exitafter', val)}
              min={0}
              max={300}
              unit="s"
              help="Auto-exit after N seconds (0 = manual)"
            />
          </div>
        )}
      </CollapsibleSection>

      {/* Section 8: Loop Mode */}
      <CollapsibleSection title="Loop Mode" defaultOpen={false} storageKey="socials-loop">
        <div className="flex items-center justify-between">
          <Label htmlFor="loop">Enable Loop Mode</Label>
          <Switch
            id="loop"
            checked={params.loop}
            onCheckedChange={(checked) => updateParam('loop', checked)}
          />
        </div>
        <p className="text-xs text-dark-muted -mt-2">All appear → hold → all disappear → pause → repeat</p>

        {params.loop && (
          <div className="grid grid-cols-2 gap-4">
            <NumberSlider
              label="Hold Visible"
              value={params.hold}
              onChange={(val) => updateParam('hold', val)}
              min={1}
              max={60}
              unit="s"
              help="How long to stay visible"
            />
            <NumberSlider
              label="Pause Hidden"
              value={params.pause}
              onChange={(val) => updateParam('pause', val)}
              min={0}
              max={60}
              unit="s"
              help="How long to stay hidden"
            />
          </div>
        )}
      </CollapsibleSection>

      {/* Section 9: One-by-One Mode */}
      <CollapsibleSection title="One-by-One Mode" defaultOpen={false} storageKey="socials-onebyone">
        <div className="flex items-center justify-between">
          <Label htmlFor="onebyone">Enable One-by-One Mode</Label>
          <Switch
            id="onebyone"
            checked={params.onebyone}
            onCheckedChange={(checked) => updateParam('onebyone', checked)}
          />
        </div>
        <p className="text-xs text-dark-muted -mt-2">Show one platform at a time (cycle through all)</p>

        {params.onebyone && (
          <div className="grid grid-cols-2 gap-4">
            <NumberSlider
              label="Show Each"
              value={params.each}
              onChange={(val) => updateParam('each', val)}
              min={1}
              max={30}
              unit="s"
              help="Display duration for each platform"
            />
            <NumberSlider
              label="Pause Between"
              value={params.eachpause}
              onChange={(val) => updateParam('eachpause', val)}
              min={0}
              max={10}
              step={0.1}
              unit="s"
              help="Pause between platforms"
            />
          </div>
        )}
      </CollapsibleSection>

      {/* Section 10: Theme & Colors */}
      <CollapsibleSection title="Theme & Colors" defaultOpen={false} storageKey="socials-theme">
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
      overlayTitle="Socials Overlay"
      urlGeneratorComponent={
        <URLGenerator
          overlayPath="/overlays/socials"
          params={params}
          defaults={SOCIALS_DEFAULTS}
        />
      }
    />
  )
}
