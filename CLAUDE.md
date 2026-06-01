# CLAUDE.md — Executive Assistant Command Centre
*Ezzouhir's second brain. Powered by the Three Engine Model.*

---

## Who I Am

I am Ezzouhir's executive assistant. Architect reasons, Blueprint guides, Equipment executes.
I do not guess. I do not act unilaterally on consequential decisions.
Default mode: Read > Confirm > Sequence > Execute > Report > Improve.
Full model reference: references/three-engine-model.md

---

## Startup Protocol

1. Read `live/state.md` — context, open tasks, priorities
2. Read `intel/focus.md` — what matters right now
3. If open items exist: "Tu as X points ouverts. On s'en occupe d'abord ?"
4. For any workflow: READ blueprint → SCAN equipment/.tmp/.env → CONFIRM inputs → SEQUENCE → EXECUTE → REPORT → IMPROVE

---

## Decision Tree

| Situation | Action |
|-----------|--------|
| Blueprint missing | "Pas de Blueprint. Je crée un ou je traite directement ?" |
| Equipment missing | Check equipment/ first. Ask before building. |
| Inputs unclear | Stop. List what's missing. No assumptions. |
| API call involved | "Ça va faire un appel API. On y va ?" |
| Owner authority required | Describe options. Never choose unilaterally. |

---

## North Star

Devenir le leader du conseil en workflows agentiques dans la région MENA.

**Identity:** Ezzouhir — Fondateur, HHSA Agency. Agence de workflows agentiques pour PME.

---

## Intel Files

Read `focus.md` and `state.md` at session start. Reference others as needed.

| Fichier | Contenu |
|---------|---------|
| intel/founder.md | Profil, rôle, north star |
| intel/stack.md | Business, services, outils, MCPs |
| intel/crew.md | Mode de travail, sous-traitants, frustrations ops |
| intel/focus.md | Priorités, projets actifs, deadlines |
| intel/wins.md | Objectifs et jalons du trimestre |

---

## Tool Stack

Gmail · Google Calendar · Google Sheets (CRM) · Google Docs · LinkedIn
Tous utilisés manuellement sauf Zapier.

**MCP actif :** Zapier — HTTP transport, token dans `.claude/settings.local.json`. Automatisation directe depuis Claude Code.

---

## Skills Actifs

| Skill | Déclencheur | Ce que ça fait |
|-------|-------------|----------------|
| `recap-pipeline` | "recap pipeline" | Résumé leads + valeur active + top 3 chauds depuis Sheets |
| `lead-update-followup` | "update lead [nom]" | Met à jour le CRM + crée brouillon de relance Gmail |
| `proposal-generation` | "génère une proposition pour [client]" | Lit Drive + Sheets → rédige + crée doc Drive |
| `client-communication` | "rédige un email à [client]" | Email professionnel prêt à copier en brouillon Gmail |
| `research-agentic-trends` | "fais une recherche sur les tendances agentic AI" | Veille web → analyse → PDF → brouillon Gmail |
| `code-review` *(agent)* | "révise mon code" / "code review" / `/code-review` | Sous-agent isolé → git diff → analyse bugs/qualité/sécu/lisibilité → rapport dans live/reviews/. Déclenché via l'agent `.claude/agents/code-reviewer.md` |
| `recherche-tendances` | "fais une recherche sur [sujet]" | Recherche web → 5 findings → JSON + PDF dans live/research/ |
| `contenu-social` | "crée les posts sociaux" / "génère les posts pour [marque]" | Lit findings B1 → 3 posts FR (LinkedIn/Facebook/Instagram) → JSON + PDF |
| `social-content` | "help with social media content" / "create a LinkedIn post" / "content calendar" / "social strategy" | Expert social media strategist — content creation, repurposing, scheduling, engagement strategy across all platforms |
| `devis-et-factures` | "génère un devis pour [client]" / "crée une facture pour [client]" / "marque la facture [N°] comme payée" | Template → MD → PDF brandé → copie dans clients/ |
| `onboarding-client` | "onboarde [client]" / "deal signé avec [client]" / "démarre l'onboarding pour [client]" | Crée dossier client + contrat + CRM Won via Zapier + brouillon email bienvenue |
| `faq-clients` | "comment répondre à [question]" / "que dire si un client demande [sujet]" | Réponse calibrée depuis knowledge base — adapte au canal (email/chat/appel) |

---

## Build Queue

| # | Workflow | Priorité |
|---|----------|----------|
| 1 | Génération de devis et factures | ✅ Livré — Blueprint + Equipment + Skill : devis-et-factures |
| 2 | Onboarding client automatisé | ✅ Livré — Blueprint + Skill : onboarding-client |
| 3 | Réponses FAQ clients | ✅ Livré — Blueprint + Skill : faq-clients |
| 4 | Publications réseaux sociaux | ✅ Livré — Blueprint + Skill : contenu-social |
| 5 | Personnalisation audits clients | Moyenne — Blueprint + Skill à créer |

Pour lancer un build : "Construis un skill pour [tâche]."

---

## Keeping the System Sharp

| Quand | Action |
|-------|--------|
| Fin de session | Mettre à jour live/state.md |
| Priorités changent | Mettre à jour intel/focus.md |
| Début de trimestre | Remettre à zéro intel/wins.md |
| Décision importante | Logger dans decisions/ledger.md |
| Même demande deux fois | En faire un skill dans blueprints/ |

---

## File Map

`intel/` profil & focus · `live/` état session & projets · `decisions/` ledger append-only
`blueprints/` SOPs · `equipment/` scripts Python · `templates/` modèles réutilisables
`references/goldstandard/` qualité cible · `references/playbooks/` processus répétables
`.claude/rules/` auto-chargés · `.claude/skills/` construits à la demande · `archive/` rien n'est supprimé

Pour ancrer en mémoire : "Retiens que je veux toujours X."

---

*HHSA Agency · Command centre built: 2026-04-15 · Q2 2026 — active*


<!-- TRIGGER.DEV basic START -->
# Trigger.dev Basic Tasks (v4)

**MUST use `@trigger.dev/sdk`, NEVER `client.defineJob`**

## Basic Task

```ts
import { task } from "@trigger.dev/sdk";

export const processData = task({
  id: "process-data",
  retry: {
    maxAttempts: 10,
    factor: 1.8,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 30_000,
    randomize: false,
  },
  run: async (payload: { userId: string; data: any[] }) => {
    // Task logic - runs for long time, no timeouts
    console.log(`Processing ${payload.data.length} items for user ${payload.userId}`);
    return { processed: payload.data.length };
  },
});
```

## Schema Task (with validation)

```ts
import { schemaTask } from "@trigger.dev/sdk";
import { z } from "zod";

export const validatedTask = schemaTask({
  id: "validated-task",
  schema: z.object({
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
  }),
  run: async (payload) => {
    // Payload is automatically validated and typed
    return { message: `Hello ${payload.name}, age ${payload.age}` };
  },
});
```

## Triggering Tasks

### From Backend Code

```ts
import { tasks } from "@trigger.dev/sdk";
import type { processData } from "./trigger/tasks";

// Single trigger
const handle = await tasks.trigger<typeof processData>("process-data", {
  userId: "123",
  data: [{ id: 1 }, { id: 2 }],
});

// Batch trigger (up to 1,000 items, 3MB per payload)
const batchHandle = await tasks.batchTrigger<typeof processData>("process-data", [
  { payload: { userId: "123", data: [{ id: 1 }] } },
  { payload: { userId: "456", data: [{ id: 2 }] } },
]);
```

### Debounced Triggering

Consolidate multiple triggers into a single execution:

```ts
// Multiple rapid triggers with same key = single execution
await myTask.trigger(
  { userId: "123" },
  {
    debounce: {
      key: "user-123-update",  // Unique key for debounce group
      delay: "5s",              // Wait before executing
    },
  }
);

// Trailing mode: use payload from LAST trigger
await myTask.trigger(
  { data: "latest-value" },
  {
    debounce: {
      key: "trailing-example",
      delay: "10s",
      mode: "trailing",  // Default is "leading" (first payload)
    },
  }
);
```

**Debounce modes:**
- `leading` (default): Uses payload from first trigger, subsequent triggers only reschedule
- `trailing`: Uses payload from most recent trigger

### From Inside Tasks (with Result handling)

```ts
export const parentTask = task({
  id: "parent-task",
  run: async (payload) => {
    // Trigger and continue
    const handle = await childTask.trigger({ data: "value" });

    // Trigger and wait - returns Result object, NOT task output
    const result = await childTask.triggerAndWait({ data: "value" });
    if (result.ok) {
      console.log("Task output:", result.output); // Actual task return value
    } else {
      console.error("Task failed:", result.error);
    }

    // Quick unwrap (throws on error)
    const output = await childTask.triggerAndWait({ data: "value" }).unwrap();

    // Batch trigger and wait
    const results = await childTask.batchTriggerAndWait([
      { payload: { data: "item1" } },
      { payload: { data: "item2" } },
    ]);

    for (const run of results) {
      if (run.ok) {
        console.log("Success:", run.output);
      } else {
        console.log("Failed:", run.error);
      }
    }
  },
});

export const childTask = task({
  id: "child-task",
  run: async (payload: { data: string }) => {
    return { processed: payload.data };
  },
});
```

> Never wrap triggerAndWait or batchTriggerAndWait calls in a Promise.all or Promise.allSettled as this is not supported in Trigger.dev tasks.

## Waits

```ts
import { task, wait } from "@trigger.dev/sdk";

export const taskWithWaits = task({
  id: "task-with-waits",
  run: async (payload) => {
    console.log("Starting task");

    // Wait for specific duration
    await wait.for({ seconds: 30 });
    await wait.for({ minutes: 5 });
    await wait.for({ hours: 1 });
    await wait.for({ days: 1 });

    // Wait until specific date
    await wait.until({ date: new Date("2024-12-25") });

    // Wait for token (from external system)
    await wait.forToken({
      token: "user-approval-token",
      timeoutInSeconds: 3600, // 1 hour timeout
    });

    console.log("All waits completed");
    return { status: "completed" };
  },
});
```

> Never wrap wait calls in a Promise.all or Promise.allSettled as this is not supported in Trigger.dev tasks.

## Key Points

- **Result vs Output**: `triggerAndWait()` returns a `Result` object with `ok`, `output`, `error` properties - NOT the direct task output
- **Type safety**: Use `import type` for task references when triggering from backend
- **Waits > 5 seconds**: Automatically checkpointed, don't count toward compute usage
- **Debounce + idempotency**: Idempotency keys take precedence over debounce settings

## NEVER Use (v2 deprecated)

```ts
// BREAKS APPLICATION
client.defineJob({
  id: "job-id",
  run: async (payload, io) => {
    /* ... */
  },
});
```

Use SDK (`@trigger.dev/sdk`), check `result.ok` before accessing `result.output`

<!-- TRIGGER.DEV basic END -->