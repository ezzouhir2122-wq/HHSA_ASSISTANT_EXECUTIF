---
name: recherche-tendances
description: Recherche web structurée sur un sujet donné. Synthétise les 5 tendances clés, génère un fichier JSON findings et un PDF dans live/research/.
allowed-tools: WebSearch, WebFetch, Bash, Read, Write
---

Effectue une veille structurée sur un sujet, produit 5 findings et un rapport PDF.
Ne demande pas de confirmation avant de lancer les recherches. Le PDF est généré automatiquement.

## Inputs

| Input | Obligatoire |
|-------|-------------|
| Sujet de recherche | Non — défaut : "utilisation de l'IA Création du contenu" |

Si le sujet est ambigu → demander une clarification avant de lancer.

## Séquence

**Étape 1 — Recherche web**
Lancer `WebSearch` × 4 à 5 requêtes en variant les angles :
- Pratiques actuelles et adoption
- Outils et plateformes utilisés
- Chiffres et statistiques récentes
- Cas d'usage concrets pour PME
- Tendances émergentes et signaux faibles

**Étape 2 — Approfondissement**
Sélectionner les 3 sources les plus pertinentes → `WebFetch` sur chacune.
Extraire : données chiffrées, exemples, citations, dates de publication.

**Étape 3 — Synthèse en 5 findings**
Pour chaque finding :
- `title` : titre court et percutant
- `finding` : analyse en 3-5 phrases
- `impact` : impact business concret pour une PME
- `source` : nom + URL

**Étape 4 — Sauvegarder le JSON**
Créer `live/research/findings-YYYYMMDD.json` :

```json
{
  "topic": "[Sujet] — [Mois Année]",
  "date": "[JJ Mois Année]",
  "executive_summary": "Synthèse en 2-3 phrases.",
  "findings": [
    {
      "title": "...",
      "finding": "...",
      "impact": "...",
      "source": "..."
    }
  ]
}
```

**Étape 5 — Générer le PDF**
```bash
python equipment/generate_pdf_report.py \
  --input live/research/findings-YYYYMMDD.json \
  --output live/research/research-YYYYMMDD.pdf
```

**Étape 6 — Reporter**
```
Recherche terminée. 5 findings structurés.

JSON  : live/research/findings-YYYYMMDD.json
PDF   : live/research/research-YYYYMMDD.pdf

Blueprint 2 peut être lancé : "crée les posts sociaux"
```

## Gestion des erreurs

| Situation | Action |
|-----------|--------|
| Sujet ambigu | Clarifier avant de lancer |
| Source inaccessible via WebFetch | Passer à la suivante — ne pas bloquer |
| Script PDF échoue | Afficher le JSON complet en terminal + signaler l'erreur |
