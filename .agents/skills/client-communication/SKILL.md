---
name: client-communication
description: Rédige un email client professionnel (nouveau, réponse, ou relance) conforme au gold standard. Collecte les inputs, rédige, présente le brouillon, applique les corrections. Rien n'est envoyé.
allowed-tools:
---

Rédige un email client professionnel prêt à copier dans Gmail comme brouillon.
Rien n'est envoyé directement. Jamais.

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

## Séquence

**Étape 1 — Identifier le type**
Nouveau message, réponse à un email entrant, ou relance sans réponse.

**Étape 2 — Confirmer les inputs**
Si quelque chose manque, demander avant de rédiger.
> "Il me manque [X]. Tu peux compléter ?"

**Étape 3 — Rédiger**

Règles impératives :
- Pas d'introduction creuse — entrer dans le vif dès la première ligne
- Un paragraphe = une idée
- Bénéfice concret nommé, sans sur-promettre
- Prochaine étape claire (quoi, quand)
- Pas de jargon
- Chaleureux sans être familier
- Se lit en moins de 30 secondes

**Étape 4 — Présenter le brouillon**
Afficher le brouillon complet (objet + corps). Attendre approbation ou corrections.

**Étape 5 — Appliquer les corrections (si demandé)**
Modifier et présenter de nouveau. Répéter jusqu'à validation.

**Étape 6 — Livraison finale**
Une fois approuvé :
> "✓ Brouillon prêt. Copie ce texte dans Gmail comme brouillon. Ne pas envoyer avant relecture finale."

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Input manquant | Stop. Lister ce qui manque. |
| Contexte ambigu | Poser une question précise avant de rédiger |
| Demande d'envoi direct | Refuser. "Je garde ça en brouillon. Tu valides avant d'envoyer." |
| Ton incorrect après correction | Re-rédiger entièrement plutôt que de patcher |

## Output

```
Objet : [ligne d'objet précise, pas générique]

[Corps de l'email]

Ezzouhir
HHSA Agency
```

✓ Brouillon prêt. Copie ce texte dans Gmail comme brouillon.
