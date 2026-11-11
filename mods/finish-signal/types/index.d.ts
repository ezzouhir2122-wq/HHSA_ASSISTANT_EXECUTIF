export type Label = { turnId: string; text: string }

declare module 'claude-code' {
  interface PluginState {
    'finish-signal': {
      label: Label | null
      signalled: Shaped<string[]>
      isQuiet: boolean
    }
  }
}
