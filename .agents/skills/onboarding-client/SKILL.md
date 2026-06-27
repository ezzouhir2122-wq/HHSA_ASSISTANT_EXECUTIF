---
name: onboarding-client
description: Initialise un nouveau client dans le système dès qu'un deal passe en Won — crée le dossier client, prépare le contrat, met à jour le CRM via Zapier, rédige l'email de bienvenue comme brouillon Gmail. Rien n'est envoyé sans validation.
allowed-tools: mcp__zapier__list_enabled_zapier_actions, mcp__zapier__discover_zapier_actions, mcp__zapier__enable_zapier_action, mcp__zapier__execute_zapier_write_action, mcp__claude_ai_Gmail__create_draft
---

Initialise un nouveau client dans le système. Demande confirmation avant chaque opération d'écriture.
Rien n'est envoyé directement. Jamais.

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom de l'entreprise | Tel qu'il apparaît dans le CRM | Oui |
| Nom du contact | Prénom + nom + titre | Oui |
| Email du contact | Pour l'email de bienvenue | Oui |
| Services contractualisés | Liste des services du deal signé | Oui |
| Montant du contrat | Valeur du deal | Oui |
| Date de début | Quand commence la prestation | Oui |
| Référence proposition | N° PROP ou devis de référence | Oui |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

## Séquence

**Étape 1 — Créer le dossier client**
Dupliquer la structure de `clients/_template/` → créer `clients/[nom-client]/` avec les sous-dossiers : propositions, devis, factures, contrats, livrables.

**Étape 2 — Préparer le contrat**
Lire `templates/contrats/contrat-template.md`.
Remplir avec les données du deal.
Numéro de contrat : `CTR-[YYYYMMDD]-[INI]` (initiales du client).
Sauvegarder dans `clients/[nom-client]/contrats/`.

Présenter le contrat complet pour validation avant de continuer.

**Étape 3 — Mettre à jour le CRM**
Appeler `list_enabled_zapier_actions`. Si l'action d'écriture Sheets est absente : `discover_zapier_actions` + `enable_zapier_action`.

Confirmer avant d'écrire :
> "Je vais passer [entreprise] en Won dans le CRM. On y va ?"

Via `execute_zapier_write_action` :
- Champ "Stage" → `Won`
- Champ "Last Contact Date" → date du jour
- Champ "Next Step" → "Onboarding démarré — [date de début]"

**Étape 4 — Rédiger l'email de bienvenue**
Structure :
- Objet : "Bienvenue chez HHSA Agency — Prochaines étapes"
- Corps : confirmation du démarrage, ce qui se passe dans les 7 prochains jours, une seule action demandée au client
- Signature : Ezzouhir / HHSA Agency

Présenter le brouillon. Attendre validation.

**Étape 5 — Créer le brouillon Gmail**
Confirmer :
> "Je vais créer un brouillon Gmail pour [email]. On y va ?"

Via `mcp__claude_ai_Gmail__create_draft`. Ne jamais envoyer directement.

**Étape 6 — Reporter**

```
Onboarding [Client] initialisé.

Dossier     : clients/[nom-client]/
Contrat     : CTR-[YYYYMMDD]-[INI]
CRM         : Stage → Won
Email       : Brouillon prêt dans Gmail
```

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Dossier client existe déjà | Vérifier le contenu — ne pas écraser sans confirmer |
| Action Zapier write absente | `discover_zapier_actions` + `enable_zapier_action` |
| Contact email manquant | Demander avant de rédiger l'email |
| Deal statut pas encore Won | Confirmer avec Ezzouhir avant de déclencher l'onboarding |
