// Détection des commandes sensibles. Heuristique, pas une garantie : une
// commande construite à l'exécution (variable, script appelé) peut passer.

export type Finding = { reason: string; paths: string[] }

const SEPARATORS = /&&|\|\||[;|\n]/
const DELETERS = new Set(['rm', 'rmdir', 'unlink', 'shred', 'truncate'])
const WRAPPERS = new Set(['sudo', 'command', 'nohup', 'time', 'xargs', 'env'])
const NESTED = /(^|[\s"'`(;|&])(rm|rmdir|unlink|shred)\s/

const tokenize = (segment: string): string[] =>
  (segment.match(/"[^"]*"|'[^']*'|\S+/g) ?? []).map(token =>
    token.replace(/^(["'])(.*)\1$/, '$2'),
  )

const operands = (tokens: string[]): string[] =>
  tokens.filter(token => !token.startsWith('-'))

const stripWrappers = (tokens: string[]): string[] => {
  let rest = tokens

  while (
    rest.length > 0 &&
    (WRAPPERS.has(rest[0] ?? '') || /^[A-Za-z_]\w*=/.test(rest[0] ?? ''))
  ) {
    rest = rest.slice(1)

    while (rest[0]?.startsWith('-') === true) {
      rest = rest.slice(1)
    }
  }

  return rest
}

const inspectGit = (args: string[]): Finding | null => {
  const [verb, ...rest] = args
  const has = (flag: RegExp) => rest.some(arg => flag.test(arg))

  if (verb === 'clean') {
    return { reason: 'git clean supprime les fichiers non suivis', paths: operands(rest) }
  }

  if (verb === 'rm') {
    return { reason: 'git rm supprime des fichiers', paths: operands(rest) }
  }

  if (verb === 'reset' && has(/^--hard$/)) {
    return { reason: 'git reset --hard écrase les modifications locales', paths: [] }
  }

  if ((verb === 'checkout' && has(/^(\.|--)$/)) || verb === 'restore') {
    return { reason: 'git écrase des modifications non commitées', paths: operands(rest) }
  }

  if (verb === 'branch' && has(/^(-D|--delete|-d)$/)) {
    return { reason: 'suppression de branche git', paths: operands(rest) }
  }

  if (verb === 'stash' && has(/^(drop|clear)$/)) {
    return { reason: 'suppression de stash git', paths: [] }
  }

  return null
}

const inspectSegment = (segment: string): Finding | null => {
  const tokens = stripWrappers(tokenize(segment.trim()))
  const [head = '', ...args] = tokens
  const name = head.split('/').pop() ?? head

  if (DELETERS.has(name)) {
    return { reason: `${name} supprime ou vide des fichiers`, paths: operands(args) }
  }

  if (name === 'git') {
    return inspectGit(args)
  }

  if (name === 'find' && args.some(arg => arg === '-delete' || arg === 'rm')) {
    return { reason: 'find avec suppression', paths: operands(args).slice(0, 1) }
  }

  if (name === 'sed' && args.some(arg => /^(-i|--in-place)/.test(arg))) {
    return { reason: 'sed -i remplace en place', paths: operands(args).slice(1) }
  }

  if (name === 'perl' && args.some(arg => /^-\w*i/.test(arg))) {
    return { reason: 'perl -i remplace en place', paths: operands(args).slice(1) }
  }

  if (name === 'dd' && args.some(arg => arg.startsWith('of='))) {
    return { reason: 'dd écrase sa cible', paths: args.filter(arg => arg.startsWith('of=')) }
  }

  return null
}

export const inspectBash = (command: string): Finding | null => {
  const found = command
    .split(SEPARATORS)
    .map(inspectSegment)
    .filter((one): one is Finding => one !== null)

  if (found.length > 0) {
    return {
      reason: [...new Set(found.map(one => one.reason))].join(' ; '),
      paths: [...new Set(found.flatMap(one => one.paths))],
    }
  }

  // Une suppression imbriquée (sh -c, $(...), boucle) : chemins inconnus.
  return NESTED.test(command)
    ? { reason: 'suppression possible dans une commande imbriquée', paths: [] }
    : null
}
