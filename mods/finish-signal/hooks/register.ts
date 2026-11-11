import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Label } from '../types'

const NAME = 'finish-signal'
const QUIET_KEY = 'isQuiet'

const label = atom({ plugin: 'finish-signal', key: 'label' } as const, null)
const isQuiet = atom({ plugin: 'finish-signal', key: 'isQuiet' } as const, false)
// Les événements déjà signalés (tours et questions), pour ne jamais répéter.
const signalled = atom({ plugin: 'finish-signal', key: 'signalled' } as const, [], {
  shape: 'signalled-1',
})

// Les premiers mots de la demande, sans ce qui ressemble à une donnée
// sensible (adresse, long identifiant, suite de chiffres).
export const taskName = (text: string): string => {
  const words = text
    .split(/\s+/)
    .filter(word => word.length > 0)
    .slice(0, 6)
    .map(word =>
      word.length > 24 || word.includes('@') || /\d{6,}/.test(word) ? '…' : word,
    )
  const name = words.join(' ').slice(0, 48)

  return name.length === 0 ? 'tâche' : name
}

// Vrai la première fois qu'un événement est vu, faux ensuite.
async function isFirst($: EngineInterface, id: string): Promise<boolean> {
  let isNew = false
  await update($, signalled, list => {
    isNew = !list.includes(id)

    return isNew ? [...list, id].slice(-100) : list
  })

  return isNew
}

async function signal($: EngineInterface, id: string, text: string): Promise<void> {
  if ((await read($, isQuiet)) || !(await isFirst($, id))) {
    return
  }

  $.ui.toast(text, { timeoutMs: 8000 })
}

export const register: Register = (on, options) => {
  const minMs = Math.max(0, Number(options.minSeconds ?? 20)) * 1000
  const hasName = options.showTaskName !== false

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'finish-signal',
      description: 'Signal de fin de tâche : quiet, on ou status',
      argumentHint: 'quiet | on | status',
    })
    const stored = await $.store.get(QUIET_KEY)
    await update($, isQuiet, () => stored === true)

    return next(e)
  })

  on('command.run', { command: 'finish-signal' }, async ($, e) => {
    const wish = e.args.trim().toLowerCase()

    if (wish === 'quiet' || wish === 'on') {
      await update($, isQuiet, () => wish === 'quiet')
      await $.store.set(QUIET_KEY, wish === 'quiet')
    }

    const state = (await read($, isQuiet)) ? 'mode silencieux' : 'actif'

    return {
      text: `Signal de fin de tâche : ${state}. Usage : /${NAME} quiet | on | status`,
    }
  })

  on('turn.start', async ($, e, next) => {
    if (e.agentId === undefined) {
      const one: Label = { turnId: e.turnId, text: taskName(e.text) }
      await update($, label, () => one)
    }

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const done = await next(e)

    if (e.agentId !== undefined) {
      return done
    }

    const known = await read($, label)
    const name =
      hasName && known !== null && known.turnId === e.turnId
        ? `« ${known.text} »`
        : 'La tâche'
    const seconds = Math.round(e.durationMs / 1000)

    if (e.reason === 'error' || e.reason === 'refusal') {
      await signal($, e.turnId, `${name} s'est arrêtée (${e.reason === 'error' ? 'erreur' : 'refus'}) : ton intervention est requise.`)
    } else if (e.reason === 'aborted') {
      await signal($, e.turnId, `${name} : interrompue après ${seconds} s.`)
    } else if (e.durationMs >= minMs) {
      await signal($, e.turnId, `${name} : terminée en ${seconds} s.`)
    }

    return done
  })

  on('tool.call', { tool: 'AskUserQuestion' }, async ($, e, next) => {
    await signal($, e.tool_use_id, 'Une décision t’attend pour continuer.')

    return next(e)
  })
}
