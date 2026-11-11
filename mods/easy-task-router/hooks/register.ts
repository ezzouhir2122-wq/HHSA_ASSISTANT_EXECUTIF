import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Mode, Routed } from '../types'
import { classify } from './classify'
import type { Verdict } from './classify'

const MODES: readonly string[] = ['preview', 'on', 'off']

const log = atom({ plugin: 'easy-task-router', key: 'log' } as const, [], {
  shape: 'log-1',
})
// Le choix fait par /router pour cette session ; null : le réglage du mod.
const sessionMode = atom({ plugin: 'easy-task-router', key: 'mode' } as const, null)

const isMode = (value: string): value is Mode => MODES.includes(value)

export const summary = (list: readonly Routed[]): string => {
  const applied = list.filter(one => one.isApplied)

  if (list.length === 0) {
    return 'Aucune demande simple repérée dans cette session.'
  }

  const sum = (pick: (one: Routed) => number) =>
    applied.reduce((total, one) => total + pick(one), 0)

  return [
    `${list.length} requête${list.length > 1 ? 's' : ''} repérée${list.length > 1 ? 's' : ''} comme simple${list.length > 1 ? 's' : ''}, ${applied.length} routée${applied.length > 1 ? 's' : ''}.`,
    applied.length === 0
      ? 'Rien de routé : aucune mesure.'
      : `Routées : ${(sum(one => one.ms) / 1000).toFixed(1)} s, ${sum(one => one.inputTokens)} tokens en entrée, ${sum(one => one.outputTokens)} en sortie, ${sum(one => one.cacheReadTokens)} lus du cache. Modèle servi : ${[...new Set(applied.map(one => one.served ?? 'inconnu'))].join(', ')}.`,
    'Ces chiffres mesurent les requêtes routées, pas une économie : compare avec les mêmes tâches sans routage.',
  ].join('\n')
}

function record($: EngineInterface, one: Routed): Promise<unknown> {
  return update($, log, list => [...list, one].slice(-200))
}

export const register: Register = (on, options) => {
  const configured = String(options.mode ?? 'preview')
  const model = String(options.model ?? 'haiku')
  const maxChars = Number(options.maxChars ?? 400)
  const maxMessages = Number(options.maxMessages ?? 30)
  // Le verdict de chaque tour du fil principal, par son id.
  const verdicts = new Map<string, Verdict>()

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'router',
      description: 'Routage des demandes simples : état, preview, on ou off',
      argumentHint: 'preview | on | off',
    })

    return next(e)
  })

  on('command.run', { command: 'router' }, async ($, e) => {
    const wish = e.args.trim().toLowerCase()

    if (isMode(wish)) {
      await update($, sessionMode, () => wish)
    }

    const mode = (await read($, sessionMode)) ?? configured

    return {
      text: [
        `Routeur : mode ${mode}, modèle des tâches simples : ${model}. Dérogations dans la demande : #fort (garder le modèle courant), #simple (router).`,
        summary(await read($, log)),
      ].join('\n'),
    }
  })

  on('turn.start', ($, e, next) => {
    if (e.agentId === undefined) {
      verdicts.set(e.turnId, classify(e.text, maxChars))

      if (verdicts.size > 50) {
        verdicts.delete(verdicts.keys().next().value ?? '')
      }
    }

    return next(e)
  })

  on('turn.step', async function* ($, e, next) {
    const verdict = verdicts.get(e.turnId)
    const chosen = (await read($, sessionMode)) ?? configured
    const mode: Mode = isMode(chosen) ? chosen : 'preview'
    const isCandidate =
      mode !== 'off' &&
      e.agentId === undefined &&
      verdict?.isSimple === true &&
      e.messageCount <= maxMessages &&
      e.model !== model

    if (!isCandidate) {
      return yield* next(e)
    }

    const isApplied = mode === 'on'
    const startedAt = await $.clock.now()
    const response = yield* next(isApplied ? { ...e, model } : e)

    if (!isApplied && e.index === 0) {
      $.ui.toast(`Aperçu : ${model} conviendrait (${verdict.reason}). Rien n'a été changé.`)
    }

    await record($, {
      turnId: e.turnId,
      isApplied,
      reason: verdict.reason,
      wanted: model,
      served: response.usage?.model ?? null,
      ms: (await $.clock.now()) - startedAt,
      inputTokens: response.usage?.input_tokens ?? 0,
      outputTokens: response.usage?.output_tokens ?? 0,
      cacheReadTokens: response.usage?.cache_read_input_tokens ?? 0,
    })

    return response
  })
}
