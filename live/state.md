# Session State

*Updated at the end of each session. Read this FIRST on startup.*

## Last Session
- **Date:** 2026-05-19
- **Summary:** PARTIE 2 Branding — système d'identité visuelle HHSA Agency conçu et planifié. Logo déposé dans `equipment/assets/LOGO.png` (fond blanc, mark buildings gold, texte "HHS Agency" script gold). Palette brand définie : gold `#D4A017`, dark `#1A1A1A`, body `#333547`. Architecture choisie : module `equipment/brand.py` centralisé (BRAND dict + apply_header + apply_footer), importé par les 3 scripts PDF. Spec commitée : `docs/superpowers/specs/2026-05-19-branding-pdf-design.md`. Plan d'implémentation committé : `docs/superpowers/plans/2026-05-19-branding-pdf.md`. 4 tâches TDD prêtes à exécuter.

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

## Open Tasks (toujours ouverts)
- Mettre à jour Last Contact Foster & Marsh dans le CRM (2026-04-28)
- Cadrer périmètre projet consultant RH
- Structurer objectifs Q2 avec suivi mensuel

## Next Session — PARTIE 2 (suite)

**Priorité 1 — Exécuter le plan branding (4 tâches TDD)**
Plan : `docs/superpowers/plans/2026-05-19-branding-pdf.md`
- Task 1 : créer `equipment/brand.py` + `tests/test_brand.py`
- Task 2 : brancher `generate_pdf_devis.py`
- Task 3 : brancher `generate_pdf_facture.py`
- Task 4 : brancher `generate_pdf_social.py`
- Commande de démarrage : "Exécute le plan branding"

**Priorité 2 — Build Queue #1 : skill `devis-et-factures`**
- Blueprint : `blueprints/devis-et-factures.md` ✅ prêt
- Equipment : `equipment/generate_pdf_devis.py` + `generate_pdf_facture.py` ✅ prêts (seront brandés après branding)
- Templates : `templates/devis/` + `templates/factures/` ✅ prêts
- **À faire :** créer `.claude/skills/devis-et-factures/SKILL.md`

**Priorité 3 — Build Queue #2 : skill `onboarding-client`**
- Blueprint : `blueprints/onboarding-client.md` ✅ prêt
- Template contrat : `templates/contrats/contrat-template.md` ✅ prêt
- **À faire :** créer `.claude/skills/onboarding-client/SKILL.md`

## Current Priorities
1. **Exécuter le plan branding** — `docs/superpowers/plans/2026-05-19-branding-pdf.md` prêt à lancer
2. Finaliser OAuth Google + API keys → tester le lead gen Dubai HR
3. Build Queue #1 → skill devis-et-factures (après branding)
4. Projet consultant RH — livraison à planifier

## Active Projects

| Projet | Statut | Échéance |
|--------|--------|----------|
| dubai-hr-lead-generation | ✅ Déployé prod `20260516.2` — en attente OAuth Google + API keys | Dès que OAuth configuré |
| ea-audit-cleanup | ✅ Terminé 2026-05-19 | — |
| ea-branding | Spec + plan prêts — exécution pending (4 tâches TDD) | Prochaine session |
| consultant-rh | En cours | À définir |
| lancement-agence | Lancé (deadline 15 mai passée) | — |
