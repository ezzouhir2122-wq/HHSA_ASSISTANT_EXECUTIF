# Blueprint — Création de Contenu Social

**Goal:** Transformer les résultats de recherche de Blueprint 1 en trois posts sociaux adaptés à chaque plateforme (LinkedIn, Facebook, Instagram), et produire un PDF contenant les trois contenus.

**Quand utiliser ce Blueprint:**
Après avoir exécuté Blueprint 1 (recherche-tendances). Ce blueprint lit automatiquement le fichier de recherche le plus récent.
Déclencheurs : `"crée les posts sociaux"`, `"génère les posts pour [marque]"`, `"posts réseaux sociaux"`
Marque par défaut si non spécifiée : **HHSA Agency**

**Dépendance :** Blueprint 1 doit avoir été exécuté au moins une fois (fichier `live/research/findings-*.json` requis).

**Route :** Bash (auto-détection fichier) + Read + Bash (script Python local)

---

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom de marque | Marque au nom de laquelle les posts sont rédigés | Non — défaut : HHSA Agency |

Aucun autre input. Le fichier de recherche est détecté automatiquement.

---

## Séquence

**Étape 1 — Auto-détecter le fichier de recherche**
Exécuter via Bash pour trouver le fichier le plus récent :
```
ls -t live/research/findings-*.json | head -1
```
Si aucun fichier trouvé → **STOP.** Afficher : *"Aucune recherche trouvée. Lance d'abord Blueprint 1 : 'fais une recherche sur [sujet]'."*

**Étape 2 — Lire le fichier findings**
Lire le fichier JSON détecté. Extraire : `topic`, `executive_summary`, `findings` (les 5 tendances).

**Étape 3 — Générer les 3 posts en français**

Rédiger un post pour chaque plateforme en s'appuyant sur les findings. Le nom de marque figure dans la signature ou le CTA de chaque post.

| Plateforme | Ton | Longueur | Hashtags | Structure |
|------------|-----|----------|----------|-----------|
| LinkedIn | Professionnel, expert, pédagogique | 150-200 mots | 3 ciblés secteur | Accroche → insight → développement → CTA professionnel |
| Facebook | Chaleureux, engageant, accessible | 80-120 mots | 2-3 | Accroche conversationnelle → point clé → question ou CTA |
| Instagram | Percutant, visuel, hook fort ligne 1 | 50-80 mots | 8-10 | Hook → 2-3 lignes clés → CTA court → hashtags |

Règles communes :
- Tous en français
- Une seule idée centrale par post (pas un résumé de tous les findings)
- CTA adapté à la plateforme
- Ton conforme à `references/voice.md`

**Étape 4 — Sauvegarder le JSON des posts**
Créer `live/research/posts-YYYYMMDD.json` :

```json
{
  "brand": "[Nom de marque]",
  "topic": "[Sujet issu du findings JSON]",
  "date": "[JJ Mois Année]",
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
      "hashtags": ["#IA", "#Content", "#ReseauxSociaux", "..."]
    }
  }
}
```

**Étape 5 — Générer le PDF**
Exécuter via Bash :
```
python equipment/generate_pdf_social.py \
  --input live/research/posts-YYYYMMDD.json \
  --output live/research/posts-YYYYMMDD.pdf
```

**Étape 6 — Afficher les posts pour relecture**
Présenter les 3 posts complets en terminal avant de confirmer la fin :

```
[LinkedIn]
...

[Facebook]
...

[Instagram]
...
```

**Étape 7 — Reporter**
Confirmer les deux fichiers produits.

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Aucun fichier findings trouvé | STOP. "Lance d'abord Blueprint 1 : 'fais une recherche sur [sujet]'." |
| Marque non spécifiée | Utiliser "HHSA Agency" sans demander |
| Script PDF échoue | Afficher les posts JSON bruts en terminal + signaler l'erreur. Les posts restent utilisables. |
| Ton jugé incorrect après relecture | Re-rédiger le post concerné entièrement plutôt que patcher |

---

## Output Attendu

```
3 posts générés pour [Marque].

[LinkedIn]
[texte complet + hashtags]

[Facebook]
[texte complet + hashtags]

[Instagram]
[texte complet + hashtags]

JSON  : live/research/posts-20260515.json
PDF   : live/research/posts-20260515.pdf
```

---

*Blueprint créé : 2026-05-15*
*Route : Bash + Read + Bash · Dépendance : Blueprint 1 (recherche-tendances.md) · Équipement : equipment/generate_pdf_social.py · Produit : live/research/*
