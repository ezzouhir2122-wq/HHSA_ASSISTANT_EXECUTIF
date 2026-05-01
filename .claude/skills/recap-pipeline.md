# Skill — Récap Pipeline

Exécute le résumé complet du pipeline commercial depuis Google Sheets via Zapier.
Ne demande rien avant de commencer — toutes les données viennent du sheet.

---

## Séquence

**Étape 1 — Vérifier les actions Zapier disponibles**

Appeler `list_enabled_zapier_actions`.
Identifier l'action de lecture Google Sheets (type "find rows" ou équivalent).
Si absente : `discover_zapier_actions` avec le terme "Google Sheets", puis `enable_zapier_action` avant de continuer.

**Étape 2 — Lire le sheet**

Exécuter `execute_zapier_read_action` sur le sheet "Leads & Pipeline (Sample)".
Récupérer toutes les lignes avec leurs colonnes : Company, Contact, Stage, Deal Value, Next Step, Next Step Date.

**Étape 3 — Compter les leads par étape**

Grouper les lignes par valeur de la colonne "Stage".
Produire un tableau : étape → nombre de leads.

**Étape 4 — Calculer la valeur active**

Étapes actives : `Quote sent` + `Discovery booked` + `Audit in progress`.
Sommer la colonne "Deal Value" pour ces trois étapes uniquement.

**Étape 5 — Identifier les 3 leads les plus chauds**

Critères de priorisation (dans l'ordre) :
1. Étape la plus avancée (Quote sent > Discovery booked > Audit in progress)
2. Valeur du deal (plus élevée = priorité)
3. Next step prévue dans les 7 prochains jours

Pour chaque lead : entreprise, contact, étape, valeur, next step + date.

**Étape 6 — Afficher le résumé**

Utiliser exactement ce format :

```
RÉSUMÉ PIPELINE — [date du jour]

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

## Gestion des erreurs

| Situation | Action |
|-----------|--------|
| Action Zapier absente | Chercher et activer via `discover_zapier_actions` |
| Sheet introuvable | Signaler l'erreur. Demander l'ID ou le nom correct. |
| Colonnes manquantes ou renommées | Lister les colonnes trouvées. Confirmer le mapping avant d'analyser. |
| Données vides | Produire le résumé avec les données disponibles + noter les lignes incomplètes |

---

*Skill créé : 2026-04-29 · Source : blueprints/pipeline-summary-lundi.md · Route : Zapier → Google Sheets*
