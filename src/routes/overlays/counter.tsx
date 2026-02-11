/**
 * Counter Overlay Route
 * Fullscreen transparent route for the counter overlay
 */

import { createFileRoute } from '@tanstack/react-router'
import { CounterOverlay } from '../../components/overlays/CounterOverlay'

export const Route = createFileRoute('/overlays/counter')({
  component: CounterOverlayRoute,
})

function CounterOverlayRoute() {
  return <CounterOverlay />
}
