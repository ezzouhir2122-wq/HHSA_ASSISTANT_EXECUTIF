# Blueprint — Recherche et Analyse de Tendances

**Goal:** Effectuer une veille structurée sur un sujet donné, synthétiser les 5 tendances clés, et produire un rapport PDF prêt à utiliser.

**Quand utiliser ce Blueprint:**
Toute demande de veille ou d'analyse de tendances sur un sujet business ou technologique.
Déclencheurs : `"fais une recherche sur [sujet]"`, `"recherche les tendances [sujet]"`, `"veille sur [sujet]"`
Sujet par défaut si non spécifié : **"utilisation de l'IA Création du contenu"**

**Route :** WebSearch + WebFetch + Bash (script Python local)

---

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Sujet de recherche | Thématique à analyser | Non — défaut : "utilisation de l'IA Création du contenu" |

Si le sujet est flou ou ambigu → demander une clarification avant de lancer.

---

## Séquence

**Étape 1 — Recherche web**
Lancer `WebSearch` × 4 à 5 requêtes en variant les angles :
- Pratiques actuelles et adoption
- Outils et plateformes utilisés
- Chiffres et statistiques récentes
- Cas d'usage concrets
- Tendances émergentes et signaux faibles

**Étape 2 — Approfondissement des sources**
Sélectionner les 3 sources les plus pertinentes et lancer `WebFetch` sur chacune.
Extraire : données chiffrées, exemples, citations, dates de publication.

**Étape 3 — Synthèse en 5 findings**
Structurer les résultats en 5 findings distincts. Pour chaque finding :
- `title` : titre court et percutant
- `finding` : analyse en 3-5 phrases
- `impact` : impact business concret pour une PME
- `source` : nom + URL de la source principale

**Étape 4 — Sauvegarder le JSON**
Créer le fichier `live/research/findings-YYYYMMDD.json` avec la structure suivante :

```json
{
  "topic": "[Sujet] — [Mois Année]",
  "date": "[JJ Mois Année]",
  "executive_summary": "Synthèse en 2-3 phrases couvrant l'état global du sujet.",
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
Exécuter via Bash :
```
python equipment/generate_pdf_report.py \
  --input live/research/findings-YYYYMMDD.json \
  --output live/research/research-YYYYMMDD.pdf
```

**Étape 6 — Reporter**
Annoncer les deux fichiers produits et confirmer que Blueprint 2 peut maintenant être lancé.

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Sujet ambigu | Demander une clarification avant de lancer les recherches |
| Résultats WebSearch non pertinents | Reformuler la requête × 2 avec des termes plus spécifiques |
| Source inaccessible via WebFetch | Passer à la source suivante — ne pas bloquer |
| Script PDF échoue | Afficher le JSON complet en terminal + signaler l'erreur |
| Dossier `live/research/` absent | Le script le crée automatiquement — aucune action requise |

---

## Output Attendu

```
Recherche terminée. 5 findings structurés.

JSON  : live/research/findings-20260515.json
PDF   : live/research/research-20260515.pdf

Blueprint 2 peut être lancé : "crée les posts sociaux"
```

---

*Blueprint créé : 2026-05-15*
*Route : WebSearch + WebFetch + Bash · Équipement : equipment/generate_pdf_report.py · Produit : live/research/*
