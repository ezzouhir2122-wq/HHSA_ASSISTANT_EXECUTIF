# Blueprints Recherche Tendances + Contenu Social — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Intégrer les deux nouveaux blueprints dans le Command Centre (CLAUDE.md) et valider leur exécution end-to-end.

**Architecture:** Les blueprints et le script `generate_pdf_social.py` sont déjà créés et commités. Il reste à enregistrer les déclencheurs dans CLAUDE.md et à valider chaque blueprint sur un cas réel.

**Tech Stack:** Python 3 · fpdf2 · WebSearch · WebFetch · Bash · Markdown

---

## File Map

| Fichier | Action | Responsabilité |
|---------|--------|----------------|
| `CLAUDE.md` | Modifier lignes 69-76 et 82-89 | Enregistrer les déclencheurs + mettre à jour la Build Queue |
| `blueprints/recherche-tendances.md` | Déjà créé | SOP Blueprint 1 |
| `blueprints/contenu-social.md` | Déjà créé | SOP Blueprint 2 |
| `equipment/generate_pdf_social.py` | Déjà créé + testé | Génération PDF posts sociaux |
| `live/research/` | Créé automatiquement | Outputs datés des deux blueprints |

---

## Task 1 : Mettre à jour CLAUDE.md

**Files:**
- Modify: `CLAUDE.md:69-89`

- [ ] **Step 1 : Ajouter les deux blueprints dans le tableau Skills Actifs**

Dans `CLAUDE.md`, dans le tableau **Skills Actifs** (après la ligne `code-reviewer`), ajouter :

```markdown
| `recherche-tendances` | "fais une recherche sur [sujet]" | Recherche web → 5 findings → JSON + PDF dans live/research/ |
| `contenu-social` | "crée les posts sociaux" / "génère les posts pour [marque]" | Lit findings B1 → 3 posts FR (LinkedIn/Facebook/Instagram) → JSON + PDF |
```

- [ ] **Step 2 : Mettre à jour la Build Queue**

Dans `CLAUDE.md`, dans le tableau **Build Queue**, marquer l'item #4 comme livré :

```markdown
| 4 | ~~Publications réseaux sociaux~~ | ~~Moyenne~~ — **Livré (Blueprint contenu-social)** |
```

- [ ] **Step 3 : Vérifier que le fichier est cohérent**

Lire `CLAUDE.md` et confirmer :
- Tableau Skills Actifs : 8 entrées (6 existantes + 2 nouvelles)
- Build Queue item #4 : marqué comme livré
- Aucune autre ligne modifiée

- [ ] **Step 4 : Committer**

```bash
git add CLAUDE.md
git commit -m "feat: register blueprints recherche-tendances and contenu-social in CLAUDE.md"
```

---

## Task 2 : Valider Blueprint 1 end-to-end

**Files:**
- Read: `blueprints/recherche-tendances.md`
- Output vérifiés: `live/research/findings-YYYYMMDD.json`, `live/research/research-YYYYMMDD.pdf`

- [ ] **Step 1 : Lire le blueprint**

Lire `blueprints/recherche-tendances.md` pour suivre la séquence exacte.

- [ ] **Step 2 : Exécuter la recherche**

Lancer `WebSearch` avec le sujet par défaut : `"utilisation de l'IA Création du contenu"`.
Requêtes suggérées :
- `"IA création de contenu tendances 2026"`
- `"outils IA rédaction marketing PME 2026"`
- `"statistiques adoption IA content marketing 2026"`
- `"cas d'usage IA contenu réseaux sociaux entreprises"`
- `"IA génération contenu tendances émergentes"`

- [ ] **Step 3 : Approfondir les 3 meilleures sources**

Lancer `WebFetch` sur les 3 URLs les plus pertinentes.

- [ ] **Step 4 : Structurer les 5 findings**

Rédiger le JSON complet avec `topic`, `date`, `executive_summary`, et 5 objets `findings` (chacun avec `title`, `finding`, `impact`, `source`).

- [ ] **Step 5 : Sauvegarder le JSON**

Écrire `live/research/findings-20260515.json` avec le contenu structuré.

- [ ] **Step 6 : Générer le PDF**

```bash
python equipment/generate_pdf_report.py \
  --input live/research/findings-20260515.json \
  --output live/research/research-20260515.pdf
```

Résultat attendu :
```
PDF généré : ...\live\research\research-20260515.pdf
Succès : ...\live\research\research-20260515.pdf
```

- [ ] **Step 7 : Vérifier les fichiers produits**

```bash
ls -lh live/research/
```

Résultat attendu : deux fichiers datés du jour — `findings-20260515.json` et `research-20260515.pdf`.

- [ ] **Step 8 : Reporter**

Afficher en terminal :
```
Recherche terminée. 5 findings structurés.
JSON  : live/research/findings-20260515.json
PDF   : live/research/research-20260515.pdf
Blueprint 2 peut être lancé : "crée les posts sociaux"
```

---

## Task 3 : Valider Blueprint 2 end-to-end

**Files:**
- Read: `blueprints/contenu-social.md`
- Output vérifiés: `live/research/posts-YYYYMMDD.json`, `live/research/posts-YYYYMMDD.pdf`

**Prérequis :** Task 2 doit être complète (fichier `findings-20260515.json` présent).

- [ ] **Step 1 : Lire le blueprint**

Lire `blueprints/contenu-social.md` pour suivre la séquence exacte.

- [ ] **Step 2 : Auto-détecter le fichier findings**

```bash
ls -t live/research/findings-*.json | head -1
```

Résultat attendu : `live/research/findings-20260515.json`

Si aucun fichier → STOP : *"Aucune recherche trouvée. Lance d'abord Blueprint 1."*

- [ ] **Step 3 : Lire le fichier findings**

Lire `live/research/findings-20260515.json`. Extraire `topic` et les 5 `findings`.

- [ ] **Step 4 : Rédiger les 3 posts**

Rédiger en français pour la marque **HHSA Agency** :

| Plateforme | Contraintes |
|------------|-------------|
| LinkedIn | 150-200 mots, ton expert, 3 hashtags secteur, CTA professionnel |
| Facebook | 80-120 mots, ton engageant, 2-3 hashtags, question ou CTA |
| Instagram | 50-80 mots, hook fort ligne 1, 8-10 hashtags |

- [ ] **Step 5 : Sauvegarder le JSON des posts**

Écrire `live/research/posts-20260515.json` :

```json
{
  "brand": "HHSA Agency",
  "topic": "[topic extrait du findings JSON]",
  "date": "15 Mai 2026",
  "posts": {
    "linkedin": {
      "text": "[texte complet du post LinkedIn]",
      "hashtags": ["#IA", "#ContentMarketing", "#WorkflowAgentique"]
    },
    "facebook": {
      "text": "[texte complet du post Facebook]",
      "hashtags": ["#IA", "#PME"]
    },
    "instagram": {
      "text": "[texte complet du post Instagram]",
      "hashtags": ["#IA", "#Content", "#PME", "#AgentiqueAI", "#Marketing", "#HHSA", "#Workflow", "#Automatisation"]
    }
  }
}
```

- [ ] **Step 6 : Générer le PDF**

```bash
python equipment/generate_pdf_social.py \
  --input live/research/posts-20260515.json \
  --output live/research/posts-20260515.pdf
```

Résultat attendu :
```
PDF genere : ...\live\research\posts-20260515.pdf
Succes : ...\live\research\posts-20260515.pdf
```

- [ ] **Step 7 : Afficher les 3 posts pour relecture**

Afficher en terminal les textes complets de chaque post avec leur plateforme en titre.

- [ ] **Step 8 : Vérifier les fichiers produits**

```bash
ls -lh live/research/
```

Résultat attendu : 4 fichiers — `findings-20260515.json`, `research-20260515.pdf`, `posts-20260515.json`, `posts-20260515.pdf`.

- [ ] **Step 9 : Committer les outputs de validation**

```bash
git add live/research/
git commit -m "test: add end-to-end validation outputs for blueprints recherche-tendances and contenu-social"
```

---

*Plan créé : 2026-05-15*
*Spec de référence : docs/superpowers/specs/2026-05-15-blueprints-tendances-social-design.md*
