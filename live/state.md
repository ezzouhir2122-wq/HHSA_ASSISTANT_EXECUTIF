# Session State

*Updated at the end of each session. Read this FIRST on startup.*

## Last Session
- **Date:** 2026-05-21
- **Summary:** Génération batch 15 factures PDF depuis Google Sheets (AAA-INV-2026-001 à 015) → `Documents/Exports-pdf` avec filigrane PAYÉ/ÉCHU. Posts sociaux IA & Contenu générés (JSON + PDF). 3 nouvelles routines cloud créées : KPI Cash (quotidien 08h), Lead Gen (lundi 09h), Content Brand (vendredi 09h). Dossiers live/leads/ et live/reports/ créés. Tout commité + pushé → SHA `b4f4ebc`.

## PARTIE 3 — ✅ COMPLÈTE

| Task | Statut | Description |
|------|--------|-------------|
| Task 1 — brand.py | ✅ DONE | Module centralisé, tests 8/8 |
| Task 2 — generate_pdf_facture.py | ✅ DONE | brand.py + --paid watermark, 3 tests PASS |
| Task 3 — generate_pdf_devis.py | ✅ DONE | brand.py branché, 1 test PASS |
| Task 4 — generate_pdf_social.py | ✅ DONE | brand.py branché, 1 test PASS |
| Task 5 — Skill devis-et-factures | ✅ DONE | `.claude/skills/devis-et-factures/SKILL.md` + CLAUDE.md |
| Task 6 — contenu-social Mode B | ✅ DONE | Skill mis à niveau — Mode A (findings) + Mode B (autonome) |
| Task 7 — 3 Routines CronCreate | ✅ DONE | pipeline-recap (lun 08h30) · veille-contenu (mer 10h00) · bilan-semaine (ven 17h00) |

**Routines cloud actives :**
- pipeline-recap : `trig_0141b75xdCiGZEHScN6AJK3p` — prochain run lun 25 mai 08h35
- veille-contenu : `trig_0158Yy3ucX77zjn4YSwA8Z7V` — prochain run mer 27 mai 10h05
- bilan-semaine : `trig_01V9KaPpJf83eQPzXYtRiTte` — prochain run ven 22 mai 17h00

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
1. Finaliser OAuth Google + API keys → tester le lead gen Dubai HR
2. Projet consultant RH — cadrer le périmètre
3. Skill onboarding-client (Build Queue #2) — Blueprint prêt

## Active Projects

| Projet | Statut | Échéance |
|--------|--------|----------|
| ea-partie3 | ✅ COMPLÈTE — 7/7 tasks, 13 tests PASS | — |
| dubai-hr-lead-generation | ✅ Déployé prod `20260516.2` — en attente OAuth Google + API keys | Dès que OAuth configuré |
| consultant-rh | En cours | À définir |
| lancement-agence | Lancé (deadline 15 mai passée) | — |
