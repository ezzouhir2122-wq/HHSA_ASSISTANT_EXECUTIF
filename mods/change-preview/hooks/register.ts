import type { EngineInterface, Register } from 'claude-code'

import { inspectBash } from './detect'
import type { Finding } from './detect'

const RUN = 'Exécuter'
const REFUSE = 'Refuser'
const TIMED_OUT = 'timed-out'

const preview = (what: string, finding: Finding): string => {
  const paths =
    finding.paths.length === 0
      ? 'chemins non déterminés'
      : finding.paths.slice(0, 8).join(', ') +
        (finding.paths.length > 8 ? ` (+${finding.paths.length - 8})` : '')

  return `Opération sensible : ${finding.reason}. Cible : ${paths}. Commande : ${what.slice(0, 300)} — on exécute ?`
}

// Seule la réponse exacte « Exécuter » laisse passer : un refus, un texte
// libre, un délai dépassé ou une question impossible à poser refusent.
async function isApproved(
  $: EngineInterface,
  what: string,
  finding: Finding,
  timeoutMs: number,
): Promise<boolean> {
  const answer = await Promise.race([
    $.ui.ask(preview(what, finding), {
      options: [RUN, REFUSE],
      header: 'Aperçu',
    }),
    new Promise<string>(resolve => {
      void $.clock.after(timeoutMs, () => resolve(TIMED_OUT))
    }),
  ])

  return answer === RUN
}

function refusal($: EngineInterface): { deny: string } {
  return {
    deny: `${$.plugin.name}: opération refusée (pas de confirmation explicite). Ne pas réessayer sans l'accord de l'utilisateur.`,
  }
}

export const register: Register = (on, options) => {
  const timeoutMs = Math.max(10, Number(options.timeoutSeconds ?? 300)) * 1000

  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    const finding = inspectBash(e.command)

    if (finding === null) {
      return next(e)
    }

    return (await isApproved($, e.command, finding, timeoutMs))
      ? next(e)
      : refusal($)
  }).catch(($, e, next) => (next.called ? next(e) : refusal($)))

  on('tool.call', { tool: 'Edit' }, async ($, e, next) => {
    if (e.replace_all !== true) {
      return next(e)
    }

    const finding: Finding = {
      reason: 'remplacement de toutes les occurrences',
      paths: [e.file_path],
    }
    const what = `"${e.old_string.slice(0, 80)}" → "${e.new_string.slice(0, 80)}"`

    return (await isApproved($, what, finding, timeoutMs))
      ? next(e)
      : refusal($)
  }).catch(($, e, next) => (next.called ? next(e) : refusal($)))
}
