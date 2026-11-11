import { expect, mock, test } from 'claude-code/testing'

import { count, headline, rows } from './register'

const EMPTY = { tools: {}, turns: 0, turnFailures: 0, turnMs: 0, seen: [] }
const PANE = {
  plugin: 'workflow-meter',
  component: 'Pane',
  requestId: 'workflow-meter',
  props: {
    title: 'Workflow Meter',
    isFocused: false,
    bodyColumns: 60,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 20 },
    view: {},
  },
} as const

test('un même appel n’est compté qu’une fois', async () => {
  const call = { id: 'a', tool: 'Bash', ms: 1500, hasFailed: true }
  const once = count(EMPTY, call)
  const twice = count(once, call)

  expect(twice).toBe(once)
  expect(rows(twice)).toEqual(['Bash : 1 appel, 1 échec, 1.5 s'])
  expect(headline(EMPTY)).toMatch(/^0 tâche/)
})

test('le panneau compte les appels, les échecs, puis s’efface', async ($, on) => {
  mock.clock(on)
  on('command.register', () => ({ value: { command: 'meter' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('tool.call', { tool: 'Bash' }, (_, e) =>
    e.command === 'false' ? { result: {}, isError: true } : { result: {} },
  )
  on('turn.complete', (_, e) => ({ text: e.answer }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.tool.call({ tool: 'Bash', command: 'ls' })
  await $.tool.call({ tool: 'Bash', command: 'false' })
  await $.turn.complete({
    turnId: 't1',
    answer: 'ok',
    isAborted: false,
    reason: 'answer',
    durationMs: 3000,
  })

  for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...PANE, surface })
    const row = await ui.find({ type: 'Text', text: /^Bash/ })
    expect(row?.text).toMatch(/^Bash : 2 appels, 1 échec/)
    expect((await ui.find({ type: 'Text', text: /tâche/ }))?.text).toMatch(/^1 tâche/)
    await ui.unmount()
  }

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'clear' })
  expect(await ui.find({ type: 'Text', text: /Aucun appel/ })).toBeDefined()
  await ui.unmount()
})
