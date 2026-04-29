# Blueprint — Pipeline Summary du Lundi Matin

**Goal:** Lire le Google Sheet "Leads & Pipeline" via Zapier et produire un résumé structuré du pipeline pour démarrer la semaine avec une vision claire.

**Quand utiliser ce Blueprint:**
Chaque lundi matin, ou à la demande pour un état des lieux rapide du pipeline.
Déclencheurs : "Résumé pipeline", "État du pipeline", "On est où sur les leads ?", "Récap du lundi"

**Route MCP :** Zapier → Google Sheets (lecture seule)

---

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Accès Zapier actif | Token Zapier configuré dans `.claude/settings.local.json` | Oui |
| Nom du sheet | "Leads & Pipeline (Sample)" ou ID du sheet | Oui |
| Action Zapier "Sheets read" | Action "Google Sheets — Find Rows" activée dans Zapier | Oui |
| Date du lundi | Pour identifier les next steps "cette semaine" | Oui (auto : date du jour) |

Si l'action Zapier n'est pas activée → activer via `discover_zapier_actions` + `enable_zapier_action` avant de continuer.

---

## Séquence

**Étape 1 — Vérifier les actions Zapier disponibles**
Appeler `list_enabled_zapier_actions`. Confirmer qu'une action de lecture Google Sheets est présente.
Si absente : `discover_zapier_actions` avec le terme "Google Sheets", puis `enable_zapier_action`.

**Étape 2 — Lire le sheet**
Exécuter `execute_zapier_read_action` sur le sheet "Leads & Pipeline (Sample)".
Récupérer toutes les lignes avec leurs colonnes : Company, Contact, Stage, Deal Value, Next Step, Next Step Date.

**Étape 3 — Compter les leads par étape**
Grouper les lignes par valeur de la colonne "Stage".
Produire un tableau : étape → nombre de leads.

**Étape 4 — Calculer la valeur totale des étapes actives**
Étapes actives : `Quote sent` + `Discovery booked` + `Audit in progress`.
Sommer la colonne "Deal Value" pour ces trois étapes uniquement.

**Étape 5 — Identifier les 3 leads les plus chauds**
Critères de priorisation (dans l'ordre) :
1. Étape la plus avancée (Quote sent > Discovery booked > Audit in progress)
2. Valeur du deal (plus élevée = priorité)
3. Next step prévue cette semaine (date dans les 7 prochains jours)

Pour chaque lead sélectionné : nom de l'entreprise, contact, étape, valeur, next step + date.

**Étape 6 — Formatter et présenter le résumé**
Afficher le rapport structuré selon le format Output ci-dessous.

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Action Zapier absente | Chercher et activer via `discover_zapier_actions` |
| Sheet introuvable | Signaler l'erreur exacte. Demander l'ID ou le nom correct du sheet. |
| Colonnes manquantes ou renommées | Lister les colonnes trouvées. Confirmer le mapping avant d'analyser. |
| Données vides ou incomplètes | Produire le résumé avec les données disponibles + noter les lignes incomplètes |

---

## Output Attendu

```
RÉSUMÉ PIPELINE — Lundi [date]

─── LEADS PAR ÉTAPE ───────────────────────────
| Étape               | Nombre |
|---------------------|--------|
| Prospecting         |   X    |
| Discovery booked    |   X    |
| Audit in progress   |   X    |
| Quote sent          |   X    |
| Won                 |   X    |
| Lost                |   X    |

─── VALEUR ACTIVE (Quote sent + Discovery + Audit) ──
Total : $XX,XXX

─── TOP 3 LEADS CHAUDS ────────────────────────
1. [Entreprise] — [Contact] — [Étape] — $[Valeur]
   Next step : [action] → [date]

2. [Entreprise] — [Contact] — [Étape] — $[Valeur]
   Next step : [action] → [date]

3. [Entreprise] — [Contact] — [Étape] — $[Valeur]
   Next step : [action] → [date]
```

---

*Blueprint créé : 2026-04-28*
*Route : Zapier → Google Sheets · Référence : references/three-engine-model.md*
