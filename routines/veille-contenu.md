# Routine : Veille + Contenu Social

**Cron (UTC) :** `0 9 * * 3`
**Heure locale :** Mercredi 10h00 Casablanca (UTC+1)
**Description :** Recherche tendances agentiques → génère 3 posts sociaux prêts à publier.

## Prompt

Étape 1 : Lance le skill recherche-tendances sur le sujet "workflows agentiques PME MENA 2026".
Étape 2 : Une fois les findings générés, lance le skill contenu-social en Mode A.
Résultat attendu : 3 posts LinkedIn/Facebook/Instagram + PDF dans live/research/.
Reporter le chemin du PDF généré.
