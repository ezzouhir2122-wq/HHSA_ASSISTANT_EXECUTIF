# Decision Ledger

Append-only. Every meaningful call gets logged here.
Format: [YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...

---

[2026-04-20] DECISION: Construire le Blueprint client communication en premier (avant devis/factures) | REASONING: Demande prioritaire d'Ezzouhir — communication client est le premier point de friction quotidien | CONTEXT: Lancement du Build Queue, session post-onboarding

[2026-04-20] DECISION: Blueprint seul, pas d'Equipment ni de connexion Gmail MCP | REASONING: La rédaction d'emails est une tâche native pour l'Architect — pas besoin de script déterministe. Gmail reste manuel. | CONTEXT: Choix d'architecture Three Engine Model

[2026-04-28] DECISION: Créer 3 Blueprints opérationnels pour les workflows pipeline récurrents | REASONING: Workflows répétitifs identifiés (résumé lundi, suivi lead, proposition client) — systématisation via SOP avant exécution manuelle | CONTEXT: Session Build Queue — 3 Blueprints + exécution via 2 routes MCP

[2026-04-28] DECISION: Route Zapier pour lecture Google Sheets (pipeline) — authentification requise, lire via Google Drive MCP en fallback | REASONING: Zapier nécessite auth Google Sheets distincte. Google Drive MCP peut lire les sheets directement en attendant. | CONTEXT: Exécution Tâche 1 — résumé pipeline lundi

[2026-04-28] DECISION: Gmail MCP (Route Abonnement) pour brouillons clients — actif et fonctionnel | REASONING: MCP Gmail disponible via abonnement Claude — brouillon créé directement sans copier-coller manuel. Jamais envoi direct. | CONTEXT: Exécution Tâche 2 — suivi Foster & Marsh Legal

[2026-04-28] DECISION: Google Drive MCP pour génération documents de proposition | REASONING: Lecture docs identity + pricing via Drive MCP, création fichier Google Doc directement. Pipeline data récupérée en même temps. | CONTEXT: Exécution Tâche 3 — proposition Sahel Cafe Group
