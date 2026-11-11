import { expect, test } from 'claude-code/testing'

import { inspectBash } from './detect'

test('les commandes de suppression et de remplacement sont détectées', async () => {
  expect(inspectBash('rm -rf build dist')?.paths).toEqual(['build', 'dist'])
  expect(inspectBash('cd x && sudo rm "a b.txt"')?.paths).toEqual(['a b.txt'])
  expect(inspectBash('git clean -fd')).not.toBeNull()
  expect(inspectBash('git reset --hard HEAD~1')).not.toBeNull()
  expect(inspectBash('find . -name "*.tmp" -delete')).not.toBeNull()
  expect(inspectBash("sed -i 's/a/b/g' notes.md")?.paths).toEqual(['notes.md'])
  expect(inspectBash('bash -c "rm -rf $DIR"')).not.toBeNull()
})

test('les commandes ordinaires passent', async () => {
  expect(inspectBash('ls -la')).toBeNull()
  expect(inspectBash('git status && git diff')).toBeNull()
  expect(inspectBash('npm run format')).toBeNull()
  expect(inspectBash("sed -n '1,5p' notes.md")).toBeNull()
})

test('une commande ordinaire atteint l’outil sans question', async ($, on) => {
  let ran = 0
  on('tool.call', { tool: 'Bash' }, () => {
    ran += 1

    return { result: {} }
  })

  await $.tool.call({ tool: 'Bash', command: 'ls' })
  expect(ran).toBe(1)
})

test('sans confirmation, la suppression est refusée et rien ne tourne', async ($, on) => {
  let ran = 0
  // La question n'obtient pas de réponse valable : le garde refuse.
  on('tool.call', { tool: 'AskUserQuestion' }, () => ({ deny: 'personne' }))
  on('tool.call', { tool: 'Bash' }, () => {
    ran += 1

    return { result: {} }
  })

  const answer = await $.tool.call({ tool: 'Bash', command: 'rm -rf build' })
  expect(ran).toBe(0)
  expect(answer.deny ?? answer.text).toMatch(/refusée/)
})

test('avec « Exécuter », la commande tourne une fois', async ($, on) => {
  let ran = 0
  on('tool.call', { tool: 'AskUserQuestion' }, (_, e) => ({
    result: {
      questions: e.questions,
      answers: { [e.questions[0]?.question ?? '']: 'Exécuter' },
    },
  }))
  on('tool.call', { tool: 'Bash' }, () => {
    ran += 1

    return { result: {} }
  })

  await $.tool.call({ tool: 'Bash', command: 'rm -rf build' })
  expect(ran).toBe(1)
})
