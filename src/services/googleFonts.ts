/**
 * Google Fonts API Service
 *
 * IMPORTANT: This service is ONLY used in configurator files.
 * DO NOT import this in overlay files - overlays must stay minimal for OBS performance.
 */

export interface GoogleFont {
  family: string
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace'
  variants: string[]
  subsets: string[]
  version?: string
  lastModified?: string
  files?: Record<string, string>
}

interface GoogleFontsResponse {
  kind: string
  items: GoogleFont[]
}

interface FontsCache {
  timestamp: number
  fonts: GoogleFont[]
  version: number
}

class GoogleFontsService {
  private static CACHE_KEY = 'obs-google-fonts-cache-v1'
  private static CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days
  private static API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity'

  /**
   * Fetch Google Fonts list from API or cache
   * Uses public endpoint - no API key required
   */
  async fetchFonts(): Promise<GoogleFont[]> {
    // Check localStorage cache first
    const cached = this.getCachedFonts()
    if (cached) {
      console.log('[GoogleFonts] Loaded from cache:', cached.length, 'fonts')
      return cached
    }

    // Fetch from Google Fonts API
    console.log('[GoogleFonts] Fetching from API...')
    try {
      const response = await fetch(this.API_URL)

      if (!response.ok) {
        throw new Error(`Google Fonts API error: ${response.status} ${response.statusText}`)
      }

      const data: GoogleFontsResponse = await response.json()

      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid response format from Google Fonts API')
      }

      console.log('[GoogleFonts] Fetched from API:', data.items.length, 'fonts')

      // Cache results for 7 days
      this.cacheFonts(data.items)

      return data.items
    } catch (error) {
      console.error('[GoogleFonts] Failed to fetch fonts:', error)
      throw error
    }
  }

  /**
   * Get cached fonts from localStorage
   * Returns null if cache doesn't exist or is expired
   */
  getCachedFonts(): GoogleFont[] | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY)
      if (!cached) return null

      const { timestamp, fonts, version }: FontsCache = JSON.parse(cached)

      // Check if cache is expired
      const isExpired = Date.now() - timestamp > this.CACHE_DURATION
      if (isExpired) {
        console.log('[GoogleFonts] Cache expired, clearing...')
        this.clearCache()
        return null
      }

      return fonts
    } catch (error) {
      console.error('[GoogleFonts] Failed to read cache:', error)
      this.clearCache()
      return null
    }
  }

  /**
   * Cache fonts in localStorage
   */
  cacheFonts(fonts: GoogleFont[]): void {
    try {
      const cache: FontsCache = {
        timestamp: Date.now(),
        fonts,
        version: 1
      }

      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache))
      console.log('[GoogleFonts] Cached', fonts.length, 'fonts')
    } catch (error) {
      console.error('[GoogleFonts] Failed to cache fonts:', error)
      // If localStorage is full or unavailable, continue without caching
    }
  }

  /**
   * Clear font cache
   * Useful for testing or forcing a refresh
   */
  clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY)
      console.log('[GoogleFonts] Cache cleared')
    } catch (error) {
      console.error('[GoogleFonts] Failed to clear cache:', error)
    }
  }

  /**
   * Get category fallback for CSS font-family
   */
  getCategoryFallback(category: string): string {
    switch (category) {
      case 'serif':
        return 'serif'
      case 'sans-serif':
        return 'sans-serif'
      case 'display':
        return 'cursive'
      case 'handwriting':
        return 'cursive'
      case 'monospace':
        return 'monospace'
      default:
        return 'sans-serif'
    }
  }
}

export const googleFontsService = new GoogleFontsService()
