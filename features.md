# OBS Overlay Toolkit - Complete Features Documentation

> Comprehensive reference for all 140+ customization parameters, power user features, and implementation roadmap

## Table of Contents

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [Core Components](#core-components)
  - [Border Overlay](#border-overlay)
  - [Text Overlay](#text-overlay)
  - [Counter Overlay](#counter-overlay)
  - [CTA Overlay](#cta-overlay)
  - [Socials Overlay](#socials-overlay)
- [Global Parameters](#global-parameters)
- [Brand Configuration](#brand-configuration)
- [Power User Features](#power-user-features)
- [Missing Features & Roadmap](#missing-features--roadmap)
- [Quick Reference](#quick-reference)
- [Examples](#examples)

---

## Introduction

The OBS Overlay Toolkit is a **client-based customization system** that allows streamers to create professional overlays using URL parameters. All overlays are:

- **Standalone** - Work independently with no server required
- **Customizable** - 140+ URL parameters for precise control
- **Brand-aware** - Use global `brand.js` configuration or URL overrides
- **Performant** - Pure CSS animations, no heavy dependencies

### How It Works

1. Choose an overlay component (border, text, counter, CTA, socials)
2. Configure using the dashboard or direct URL parameters
3. Copy the generated URL
4. Paste into OBS Browser Source
5. Overlays automatically sync with URL changes

---

## Quick Start

### Basic URL Structure

```
https://your-domain.com/[component].html?param1=value1&param2=value2
```

### Simple Examples

**Text overlay with preset:**
```
text.html?preset=brb
```

**Custom text with animation:**
```
text.html?text=Welcome&entrance=slideUp&size=48
```

**Subscriber counter with gradient:**
```
counter.html?value=1234&label=Subscribers&gradient=sunset
```

---

## Core Components

## Border Overlay

**File:** `border.html`
**Purpose:** Animated gradient borders for screen/camera frames

### Complete Parameter Reference

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `shape` | string | `rect` | Border shape | `rect`, `circle` |
| `style` | string | `solid` | Border style | `solid`, `dashed`, `dotted`, `double`, `neon` |
| `animation` | string | `dash` | Animation type | `dash`, `rotate`, `pulse`, `breathe`, `none` |
| `gradient` | string | `indigo` | Gradient preset name | See [Gradient Presets](#gradient-presets) |
| `colors` | string | - | Custom gradient colors (comma-separated hex, no #) | `ff0000,00ff00,0000ff` |
| `random` | boolean | `false` | Randomize gradient on load | `true`, `false` |
| `thickness` | number | `2` | Border width in pixels | `1`-`8` |
| `r` | number | `16` | Corner radius (rect only) | `0`-`50` |
| `speed` | number | `4` | Animation cycle duration (seconds) | `0.5`-`20` |
| `dash` | number | `0.3` | Dash visible portion ratio (0-1) | `0.05`-`1` |
| `glow` | boolean | `true` | Enable glow effect | `true`, `false` |
| `glowsize` | number | `8` | Glow blur radius (pixels) | `2`-`30` |
| `opacity` | number | `0.85` | Overall opacity | `0`-`1` |
| `multicolor` | boolean | `false` | Cycle through all gradients | `true`, `false` |
| `colorshift` | boolean | `false` | Smooth color transitions | `true`, `false` |
| `shiftspeed` | number | `10` | Color cycle duration (seconds) | `5`-`20` |
| `theme` | string | `dark` | Theme mode | `dark`, `light` |

### Animation + Style Combinations

| Style | Animation | Visual Effect |
|-------|-----------|---------------|
| solid | dash | Traveling gradient segment |
| solid | rotate | Rotating gradient fill |
| solid | pulse | Breathing opacity (0.3-1) |
| solid | breathe | Breathing glow intensity |
| dashed | dash | Traveling dashed line pattern |
| dotted | dash | Traveling dotted line pattern |
| double | dash | Dual-line traveling border |
| neon | breathe | Enhanced glow breathing effect |
| neon | pulse | Neon pulsing with heavy glow |

### URL Examples

**Simple gradient border:**
```
border.html?gradient=sunset&thickness=3
```

**Animated circle with neon effect:**
```
border.html?shape=circle&style=neon&animation=breathe&gradient=cyan&glowsize=20
```

**Custom colors with rotation:**
```
border.html?colors=6366f1,8b5cf6,a78bfa&animation=rotate&speed=8
```

**Multicolor cycling border:**
```
border.html?multicolor=true&animation=dash&speed=6&thickness=4
```

---

## Text Overlay

**File:** `text.html`
**Purpose:** Name plates, lower thirds, stream screens (BRB, Starting Soon, etc.)

### Quick Presets

| Preset | Text | Subtitle | Style | Use Case |
|--------|------|----------|-------|----------|
| `brb` | Be Right Back | Stream will resume shortly | Red, centered, scale entrance | Break screen |
| `chatting` | Just Chatting | - | Fade entrance, gradient line | Chat screen |
| `starting` | Starting Soon | Stream begins in a moment... | Green, slide up | Pre-stream |
| `ending` | Thanks for Watching! | See you next time | Fade, gradient line | Post-stream |
| `technical` | Technical Difficulties | Please stand by... | Mono font, dashed line | Issues |
| `custom` | - | - | No preset styling | Full manual control |

### Text Configuration Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `preset` | string | - | Use quick preset | `brb`, `chatting`, `starting`, `ending`, `technical`, `custom` |
| `text` | string | Brand name | Main text content | Any text (URL encoded) |
| `sub` | string | - | Subtitle text | Any text (URL encoded) |
| `size` | number | `32` | Main text font size (px) | `12`-`120` |
| `subsize` | number | `18` | Subtitle font size (px) | `12`-`80` |
| `weight` | number | `600` | Font weight | `300`-`700` |
| `font` | string | `display` | Font family | `display`, `body`, `mono`, `custom1`, `custom2` |
| `align` | string | `left` | Horizontal alignment | `left`, `center`, `right` |
| `valign` | string | `bottom` | Vertical alignment | `top`, `center`, `bottom` |
| `textcolor` | string | - | Override text color (hex, no #) | `ffffff`, `6366f1` |
| `subcolor` | string | - | Override subtitle color (hex, no #) | `9898a8` |
| `textgradient` | boolean | `false` | Apply gradient to text | `true`, `false` |

### Line Decoration Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `line` | boolean | `true` | Show decorative line | `true`, `false` |
| `linestyle` | string | `gradient` | Line style | `solid`, `dashed`, `dotted`, `gradient`, `slant`, `wave`, `swirl`, `bracket` |
| `lineanim` | string | `slide` | Line animation | `slide`, `grow`, `pulse`, `none` |
| `linespeed` | number | `2` | Animation duration (seconds) | `0.5`-`5` |
| `linewidth` | number | `2` | Line thickness (px) | `1`-`4` |
| `linepos` | string | `bottom` | Line position | `top`, `bottom`, `both` |
| `linelength` | number | `100` | Line width (%) | `0`-`100` |

### Entrance Animation Parameters

| Parameter | Type | Default | Description | Available Options |
|-----------|------|---------|-------------|-------------------|
| `entrance` | string | `fade` | Entrance animation | `fade`, `slideUp`, `slideLeft`, `slideDown`, `slideRight`, `scale`, `typewriter`, `flipIn`, `zoomBounce`, `rotateIn`, `none` |
| `entrancespeed` | number | `0.8` | Animation duration (seconds) | `0.3`-`2` |
| `delay` | number | `0.3` | Initial delay (seconds) | `0`-`5` |

### Exit Animation Parameters

| Parameter | Type | Default | Description | Available Options |
|-----------|------|---------|-------------|-------------------|
| `exit` | string | `none` | Exit animation | `none`, `fade`, `slideDown`, `slideUp`, `scale`, `fadeLeft`, `zoomOut`, `rotateOut` |
| `exitafter` | number | `0` | Delay before exit (seconds, 0=never) | `0`-`120` |
| `exitspeed` | number | `0.6` | Exit duration (seconds) | `0.3`-`2` |

### Loop Mode Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `loop` | boolean | `false` | Enable loop mode (appear → hold → disappear → pause → repeat) | `true`, `false` |
| `hold` | number | `4` | Visible duration (seconds) | `1`-`60` |
| `pause` | number | `2` | Hidden duration (seconds) | `0.5`-`60` |

### Layout & Positioning Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `bg` | boolean | `false` | Show background panel | `true`, `false` |
| `pad` | number | `28` | Uniform padding (px) | `0`-`60` |
| `padx` | number | `0` | Horizontal padding override (0=use pad) | `0`-`100` |
| `pady` | number | `0` | Vertical padding override (0=use pad) | `0`-`100` |
| `marginx` | number | `0` | Horizontal margin (px) | `0`-`100` |
| `marginy` | number | `0` | Vertical margin (px) | `0`-`100` |
| `offsetx` | number | `0` | Fine-tune X position (px) | `-100`-`100` |
| `offsety` | number | `0` | Fine-tune Y position (px) | `-100`-`100` |
| `maxwidth` | string | `auto` | Maximum width | `auto`, `500px`, `80vw` |

### Global Style Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `theme` | string | `dark`, `light` |
| `gradient` | string | Gradient preset name |
| `colors` | string | Custom gradient colors |

**Total Text Overlay Parameters: 52**

### URL Examples

**Simple BRB screen:**
```
text.html?preset=brb
```

**Custom lower third:**
```
text.html?text=Deep%20Mandloi&sub=Software%20Engineer&align=left&valign=bottom&bg=true&gradient=cyan
```

**Animated announcement:**
```
text.html?text=New%20Video%20Out!&entrance=zoomBounce&exit=fadeLeft&exitafter=5&line=true&linestyle=wave
```

**Looping message:**
```
text.html?text=Thanks%20for%20watching!&loop=true&hold=3&pause=10&entrance=slideUp&exit=slideDown
```

---

## Counter Overlay

**File:** `counter.html`
**Purpose:** Animated number displays with API integration (subscribers, followers, viewers, etc.)

### Display Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `value` | number | `0` | Counter value to display | Any number |
| `label` | string | `Subscribers` | Label text | `Followers`, `Views`, `Subs` |
| `prefix` | string | - | Text before number | `$`, `#`, `+` |
| `suffix` | string | - | Text after number | `k`, `M`, `%` |
| `icon` | string | `none` | Icon type | `heart`, `star`, `users`, `eye`, `zap`, `fire`, `trophy`, `bell`, `none` |
| `size` | number | `48` | Number font size (px) | `16`-`120` |
| `labelsize` | number | `16` | Label font size (px) | `10`-`40` |
| `font` | string | `mono` | Font family | `mono`, `display`, `body` |
| `layout` | string | `stack` | Layout mode | `stack` (vertical), `inline` (horizontal) |
| `align` | string | `center` | Content alignment | `left`, `center`, `right` |

### Number Formatting Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `separator` | boolean | `true` | Show thousands separator | `true`, `false` |
| `decimals` | number | `0` | Decimal places | `0`-`5` |
| `notation` | string | `standard` | Number notation | `standard`, `compact` (1.2K), `scientific` |
| `abbreviate` | boolean | `false` | Auto-abbreviate large numbers | `true`, `false` |

### Animation Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `animate` | boolean | `true` | Enable count-up animation | `true`, `false` |
| `duration` | number | `2` | Animation duration (seconds) | `1`-`5` |
| `trend` | boolean | `false` | Show trend indicator (↑/↓) | `true`, `false` |
| `trendcolor` | string | `#10b981` | Trend color (hex, no #) | `10b981`, `ef4444` |

### API Integration Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `service` | string | `custom` | API service | `custom`, `youtube`, `twitch`, `github` |
| `apikey` | string | - | API key for service | Service-specific key |
| `userid` | string | - | User/Channel ID | Service-specific ID |
| `metric` | string | `followers` | Metric to fetch | `followers`, `subscriberCount`, `public_repos` |
| `poll` | string | - | Custom JSON endpoint URL | Any valid URL |
| `pollkey` | string | `value` | JSON path to extract value | `items.0.statistics.subscriberCount` |
| `pollrate` | number | `30` | Poll interval (seconds) | `10`-`300` |

### Layout Customization Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `counterpadx` | number | `24` | Horizontal padding (px) | `0`-`50` |
| `counterpady` | number | `24` | Vertical padding (px) | `0`-`50` |
| `width` | string | `auto` | Container width | `auto`, `200px` |
| `height` | string | `auto` | Container height | `auto`, `100px` |
| `iconcolor` | string | - | Override icon color (hex, no #) | `6366f1` |
| `numbercolor` | string | - | Override number color (hex, no #) | `ffffff` |

### Style Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bg` | boolean | Show background panel |
| `theme` | string | `dark`, `light` |
| `gradient` | string | Gradient preset name |

**Total Counter Overlay Parameters: 28**

### API Service Configurations

**YouTube:**
```
counter.html?service=youtube&apikey=YOUR_KEY&userid=CHANNEL_ID&metric=subscriberCount
```

**GitHub:**
```
counter.html?service=github&userid=deepmandloi&metric=followers
```

**Custom API:**
```
counter.html?poll=https://api.example.com/stats&pollkey=data.subscribers&pollrate=60
```

### URL Examples

**Static subscriber count:**
```
counter.html?value=1234&label=Subscribers&icon=users&gradient=indigo
```

**Live follower count (compact notation):**
```
counter.html?value=15420&label=Followers&notation=compact&separator=true&icon=heart
```

**Inline layout with trend:**
```
counter.html?value=999&label=Viewers&layout=inline&trend=true&icon=eye&bg=true
```

---

## CTA Overlay

**File:** `cta.html`
**Purpose:** Call-to-action popups (Subscribe, Like, Follow, etc.)

### Quick Presets

| Preset | Default Text | Subtitle | Icon | Icon Animation | Use Case |
|--------|--------------|----------|------|----------------|----------|
| `subscribe` | Subscribe for More | Stay updated with new content | sub (bell) | bounce | YouTube subscribe |
| `like` | Like This Video | Show your support | like (thumbs up) | shake | Engagement |
| `follow` | Follow on Social | Join the community | follow | bounce | Social follow |
| `share` | Share This Stream | Spread the word | share | spin | Viral growth |
| `notify` | Turn on Notifications | Never miss a stream | bell | shake | Notifications |
| `custom` | - | - | none | none | Full manual control |

### Text Configuration Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `preset` | string | `subscribe` | Use quick preset | `subscribe`, `like`, `follow`, `share`, `notify`, `custom` |
| `text` | string | Preset-dependent | Main CTA text | Any text (URL encoded) |
| `sub` | string | Preset-dependent | Subtitle text | Any text (URL encoded) |
| `size` | number | `28` | Font size (px) | `14`-`80` |

### Icon Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `icon` | string | Preset-dependent | Icon type | `like`, `sub`, `bell`, `share`, `heart`, `star`, `follow`, `none`, or any Lucide icon name |
| `iconanim` | string | Preset-dependent | Icon animation | `bounce`, `shake`, `pulse`, `spin`, `wiggle`, `flip`, `heartbeat`, `none` |
| `iconsize` | number | `0` | Custom icon size (px, 0=auto) | `0`-`64` |
| `iconcolor` | string | - | Custom icon color (hex, no #) | `6366f1` |
| `iconpos` | string | `left` | Icon position | `left`, `right`, `top`, `bottom` |

### Text Styling Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `textpadx` | number | `0` | Horizontal text padding (px) | `0`-`50` |
| `textpady` | number | `0` | Vertical text padding (px) | `0`-`50` |
| `letterspacing` | number | `0` | Letter spacing (px) | `0`-`2` |
| `lineheight` | number | `1.2` | Line height multiplier | `1`-`2` |

### Decoration Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `decoration` | string | `none` | Decoration style | `line`, `slant`, `swirl`, `none` |
| `decorationcolor` | string | - | Decoration color (hex, no #) | `6366f1` |

### Animation Parameters

| Parameter | Type | Default | Description | Available Options |
|-----------|------|---------|-------------|-------------------|
| `entrance` | string | `bounce` | Entrance animation | `bounce`, `slideUp`, `slideLeft`, `slideRight`, `fade`, `scale`, `flipIn`, `zoomIn` |
| `exit` | string | `fade` | Exit animation | `fade`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `flipOut`, `none` |
| `delay` | number | `0.5` | Initial delay (seconds) | `0`-`10` |

### Loop & Timing Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `loop` | boolean | `true` | Enable looping | `true`, `false` |
| `hold` | number | `6` | Visible duration (seconds) | `1`-`60` |
| `pause` | number | `20` | Hidden duration (seconds) | `1`-`300` |

### Layout Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `align` | string | `center` | Horizontal position | `left`, `center`, `right` |
| `valign` | string | `bottom` | Vertical position | `top`, `center`, `bottom` |
| `bg` | boolean | `true` | Show background panel | `true`, `false` |

### Style Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `theme` | string | `dark`, `light` |
| `gradient` | string | Gradient preset name |

**Total CTA Overlay Parameters: 30**

### URL Examples

**Simple subscribe prompt:**
```
cta.html?preset=subscribe
```

**Custom follow CTA:**
```
cta.html?text=Follow%20on%20Twitch&icon=follow&iconanim=bounce&gradient=purple&hold=8
```

**Like prompt with custom styling:**
```
cta.html?preset=like&entrance=zoomIn&iconanim=heartbeat&gradient=sunset&loop=true
```

**Share prompt without looping:**
```
cta.html?preset=share&loop=false&hold=10&exit=slideDown
```

---

## Socials Overlay

**File:** `socials.html`
**Purpose:** Social media handles/icons display with animation modes

### Supported Platforms

| Platform | Handle Prefix | Brand Color | Icon |
|----------|---------------|-------------|------|
| `github` | - | `#ffffff` | GitHub logo |
| `twitter` | `@` | `#000000` | X/Twitter logo |
| `linkedin` | - | `#0A66C2` | LinkedIn logo |
| `youtube` | - | `#FF0000` | YouTube logo |
| `instagram` | `@` | `#E4405F` | Instagram logo |
| `twitch` | - | `#9146FF` | Twitch logo |
| `kick` | - | `#53FC18` | Kick logo |
| `discord` | - | `#5865F2` | Discord logo |
| `website` | - | `#6366f1` | Globe icon |

### Platform Configuration Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `show` | string | All configured | Comma-separated platforms to display | `github,youtube,twitch` |
| `handles` | string | From brand.js | Override handles (format: `platform:handle`) | `github:user,youtube:@channel` |
| `order` | string | `default` | Platform ordering | `default`, `priority` |
| `priority` | string | - | Priority order (format: `platform:number`) | `youtube:1,twitch:2,github:3` |
| `icons` | string | - | Override icons (format: `platform:lucideIconName`) | `github:code,youtube:video` |

### Layout Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `layout` | string | `horizontal` | Display layout | `horizontal`, `vertical` |
| `size` | string | `md` | Icon size preset | `sm` (20px), `md` (24px), `lg` (32px), `xl` (40px) |
| `showtext` | boolean | `true` | Show platform handles | `true`, `false` |
| `gap` | number | `16` | Gap between items (px) | `0`-`100` |

### Icon Customization Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `iconcolor` | string | `brand` | Icon color mode | `brand`, `platform`, `white`, `gradient` |
| `iconsize` | number | `0` | Override icon size (px, 0=use size preset) | `0`-`64` |
| `iconpadding` | number | `0` | Padding within icons (px) | `0`-`32` |
| `borderradius` | number | `8` | Corner radius (px) | `0`-`20` |

### Text Customization Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `fontsize` | number | `0` | Handle text size (px, 0=auto) | `0`-`30` |
| `fontweight` | number | `500` | Font weight | `400`-`700` |
| `letterspacing` | number | `0` | Letter spacing (px) | `0`-`2` |

### Entrance Animation Parameters

| Parameter | Type | Default | Description | Available Options |
|-----------|------|---------|-------------|-------------------|
| `entrance` | string | `stagger` | Entrance animation | `stagger`, `fade`, `slideUp`, `none` |
| `speed` | number | `0.5` | Animation duration (seconds) | `0.3`-`2` |
| `delay` | number | `0.3` | Initial delay (seconds) | `0`-`5` |

### Exit & Cycling Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `exit` | string | `none` | Exit animation | `none`, `fade`, `slideDown`, `slideUp` |
| `exitafter` | number | `0` | Delay before exit (seconds, 0=stay) | `0`-`120` |
| `exitspeed` | number | `0.5` | Exit duration (seconds) | `0.3`-`2` |

### Loop Mode Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `loop` | boolean | `false` | Enable loop visibility (all appear → hold → all disappear → pause → repeat) | `true`, `false` |
| `hold` | number | `5` | Visible duration (seconds) | `1`-`60` |
| `pause` | number | `3` | Hidden duration (seconds) | `0.5`-`60` |

### One-by-One Mode Parameters

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `onebyone` | boolean | `false` | Show each platform one at a time | `true`, `false` |
| `each` | number | `3` | Duration each is shown (seconds) | `1`-`20` |
| `eachpause` | number | `0.5` | Pause between each (seconds) | `0`-`5` |

### Style Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bg` | boolean | Show background panel |
| `theme` | string | `dark`, `light` |
| `gradient` | string | Gradient preset name |

**Total Socials Overlay Parameters: 30**

### Display Modes

**Static** (default):
- All platforms appear once and stay visible
- Use for permanent display in corner/bottom

**Loop Mode** (`loop=true`):
- All platforms appear together
- Hold for N seconds
- All disappear together
- Pause for N seconds
- Repeat cycle

**One-by-One Mode** (`onebyone=true`):
- Show each platform individually
- Cycle through all platforms
- Each visible for N seconds
- Pause between transitions

**Timed** (`exitafter > 0`):
- All platforms appear
- Stay visible for N seconds
- Exit animation
- Don't reappear

### URL Examples

**Simple social links:**
```
socials.html?show=github,youtube,twitch
```

**Platform color icons:**
```
socials.html?show=github,linkedin,youtube&iconcolor=platform&size=lg
```

**One-by-one cycling:**
```
socials.html?show=twitch,kick,youtube&onebyone=true&each=4&iconcolor=gradient
```

**Loop mode with entrance:**
```
socials.html?show=github,twitter,website&loop=true&hold=8&pause=5&entrance=stagger
```

---

## Global Parameters

These parameters work across **all overlay components**.

### Theme & Colors

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `theme` | string | `dark` | Color scheme | `dark`, `light` |
| `gradient` | string | `indigo` | Gradient preset name | See [Gradient Presets](#gradient-presets) |
| `colors` | string | - | Custom gradient colors (comma-separated hex, no #) | `6366f1,8b5cf6,a78bfa` |
| `random` | boolean | `false` | Randomize gradient on each load | `true`, `false` |

### Custom Fonts

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `customfonts` | string | - | Google Fonts to load (comma-separated) | `Poppins,Montserrat,Roboto` |

*Note: Custom fonts are accessible via `font=custom1`, `font=custom2`, etc. in order loaded*

### Preview Mode

| Parameter | Type | Default | Description | Example Values |
|-----------|------|---------|-------------|----------------|
| `preview` | boolean | `false` | Enable preview mode | `true`, `false` |
| `canvasw` | number | `1920` | Canvas width (px) | `1280`, `1920`, `2560`, `3840` |
| `canvash` | number | `1080` | Canvas height (px) | `720`, `1080`, `1440`, `2160` |
| `showgrid` | boolean | `false` | Show alignment grid | `true`, `false` |
| `showrulers` | boolean | `false` | Show pixel rulers | `true`, `false` |

**Total Global Parameters: 10**

---

## Brand Configuration

**File:** `brand.js`
**Purpose:** Global brand settings used by all overlays

### Configuration Structure

```javascript
const BRAND = {
  name: "Your Name",

  accent: {
    primary:   "#6366f1",
    secondary: "#8b5cf6",
    tertiary:  "#06b6d4",
    warm:      "#f59e0b",
    success:   "#10b981",
    rose:      "#f43f5e",
  },

  themes: {
    dark: { /* colors */ },
    light: { /* colors */ }
  },

  gradients: { /* 21 presets */ },

  fonts: {
    display: "'Inter', 'SF Pro Display', sans-serif",
    body:    "'Inter', 'SF Pro Text', sans-serif",
    mono:    "'JetBrains Mono', 'Fira Code', monospace",
    custom:  [], // Custom Google Fonts
  },

  socials: {
    github: "username",
    twitter: "@handle",
    // ... etc
  }
};
```

### Accent Colors

| Color | Default Hex | Purpose |
|-------|-------------|---------|
| `primary` | `#6366f1` | Main brand color (indigo) |
| `secondary` | `#8b5cf6` | Secondary brand color (purple) |
| `tertiary` | `#06b6d4` | Tertiary brand color (cyan) |
| `warm` | `#f59e0b` | Warm accent (amber) |
| `success` | `#10b981` | Success/positive (emerald) |
| `rose` | `#f43f5e` | Accent/error (rose) |

### Theme Color Schemes

**Dark Theme:**
```javascript
{
  bg:        "#121216",  // Main background
  bgAlt:     "#1c1c24",  // Alternate background
  surface:   "#26262e",  // Surface/card background
  border:    "#3a3a44",  // Border color
  text:      "#f0f0f5",  // Primary text
  textMuted: "#9898a8",  // Muted text
  textDim:   "#5a5a6a",  // Dimmed text
}
```

**Light Theme:**
```javascript
{
  bg:        "#f8f8fc",  // Main background
  bgAlt:     "#eeeef4",  // Alternate background
  surface:   "#ffffff",  // Surface/card background
  border:    "#d0d0da",  // Border color
  text:      "#121216",  // Primary text
  textMuted: "#5a5a6a",  // Muted text
  textDim:   "#9898a8",  // Dimmed text
}
```

### Gradient Presets

All 21 built-in gradients with color codes:

| Name | Colors |
|------|--------|
| `indigo` | `#6366f1`, `#8b5cf6`, `#a78bfa`, `#c4b5fd`, `#818cf8` |
| `cyan` | `#06b6d4`, `#22d3ee`, `#67e8f9`, `#a5f3fc`, `#0891b2` |
| `sunset` | `#f43f5e`, `#f59e0b`, `#fbbf24`, `#f97316`, `#ef4444` |
| `emerald` | `#10b981`, `#34d399`, `#6ee7b7`, `#a7f3d0`, `#059669` |
| `neon` | `#6366f1`, `#06b6d4`, `#10b981`, `#f59e0b`, `#f43f5e` |
| `frost` | `#818cf8`, `#93c5fd`, `#a5b4fc`, `#c7d2fe`, `#e0e7ff` |
| `fire` | `#ef4444`, `#f97316`, `#f59e0b`, `#fbbf24`, `#fde68a` |
| `ocean` | `#0ea5e9`, `#06b6d4`, `#14b8a6`, `#2dd4bf`, `#5eead4` |
| `purple` | `#7c3aed`, `#8b5cf6`, `#a78bfa`, `#c4b5fd`, `#ddd6fe` |
| `mono` | `#6b7280`, `#9ca3af`, `#d1d5db`, `#9ca3af`, `#6b7280` |
| `rainbow` | `#ef4444`, `#f59e0b`, `#10b981`, `#06b6d4`, `#6366f1`, `#8b5cf6` |
| `lavender` | `#8b5cf6`, `#a78bfa`, `#c4b5fd`, `#ddd6fe`, `#e9d5ff` |
| `crimson` | `#be123c`, `#e11d48`, `#f43f5e`, `#fb7185`, `#fda4af` |
| `mint` | `#059669`, `#10b981`, `#34d399`, `#6ee7b7`, `#a7f3d0` |
| `amber` | `#d97706`, `#f59e0b`, `#fbbf24`, `#fcd34d`, `#fde68a` |
| `navy` | `#1e3a8a`, `#1e40af`, `#2563eb`, `#3b82f6`, `#60a5fa` |
| `coral` | `#ea580c`, `#f97316`, `#fb923c`, `#fdba74`, `#fed7aa` |
| `slate` | `#334155`, `#475569`, `#64748b`, `#94a3b8`, `#cbd5e1` |
| `gold` | `#ca8a04`, `#eab308`, `#facc15`, `#fde047`, `#fef08a` |
| `teal` | `#0f766e`, `#14b8a6`, `#2dd4bf`, `#5eead4`, `#99f6e4` |
| `magenta` | `#a21caf`, `#c026d3`, `#d946ef`, `#e879f9`, `#f0abfc` |

### Social Platforms Configuration

```javascript
socials: {
  github:    "username",        // GitHub username
  twitter:   "@handle",         // Twitter/X handle
  linkedin:  "username",        // LinkedIn username
  youtube:   "@channelname",    // YouTube channel
  instagram: "@username",       // Instagram handle
  twitch:    "username",        // Twitch channel
  kick:      "username",        // Kick channel
  discord:   "server-invite",   // Discord invite
  website:   "https://...",     // Website URL
}
```

---

## Power User Features

Features that are **fully implemented in code** but **NOT exposed in the dashboard UI**. Use these via direct URL parameters for advanced customization.

### Text Overlay (URL Only)

**Font Weight Control:**
```
text.html?text=Bold%20Text&weight=700
```
- Parameter: `weight`
- Values: `300` (light), `400` (normal), `500` (medium), `600` (semibold), `700` (bold)
- Not in dashboard UI

**Custom Text Colors:**
```
text.html?text=Colored%20Text&textcolor=6366f1&subcolor=8b5cf6
```
- Parameters: `textcolor`, `subcolor`
- Values: Hex colors without `#`
- Not in dashboard UI

**Gradient Text:**
```
text.html?text=Gradient%20Text&textgradient=true&gradient=sunset
```
- Parameter: `textgradient`
- Applies gradient to text instead of solid color
- Not in dashboard UI

**Separate Padding Control:**
```
text.html?text=Custom%20Padding&padx=40&pady=20
```
- Parameters: `padx`, `pady`
- Override horizontal/vertical padding independently
- Not in dashboard UI

**Margins & Offsets:**
```
text.html?text=Positioned&marginx=50&marginy=30&offsetx=10&offsety=-5
```
- Parameters: `marginx`, `marginy`, `offsetx`, `offsety`
- Fine-tune positioning with pixel precision
- Not in dashboard UI

**Additional Entrance/Exit Animations:**
```
text.html?entrance=rotateIn&exit=zoomOut
```
- Available but not in all dropdowns:
  - Entrance: `flipIn`, `zoomBounce`, `rotateIn`
  - Exit: `fadeLeft`, `zoomOut`, `rotateOut`

---

### Counter Overlay (URL Only)

**Font Family Selection:**
```
counter.html?value=1234&font=display
```
- Parameter: `font`
- Values: `mono`, `display`, `body`
- Not in dashboard UI

**Number Notation:**
```
counter.html?value=1234567&notation=compact
```
- Parameter: `notation`
- Values: `standard` (1,234,567), `compact` (1.2M), `scientific` (1.23e6)
- Not in dashboard UI

**Auto-Abbreviation:**
```
counter.html?value=15420&abbreviate=true
```
- Parameter: `abbreviate`
- Values: `true` (15.4k), `false` (15,420)
- Not in dashboard UI

**Thousands Separator:**
```
counter.html?value=1000&separator=false
```
- Parameter: `separator`
- Values: `true` (1,000), `false` (1000)
- Not in dashboard UI

**Decimal Precision:**
```
counter.html?value=3.14159&decimals=2
```
- Parameter: `decimals`
- Values: `0`-`5` decimal places
- Not in dashboard UI

**API Polling (Advanced):**
```
counter.html?poll=https://api.example.com/stats&pollkey=data.count&pollrate=60
```
- Parameters: `poll`, `pollkey`, `pollrate`
- Custom JSON endpoints with JSONPath navigation
- Not in dashboard UI

---

### CTA Overlay (URL Only)

**Text Padding Control:**
```
cta.html?text=Custom%20CTA&textpadx=30&textpady=15
```
- Parameters: `textpadx`, `textpady`
- Control padding around text independently
- Not in dashboard UI

**Letter Spacing:**
```
cta.html?text=SPACED%20TEXT&letterspacing=2
```
- Parameter: `letterspacing`
- Values: `0`-`2` pixels
- Not in dashboard UI

**Line Height:**
```
cta.html?text=Multi-line%20CTA&sub=Subtitle&lineheight=1.5
```
- Parameter: `lineheight`
- Values: `1`-`2` multiplier
- Not in dashboard UI

**Custom Icon Size:**
```
cta.html?icon=heart&iconsize=48
```
- Parameter: `iconsize`
- Values: `0` (auto) or `16`-`64` pixels
- Not in dashboard UI

**Custom Lucide Icons:**
```
cta.html?icon=rocket&iconanim=bounce
```
- Parameter: `icon`
- Values: Any Lucide icon name (500+ options)
- Not in dashboard UI

---

### Socials Overlay (URL Only)

**Font Weight:**
```
socials.html?show=github,youtube&fontweight=700
```
- Parameter: `fontweight`
- Values: `400`-`700`
- Not in dashboard UI

**Letter Spacing:**
```
socials.html?show=github,youtube&letterspacing=1
```
- Parameter: `letterspacing`
- Values: `0`-`2` pixels
- Not in dashboard UI

**Icon Padding:**
```
socials.html?show=github,youtube&iconpadding=12
```
- Parameter: `iconpadding`
- Values: `0`-`32` pixels
- Not in dashboard UI

**Border Radius:**
```
socials.html?show=github,youtube&borderradius=16
```
- Parameter: `borderradius`
- Values: `0`-`20` pixels
- Not in dashboard UI

**Priority Ordering:**
```
socials.html?show=github,youtube,twitch&order=priority&priority=youtube:1,github:2,twitch:3
```
- Parameters: `order`, `priority`
- Custom platform display order
- Not in dashboard UI

**Custom Icons:**
```
socials.html?show=github,youtube&icons=github:code,youtube:video
```
- Parameter: `icons`
- Override with any Lucide icon names
- Not in dashboard UI

---

### Border Overlay (URL Only)

**Multicolor Cycling:**
```
border.html?multicolor=true&animation=rotate&speed=6
```
- Parameter: `multicolor`
- Cycles through all 21 gradient presets
- Not in dashboard UI

**Color Shift:**
```
border.html?colorshift=true&shiftspeed=15
```
- Parameters: `colorshift`, `shiftspeed`
- Smooth color transitions between gradients
- Not in dashboard UI

**Opacity Control:**
```
border.html?opacity=0.6
```
- Parameter: `opacity`
- Values: `0`-`1`
- Not in dashboard UI

---

## Missing Features & Roadmap

Organized by **priority** based on user impact and implementation complexity.

## HIGH PRIORITY

*User-facing features with high impact and moderate implementation effort*

### Text Customization Gaps

**Letter Spacing Control** ❌
- **Status:** Hardcoded at `-0.02em` in text overlay
- **Impact:** High - users frequently request spacing control
- **Implementation:** Add `letterspacing` parameter (0-2px range)
- **Effort:** Low - CSS property already available
- **Action:** Add to text.html config, expose in dashboard UI

**Line Height Control** ❌
- **Status:** Hardcoded at `1.25`
- **Impact:** High - important for multi-line text readability
- **Implementation:** Add `lineheight` parameter (1-2+ multiplier)
- **Effort:** Low - CSS property already available
- **Action:** Add to text.html config, expose in dashboard UI

**Text Shadow Customization** ❌
- **Status:** Not implemented
- **Impact:** Medium - enhances text visibility on busy backgrounds
- **Implementation:** Add `textshadow`, `textshadowx`, `textshadowy`, `textshadowblur`, `textshadowcolor` parameters
- **Effort:** Low - standard CSS text-shadow
- **Action:** Add parameter parsing and CSS application

**Text Decoration** ❌
- **Status:** Not implemented
- **Impact:** Medium - useful for emphasis (underline, strikethrough)
- **Implementation:** Add `textdecoration` parameter (none/underline/overline/line-through)
- **Effort:** Low - CSS text-decoration property
- **Action:** Add to text.html config

### Panel/Background Customization Gaps

**Panel Border Style** ❌
- **Status:** Currently only solid borders (hardcoded)
- **Impact:** High - users want dashed/dotted panel borders
- **Implementation:** Add `panelborderstyle` parameter (solid/dashed/dotted/double/none)
- **Effort:** Low - CSS border-style property
- **Action:** Add to all components with `bg=true`

**Panel Border Width** ❌
- **Status:** Hardcoded at 1px
- **Impact:** Medium - visual customization request
- **Implementation:** Add `panelborderwidth` parameter (0-10px)
- **Effort:** Low - CSS border-width property
- **Action:** Add to all components with `bg=true`

**Panel Border Radius** ❌
- **Status:** Hardcoded at 14px (text) / 8-16px (others)
- **Impact:** High - users want sharp vs rounded corners
- **Implementation:** Add `panelradius` parameter (0-50px)
- **Effort:** Low - CSS border-radius property
- **Action:** Add to all components with `bg=true`

**Panel Shadow Customization** ❌
- **Status:** Hardcoded box-shadow values
- **Impact:** Medium - depth perception control
- **Implementation:** Add `panelshadow` parameters (offsetX, offsetY, blur, spread, color, opacity)
- **Effort:** Low-Medium - multiple parameters but standard CSS
- **Action:** Add comprehensive shadow control system

### Dashboard UI Gaps

**Font Weight Control** ❌
- **Status:** Exists in URL (`weight` parameter), missing from text overlay UI
- **Impact:** High - basic typography control
- **Implementation:** Add number input or slider to dashboard
- **Effort:** Low - parameter exists, just add UI control
- **Action:** Add to text.html section in index.html

**Text/Subtitle Color Pickers** ❌
- **Status:** Exists in URL (`textcolor`, `subcolor`), not in UI
- **Impact:** High - color customization is frequently requested
- **Implementation:** Add color picker inputs to dashboard
- **Effort:** Low - parameters exist, add HTML color inputs
- **Action:** Add to text.html section in index.html

**Letter Spacing/Line Height UI** ❌
- **Status:** Not in any dashboard UI (partially implemented in code for some components)
- **Impact:** Medium - typography fine-tuning
- **Implementation:** Add number inputs to dashboard
- **Effort:** Low - add UI controls
- **Action:** Add to text/CTA sections in index.html

**Gradient Editor** ❌
- **Status:** No custom color picker UI for gradients
- **Impact:** High - users want custom brand gradients easily
- **Implementation:** Visual gradient editor with color stops
- **Effort:** Medium-High - requires interactive UI component
- **Action:** Build gradient picker with multiple color inputs

**Export/Import Configuration** ❌
- **Status:** No save/load preset system
- **Impact:** High - workflow efficiency for multiple setups
- **Implementation:** JSON export/import with localStorage
- **Effort:** Medium - requires data serialization and UI
- **Action:** Add export/import buttons with JSON download/upload

---

## MEDIUM PRIORITY

*Power user features and nice-to-have enhancements*

### Advanced Text Features

**Text Transform** ❌
- **Status:** No uppercase/lowercase/capitalize controls (only hardcoded in labels)
- **Impact:** Medium - useful for stylistic consistency
- **Implementation:** Add `texttransform` parameter (none/uppercase/lowercase/capitalize)
- **Effort:** Low - CSS text-transform property
- **Action:** Add to text.html config

**Text Stroke/Outline** ❌
- **Status:** Not implemented
- **Impact:** Medium - enhances visibility, stylistic effect
- **Implementation:** Add `textstroke` and `textstrokecolor` parameters
- **Effort:** Low - CSS -webkit-text-stroke
- **Action:** Add to text.html with vendor prefixes

**Multi-line Text with Individual Styling** ❌
- **Status:** Each line can't have different fonts/sizes/colors
- **Impact:** Medium-High - advanced lower thirds
- **Implementation:** New component or JSON-based line configuration
- **Effort:** High - requires parser and multi-element rendering
- **Action:** Create new `multitext.html` component or extend text.html with JSON config

**Font Size Responsiveness** ❌
- **Status:** No viewport-relative sizing (vw/vh units)
- **Impact:** Low - useful for responsive designs
- **Implementation:** Add `responsive` boolean with auto-scaling
- **Effort:** Medium - requires viewport calculations
- **Action:** Add responsive mode with vw-based sizing

### Layout & Positioning

**Z-Index/Layering Control** ❌
- **Status:** Can't control stacking order
- **Impact:** Medium - important when layering multiple overlays
- **Implementation:** Add `zindex` parameter
- **Effort:** Low - CSS z-index property
- **Action:** Add to all components

**Rotation/Transform** ❌
- **Status:** No rotate/skew/scale controls
- **Impact:** Low - creative positioning effects
- **Implementation:** Add `rotate`, `skew`, `scale` parameters
- **Effort:** Low-Medium - CSS transform property
- **Action:** Add transform controls with degrees/percentages

### Animation Gaps

**Custom Animation Easing Curves** ❌
- **Status:** Limited easing options (mostly ease-out)
- **Impact:** Low - animation fine-tuning
- **Implementation:** Add `easing` parameter (linear/ease/ease-in-out/cubic-bezier)
- **Effort:** Low - CSS transition-timing-function
- **Action:** Add easing options to animation configs

**Animation Delay Per Element** ❌
- **Status:** Can't stagger complex animations individually
- **Impact:** Low - advanced animation choreography
- **Implementation:** Add per-element delay controls
- **Effort:** Medium - requires element-specific configs
- **Action:** Add advanced animation timing system

---

## LOW PRIORITY

*New components and advanced integrations (significant effort)*

### Missing Components

**Image/Logo Overlay** ❌
- **Status:** No component for static images/logos
- **Impact:** High - common use case for branding
- **Implementation:** New `image.html` with src, size, position, fade, filters
- **Effort:** Medium - new component with image loading
- **Action:** Create image.html with parameters:
  - `src` (image URL)
  - `width`, `height` (size)
  - `align`, `valign` (position)
  - `opacity`, `blur`, `brightness`, `contrast` (filters)
  - `entrance`, `exit` (animations)

**Timer/Countdown Component** ❌
- **Status:** No countdown component
- **Impact:** Medium-High - useful for stream schedules, events
- **Implementation:** New `timer.html` with target time, format, events
- **Effort:** Medium-High - requires time calculation and live updates
- **Action:** Create timer.html with parameters:
  - `target` (timestamp or duration)
  - `format` (HH:MM:SS, MM:SS, etc.)
  - `timezone` (UTC offset)
  - `complete` (action when timer hits zero)
  - `labels` (show/hide labels)

**Alert System** ❌
- **Status:** No donation/follow/sub alert overlays
- **Impact:** High - streaming essentials
- **Implementation:** New `alert.html` with webhook integration, queue system
- **Effort:** High - requires external integration, event queue, multiple templates
- **Action:** Create alert.html with:
  - StreamElements/Streamlabs integration
  - Custom webhook support
  - Alert queue management
  - Template customization
  - Sound effects integration

**Video Clip Player** ❌
- **Status:** No video playback support
- **Impact:** Medium - useful for intro/outro clips
- **Implementation:** New `video.html` with src, autoplay, loop controls
- **Effort:** Medium - HTML5 video with custom controls
- **Action:** Create video.html with parameters:
  - `src` (video URL)
  - `autoplay`, `loop`, `muted`
  - `controls` (show/hide)
  - `poster` (thumbnail)
  - `entrance`, `exit` (animations)

### Advanced Integration

**Webhook/Event Triggers** ❌
- **Status:** No external event system
- **Impact:** High - enables dynamic overlays
- **Implementation:** WebSocket or Server-Sent Events integration
- **Effort:** High - requires server component or third-party service
- **Action:** Design event system with:
  - WebSocket connection support
  - Event listeners (follow, sub, donation, etc.)
  - Custom event handlers
  - Fallback polling mechanism

**Sound Effects** ❌
- **Status:** No audio playback
- **Impact:** Medium - enhances alerts and animations
- **Implementation:** Audio API integration with volume/fade controls
- **Effort:** Medium - HTML5 Audio API
- **Action:** Add sound system with:
  - `sound` parameter (audio file URL)
  - `volume` (0-1)
  - `fadein`, `fadeout` (durations)
  - Trigger on entrance/exit/events

**Animation Timeline Editor** ❌
- **Status:** No visual keyframe editor
- **Impact:** Low - advanced users only
- **Implementation:** Web-based timeline UI with keyframe editing
- **Effort:** Very High - complex interactive UI
- **Action:** Long-term project:
  - Visual timeline interface
  - Keyframe drag-and-drop
  - Property interpolation
  - Export to URL parameters or JSON
  - Real-time preview

---

## Implementation Roadmap

### Phase 1: High-Priority UI Improvements
**Timeline:** 1-2 weeks
**Goal:** Quick wins for user satisfaction

- ✅ Add font weight control to text overlay dashboard
- ✅ Add letter spacing control to text overlay dashboard
- ✅ Add line height control to text overlay dashboard
- ✅ Add text/subtitle color pickers to dashboard
- ✅ Add panel border radius control to all components
- ✅ Update parameter reference in dashboard

### Phase 2: Missing Text Features
**Timeline:** 2-3 weeks
**Goal:** Complete text customization system

- ✅ Implement text decoration (underline/strikethrough)
- ✅ Implement text shadow customization
- ✅ Implement panel border style/width controls
- ✅ Implement text transform controls
- ✅ Add all missing text params to dashboard UI

### Phase 3: Advanced Features
**Timeline:** 4-6 weeks
**Goal:** Power user tools

- ✅ Implement multi-line text component
- ✅ Implement z-index/rotation controls
- ✅ Add gradient editor UI with color picker
- ✅ Add export/import configuration system
- ✅ Implement responsive font sizing

### Phase 4: New Components
**Timeline:** 8-12 weeks
**Goal:** Expand component library

- ✅ Implement image/logo overlay component
- ✅ Implement timer/countdown component
- ✅ Implement basic alert system component
- ✅ Add video clip player component

---

## Quick Reference

### All Parameters by Component (Alphabetical)

#### Border Overlay (17 parameters)
`animation`, `colors`, `colorshift`, `dash`, `glow`, `glowsize`, `gradient`, `multicolor`, `opacity`, `r`, `random`, `shape`, `shiftspeed`, `speed`, `style`, `theme`, `thickness`

#### Text Overlay (52 parameters)
`align`, `bg`, `colors`, `delay`, `entrance`, `entrancespeed`, `exit`, `exitafter`, `exitspeed`, `font`, `gradient`, `hold`, `line`, `lineanim`, `linelength`, `linepos`, `linespeed`, `linestyle`, `linewidth`, `loop`, `marginx`, `marginy`, `maxwidth`, `offsetx`, `offsety`, `pad`, `padx`, `pady`, `pause`, `preset`, `random`, `size`, `sub`, `subcolor`, `subsize`, `text`, `textcolor`, `textgradient`, `theme`, `valign`, `weight`, (+ global params)

#### Counter Overlay (28 parameters)
`abbreviate`, `align`, `animate`, `apikey`, `bg`, `colors`, `counterpadx`, `counterpady`, `decimals`, `duration`, `font`, `gradient`, `height`, `icon`, `iconcolor`, `label`, `labelsize`, `layout`, `metric`, `notation`, `numbercolor`, `poll`, `pollkey`, `pollrate`, `prefix`, `random`, `separator`, `service`, `size`, `suffix`, `theme`, `trend`, `trendcolor`, `userid`, `value`, `width`

#### CTA Overlay (30 parameters)
`align`, `bg`, `colors`, `decoration`, `decorationcolor`, `delay`, `entrance`, `exit`, `gradient`, `hold`, `icon`, `iconanim`, `iconcolor`, `iconpos`, `iconsize`, `letterspacing`, `lineheight`, `loop`, `pause`, `preset`, `random`, `size`, `sub`, `text`, `textpadx`, `textpady`, `theme`, `valign`

#### Socials Overlay (30 parameters)
`bg`, `borderradius`, `colors`, `delay`, `each`, `eachpause`, `entrance`, `exit`, `exitafter`, `exitspeed`, `fontsize`, `fontweight`, `gap`, `gradient`, `handles`, `hold`, `iconcolor`, `iconpadding`, `icons`, `iconsize`, `layout`, `letterspacing`, `loop`, `onebyone`, `order`, `pause`, `priority`, `random`, `show`, `showtext`, `size`, `speed`, `theme`

### Animation Types Reference

**Text Entrance Animations:**
`fade`, `slideUp`, `slideLeft`, `slideDown`, `slideRight`, `scale`, `typewriter`, `flipIn`, `zoomBounce`, `rotateIn`, `none`

**Text Exit Animations:**
`none`, `fade`, `slideDown`, `slideUp`, `scale`, `fadeLeft`, `zoomOut`, `rotateOut`

**CTA Entrance Animations:**
`bounce`, `slideUp`, `slideLeft`, `slideRight`, `fade`, `scale`, `flipIn`, `zoomIn`

**CTA Exit Animations:**
`fade`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `flipOut`, `none`

**Icon Animations:**
`bounce`, `shake`, `pulse`, `spin`, `wiggle`, `flip`, `heartbeat`, `none`

**Border Animations:**
`dash`, `rotate`, `pulse`, `breathe`, `none`

**Socials Entrance:**
`stagger`, `fade`, `slideUp`, `none`

**Socials Exit:**
`none`, `fade`, `slideDown`, `slideUp`

### Icon Options by Component

**Counter Icons:**
`heart`, `star`, `users`, `eye`, `zap`, `fire`, `trophy`, `bell`, `none`

**CTA Icons:**
`like`, `sub`, `bell`, `share`, `heart`, `star`, `follow`, `none`, or any Lucide icon name

**Social Platforms:**
`github`, `twitter`, `linkedin`, `youtube`, `instagram`, `twitch`, `kick`, `discord`, `website`

### Preset Configurations

**Text Presets:**
- `brb`: 48px, display font, weight 700, centered, scale entrance, gradient line
- `chatting`: 36px, display font, weight 600, centered, fade entrance
- `starting`: 52px, display font, weight 700, centered, slideUp entrance
- `ending`: 44px, display font, weight 700, centered, fade entrance
- `technical`: 40px, mono font, weight 600, centered, dashed line

**CTA Presets:**
- `subscribe`: Bell icon, bounce animation, "Subscribe for More"
- `like`: Thumbs up icon, shake animation, "Like This Video"
- `follow`: Follow icon, bounce animation, "Follow on Social"
- `share`: Share icon, spin animation, "Share This Stream"
- `notify`: Bell icon, shake animation, "Turn on Notifications"

---

## Examples

### Minimal Setups (3-4 parameters)

**Quick text overlay:**
```
text.html?text=Live&size=64&gradient=neon
```

**Simple counter:**
```
counter.html?value=1234&label=Followers&icon=heart
```

**Social links:**
```
socials.html?show=github,youtube,twitch
```

**Border frame:**
```
border.html?gradient=sunset&animation=rotate
```

---

### Fully Customized Setups (20+ parameters)

**Professional lower third:**
```
text.html?
  text=Deep%20Mandloi&
  sub=Software%20Engineer&
  align=left&
  valign=bottom&
  size=32&
  subsize=16&
  weight=600&
  font=display&
  entrance=slideLeft&
  entrancespeed=1&
  line=true&
  linestyle=gradient&
  lineanim=slide&
  linepos=bottom&
  bg=true&
  padx=40&
  pady=24&
  gradient=indigo&
  theme=dark
```

**Advanced subscriber counter with API:**
```
counter.html?
  service=youtube&
  apikey=YOUR_API_KEY&
  userid=CHANNEL_ID&
  metric=subscriberCount&
  pollrate=60&
  label=Subscribers&
  icon=users&
  size=56&
  labelsize=18&
  font=mono&
  layout=stack&
  align=center&
  notation=compact&
  separator=true&
  animate=true&
  duration=2&
  trend=true&
  bg=true&
  gradient=emerald&
  theme=dark
```

**Cycling social media with custom styling:**
```
socials.html?
  show=github,linkedin,youtube,twitch&
  onebyone=true&
  each=4&
  eachpause=0.5&
  layout=horizontal&
  size=lg&
  showtext=true&
  iconcolor=gradient&
  fontweight=600&
  letterspacing=1&
  borderradius=12&
  entrance=stagger&
  speed=0.6&
  bg=true&
  gradient=neon&
  theme=dark
```

**Animated CTA with custom styling:**
```
cta.html?
  preset=subscribe&
  entrance=zoomIn&
  iconanim=heartbeat&
  loop=true&
  hold=8&
  pause=25&
  size=32&
  textpadx=32&
  textpady=16&
  letterspacing=1&
  iconsize=48&
  bg=true&
  gradient=purple&
  theme=dark
```

---

### Common Use Cases

**Stream Starting Soon:**
```
text.html?preset=starting
```

**Be Right Back:**
```
text.html?preset=brb
```

**Live Subscriber Count:**
```
counter.html?service=youtube&apikey=KEY&userid=ID&icon=users&label=Subscribers
```

**Follow Reminder:**
```
cta.html?preset=follow&loop=true&hold=5&pause=30&gradient=cyan
```

**Social Media Links (Bottom):**
```
socials.html?show=github,youtube,twitch&layout=horizontal&valign=bottom&bg=true
```

**Camera Border:**
```
border.html?shape=circle&style=neon&animation=breathe&gradient=indigo&thickness=3
```

**Screen Border:**
```
border.html?shape=rect&style=solid&animation=rotate&r=0&gradient=rainbow&thickness=2
```

---

## Summary Statistics

- **Total Parameters:** 140+
- **Components:** 5 (Border, Text, Counter, CTA, Socials)
- **Gradient Presets:** 21
- **Animation Types:** 30+
- **Supported Social Platforms:** 9
- **Power User Features:** 25+ (URL-only)
- **Missing Features:** 21 identified
  - High Priority: 13
  - Medium Priority: 5
  - Low Priority: 7

---

## Next Steps

1. **For Users:** Explore [Power User Features](#power-user-features) for advanced customization
2. **For Contributors:** Review [Missing Features & Roadmap](#missing-features--roadmap) for implementation priorities
3. **For Streamers:** Check [Examples](#examples) for ready-to-use configurations

---

**Documentation Version:** 1.0
**Last Updated:** 2026-02-07
**Toolkit Version:** Compatible with latest commit
