# Session State

*Updated at the end of each session. Read this FIRST on startup.*

## Last Session
- **Date:** 2026-05-20
- **Summary:** PARTIE 3 — Design + début implémentation. Spec rédigée et validée (`docs/superpowers/specs/2026-05-20-partie3-design.md`). Plan d'implémentation créé (`docs/superpowers/plans/2026-05-20-partie3.md`). Skill `social-content` v2.0.0 installé depuis Google Docs. Task 1 complète : `equipment/brand.py` + `tests/test_brand.py` — 8 tests PASS, revue spec ✅, revue qualité ✅.

## En cours — PARTIE 3 (Tasks 2-7 restantes)

Plan : `docs/superpowers/plans/2026-05-20-partie3.md`

| Task | Statut | Description |
|------|--------|-------------|
| Task 1 — brand.py | ✅ DONE | Module centralisé, tests 8/8, qualité approuvée |
| Task 2 — generate_pdf_facture.py | ⏳ PENDING | Import brand.py + flag `--paid` + filigrane PAYÉ |
| Task 3 — generate_pdf_devis.py | ⏳ PENDING | Import brand.py |
| Task 4 — generate_pdf_social.py | ⏳ PENDING | Import brand.py |
| Task 5 — Skill devis-et-factures | ⏳ PENDING | Créer `.claude/skills/devis-et-factures/SKILL.md` |
| Task 6 — contenu-social Mode B | ⏳ PENDING | Mise à niveau skill — mode autonome sans findings |
| Task 7 — 3 Routines CronCreate | ⏳ PENDING | Pipeline Recap · Veille+Contenu · Bilan Semaine |

**Commande de démarrage :**
> "Continue PARTIE 3 — exécute les Tasks 2 à 7 du plan"

**SHA de base (avant Task 2) :** `33ab6d9`

## Blocked On — À faire avant le premier run

- [ ] **OAuth Google** — 3 valeurs qui doivent venir du MÊME OAuth2 client :
  1. Créer un OAuth2 Client ID (Desktop app) dans Google Cloud Console → [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
  2. Activer l'API Sheets → [console.cloud.google.com/apis/library/sheets.googleapis.com](https://console.cloud.google.com/apis/library/sheets.googleapis.com)
  3. Dans OAuth Playground → ⚙️ → "Use your own OAuth credentials" → coller Client ID + Secret → autoriser scope `spreadsheets` → récupérer `refresh_token`
  4. Mettre à jour `.env` : `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`

- [ ] **API Keys manquantes dans `.env`** :
  - `ANTHROPIC_API_KEY` — console.anthropic.com
  - `FIRECRAWL_API_KEY` — firecrawl.dev

- [ ] **Env vars dans le dashboard Trigger.dev** — toutes les 7 variables :
  - `ANTHROPIC_API_KEY`, `FIRECRAWL_API_KEY`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`
  - `GOOGLE_SHEETS_ID` = `19yKfb9n8D_Wb7oATLwTvHyAzpxADCBoVbmPapQ9Llc4`
  - `GOOGLE_SHEETS_RANGE` = `Sheet1!A:Q`
  - Dashboard : [cloud.trigger.dev/projects/v3/proj_rlvpanzodgotssaxohvi](https://cloud.trigger.dev/projects/v3/proj_rlvpanzodgotssaxohvi)

- [ ] **Row d'en-tête dans le Google Sheet** (row 1, colonnes A–Q) :
  `Company Name | Website | Email | Phone | Contact Name | Contact Title | Company Size | Services | Location Area | Year Founded | Social Media | LinkedIn | Raw Description | Score | Score Breakdown | Source Query | Scraped At`

- [ ] **Test manuel** depuis le dashboard Trigger.dev → vérifier logs + ligne dans le Sheet

## Notes techniques importantes
- **Deploy workaround :** espaces dans le path → utiliser `subst T: "C:\COHORT_2026\HHSA ASSISTANT EXECUTIF"` puis deploy depuis `T:\`, ensuite `subst T: /D`
- **Import fix :** `claude-synthesizer.ts` utilise `import Anthropic from "@anthropic-ai/sdk"` (pas `"anthropic"`)
- **brand.py import pattern :** dans chaque script equipment, ajouter `sys.path.insert(0, str(Path(__file__).parent))` puis `from brand import safe, BRAND, apply_header, apply_footer`
- **Client de test PARTIE 3 :** Soukwany (`soukwany.com`) — site JS-rendered, demander les infos brand manuellement

## Open Tasks (toujours ouverts)
- Mettre à jour Last Contact Foster & Marsh dans le CRM (2026-04-28)
- Cadrer périmètre projet consultant RH
- Structurer objectifs Q2 avec suivi mensuel

## Current Priorities
1. **PARTIE 3 — Tasks 2-7** — plan prêt, Task 1 done, continuer depuis Task 2
2. Finaliser OAuth Google + API keys → tester le lead gen Dubai HR
3. Projet consultant RH — cadrer le périmètre

## Active Projects

| Projet | Statut | Échéance |
|--------|--------|----------|
| ea-partie3 | 🔄 Task 1/7 done — Tasks 2-7 pending | Prochaine session |
| dubai-hr-lead-generation | ✅ Déployé prod `20260516.2` — en attente OAuth Google + API keys | Dès que OAuth configuré |
| consultant-rh | En cours | À définir |
| lancement-agence | Lancé (deadline 15 mai passée) | — |
