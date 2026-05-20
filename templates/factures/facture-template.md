# Template — Facture

**N° Facture :** FAC-[YYYYMMDD]-[NNN]
**Date d'émission :** [JJ Mois AAAA]
**Date d'échéance :** [JJ Mois AAAA — +30 jours par défaut]
**Devis de référence :** DEV-[YYYYMMDD]-[NNN] (si applicable)

---

## ÉMETTEUR

**HHSA Agency**
Ezzouhir [Nom de famille]
[Email] · [Téléphone]
[Ville, Pays]
[RIB / IBAN si virement]

## FACTURÉ À

**[Nom de l'entreprise cliente]**
[Nom du contact], [Titre]
[Adresse de facturation]
[Email du contact]

---

## DÉTAIL DES PRESTATIONS

| # | Description | Qté | Tarif unitaire | Total |
|---|-------------|-----|----------------|-------|
| 1 | [Prestation 1] | 1 | [Montant] | [Montant] |
| 2 | [Prestation 2] | 1 | [Montant] | [Montant] |

---

## RÉCAPITULATIF

| | |
|--|--|
| Sous-total HT | [Montant] |
| TVA (si applicable) | [Montant ou N/A] |
| **Total TTC** | **[Montant total]** |

---

## MODALITÉS DE PAIEMENT

- Virement bancaire : [RIB / IBAN]
- Ou par : [autre méthode]
- Date limite : [JJ Mois AAAA]

En cas de retard de paiement, des pénalités de retard de [X]% par mois pourront être appliquées.

---

*Source : blueprints/devis-et-factures.md · Equipment : equipment/generate_pdf_facture.py*
