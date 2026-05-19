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

[2026-05-19] DECISION: Audit complet EA — nettoyage + complétion du projet avant build | REASONING: Projet avait des lacunes structurelles (blueprints manquants Build Queue #1-3, skills sans blueprint, templates vides, fichiers hors place) qui auraient créé des blocages lors de l'exécution | CONTEXT: PARTIE 1 — Audit & Nettoyage de la session

[2026-05-19] DECISION: Equipment PDF devis+facture = lecture Markdown → PDF (pas JSON) | REASONING: Les devis et factures sont des documents riches avec sections, tables, signatures — Markdown est plus lisible et éditable que JSON pour ce cas d'usage | CONTEXT: Choix architecture generate_pdf_devis.py + generate_pdf_facture.py

[2026-05-19] DECISION: Structure clients/ à la racine (pas sous live/) | REASONING: clients/ est permanent et cross-projet, live/ est éphémère par session — mélanger les deux créerait de la confusion lors du nettoyage de live/ | CONTEXT: Architecture dossiers — session création structure opérationnelle

[2026-05-19] DECISION: Module brand.py centralisé (Approche A) pour le branding PDF | REASONING: Single source of truth — une seule modification dans brand.py met à jour tous les documents clients. Scalable quand un 4e script PDF est ajouté. | CONTEXT: PARTIE 2 Branding — choix architecture entre brand.py partagé vs config JSON vs édition directe

[2026-05-19] DECISION: En-tête PDF = fond blanc + logo gold (pas fond noir) | REASONING: Documents clients professionnels → fond blanc lisible. Fond noir adapté aux présentations, pas aux factures/devis imprimables. | CONTEXT: PARTIE 2 Branding — choix palette Option B vs A vs C
