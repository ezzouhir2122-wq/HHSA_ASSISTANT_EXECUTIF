# Session State

*Updated at the end of each session. Read this FIRST on startup.*

## Last Session
- **Date:** 2026-06-01
- **Summary:** Audit complet du projet — lacunes identifiées et corrigées. Branding orange #E05818 commité (brand.py + generate_pdf_facture.py). Dossier client riyadh-finpath complété. 2 nouveaux skills créés : onboarding-client (Build Queue #2) et faq-clients (Build Queue #3). CLAUDE.md mis à jour (Build Queue items #1/#2/#3 livrés, code-reviewer clarifié comme agent). live/state.md et live/tasks.md dépoussiérés. Git propre — 4 commits.

## AUDIT 2026-06-01 — ✅ COMPLÈTE

| Correction | Statut |
|-----------|--------|
| Commit brand.py + generate_pdf_facture.py (branding orange) | ✅ DONE |
| Commit clients/riyadh-finpath/ + FAC-20260525-001.md | ✅ DONE |
| Compléter riyadh-finpath/ (devis, contrats, livrables, propositions) | ✅ DONE |
| Corriger CLAUDE.md Build Queue items #1/#2/#3 | ✅ DONE |
| Clarifier code-reviewer → agent (pas skill) dans CLAUDE.md | ✅ DONE |
| Créer skill onboarding-client | ✅ DONE |
| Créer skill faq-clients | ✅ DONE |

## PARTIE 3 — ✅ COMPLÈTE (ref: 2026-05-21)

| Task | Statut |
|------|--------|
| brand.py — module centralisé | ✅ DONE — tests 8/8 |
| generate_pdf_facture.py — branding + watermark | ✅ DONE |
| generate_pdf_devis.py | ✅ DONE |
| generate_pdf_social.py | ✅ DONE |
| Skill devis-et-factures | ✅ DONE |
| Skill contenu-social (Mode A + B) | ✅ DONE |
| 3 Routines CronCreate cloud | ✅ DONE |

**Routines cloud actives :**
- pipeline-recap : `trig_0141b75xdCiGZEHScN6AJK3p` — lun 08h35
- veille-contenu : `trig_0158Yy3ucX77zjn4YSwA8Z7V` — mer 10h05
- bilan-semaine : `trig_01V9KaPpJf83eQPzXYtRiTte` — ven 17h00

## Blocked On — À faire avant le premier run lead gen

- [ ] **OAuth Google** — créer OAuth2 Client ID (Desktop app) dans Google Cloud Console
  1. Activer Sheets API → console.cloud.google.com/apis/library/sheets.googleapis.com
  2. OAuth Playground → coller Client ID + Secret → autoriser scope `spreadsheets` → récupérer `refresh_token`
  3. Mettre à jour `.env` : `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`

- [ ] **API Keys manquantes dans `.env`** :
  - `ANTHROPIC_API_KEY` — console.anthropic.com
  - `FIRECRAWL_API_KEY` — firecrawl.dev

- [ ] **Env vars dans le dashboard Trigger.dev** (7 variables) — dashboard : cloud.trigger.dev/projects/v3/proj_rlvpanzodgotssaxohvi

- [ ] **Row d'en-tête dans le Google Sheet** (row 1, colonnes A–Q) :
  `Company Name | Website | Email | Phone | Contact Name | Contact Title | Company Size | Services | Location Area | Year Founded | Social Media | LinkedIn | Raw Description | Score | Score Breakdown | Source Query | Scraped At`

- [ ] **Test manuel** depuis le dashboard Trigger.dev → vérifier logs + ligne dans le Sheet

## Notes techniques importantes
- **Deploy workaround :** espaces dans le path → `subst T: "C:\COHORT_2026\HHSA ASSISTANT EXECUTIF"` puis deploy depuis `T:\`
- **Import fix :** `claude-synthesizer.ts` utilise `import Anthropic from "@anthropic-ai/sdk"` (pas `"anthropic"`)
- **brand.py import pattern :** `sys.path.insert(0, str(Path(__file__).parent))` + `from brand import safe, BRAND, apply_header, apply_footer`

## Open Tasks
- [ ] Finaliser OAuth Google + API keys → tester le lead gen Dubai HR
- [ ] Cadrer périmètre projet consultant RH
- [ ] Mettre à jour Last Contact Foster & Marsh dans le CRM (2026-04-28)
- [ ] Créer blueprint + skill pour Build Queue item #5 (Personnalisation audits clients)

## Current Priorities
1. Finaliser OAuth Google + API keys → tester le lead gen Dubai HR
2. Projet consultant RH — cadrer le périmètre
3. Build Queue item #5 — Personnalisation audits clients (blueprint à créer)

## Active Projects

| Projet | Statut | Échéance |
|--------|--------|----------|
| ea-partie3 | ✅ COMPLÈTE — 7/7 tasks, 13 tests PASS | — |
| dubai-hr-lead-generation | ✅ Déployé prod `20260516.2` — en attente OAuth Google + API keys | Dès que OAuth configuré |
| consultant-rh | En cours — périmètre à cadrer | À définir |
| lancement-agence | ✅ Lancé (deadline 15 mai passée) | — |
