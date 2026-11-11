export type ToolStat = { calls: number; failures: number; ms: number }

export type Stats = {
  tools: Record<string, ToolStat>
  turns: number
  turnFailures: number
  turnMs: number
  // Les derniers appels comptés, pour ne jamais compter deux fois le même.
  seen: string[]
}

declare module 'claude-code' {
  interface PluginState {
    'workflow-meter': { stats: Shaped<Stats> }
  }
}
