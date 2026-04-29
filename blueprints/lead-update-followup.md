# Blueprint — Lead Update + Email de Suivi

**Goal:** Mettre à jour l'état d'un lead dans le pipeline Google Sheets, puis rédiger et créer un brouillon d'email de relance professionnel dans Gmail.

**Quand utiliser ce Blueprint:**
Toute relance d'un lead existant nécessitant une mise à jour dans le CRM et une communication écrite.
Déclencheurs : "Relance [client]", "Suivi sur [client]", "Mets à jour [client] et envoie un email", "Rappelle [contact]"

**Route MCP :** Zapier (Google Sheets lecture + update) + Abonnement Gmail (création brouillon)

---

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom de l'entreprise | Tel qu'il apparaît dans le sheet | Oui |
| Nom du contact | Prénom + nom | Oui |
| Étape actuelle | Valeur exacte de la colonne "Stage" | Oui |
| Contexte du suivi | Pourquoi on relance maintenant ? Quelle proposition / conversation précédente ? | Oui |
| Email du contact | Récupéré depuis le sheet si présent, sinon demander | Oui |
| Nouvelle étape (si changement) | Nouvelle valeur de "Stage" à enregistrer | Si applicable |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

---

## Séquence

**Étape 1 — Lire les données du lead dans le sheet**
Via `execute_zapier_read_action` : rechercher la ligne correspondant à l'entreprise.
Extraire : email du contact, valeur du deal, étape actuelle, last contact date, next step.

**Étape 2 — Mettre à jour le sheet (si applicable)**
Si une nouvelle étape ou une nouvelle date "Last Contact" doit être enregistrée :
Appeler l'action Zapier de mise à jour de ligne (`execute_zapier_write_action`).
Champs à mettre à jour : "Last Contact Date" → date du jour, "Stage" → nouvelle valeur si changement.

Confirmer avant d'exécuter : "Je vais mettre à jour [champs] pour [entreprise]. On y va ?"

**Étape 3 — Rédiger l'email de relance**
Utiliser le template `templates/email-followup.md` et les règles de `references/goldstandard/`.

Structure imposée :
- Objet : précis, pas générique
- Accroche : "Je me permets de revenir vers vous concernant [sujet exact]."
- Corps : une phrase rappelant l'enjeu ou la prochaine étape convenue
- Closing : disponibilité + appel à action clair (une seule chose)
- Signature : Ezzouhir / HHSA Agency

Règles impératives :
- Court — tient en 3-4 phrases max
- Pas de culpabilisation ("je n'ai pas eu de nouvelles...")
- Ton chaleureux mais professionnel
- Une seule action demandée

**Étape 4 — Présenter le brouillon**
Afficher l'email complet (objet + corps) avant toute action. Attendre validation.

**Étape 5 — Créer le brouillon Gmail**
Une fois validé, appeler `mcp__claude_ai_Gmail__create_draft` avec :
- `to` : email du contact (récupéré du sheet)
- `subject` : objet de l'email
- `body` : corps validé

Confirmer : "Je vais créer un brouillon Gmail à destination de [email]. On y va ?"

Ne jamais envoyer directement. Toujours brouillon.

**Étape 6 — Confirmer et reporter**
Annoncer : brouillon créé dans Gmail + champs mis à jour dans le sheet.

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Lead introuvable dans le sheet | Confirmer le nom exact. Proposer une recherche partielle. |
| Email absent du sheet | Demander l'email avant de continuer. |
| Action Zapier write non disponible | Chercher et activer via `discover_zapier_actions`. |
| Demande d'envoi direct | Refuser. "Je garde ça en brouillon. Tu valides avant d'envoyer." |
| Ton jugé incorrect après relecture | Re-rédiger entièrement plutôt que patcher. |

---

## Output Attendu

**Confirmation mise à jour sheet :**
> Lead [Entreprise] mis à jour — Last Contact : [date], Stage : [nouvelle étape si changement]

**Email brouillon :**
```
Objet : [objet précis]

[Corps de l'email — 3-4 phrases]

Ezzouhir
HHSA Agency
```

**Confirmation Gmail :**
> Brouillon créé dans Gmail pour [email@contact.com]. À envoyer après relecture finale.

---

*Blueprint créé : 2026-04-28*
*Route : Zapier (Sheets) + Abonnement Gmail · Templates : templates/email-followup.md · Référence : references/goldstandard/client-email-example.md*
