# Routine : Pipeline Recap

**Cron (UTC) :** `30 7 * * 1`
**Heure locale :** Lundi 08h30 Casablanca (UTC+1)
**Description :** Résumé hebdomadaire du pipeline commercial depuis Google Sheets.

## Prompt

Lance le skill recap-pipeline. Génère le résumé complet du CRM :
- Leads par étape (Prospect / Qualifié / Proposition / Négociation / Gagné / Perdu)
- Valeur totale du pipeline actif
- Top 3 leads les plus chauds avec action recommandée
- Follow-ups dus cette semaine (Last Contact > 7 jours)

Présente le résumé de façon claire et actionnable pour démarrer la semaine.
