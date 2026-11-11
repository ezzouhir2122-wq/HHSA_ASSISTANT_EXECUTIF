// Règles explicites, sans appel à un second modèle. Dans le doute, la
// demande reste sur le modèle courant.

export type Verdict = { isSimple: boolean; reason: string }

// Dérogations manuelles, à écrire dans la demande.
const KEEP = /(^|\s)#fort(\s|$)/i
const FORCE = /(^|\s)#simple(\s|$)/i

// `\b` ne connaît pas les lettres accentuées : la frontière est écrite ici.
const words = (alternatives: string): RegExp =>
  new RegExp(`(?<![\\p{L}\\p{N}_])(${alternatives})(?![\\p{L}\\p{N}_])`, 'iu')

const JUDGEMENT = words(
  [
    'pourquoi|why|debug\\p{L}*|bugs?|erreurs?|errors?|architecture|con[cç]oi[st]?|concevoir|design',
    'strat[ée]gi\\p{L}*|plan\\p{L}*|analys\\p{L}*|audit\\p{L}*|refactor\\p{L}*|s[ée]curit\\p{L}*',
    'd[ée]cid\\p{L}*|d[ée]cisions?|compar\\p{L}*|impl[ée]ment\\p{L}*|constru\\p{L}*|build|fix',
    'r[ée]pare\\p{L}*|test\\p{L}*|expli(que|quer|quez)|explain|recommand\\p{L}*|[ée]value\\p{L}*',
    'review|r[ée]vis\\p{L}*',
  ].join('|'),
)

const FORMATTING = words(
  [
    'reformate\\p{L}*|formate\\p{L}*|format|mets? en forme|mise en forme|convertis\\p{L}*|convert',
    'transforme\\p{L}*|majuscules?|minuscules?|uppercase|lowercase|trie\\p{L}*|sort|ordonne\\p{L}*',
    "renomme\\p{L}*|rename|d[ée]doublonne\\p{L}*|dedupe|corrige (l['’]orthographe|les fautes)",
    'spell-?check|en (liste|tableau|json|csv|markdown|yaml)',
  ].join('|'),
)

const SORTING = words(
  'classe\\p{L}*|classify|classifie\\p{L}*|cat[ée]goris\\p{L}*|categori[sz]e|[ée]tiquette\\p{L}*|tag(ue)?\\p{L}*|regroupe\\p{L}*|group',
)

export const classify = (text: string, maxChars: number): Verdict => {
  if (KEEP.test(text)) {
    return { isSimple: false, reason: 'dérogation #fort' }
  }

  if (FORCE.test(text)) {
    return { isSimple: true, reason: 'dérogation #simple' }
  }

  if (text.trim().length === 0) {
    return { isSimple: false, reason: 'pas de texte' }
  }

  if (text.length > maxChars) {
    return { isSimple: false, reason: 'demande longue' }
  }

  if (JUDGEMENT.test(text)) {
    return { isSimple: false, reason: 'demande de jugement' }
  }

  if (FORMATTING.test(text)) {
    return { isSimple: true, reason: 'mise en forme courte' }
  }

  if (SORTING.test(text)) {
    return { isSimple: true, reason: 'classement court' }
  }

  return { isSimple: false, reason: 'non reconnue comme simple' }
}
