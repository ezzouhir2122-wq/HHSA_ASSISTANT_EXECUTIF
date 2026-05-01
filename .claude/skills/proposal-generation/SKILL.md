---
name: proposal-generation
description: Génère un document de proposition commerciale complet en lisant l'Identité d'entreprise et la grille tarifaire depuis Google Drive, et les données pipeline depuis Sheets via Zapier. Crée le fichier dans Drive après validation.
allowed-tools: mcp__claude_ai_Google_Drive__search_files, mcp__claude_ai_Google_Drive__read_file_content, mcp__claude_ai_Google_Drive__create_file, mcp__zapier__list_enabled_zapier_actions, mcp__zapier__discover_zapier_actions, mcp__zapier__enable_zapier_action, mcp__zapier__execute_zapier_read_action
---

Génère une proposition commerciale complète. Lit les sources, rédige, valide, puis crée dans Drive.
Confirme avant toute création de fichier. Ne partage jamais directement.

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Nom du client | Tel qu'il apparaît dans le sheet | Oui |
| Nom du contact | Prénom + nom + titre | Oui |
| Nom doc Identité d'entreprise | Nom exact du fichier dans Google Drive | Oui |
| Nom doc Grille tarifaire | Nom exact du fichier dans Google Drive | Oui |
| Périmètre spécifique | Services inclus dans cette proposition | Oui |
| Date de la proposition | Auto : date du jour | Oui (auto) |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

## Séquence

**Étape 1 — Lire le document Identité d'entreprise**
`mcp__claude_ai_Google_Drive__search_files` avec le nom du document.
`mcp__claude_ai_Google_Drive__read_file_content` sur le fichier trouvé.
Extraire : nom de l'agence, tagline, mentions légales, coordonnées.

**Étape 2 — Lire la grille tarifaire**
`mcp__claude_ai_Google_Drive__search_files` avec le nom du document.
`mcp__claude_ai_Google_Drive__read_file_content` sur le fichier trouvé.
Extraire : services, descriptions, tarifs, conditions, packages.

**Étape 3 — Lire les données du lead (via Zapier)**
`list_enabled_zapier_actions` → confirmer l'action de lecture Sheets.
`execute_zapier_read_action` sur "Leads & Pipeline (Sample)".
Extraire : entreprise, contact, étape, valeur, services identifiés, next steps.

**Étape 4 — Générer le contenu de la proposition**

Structure imposée :

```
1. EN-TÊTE
   [Nom agence — Tagline]
   Proposition commerciale
   Pour : [Nom client] — [Nom contact]
   Date : [date]
   Référence : PROP-[YYYYMMDD]-[Initiales client]

2. INTRODUCTION
   Une phrase de contexte. Pourquoi cette proposition maintenant.

3. PÉRIMÈTRE DES SERVICES
   Liste des services inclus avec description courte de chacun.

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
Afficher le document complet. Attendre approbation ou corrections.

**Étape 6 — Créer le fichier dans Google Drive**
Une fois validé, confirmer : "Je vais créer ce document dans ton Google Drive sous le nom [nom]. On y va ?"
`mcp__claude_ai_Google_Drive__create_file` :
- Nom : `Proposition — [Nom Client] — [Date]`
- Contenu : document complet validé

**Étape 7 — Confirmer et reporter**
> Proposition créée : "Proposition — [Client] — [Date]"
> Lien : [URL Google Drive]
> À partager avec [Prénom Contact] après relecture finale.

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Doc Identité introuvable | `list_recent_files` pour lister les fichiers Drive. Demander confirmation. |
| Grille tarifaire introuvable | Même procédure. Sinon, demander les tarifs manuellement. |
| Lead introuvable dans le sheet | Confirmer le nom exact. Continuer avec les données fournies si besoin. |
| Contenu doc illisible | Signaler. Demander un copier-coller du contenu pertinent. |
| Demande de partage direct | Refuser. "Tu partages le lien toi-même après relecture." |
