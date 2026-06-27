---
name: devis-et-factures
description: Génère un devis ou une facture PDF brandé HHSA Agency depuis un template Markdown. Déclencher quand l'utilisateur dit "génère un devis pour", "crée une facture pour", "prépare la facture", ou "marque la facture comme payée".
allowed-tools: Bash, Read, Write
---

Génère un devis ou une facture PDF brandé. Lit le template → remplit les données → valide → génère le PDF.

## Inputs Requis

| Input | Obligatoire |
|-------|-------------|
| Type (devis ou facture) | Oui |
| Nom du client | Oui |
| Nom + email du contact | Oui |
| Liste des prestations + montants | Oui |
| Conditions de paiement | Oui |
| Statut payé (oui/non) | Non — défaut : non |
| N° devis de référence | Si facture |

Si un input financier est manquant → **STOP. Lister ce qui manque.**

## Séquence

**Étape 1 — Confirmer les inputs**
Lister les informations manquantes. Ne pas commencer sans données financières complètes.

**Étape 2 — Lire le template**
- Devis → `templates/devis/devis-template.md`
- Facture → `templates/factures/facture-template.md`

**Étape 3 — Générer le contenu Markdown**
Attribuer le numéro :
- Devis : `DEV-[YYYYMMDD]-[NNN]` (NNN commence à 001)
- Facture : `FAC-[YYYYMMDD]-[NNN]`

**Étape 4 — Présenter pour validation**
Afficher le document complet. Attendre approbation ou corrections.

**Étape 5 — Sauvegarder le fichier MD source**
- Devis : `live/documents/devis/DEV-[YYYYMMDD]-[NNN].md`
- Facture : `live/documents/factures/FAC-[YYYYMMDD]-[NNN].md`

**Étape 6 — Générer le PDF**

Devis standard :
```bash
python equipment/generate_pdf_devis.py \
  --input live/documents/devis/DEV-YYYYMMDD-NNN.md \
  --output live/documents/exports-pdf/DEV-YYYYMMDD-NNN.pdf
```

Facture standard :
```bash
python equipment/generate_pdf_facture.py \
  --input live/documents/factures/FAC-YYYYMMDD-NNN.md \
  --output live/documents/exports-pdf/FAC-YYYYMMDD-NNN.pdf
```

Facture payée (filigrane PAYÉ) :
```bash
python equipment/generate_pdf_facture.py \
  --input live/documents/factures/FAC-YYYYMMDD-NNN.md \
  --output live/documents/exports-pdf/FAC-YYYYMMDD-NNN-PAYE.pdf \
  --paid
```

**Étape 7 — Copier dans le dossier client**
Copier le PDF dans `clients/[nom-client]/devis/` ou `clients/[nom-client]/factures/`.
Si le dossier n'existe pas → créer `clients/[nom-client]/` avec sous-dossiers `devis/` et `factures/`.

**Étape 8 — Reporter**
```
[Type] créé : [N° document]
PDF    : live/documents/exports-pdf/[N°].pdf
Client : clients/[nom-client]/[type]/[N°].pdf
Statut : [Standard | PAYÉ — filigrane appliqué]
```

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Montants manquants | STOP. Demander les montants exacts avant de continuer. |
| Script PDF échoue | Fournir le Markdown source — utilisable pour copier-coller. |
| Dossier client inexistant | Créer automatiquement. |
| Demande d'envoi direct | Refuser. "Je prépare le PDF. Tu l'envoies toi-même après vérification." |
