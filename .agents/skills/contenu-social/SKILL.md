---
name: contenu-social
description: Transforme un sujet OU les findings de recherche en 3 posts sociaux (LinkedIn, Facebook, Instagram) en français. Génère un JSON et un PDF dans live/research/. Mode B (autonome) si sujet fourni. Mode A (findings) si aucun sujet.
allowed-tools: Bash, Read, Write
---

Génère 3 posts sociaux depuis un sujet direct (Mode B) ou le fichier findings le plus récent (Mode A).
Marque par défaut si non spécifiée : **HHSA Agency**.

## Inputs

| Input | Obligatoire | Défaut |
|-------|-------------|--------|
| Sujet / thème | Non* | — |
| Nom de marque | Non | HHSA Agency |

*Si aucun sujet fourni → Mode A (findings). Si sujet fourni → Mode B (autonome).

## Mode B — Autonome (sujet fourni directement)

**Déclencheurs :** "génère les posts pour [marque] sur [sujet]", "crée des posts sur [sujet]"

**Étape 1 — Collecter les inputs**
Si le sujet n'est pas dans le déclencheur → demander : "Sur quel sujet ?"
Si la marque n'est pas précisée → utiliser HHSA Agency.

**Étape 2 — Générer les 3 posts en français**

| Plateforme | Ton | Longueur | Hashtags | Structure |
|------------|-----|----------|----------|-----------|
| LinkedIn | Professionnel, expert, pédagogique | 150-200 mots | 3 ciblés secteur | Accroche → insight → développement → CTA professionnel |
| Facebook | Chaleureux, engageant, accessible | 80-120 mots | 2-3 | Accroche conversationnelle → point clé → question ou CTA |
| Instagram | Percutant, hook fort ligne 1 | 50-80 mots | 8-10 | Hook → 2-3 lignes clés → CTA court → hashtags |

Règles : tous en français · une seule idée centrale par post · CTA adapté à la plateforme.

**Étape 3 — Sauvegarder le JSON**
Créer `live/research/posts-YYYYMMDD.json` :

```json
{
  "brand": "[Nom de marque]",
  "topic": "[Sujet]",
  "date": "[JJ Mois Année]",
  "posts": {
    "linkedin":  { "text": "...", "hashtags": ["#Tag1", "#Tag2", "#Tag3"] },
    "facebook":  { "text": "...", "hashtags": ["#Tag1", "#Tag2"] },
    "instagram": { "text": "...", "hashtags": ["#Tag1", "..."] }
  }
}
```

**Étape 4 — Générer le PDF**
```bash
python equipment/generate_pdf_social.py \
  --input live/research/posts-YYYYMMDD.json \
  --output live/research/posts-YYYYMMDD.pdf
```

**Étape 5 — Afficher les posts pour relecture**

**Étape 6 — Reporter**
```
3 posts générés pour [Marque] — Sujet : [Sujet]
JSON : live/research/posts-YYYYMMDD.json
PDF  : live/research/posts-YYYYMMDD.pdf
```

## Mode A — Findings (aucun sujet fourni)

**Déclencheurs :** "crée les posts sociaux" (sans sujet précisé)

**Étape 1 — Auto-détecter le fichier findings**
```bash
ls -t live/research/findings-*.json | head -1
```
Si aucun fichier → STOP : *"Aucune recherche trouvée. Lance d'abord : 'fais une recherche sur [sujet]'."*

**Étape 2 — Lire le fichier**
Extraire : `topic`, `executive_summary`, `findings`.

**Étapes 3-6** → identiques au Mode B (même structure JSON, même PDF, même relecture).

## Gestion des erreurs

| Situation | Action |
|-----------|--------|
| Mode A : aucun findings | STOP. "Lance d'abord : 'fais une recherche sur [sujet]'." |
| Script PDF échoue | Afficher le JSON brut + signaler l'erreur |
| Ton jugé incorrect | Re-rédiger le post entier plutôt que patcher |
