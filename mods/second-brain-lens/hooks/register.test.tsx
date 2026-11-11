import type { FsEntry } from 'claude-code'
import { expect, mock, test } from 'claude-code/testing'
import type { TestBody } from 'claude-code/testing'

import { isListed, parseFolders, search } from './register'

const PANE = {
  plugin: 'second-brain-lens',
  component: 'Pane',
  requestId: 'second-brain-lens',
  props: {
    title: 'Second Brain Lens',
    isFocused: false,
    bodyColumns: 60,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

const typed = (command: string, args: string) =>
  ({
    command,
    args,
    origin: { kind: 'composer' },
    presentation: { isFullscreen: true, columns: 80 },
  }) as const

const file = (name: string, mtimeMs: number): FsEntry => ({
  name,
  kind: 'file',
  size: 10,
  mtimeMs,
  isLink: false,
})

const TREE: Record<string, FsEntry[]> = {
  intel: [
    file('focus.md', 2000),
    file('founder.md', 1000),
    file('.hidden.md', 3000),
    file('api-keys.md', 3000),
    file('notes.txt', 3000),
    { name: 'deep', kind: 'dir', size: 0, mtimeMs: 0, isLink: false },
    { name: 'link.md', kind: 'other', size: 0, mtimeMs: 0, isLink: true },
  ],
  'intel/deep': [file('plan.md', 500)],
  live: [],
}

const stand = (on: Parameters<TestBody>[1], fills: string[]) => {
  mock.clock(on)
  on('command.register', () => ({ value: { command: 'lens' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('ui.toast', () => ({ value: undefined }))
  on('fs.list', (_, e) => {
    // Le chemin arrive absolu, résolu depuis le dossier de travail.
    const entries = TREE[e.path.split('/second-brain-lens/')[1] ?? '']

    if (entries === undefined) {
      throw new Error('missing')
    }

    return { value: entries }
  })
  on('fs.read', (_, e) => ({
    value: e.path.endsWith('/intel/focus.md') ? `Focus du trimestre. ${'x'.repeat(2000)}` : '',
  }))
  on('prompt.fill', (_, e) => {
    fills.push(e.text)

    return { isFilled: true, text: e.text, cursor: e.text.length }
  })
}

test('les fichiers cachés, les secrets et les chemins hors dossier sont écartés', async () => {
  expect(isListed('focus.md')).toBe(true)
  expect(isListed('.env.md')).toBe(false)
  expect(isListed('client-secrets.md')).toBe(false)
  expect(parseFolders('intel, ./live/, ../ailleurs, /etc, .wolf, ~/x')).toEqual(['intel', 'live'])
  expect(search([{ path: 'a/Focus.md', mtimeMs: 1, size: 1 }], 'focus').length).toBe(1)
})

test('index, recherche, extrait borné, puis ajout à la demande', async ($, on) => {
  const fills: string[] = []
  stand(on, fills)

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const shown = await $.command.run(typed('lens', ''))
  // blueprints n'existe pas dans l'arbre : signalé, sans faire échouer l'index.
  expect(shown.text).toMatch(/^3 fichiers Markdown/)

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect(await ui.find({ key: 'file:intel/focus.md' })).toBeDefined()
    expect(await ui.find({ key: 'file:intel/deep/plan.md' })).toBeDefined()
    expect(await ui.find({ key: 'file:intel/api-keys.md' })).toBeUndefined()
    expect(await ui.find({ key: 'file:intel/link.md' })).toBeUndefined()
    expect((await ui.find({ type: 'Text', text: /Illisible/ }))?.text).toMatch(/blueprints/)

    await ui.input({ key: 'query', text: 'founder' })
    expect(await ui.find({ key: 'file:intel/focus.md' })).toBeUndefined()
    expect(await ui.find({ key: 'file:intel/founder.md' })).toBeDefined()
    await ui.input({ key: 'query', text: '' })

    // Rien n'entre dans la demande avant l'appui sur « Ajouter ».
    await ui.press({ key: 'file:intel/focus.md' })
    expect((await ui.find({ type: 'Text', text: /^Source/ }))?.text).toBe('Source : intel/focus.md')
    expect(fills.length).toBe(0)
    await ui.press({ key: 'add' })
    expect(fills.length).toBe(1)
    expect(fills[0]).toMatch(/^\n\n\[Extrait de intel\/focus\.md\]\nFocus du trimestre\./)
    expect((fills[0] ?? '').length).toBeLessThan(900)

    // Un fichier vide : un état clair, et rien à ajouter.
    await ui.press({ key: 'file:intel/founder.md' })
    expect(await ui.find({ type: 'Text', text: /vide ou illisible/ })).toBeDefined()
    expect(await ui.find({ key: 'add' })).toBeUndefined()
    await ui.press({ key: 'close' })
    fills.length = 0
    await ui.unmount()
  }
})

test('avant tout index, un état vide clair sur chaque surface', async $ => {
  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    expect(await ui.find({ type: 'Text', text: /Pas encore indexé/ })).toBeDefined()
    await ui.unmount()
  }
})
