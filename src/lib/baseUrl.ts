/**
 * Returns the base URL for overlay links, including the Vite base path.
 * In dev: "http://localhost:30111"
 * In production (GitHub Pages): "https://username.github.io/obs-toolkit"
 */
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${window.location.origin}${base}`
}
