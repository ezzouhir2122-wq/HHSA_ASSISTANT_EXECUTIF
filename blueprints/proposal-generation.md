# Blueprint — Génération de Document de Proposition

**Goal:** Générer un document de proposition professionnel et complet pour un client, en combinant les données du pipeline, la grille tarifaire et le branding tiré du document Identité d'entreprise. Créer le fichier final dans Google Drive.

**Quand utiliser ce Blueprint:**
Toute demande de production d'une proposition formelle pour un client — nouveau lead, confirmation de périmètre post-Won, ou re-proposition.
Déclencheurs : "Génère une proposition pour [client]", "Prépare le doc de proposition", "Formalise le périmètre pour [client]"

**Route MCP :** Abonnement (Google Drive lecture + création)

---

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom du client | Tel qu'il apparaît dans le sheet | Oui |
| Nom du contact | Prénom + nom + titre | Oui |
| Données pipeline | Étape, valeur du deal, services concernés | Oui |
| Nom doc Identité d'entreprise | Nom exact du fichier dans Google Drive | Oui |
| Nom doc Grille tarifaire | Nom exact du fichier dans Google Drive | Oui |
| Périmètre spécifique | Services inclus dans cette proposition | Oui |
| Date de la proposition | Date d'émission du document | Oui (auto : date du jour) |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

---

## Séquence

**Étape 1 — Lire le document Identité d'entreprise**
`mcp__claude_ai_Google_Drive__search_files` avec le nom du document.
`mcp__claude_ai_Google_Drive__read_file_content` sur le fichier trouvé.
Extraire : nom de l'agence, tagline, mentions légales, coordonnées, logo / mentions visuelles.

**Étape 2 — Lire la grille tarifaire**
`mcp__claude_ai_Google_Drive__search_files` avec le nom du document.
`mcp__claude_ai_Google_Drive__read_file_content` sur le fichier trouvé.
Extraire : services, descriptions, tarifs, conditions, packages si applicable.

**Étape 3 — Lire les données du lead dans le sheet (via Zapier)**
`execute_zapier_read_action` sur le sheet "Leads & Pipeline".
Extraire : entreprise, contact, étape, valeur, services identifiés, next steps.

**Étape 4 — Générer le contenu de la proposition**
Structure imposée du document :

```
1. EN-TÊTE
   [Logo / Nom agence — Tagline]
   Proposition commerciale
   Pour : [Nom client] — [Nom contact]
   Date : [date]
   Référence : PROP-[YYYYMMDD]-[Initiales client]

2. INTRODUCTION
   Une phrase de contexte. Pourquoi cette proposition maintenant.

3. PÉRIMÈTRE DES SERVICES
   Liste des services inclus avec description courte de chacun.
   Source : grille tarifaire + données pipeline.

4. LIVRABLES
   Ce que le client reçoit concrètement pour chaque service.

5. INVESTISSEMENT
   Tableau : Service | Description | Tarif
   Total : $[montant]
   Conditions de paiement si définies dans la grille.

6. PROCHAINES ÉTAPES
   Une ou deux actions concrètes avec délais.

7. MENTIONS LÉGALES ET SIGNATURE
   [Mentions tirées du doc Identité]
   Signataire : Ezzouhir — HHSA Agency
   Date de validité de l'offre : 30 jours
```

**Étape 5 — Présenter le contenu pour validation**
Afficher le document complet avant de créer quoi que ce soit dans Drive. Attendre approbation ou corrections.

**Étape 6 — Créer le fichier dans Google Drive**
Une fois validé, appeler `mcp__claude_ai_Google_Drive__create_file` :
- Nom du fichier : `Proposition — [Nom Client] — [Date]`
- Contenu : document complet validé

Confirmer avant : "Je vais créer ce document dans ton Google Drive sous le nom [nom]. On y va ?"

**Étape 7 — Confirmer et reporter**
Retourner le lien vers le fichier créé.
Annoncer : "Document créé. Lien : [lien Drive]. À partager avec [contact] après relecture."

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Doc Identité introuvable | Lister les fichiers Drive récents via `list_recent_files`. Demander confirmation. |
| Grille tarifaire introuvable | Même procédure. Sinon, demander les tarifs à utiliser. |
| Lead introuvable dans le sheet | Confirmer le nom exact. Continuer avec les données fournies manuellement si besoin. |
| Contenu doc illisible ou format inconnu | Signaler. Demander un copier-coller du contenu pertinent. |
| Demande de partage direct au client | Refuser l'envoi automatique. "Tu partages le lien toi-même après relecture." |

---

## Output Attendu

**Document Drive créé :**
> Proposition créée : "Proposition — [Client] — [Date]"
> Lien : [URL Google Drive]

**Résumé :**
> Services inclus : [liste]
> Montant total : $[valeur]
> Validité : 30 jours à compter du [date]
> À partager avec [Prénom Contact] après relecture finale.

---

*Blueprint créé : 2026-04-28*
*Route : Abonnement Google Drive · Données pipeline via Zapier · Référence : references/three-engine-model.md · .claude/rules/voice.md*
