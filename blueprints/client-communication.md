# Blueprint — Client Communication Handler

**Goal:** Rédiger des emails clients professionnels, en brouillon, prêts à être copiés dans Gmail.

**Quand utiliser ce Blueprint:**
Toute demande de communication écrite avec un client : nouveau message, réponse, relance.
Déclencheurs : "Rédige un email à…", "Réponds à…", "Relance…", "Écris à…", "Prépare un message pour…"

---

## Inputs Requis

Avant de rédiger, confirmer que ces éléments sont disponibles :

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom du client | Prénom ou nom de la personne | Oui |
| Contexte projet | De quoi s'agit-il ? Quel historique ? | Oui |
| Intention | Quel est l'objectif de cet email ? | Oui |
| Points clés | 2 à 3 informations à faire passer | Oui |
| Type d'email | Nouveau / Réponse / Relance | Oui |
| Contexte thread | Contenu de l'email reçu (si réponse) | Si réponse |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

---

## Séquence

**Étape 1 — Identifier le type**
Nouveau message, réponse à un email entrant, ou relance sans réponse.

**Étape 2 — Confirmer les inputs**
Si quelque chose manque, demander avant de rédiger. Exemple :
> "Il me manque le contexte projet et l'objectif de cet email. Tu peux compléter ?"

**Étape 3 — Rédiger selon le gold standard**
Utiliser le modèle correspondant dans `templates/` :
- Nouveau message → `templates/email-outbound.md`
- Réponse → `templates/email-reply.md`
- Relance → `templates/email-followup.md`

Règles impératives (de `.claude/rules/voice.md` et `references/goldstandard/`) :
- Pas d'introduction creuse — entrer dans le vif dès la première ligne
- Un paragraphe = une idée
- Bénéfice concret nommé, sans sur-promettre
- Prochaine étape claire (quoi, quand)
- Pas de jargon
- Chaleureux sans être familier
- Se lit en moins de 30 secondes

**Étape 4 — Présenter le brouillon**
Afficher le brouillon complet (objet + corps). Attendre approbation ou instructions de correction.

**Étape 5 — Appliquer les corrections (si demandé)**
Modifier et présenter de nouveau. Répéter jusqu'à validation.

**Étape 6 — Livraison finale**
Une fois approuvé, livrer le texte final avec la mention :
> "✓ Brouillon prêt. Copie ce texte dans Gmail comme brouillon. Ne pas envoyer avant relecture finale."

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Input manquant | Stop. Lister ce qui manque. |
| Contexte ambigu | Poser une question précise avant de rédiger |
| Demande d'envoi direct | Refuser. "Je garde ça en brouillon. Tu valides avant d'envoyer." |
| Ton incorrect après correction | Re-rédiger entièrement plutôt que de patcher |

---

## Output Attendu

Un email complet :
- **Objet :** [ligne d'objet précise, pas générique]
- **Corps :** conforme au gold standard
- **Instruction de livraison :** copier dans Gmail comme brouillon

Rien n'est envoyé directement. Jamais.

---

*Blueprint créé : 2026-04-15*
*Référence : references/goldstandard/client-email-example.md · .claude/rules/voice.md*
