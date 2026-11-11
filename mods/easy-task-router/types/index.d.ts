export type Mode = 'preview' | 'on' | 'off'

export type Routed = {
  turnId: string
  isApplied: boolean
  reason: string
  wanted: string
  // Le modèle qui a réellement répondu, tel que l'API le rapporte.
  served: string | null
  ms: number
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
}

declare module 'claude-code' {
  interface PluginState {
    'easy-task-router': { log: Shaped<Routed[]>; mode: Mode | null }
  }
}
