import { expect, mock, test } from 'claude-code/testing'
import type { TestBody } from 'claude-code/testing'

import { classify } from './classify'

const USAGE = {
  model: 'served-model',
  input_tokens: 10,
  output_tokens: 5,
  cache_read_input_tokens: 0,
  cache_creation_input_tokens: 0,
}

const typed = (command: string, args: string) =>
  ({
    command,
    args,
    origin: { kind: 'composer' },
    presentation: { isFullscreen: true, columns: 80 },
  }) as const

test('simple, complexe et cas limites', async () => {
  expect(classify('Trie cette liste par ordre alphabétique', 400).isSimple).toBe(true)
  expect(classify('Convertis ce tableau en JSON', 400).isSimple).toBe(true)
  expect(classify('Classe ces titres par thème', 400).isSimple).toBe(true)
  expect(classify('Étiquette ces emails', 400).isSimple).toBe(true)
  // Jugement, même court, et même avec un mot de mise en forme.
  expect(classify('Pourquoi ce script plante ?', 400).isSimple).toBe(false)
  expect(classify('Évalue cette offre et mets en forme ta réponse', 400).isSimple).toBe(false)
  expect(classify('Conçois le plan du projet', 400).isSimple).toBe(false)
  // Limites : longueur, vide, demande inconnue, dérogations.
  expect(classify(`Trie ${'x'.repeat(500)}`, 400).reason).toBe('demande longue')
  expect(classify('', 400).isSimple).toBe(false)
  expect(classify('Bonjour', 400).isSimple).toBe(false)
  expect(classify('Trie cette liste #fort', 400).isSimple).toBe(false)
  expect(classify('Analyse ce texte #simple', 400).isSimple).toBe(true)
})

const run = async (
  $: Parameters<TestBody>[0],
  turnId: string,
  text: string,
  messageCount = 3,
) => {
  await $.turn.start({ text, turnId })
  for await (const _ of $.turn.step({
    turnId,
    index: 0,
    model: 'big-model',
    messageCount,
  })) {
    // Les morceaux ne comptent pas ici.
  }
}

const stand = (on: Parameters<TestBody>[1], models: string[]) => {
  mock.clock(on)
  on('command.register', () => ({ value: { command: 'router' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('turn.start', (_, e) => ({ turnId: e.turnId }))
  on('ui.toast', () => ({ value: undefined }))
  on('turn.step', async function* (_, e) {
    models.push(e.model)

    return {
      turnId: e.turnId,
      index: e.index,
      answer: 'ok',
      toolUses: [],
      stopReason: 'end_turn',
      usage: USAGE,
    }
  })
}

test('en aperçu, le modèle ne change jamais', async ($, on) => {
  const models: string[] = []
  stand(on, models)

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await run($, 't1', 'Trie cette liste')
  expect(models).toEqual(['big-model'])
})

test('activé, seules les demandes simples au contexte court sont routées', async ($, on) => {
  const models: string[] = []
  stand(on, models)

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.command.run(typed('router', 'on'))
  await run($, 't1', 'Trie cette liste')
  await run($, 't2', 'Pourquoi ce script plante ?')
  await run($, 't3', 'Trie cette liste', 500)
  await run($, 't4', 'Trie cette liste #fort')
  expect(models).toEqual(['haiku', 'big-model', 'big-model', 'big-model'])

  const shown = await $.command.run(typed('router', ''))
  expect(shown.text).toMatch(/1 requête repérée comme simple, 1 routée/)
  expect(shown.text).toMatch(/served-model/)

  await $.command.run(typed('router', 'off'))
  await run($, 't5', 'Trie cette liste')
  expect(models[4]).toBe('big-model')
})
