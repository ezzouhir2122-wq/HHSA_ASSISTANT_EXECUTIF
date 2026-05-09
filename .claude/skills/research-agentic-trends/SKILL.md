---
name: research-agentic-trends
description: Recherche autonome sur les dernières tendances "Agentic AI". Analyse les sources, extrait les 5 découvertes les plus importantes, génère un PDF structuré, et crée un brouillon Gmail à hhsaagency@gmail.com. Aucun input requis — démarre immédiatement.
allowed-tools: WebSearch, WebFetch, Bash, Write, mcp__claude_ai_Gmail__create_draft
---

# Skill — Research Agentic AI Trends

Veille stratégique automatique sur les tendances IA agentique.
Zéro input requis. Démarre sans poser de questions.
Invoque `client-communication` pour l'email. Crée le brouillon Gmail. Ne jamais envoyer.

---

## PROTOCOLE DE GESTION DU CONTEXTE

⚠️ CRITIQUE — Ces règles priment sur tout autre comportement. Le non-respect sature le contexte et fait planter la session en cours.

| Phase | Ce qu'on conserve en contexte | Ce qu'on jette immédiatement |
|-------|-------------------------------|------------------------------|
| Après chaque WebSearch | Tableau : titre · URL · score pertinence (1-5) · accroche 1 phrase | Tout le contenu brut des résultats |
| Après chaque WebFetch | Bloc compressé 200 mots max + 3 faits chiffrés/datés | La page HTML, le markdown brut, tout le reste |
| Après la Phase 3 | JSON des 5 découvertes + executive_summary | Les 4 blocs de résumés intermédiaires |
| Après génération PDF | Chemin du fichier uniquement | Le contenu JSON brut |

**Règle absolue :** Jamais plus de 3 blocs WebFetch en contexte simultanément.
Si le contexte commence à se remplir : compresser immédiatement avant de continuer.

---

## SÉQUENCE

### Phase 1 — Recherche web (3 WebSearch ciblés)

Exécuter les 3 recherches suivantes. Après chaque résultat, mettre à jour le tableau de pertinence.
Ne pas conserver de contenu brut au-delà du tableau.

| # | Query | Angle |
|---|-------|-------|
| 1 | `"agentic AI" trends 2025 2026 site:techcrunch.com OR site:venturebeat.com OR site:wired.com` | Tendances tech grand public |
| 2 | `autonomous AI agents enterprise deployment breakthroughs 2025 2026` | Usage entreprise & déploiements |
| 3 | `"multi-agent systems" OR "agent orchestration" OR "agentic workflows" latest research 2025` | Architecture & percées techniques |

**Output obligatoire de la Phase 1 — Tableau de pertinence (à conserver) :**
```
| # | Titre court | URL | Score (1-5) | Accroche (1 phrase) |
|---|-------------|-----|-------------|---------------------|
```
Classer par score décroissant. Viser 8 à 12 URLs.

---

### Phase 2 — Approfondissement (4 WebFetch sur les meilleures URLs)

Sélectionner les 4 URLs avec score ≥ 4. Si moins de 4, descendre le seuil à ≥ 3.
Fetcher une par une, en ordre décroissant de score.

**Immédiatement après chaque fetch — compresser en ce format, jeter tout le reste :**

```
─── SOURCE [n] ────────────────────────────────────
Titre   : [titre complet]
URL     : [url]
Résumé  : [150-200 mots maximum. Facts first. Données concrètes, pas de généralités.]
Faits clés :
  · [fait chiffré ou daté 1]
  · [fait chiffré ou daté 2]
  · [fait chiffré ou daté 3]
───────────────────────────────────────────────────
```

Ne passer au fetch suivant qu'après avoir compressé le précédent.

---

### Phase 3 — Analyse et structuration des 5 découvertes

À partir des 4 blocs compressés, identifier les 5 découvertes les plus importantes.

**Critères de sélection (par ordre de priorité) :**
1. Pertinence business HHSA — impact sur le conseil en workflows agentiques, les PME
2. Nouveauté — données post-octobre 2024 en priorité
3. Potentiel actionnable — qu'est-ce qu'on peut faire avec cette information

**Format de chaque découverte :**
```json
{
  "title": "Titre percutant, 6-10 mots, en français",
  "finding": "Description complète. 150 à 250 mots. Facts first, aucun remplissage. Données, exemples, chiffres.",
  "impact": "Impact concret pour HHSA Agency ou ses clients PME. 2 à 3 phrases max.",
  "source": "Nom de la publication — URL"
}
```

**Assembler le JSON final :**
```json
{
  "topic": "Tendances Agentic AI — [Mois YYYY]",
  "date": "[date du jour au format JJ MMMM YYYY, en français]",
  "executive_summary": "Synthèse en 3 à 4 phrases de ce que révèlent les 5 découvertes collectivement. Ce que ça signifie pour l'IA agentique en 2026. Ce que ça implique pour HHSA.",
  "findings": [ ... 5 objets ... ]
}
```

**Sauvegarder** via l'outil Write dans :
`live/research/findings-[YYYYMMDD].json`

Puis jeter les 4 blocs de résumés intermédiaires — ils ne servent plus.

---

### Phase 4 — Génération du PDF

Confirmer : "Je génère le PDF de recherche. On y va ?"

Exécuter via Bash :
```bash
python "equipment/generate_pdf_report.py" \
  --input "live/research/findings-YYYYMMDD.json" \
  --output "live/research/agentic-trends-YYYYMMDD.pdf"
```
(Remplacer YYYYMMDD par la date réelle.)

Si `fpdf2` est absent, le script l'installe via pip. Attendre la fin sans relancer.
Confirmer le chemin du fichier PDF généré avant de continuer.

---

### Phase 5 — Rédaction de l'email (via Skill client-communication)

Invoquer le skill `client-communication` avec ces inputs pré-remplis.
Ne pas demander d'inputs supplémentaires à Ezzouhir — tout est déjà défini ici.

| Input | Valeur |
|-------|--------|
| Nom du client | Ezzouhir |
| Type d'email | Nouveau |
| Contexte projet | Rapport de veille automatique HHSA sur les tendances Agentic AI — usage interne |
| Intention | Livrer le résumé des 5 découvertes et indiquer le chemin du PDF généré |
| Points clés | 1) Les 5 titres des découvertes. 2) Le chemin local du PDF. 3) La date de génération. |

**Règles de ton pour cet email (à passer au skill) :**
- Objet : `Rapport de veille — Agentic AI Trends — [date]`
- Corps : 5 à 7 lignes max. Lister les 5 titres en bullets. Mentionner le chemin PDF.
- Ton : interne, direct. C'est Ezzouhir qui s'écrit à lui-même.
- Signature : `HHSA Executive Assistant`
- Pas de formules de politesse — directement dans le vif.

Une fois l'email rédigé par `client-communication`, le valider sans corrections supplémentaires sauf si manifestement mauvais.

---

### Phase 6 — Brouillon Gmail

Une fois l'email validé, confirmer :
> "Je crée le brouillon Gmail pour hhsaagency@gmail.com. On y va ?"

Appeler `mcp__claude_ai_Gmail__create_draft` :
- `to` : hhsaagency@gmail.com
- `subject` : [objet de l'email validé]
- `body` : [corps de l'email validé]

Ne jamais envoyer directement. Brouillon uniquement.

---

### Phase 7 — Rapport de fin

```
✓ VEILLE TERMINÉE — [date]

PDF           : live/research/agentic-trends-[date].pdf
JSON source   : live/research/findings-[date].json
Gmail draft   : Brouillon créé → hhsaagency@gmail.com

Top 5 découvertes :
  1. [titre]
  2. [titre]
  3. [titre]
  4. [titre]
  5. [titre]
```

---

## GESTION DES ERREURS

| Situation | Action |
|-----------|--------|
| WebSearch sans résultats pertinents | Reformuler la query. Max 2 essais par recherche avant de continuer. |
| WebFetch timeout ou accès refusé (403/paywall) | Passer à l'URL suivante du tableau. Noter l'échec dans le tableau. |
| Moins de 4 URLs avec score ≥ 4 | Descendre le seuil à ≥ 3. Fetcher quand même 4 URLs. |
| fpdf2 non installable (pip bloqué) | Sauvegarder le rapport formaté en .txt dans live/research/. Notifier Ezzouhir. |
| Gmail MCP indisponible | Afficher le brouillon complet dans le chat. Demander de le copier manuellement. |
| Contexte qui se sature | Stop. Appliquer le protocole de compression. Résumer ce qu'on a. Continuer. |
| Découvertes insuffisantes (< 5) | Générer une 3ème vague de recherche sur un angle différent avant de conclure. |

---

## DÉCLENCHEURS D'ACTIVATION

Ce skill se lance quand Ezzouhir dit (exemples non exhaustifs) :
- "fais une recherche sur les tendances agentic AI"
- "lance la veille agentic"
- "research agentic AI trends"
- "veille IA agentique"
- "dernières tendances IA agentique"
- "go chercher les tendances agentic"

---

*Skill créé : 2026-05-09 · Sujet fixe : Agentic AI Trends · Destinataire PDF : hhsaagency@gmail.com · Invoque : client-communication*
