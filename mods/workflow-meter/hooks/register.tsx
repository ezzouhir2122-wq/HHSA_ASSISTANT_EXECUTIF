import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Stats, ToolStat } from '../types'

const PANE = 'workflow-meter'
const EMPTY: Stats = { tools: {}, turns: 0, turnFailures: 0, turnMs: 0, seen: [] }
const NONE: ToolStat = { calls: 0, failures: 0, ms: 0 }

const stats = atom({ plugin: 'workflow-meter', key: 'stats' } as const, EMPTY, {
  shape: 'stats-1',
})

export const count = (
  before: Stats,
  call: { id: string; tool: string; ms: number; hasFailed: boolean },
): Stats => {
  if (before.seen.includes(call.id)) {
    return before
  }

  const one = before.tools[call.tool] ?? NONE

  return {
    ...before,
    tools: {
      ...before.tools,
      [call.tool]: {
        calls: one.calls + 1,
        failures: one.failures + (call.hasFailed ? 1 : 0),
        ms: one.ms + call.ms,
      },
    },
    seen: [...before.seen, call.id].slice(-300),
  }
}

const seconds = (ms: number): string => `${(ms / 1000).toFixed(1)} s`

export const rows = (all: Stats): string[] =>
  Object.entries(all.tools)
    .sort(([, a], [, b]) => b.calls - a.calls)
    .map(
      ([tool, one]) =>
        `${tool} : ${one.calls} appel${one.calls > 1 ? 's' : ''}, ${one.failures} échec${one.failures > 1 ? 's' : ''}, ${seconds(one.ms)}`,
    )

export const headline = (all: Stats): string => {
  const calls = Object.values(all.tools).reduce((sum, one) => sum + one.calls, 0)
  const failures = Object.values(all.tools).reduce((sum, one) => sum + one.failures, 0)

  return `${all.turns} tâche${all.turns > 1 ? 's' : ''} (${all.turnFailures} en échec, ${seconds(all.turnMs)}) · ${calls} appel${calls > 1 ? 's' : ''} d'outil, ${failures} en échec`
}

function clear($: EngineInterface): Promise<unknown> {
  return update($, stats, () => EMPTY)
}

export const register: Register = (on, options) => {
  const exportPath = String(options.exportPath ?? 'workflow-meter-export.json')

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'meter',
      description: 'Compteur de la session : ouvre le panneau, clear ou export',
      argumentHint: 'clear | export',
    })

    return next(e)
  })

  on('command.run', { command: 'meter' }, async ($, e) => {
    const wish = e.args.trim().toLowerCase()

    if (wish === 'clear') {
      await clear($)

      return { text: 'Compteur remis à zéro.' }
    }

    const all = await read($, stats)

    if (wish === 'export') {
      const { seen: _seen, ...kept } = all
      await $.fs.write(exportPath, `${JSON.stringify(kept, null, 2)}\n`)

      return { text: `Compteur exporté dans ${exportPath}.` }
    }

    await $.ui.open({ id: PANE, title: 'Workflow Meter' })
    const list = rows(all)

    return {
      text: [headline(all), ...(list.length === 0 ? ['Aucun appel d’outil compté.'] : list)].join('\n'),
    }
  })

  on('tool.call', async ($, e, next) => {
    const startedAt = await $.clock.now()
    const ran = await next(e)
    const call = {
      id: e.tool_use_id,
      tool: String(e.tool),
      ms: (await $.clock.now()) - startedAt,
      hasFailed: ran.deny !== undefined || ran.isError === true,
    }
    await update($, stats, before => count(before, call))

    return ran
    // Le comptage ne doit jamais gêner un appel d'outil.
  }).catch(($, e, next) => next(e))

  on('turn.complete', async ($, e, next) => {
    const done = await next(e)

    if (e.agentId === undefined) {
      const hasFailed = e.reason === 'error' || e.reason === 'refusal'
      await update($, stats, before => ({
        ...before,
        turns: before.turns + 1,
        turnFailures: before.turnFailures + (hasFailed ? 1 : 0),
        turnMs: before.turnMs + e.durationMs,
      }))
    }

    return done
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Button, Text } = $.ui.resolve(e)
    const all = await read($, stats)
    const list = rows(all)
    const room = Math.max(1, (e.viewport?.rows ?? 24) - 6)

    return (
      <Box flexDirection="column">
        <Text>{headline(all)}</Text>
        {list.length === 0 && <Text dimColor>Aucun appel d’outil compté.</Text>}
        {list.slice(0, room).map(row => (
          <Text>{row}</Text>
        ))}
        {list.length > room && <Text dimColor>+{list.length - room} autres outils</Text>}
        <Button key="clear" label="Effacer le compteur" onPress={() => clear($)} />
      </Box>
    )
  })
}
