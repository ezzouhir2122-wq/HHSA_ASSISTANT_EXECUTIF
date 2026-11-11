export type LensFile = { path: string; mtimeMs: number; size: number }

export type Excerpt = { path: string; text: string; isCut: boolean }

export type Index = {
  files: LensFile[]
  // 0 : jamais indexé.
  scannedAt: number
  // Les dossiers demandés qui n'ont pas pu être lus.
  missing: string[]
}

declare module 'claude-code' {
  interface PluginState {
    'second-brain-lens': {
      index: Shaped<Index>
      query: string
      picked: Excerpt | null
    }
  }
}
