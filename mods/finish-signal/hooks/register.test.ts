import { expect, mock, test } from 'claude-code/testing'

import { taskName } from './register'

const TURN = { turnId: 't1', answer: 'ok', isAborted: false } as const

const typed = (command: string, args: string) =>
  ({
    command,
    args,
    origin: { kind: 'composer' },
    presentation: { isFullscreen: true, columns: 80 },
  }) as const

test('le nom de tâche masque ce qui ressemble à une donnée sensible', async () => {
  expect(taskName('Envoie le devis à jean@exemple.com demain matin stp merci')).toBe(
    'Envoie le devis à … demain',
  )
  expect(taskName('   ')).toBe('tâche')
})

test('un seul signal par tâche, et aucun en mode silencieux', async ($, on) => {
  mock.store(on)
  const toasts: string[] = []
  on('ui.toast', (_, e) => {
    toasts.push(e.text)

    return { value: undefined }
  })
  on('command.register', () => ({ value: { command: 'finish-signal' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('turn.start', (_, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_, e) => ({ text: e.answer }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.turn.start({ text: 'Range les fichiers', turnId: 't1' })
  await $.turn.complete({ ...TURN, reason: 'answer', durationMs: 60_000 })
  await $.turn.complete({ ...TURN, reason: 'answer', durationMs: 60_000 })
  expect(toasts).toEqual(['« Range les fichiers » : terminée en 60 s.'])

  // Une tâche courte ne signale pas ; une erreur signale toujours.
  await $.turn.complete({ ...TURN, turnId: 't2', reason: 'answer', durationMs: 2000 })
  expect(toasts.length).toBe(1)
  await $.turn.complete({ ...TURN, turnId: 't3', reason: 'error', durationMs: 2000 })
  expect(toasts[1]).toMatch(/intervention/)

  await $.command.run(typed('finish-signal', 'quiet'))
  await $.turn.complete({ ...TURN, turnId: 't4', reason: 'answer', durationMs: 90_000 })
  expect(toasts.length).toBe(2)
})
