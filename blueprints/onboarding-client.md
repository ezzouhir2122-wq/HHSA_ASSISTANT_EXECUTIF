# Blueprint — Onboarding Client

**Goal:** Initialiser un nouveau client dans le système : créer le dossier client, préparer le contrat, envoyer l'email de bienvenue et mettre à jour le CRM.

**Quand utiliser ce Blueprint:**
Dès qu'un deal passe au statut "Won" dans le pipeline.
Déclencheurs : "Onboarde [client]", "Deal signé avec [client]", "Démarre l'onboarding pour [client]"

**Route MCP :** Zapier (mise à jour Sheets) + optionnel Gmail draft

---

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

---

## Séquence

**Étape 1 — Créer le dossier client**
Dupliquer `clients/_template/` → renommer en `clients/[nom-client]/`.
Vérifier que les sous-dossiers sont présents : propositions, devis, factures, contrats, livrables.

**Étape 2 — Préparer le contrat**
Lire `templates/contrats/contrat-template.md`.
Remplir avec les données du deal.
Attribuer le numéro : `CTR-[YYYYMMDD]-[INI]`.
Sauvegarder dans `clients/[nom-client]/contrats/`.

Présenter le contrat complet pour validation avant de continuer.

**Étape 3 — Mettre à jour le CRM**
Via `execute_zapier_write_action` :
- Champ "Stage" → `Won`
- Champ "Last Contact Date" → date du jour
- Champ "Next Step" → "Onboarding démarré — [date de début]"

Confirmer avant d'écrire : "Je vais passer [entreprise] en Won dans le CRM. On y va ?"

**Étape 4 — Rédiger l'email de bienvenue**
Structure :
- Objet : "Bienvenue chez HHSA Agency — Prochaines étapes"
- Corps :
  - Confirmation du démarrage
  - Ce qui va se passer dans les 7 prochains jours
  - Une seule action demandée au client
- Signature : Ezzouhir / HHSA Agency

Présenter le brouillon. Attendre validation.

**Étape 5 — Créer le brouillon Gmail**
Via Zapier ou manuellement :
Confirmer : "Je vais créer un brouillon Gmail pour [email]. On y va ?"
Ne jamais envoyer directement.

**Étape 6 — Reporter**
```
Onboarding [Client] initialisé.

Dossier     : clients/[nom-client]/
Contrat     : CTR-[YYYYMMDD]-[INI]
CRM         : Stage → Won
Email       : Brouillon prêt dans Gmail
```

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Dossier client existe déjà | Vérifier le contenu — ne pas écraser sans confirmer. |
| Action Zapier write absente | `discover_zapier_actions` + `enable_zapier_action`. |
| Contact email manquant | Demander avant de rédiger l'email. |
| Deal statut pas encore Won | Confirmer avec Ezzouhir avant de déclencher l'onboarding. |

---

## Output Attendu

```
Onboarding [Client] — [Date]

✓ Dossier client créé : clients/[nom]/
✓ Contrat préparé    : CTR-[YYYYMMDD]-[INI]
✓ CRM mis à jour     : Stage → Won
✓ Email de bienvenue : brouillon Gmail — à envoyer après relecture
```

---

*Blueprint créé : 2026-05-19*
*Route : Read + Bash + Zapier (Sheets) + Gmail draft · Templates : templates/contrats/ · Dépendance : clients/_template/*
