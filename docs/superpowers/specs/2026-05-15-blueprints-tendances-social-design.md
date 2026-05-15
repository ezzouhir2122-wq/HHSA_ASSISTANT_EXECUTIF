# Design Spec — Blueprints Recherche Tendances + Contenu Social

**Date :** 2026-05-15  
**Statut :** Approuvé

---

## Contexte

Deux blueprints distincts travaillant en tandem :
- Blueprint 1 fait la veille et produit un rapport PDF de recherche
- Blueprint 2 consomme cette recherche et génère 3 posts sociaux + un second PDF

Sujet par défaut : "utilisation de l'IA Création du contenu"

---

## Architecture Globale

```
Déclenchement B1                    Déclenchement B2
      │                                    │
      ▼                                    ▼
  WebSearch × 4-5                Auto-detect findings-YYYYMMDD.json
  + WebFetch × 3                          │
      │                              Lire le JSON
      ▼                                    │
  5 findings structurés           Générer 3 posts FR
      │                         (LinkedIn / Facebook / Instagram)
      ▼                                    │
findings-YYYYMMDD.json          posts-YYYYMMDD.json
      │                                    │
generate_pdf_report.py          generate_pdf_social.py (NEW)
      │                                    │
research-YYYYMMDD.pdf           posts-YYYYMMDD.pdf
```

**Stockage :** Tout dans `live/research/` — même convention de nommage datée.

**Liaison :** Blueprint 2 est indépendant. Il auto-détecte le fichier `findings-YYYYMMDD.json` le plus récent dans `live/research/`. Pas d'input requis pour la liaison.

---

## Blueprint 1 — Recherche et Analyse de Tendances

### Déclencheurs
- `"fais une recherche sur [sujet]"`
- `"recherche les tendances [sujet]"`
- Sujet par défaut si non spécifié : `"utilisation de l'IA Création du contenu"`

### Inputs

| Input | Obligatoire | Défaut |
|-------|-------------|--------|
| Sujet de recherche | Non | "utilisation de l'IA Création du contenu" |

### Séquence

1. **WebSearch × 4-5 requêtes** — angles variés : pratiques actuelles, outils, chiffres, cas d'usage, tendances émergentes
2. **WebFetch × 3 sources** — aller en profondeur sur les sources les plus pertinentes
3. **Synthèse** — structurer en 5 findings : titre + analyse + impact business + source
4. **Sauvegarder** `live/research/findings-YYYYMMDD.json` au format attendu par `generate_pdf_report.py`
5. **Exécuter** `python equipment/generate_pdf_report.py --input live/research/findings-YYYYMMDD.json --output live/research/research-YYYYMMDD.pdf`
6. **Reporter** les deux chemins de fichier

### Format JSON de sortie

```json
{
  "topic": "Utilisation de l'IA — Création de Contenu — Mai 2026",
  "date": "15 Mai 2026",
  "executive_summary": "...",
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

### Output Attendu

```
Recherche terminée. 5 findings structurés.
JSON  : live/research/findings-20260515.json
PDF   : live/research/research-20260515.pdf
```

---

## Blueprint 2 — Création de Contenu Social

### Déclencheurs
- `"crée les posts sociaux"`
- `"génère les posts pour [marque]"`
- Marque par défaut si non spécifiée : `HHSA Agency`

### Inputs

| Input | Obligatoire | Défaut |
|-------|-------------|--------|
| Nom de marque | Non | HHSA Agency |

### Séquence

1. **Auto-détecter** le fichier `findings-YYYYMMDD.json` le plus récent dans `live/research/` via Bash : `ls -t live/research/findings-*.json | head -1`
2. **Lire** le fichier JSON trouvé
3. **Générer 3 posts en français** :

| Plateforme | Ton | Longueur | Hashtags |
|------------|-----|----------|----------|
| LinkedIn | Professionnel, expert, pédagogique | 150-200 mots | 3 ciblés secteur |
| Facebook | Chaleureux, engageant, accessible | 80-120 mots | 2-3 |
| Instagram | Percutant, visuel, hook fort en ligne 1 | 50-80 mots | 8-10 |

Chaque post inclut : accroche, corps, CTA adapté à la plateforme, hashtags. Le nom de marque figure dans la signature ou le CTA.

4. **Sauvegarder** `live/research/posts-YYYYMMDD.json`
5. **Exécuter** `python equipment/generate_pdf_social.py --input live/research/posts-YYYYMMDD.json --output live/research/posts-YYYYMMDD.pdf`
6. **Afficher** les 3 posts en terminal pour relecture immédiate
7. **Confirmer** le PDF généré

### Format JSON de sortie

```json
{
  "brand": "HHSA Agency",
  "topic": "...",
  "date": "15 Mai 2026",
  "posts": {
    "linkedin": {
      "text": "...",
      "hashtags": ["#IA", "#ContentMarketing", "#Innovation"]
    },
    "facebook": {
      "text": "...",
      "hashtags": ["#IA", "#Contenu"]
    },
    "instagram": {
      "text": "...",
      "hashtags": ["#IA", "#Content", "..."]
    }
  }
}
```

### Output Attendu

```
3 posts générés pour HHSA Agency.

[LinkedIn]
...texte complet...

[Facebook]
...texte complet...

[Instagram]
...texte complet...

JSON  : live/research/posts-20260515.json
PDF   : live/research/posts-20260515.pdf
```

---

## Équipement Requis

| Script | Statut | Usage |
|--------|--------|-------|
| `equipment/generate_pdf_report.py` | Existant | Blueprint 1 → PDF recherche |
| `equipment/generate_pdf_social.py` | À créer | Blueprint 2 → PDF posts sociaux |

`generate_pdf_social.py` doit accepter `--input` (JSON posts) et `--output` (chemin PDF). Format : 3 sections, une par plateforme, avec le texte complet et les hashtags.

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Aucun findings JSON trouvé (B2) | STOP. "Aucune recherche trouvée. Lance d'abord Blueprint 1." |
| WebSearch sans résultats pertinents | Reformuler la requête × 2 avant d'abandonner |
| Script PDF échoue | Afficher le JSON brut en terminal + signaler l'erreur |
| Marque non spécifiée | Utiliser "HHSA Agency" sans demander |

---

*Spec validée le 2026-05-15*
