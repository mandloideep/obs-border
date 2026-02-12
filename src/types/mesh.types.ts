/**
 * Mesh Background Overlay Parameter Types
 */

import type { MeshAnimation, MeshPalette, MeshBlendMode, MeshMode } from './brand.types'

export interface MeshOverlayParams {
  seed: number
  points: 2 | 3 | 4 | 5 | 6 | 7 | 8
  palette: MeshPalette
  mode: MeshMode
  animation: MeshAnimation
  speed: number
  blur: number
  scale: number
  opacity: number
  blend: MeshBlendMode
  bg: string
}

export const MESH_DEFAULTS: MeshOverlayParams = {
  seed: 42,
  points: 3,
  palette: 'pastel',
  mode: 'normal',
  animation: 'drift',
  speed: 1,
  blur: 100,
  scale: 1,
  opacity: 1.0,
  blend: 'normal',
  bg: '000000',
}
