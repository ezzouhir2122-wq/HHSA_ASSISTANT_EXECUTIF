import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Excerpt, Index, LensFile } from '../types'

const PANE = 'second-brain-lens'
const MAX_FILES = 400
const MAX_DEPTH = 5
const NEVER: Index = { files: [], scannedAt: 0, missing: [] }
// Ni fichiers cachés, ni dépendances, ni ce dont le nom annonce un secret.
const SKIPPED = /^\.|^node_modules$|secret|credential|password|passwd|token|api[-_]?key|private[-_]?key|\.env/i

const index = atom({ plugin: 'second-brain-lens', key: 'index' } as const, NEVER, {
  shape: 'index-1',
})
const query = atom({ plugin: 'second-brain-lens', key: 'query' } as const, '')
const picked = atom({ plugin: 'second-brain-lens', key: 'picked' } as const, null)

export const isListed = (name: string): boolean => !SKIPPED.test(name)

// Un dossier demandé reste sous le dossier de travail : ni absolu, ni `..`.
export const parseFolders = (value: string): string[] =>
  value
    .split(',')
    .map(one => one.trim().replace(/^\.\/+|\/+$/g, ''))
    .filter(
      one =>
        one.length > 0 &&
        !one.startsWith('/') &&
        !one.startsWith('~') &&
        one.split('/').every(part => part !== '..' && isListed(part)),
    )

export const search = (files: readonly LensFile[], text: string): LensFile[] => {
  const needle = text.trim().toLowerCase()

  return files
    .filter(file => needle.length === 0 || file.path.toLowerCase().includes(needle))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
}

export const day = (ms: number): string =>
  ms === 0 ? 'jamais' : new Date(ms).toISOString().slice(0, 16).replace('T', ' ')

async function walk(
  $: EngineInterface,
  folder: string,
  depth: number,
  found: LensFile[],
): Promise<void> {
  for (const entry of await $.fs.list(folder)) {
    if (found.length >= MAX_FILES || !isListed(entry.name)) {
      continue
    }

    const path = `${folder}/${entry.name}`

    // Un lien symbolique est `other` : jamais suivi hors du dossier choisi.
    if (entry.kind === 'dir' && depth < MAX_DEPTH) {
      await walk($, path, depth + 1, found)
    } else if (entry.kind === 'file' && /\.(md|markdown)$/i.test(entry.name)) {
      found.push({ path, mtimeMs: entry.mtimeMs, size: entry.size })
    }
  }
}

async function scan($: EngineInterface, folders: readonly string[]): Promise<Index> {
  const files: LensFile[] = []
  const missing: string[] = []

  for (const folder of folders) {
    try {
      await walk($, folder, 0, files)
    } catch {
      missing.push(folder)
    }
  }

  const next: Index = { files, scannedAt: await $.clock.now(), missing }
  await update($, index, () => next)

  return next
}

async function preview($: EngineInterface, path: string, max: number): Promise<void> {
  let one: Excerpt

  try {
    const text = await $.fs.read(path)
    one = { path, text: text.slice(0, max), isCut: text.length > max }
  } catch {
    one = { path, text: '', isCut: false }
  }

  await update($, picked, () => one)
}

async function addToPrompt($: EngineInterface, one: Excerpt): Promise<void> {
  const tail = one.isCut ? '\n[… extrait coupé]' : ''
  await $.prompt.fill({
    text: `\n\n[Extrait de ${one.path}]\n${one.text}${tail}\n`,
    mode: 'append',
  })
  $.ui.toast(`Extrait de ${one.path} ajouté à ta demande.`)
}

export const register: Register = (on, options) => {
  const folders = parseFolders(String(options.folders ?? 'intel,live,blueprints'))
  const excerptChars = Math.min(4000, Math.max(100, Number(options.excerptChars ?? 800)))

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'lens',
      description: 'Index des fichiers Markdown des dossiers choisis',
    })

    return next(e)
  })

  on('command.run', { command: 'lens' }, async $ => {
    const fresh = await scan($, folders)
    const { isPlaced } = await $.ui.open({ id: PANE, title: 'Second Brain Lens' })
    const head = `${fresh.files.length} fichier${fresh.files.length > 1 ? 's' : ''} Markdown dans ${folders.join(', ') || 'aucun dossier'}.`

    // Sans panneau dessiné, un résumé en texte.
    return {
      text: isPlaced
        ? head
        : [head, ...search(fresh.files, '').slice(0, 15).map(file => `${day(file.mtimeMs)}  ${file.path}`)].join('\n'),
    }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Button, Input, Text } = $.ui.resolve(e)
    const all = await read($, index)
    const text = await read($, query)
    const one = await read($, picked)
    const list = search(all.files, text)
    const room = Math.max(3, (e.viewport?.rows ?? 24) - (one === null ? 8 : 20))

    return (
      <Box flexDirection="column">
        <Text dimColor>
          {folders.join(', ') || 'aucun dossier'} · {all.files.length} fichiers · indexé :{' '}
          {day(all.scannedAt)}
        </Text>
        {all.missing.length > 0 && (
          <Text color="warning">Illisible : {all.missing.join(', ')}</Text>
        )}
        <Box>
          <Input
            key="query"
            label="Recherche"
            placeholder="nom de fichier"
            value={text}
            submitLabel="filtrer"
            onInput={value => update($, query, () => value)}
            onSubmit={value => update($, query, () => value)}
          />
          <Button key="refresh" label="Actualiser" onPress={() => scan($, folders)} />
        </Box>
        {all.scannedAt === 0 && <Text dimColor>Pas encore indexé : Actualiser.</Text>}
        {all.scannedAt !== 0 && list.length === 0 && (
          <Text dimColor>
            {all.files.length === 0 ? 'Aucun fichier Markdown ici.' : 'Aucun fichier ne correspond.'}
          </Text>
        )}
        {list.slice(0, room).map(file => (
          <Button key={`file:${file.path}`} plain onPress={() => preview($, file.path, excerptChars)}>
            {file.path} <Text dimColor>{day(file.mtimeMs)}</Text>
          </Button>
        ))}
        {list.length > room && <Text dimColor>+{list.length - room} autres : affine la recherche.</Text>}
        {one !== null && (
          <Box flexDirection="column" borderStyle="round">
            <Text bold>Source : {one.path}</Text>
            <Text>{one.text.length === 0 ? 'Fichier vide ou illisible.' : one.text}</Text>
            {one.isCut && <Text dimColor>[… extrait coupé à {excerptChars} caractères]</Text>}
            <Box>
              {one.text.length > 0 && (
                <Button
                  key="add"
                  variant="primary"
                  label="Ajouter à ma demande"
                  onPress={() => addToPrompt($, one)}
                />
              )}
              <Button key="close" label="Fermer l'aperçu" onPress={() => update($, picked, () => null)} />
            </Box>
          </Box>
        )}
      </Box>
    )
  })
}
