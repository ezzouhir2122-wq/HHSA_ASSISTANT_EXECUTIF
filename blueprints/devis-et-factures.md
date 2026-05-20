# Blueprint — Génération de Devis et Factures

**Goal:** Générer un devis ou une facture professionnel pour un client, sauvegarder le PDF dans `live/documents/`, et archiver la source dans `clients/[nom]/`.

**Quand utiliser ce Blueprint:**
Toute demande de création de devis ou de facture.
Déclencheurs : "Génère un devis pour [client]", "Crée une facture pour [client]", "Prépare la facture [N°]"

**Route :** Read (templates) + Bash (script Python local)

---

## Inputs Requis

| Input | Description | Obligatoire |
|-------|-------------|-------------|
| Type de document | Devis ou Facture | Oui |
| Nom du client | Tel qu'il apparaît dans le CRM | Oui |
| Nom du contact | Prénom + nom + titre | Oui |
| Email du contact | Pour le destinataire | Oui |
| Services et tarifs | Liste des prestations avec montants | Oui |
| Conditions de paiement | NET 30 / 50-50 / autre | Oui |
| Devis de référence | N° devis (si facture) | Si facture |
| Date d'échéance | Date limite de paiement (si facture) | Si facture |

Si un input est manquant → **STOP. Lister ce qui manque. Ne pas supposer.**

---

## Séquence

**Étape 1 — Confirmer les inputs**
Lister les informations manquantes. Ne pas commencer sans les données financières complètes.

**Étape 2 — Lire le template**
- Devis → `templates/devis/devis-template.md`
- Facture → `templates/factures/facture-template.md`

**Étape 3 — Générer le contenu**
Remplir le template avec les données confirmées.
Attribuer le numéro de document :
- Devis : `DEV-[YYYYMMDD]-[NNN]` (NNN = séquence du jour, commencer à 001)
- Facture : `FAC-[YYYYMMDD]-[NNN]`

**Étape 4 — Présenter pour validation**
Afficher le document complet. Attendre approbation ou corrections.

**Étape 5 — Sauvegarder le JSON source**
Créer `live/documents/devis/DEV-[YYYYMMDD]-[NNN].md` ou `live/documents/factures/FAC-[YYYYMMDD]-[NNN].md`.

**Étape 6 — Générer le PDF**

Pour un devis :
```bash
python equipment/generate_pdf_devis.py \
  --input live/documents/devis/DEV-YYYYMMDD-NNN.md \
  --output live/documents/exports-pdf/DEV-YYYYMMDD-NNN.pdf
```

Pour une facture :
```bash
python equipment/generate_pdf_facture.py \
  --input live/documents/factures/FAC-YYYYMMDD-NNN.md \
  --output live/documents/exports-pdf/FAC-YYYYMMDD-NNN.pdf
```

**Étape 7 — Copier dans le dossier client**
Copier le PDF dans `clients/[nom-client]/devis/` ou `clients/[nom-client]/factures/`.

**Étape 8 — Confirmer et reporter**
```
[Type] créé : [N° document]
PDF : live/documents/exports-pdf/[N°].pdf
Copié dans : clients/[nom-client]/[type]/
À envoyer au client après relecture finale.
```

---

## Gestion des Erreurs

| Situation | Action |
|-----------|--------|
| Tarifs manquants ou flous | STOP. Demander les montants exacts avant de continuer. |
| Script PDF échoue | Fournir le document Markdown source — utilisable pour copier-coller. |
| Dossier client inexistant | Créer `clients/[nom]/` en dupliquant `clients/_template/`. |
| Demande d'envoi direct | Refuser. "Je prépare le PDF. Tu envoies toi-même après vérification." |

---

## Output Attendu

```
Devis DEV-20260519-001 généré pour [Client].

Source MD : live/documents/devis/DEV-20260519-001.md
PDF       : live/documents/exports-pdf/DEV-20260519-001.pdf
Client    : clients/[nom-client]/devis/DEV-20260519-001.pdf

À envoyer à [email] après relecture.
```

---

*Blueprint créé : 2026-05-19*
*Route : Read + Bash · Templates : templates/devis/ · templates/factures/ · Equipment : equipment/generate_pdf_devis.py · equipment/generate_pdf_facture.py*
