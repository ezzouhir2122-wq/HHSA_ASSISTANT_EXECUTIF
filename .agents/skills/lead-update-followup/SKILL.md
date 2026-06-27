---
name: lead-update-followup
description: Met à jour un lead dans Google Sheets (étape + Last Contact) via Zapier, puis crée un brouillon d'email de relance dans Gmail. Demande confirmation avant chaque action d'écriture.
allowed-tools: mcp__zapier__list_enabled_zapier_actions, mcp__zapier__discover_zapier_actions, mcp__zapier__enable_zapier_action, mcp__zapier__execute_zapier_read_action, mcp__zapier__execute_zapier_write_action, mcp__claude_ai_Gmail__create_draft
---

Met à jour un lead dans le pipeline Sheets, puis crée un brouillon de relance Gmail.
Confirme avant chaque opération d'écriture. Rien n'est envoyé directement.

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom de l'entreprise | Tel qu'il apparaît dans le sheet | Oui |
| Nom du contact | Prénom + nom | Oui |
| Contexte du suivi | Pourquoi on relance ? Quelle proposition / conversation précédente ? | Oui |
| Nouvelle étape (si changement) | Nouvelle valeur de "Stage" à enregistrer | Si applicable |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

## Séquence

**Étape 1 — Vérifier les actions Zapier**
Appeler `list_enabled_zapier_actions`.
Confirmer qu'une action de lecture ET d'écriture Google Sheets sont présentes.
Si absentes : `discover_zapier_actions` + `enable_zapier_action`.

**Étape 2 — Lire les données du lead**
`execute_zapier_read_action` sur le sheet "Leads & Pipeline (Sample)".
Extraire : email du contact, valeur du deal, étape actuelle, last contact date, next step.

**Étape 3 — Mettre à jour le sheet (si applicable)**
Si une nouvelle étape ou "Last Contact Date" doit être mise à jour :
Confirmer d'abord : "Je vais mettre à jour [champs] pour [entreprise]. On y va ?"
Puis `execute_zapier_write_action` avec les champs validés.

**Étape 4 — Rédiger l'email de relance**

Structure imposée :
- Objet : précis, pas générique
- Accroche : "Je me permets de revenir vers vous concernant [sujet exact]."
- Corps : une phrase rappelant l'enjeu ou la prochaine étape convenue
- Closing : disponibilité + une seule action demandée
- Signature : Ezzouhir / HHSA Agency

Règles :
- Court — 3-4 phrases max
- Pas de culpabilisation ("je n'ai pas eu de nouvelles...")
- Ton chaleureux mais professionnel
- Une seule action demandée

**Étape 5 — Présenter le brouillon**
Afficher l'email complet (objet + corps). Attendre validation.

**Étape 6 — Créer le brouillon Gmail**
Une fois validé, confirmer : "Je vais créer un brouillon Gmail à destination de [email]. On y va ?"
Puis `mcp__claude_ai_Gmail__create_draft` avec `to`, `subject`, `body`.
Ne jamais envoyer directement.

**Étape 7 — Confirmer et reporter**
> Lead [Entreprise] mis à jour — Last Contact : [date], Stage : [étape]
> Brouillon créé dans Gmail pour [email]. À envoyer après relecture finale.

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Lead introuvable | Confirmer le nom exact. Proposer une recherche partielle. |
| Email absent du sheet | Demander l'email avant de continuer. |
| Action Zapier write non disponible | Chercher et activer via `discover_zapier_actions`. |
| Demande d'envoi direct | Refuser. "Je garde ça en brouillon. Tu valides avant d'envoyer." |
| Ton incorrect après relecture | Re-rédiger entièrement plutôt que patcher. |
