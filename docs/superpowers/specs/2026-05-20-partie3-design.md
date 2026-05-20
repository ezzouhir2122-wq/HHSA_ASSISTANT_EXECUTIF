# Spec — PARTIE 3 : Nouvelles capacités EA

*Date : 2026-05-20 · Approche validée : A (séquentielle, branding d'abord)*

---

## Périmètre

Trois nouvelles capacités ajoutées à l'EA HHSA Agency :

1. **Factures PDF brandées avec filigrane PAYÉ** — `generate_pdf_facture.py` + `brand.py`
2. **Posts réseaux sociaux en mode autonome** — upgrade skill `contenu-social`
3. **3 routines planifiées** — CronCreate via `schedule` skill

---

## Architecture globale

```
equipment/
├── brand.py                    ← NOUVEAU (fondation commune)
│   ├── BRAND dict (couleurs, logo, typo)
│   ├── apply_header(pdf)
│   ├── apply_footer(pdf)
│   └── apply_paid_watermark(pdf, text="PAYÉ")
├── generate_pdf_facture.py     ← MODIFIÉ (brand.py + --paid)
├── generate_pdf_devis.py       ← MODIFIÉ (brand.py)
└── generate_pdf_social.py      ← MODIFIÉ (brand.py)

.claude/skills/
├── contenu-social/SKILL.md     ← MODIFIÉ (mode autonome)
└── devis-et-factures/SKILL.md  ← NOUVEAU

routines/
├── pipeline-recap.md
├── veille-contenu.md
└── bilan-semaine.md
```

---

## Feature 1 — Factures brandées + filigrane PAYÉ

### brand.py

Module centralisé importé par les 3 scripts PDF.

```python
BRAND = {
    "name": "HHSA Agency",
    "gold":  (212, 160, 23),   # #D4A017
    "dark":  (26, 26, 26),     # #1A1A1A
    "body":  (51, 53, 71),     # #333547
    "light": (100, 116, 139),
    "logo":  "equipment/assets/LOGO.png",
}

def apply_header(pdf: FPDF) -> None
def apply_footer(pdf: FPDF) -> None
def apply_paid_watermark(pdf: FPDF, text: str = "PAYÉ") -> None
```

`apply_header` : barre dark 20px en haut + logo HHSA gold centré.
`apply_footer` : ligne fine + "HHSA Agency · Page N / T" en italique light.
`apply_paid_watermark` : texte diagonal 45°, centré, Helvetica Bold 72pt, rouge `(220, 53, 69)`, opacité 25%, appliqué sur chaque page.

### generate_pdf_facture.py — modifications

- Importe `brand.py` : remplace l'en-tête/pied de page inline par `apply_header` / `apply_footer`
- Ajoute l'argument CLI `--paid` (flag booléen)
- Si `--paid` : appelle `apply_paid_watermark(pdf)` après génération du contenu, avant `pdf.output()`

**Interface CLI :**
```bash
# Facture standard
python equipment/generate_pdf_facture.py \
  --input live/documents/factures/FAC-20260520-001.md \
  --output live/documents/exports-pdf/FAC-20260520-001.pdf

# Facture payée
python equipment/generate_pdf_facture.py \
  --input live/documents/factures/FAC-20260520-001.md \
  --output live/documents/exports-pdf/FAC-20260520-001-PAYE.pdf \
  --paid
```

### Skill devis-et-factures — SKILL.md

Nouveau fichier `.claude/skills/devis-et-factures/SKILL.md`.

Déclencheurs : "génère une facture pour [client]", "crée un devis pour [client]", "marque la facture [N°] comme payée".

Séquence :
1. Collecter inputs (type, client, prestations, montants, conditions)
2. Lire le template (`templates/factures/` ou `templates/devis/`)
3. Générer le `.md` source dans `live/documents/`
4. Présenter pour validation
5. Appeler le script Python → PDF dans `live/documents/exports-pdf/`
6. Si statut = payée → relancer avec `--paid`
7. Copier dans `clients/[nom]/`
8. Reporter

---

## Feature 2 — contenu-social mode autonome

### Upgrade du skill

**Ancien comportement (Mode A) :** dépend d'un fichier `findings-*.json` existant.
**Nouveau comportement (Mode B) :** prend sujet + marque en input direct.

**Inputs directs :**

| Input | Obligatoire | Défaut |
|-------|-------------|--------|
| Sujet / thème | Oui | — |
| Nom de marque | Non | HHSA Agency |
| Langue | Non | FR |

**Séquence Mode B :**
1. Collecter sujet + marque si non fournis dans le déclencheur
2. Générer les 3 posts directement (LinkedIn, Facebook, Instagram) selon les specs de ton et longueur existants
3. Sauvegarder `live/research/posts-YYYYMMDD.json`
4. Générer PDF → `live/research/posts-YYYYMMDD.pdf`
5. Afficher les 3 posts pour relecture
6. Reporter

**Rétrocompatibilité :** si aucun sujet n'est fourni ET qu'un fichier `findings-*.json` récent existe → utiliser le findings comme contexte enrichi (Mode A préservé).

**Déclencheurs mis à jour :**
- Mode B : "génère les posts pour [marque] sur [sujet]"
- Mode A (inchangé) : "crée les posts sociaux" (sans sujet → cherche findings)

---

## Feature 3 — 3 routines planifiées (CronCreate)

### Définition des routines

| Routine | Fichier | Cron | Heure locale |
|---------|---------|------|-------------|
| Pipeline Recap | `routines/pipeline-recap.md` | `30 8 * * 1` | Lundi 08h30 |
| Veille + Contenu | `routines/veille-contenu.md` | `0 10 * * 3` | Mercredi 10h00 |
| Bilan Semaine | `routines/bilan-semaine.md` | `0 17 * * 5` | Vendredi 17h00 |

### Routine 1 — Pipeline Recap (Lundi 08h30)

Lance le skill `recap-pipeline` : résumé complet du CRM depuis Google Sheets (leads par étape, valeur active, top 3 chauds, follow-ups dus). Résultat affiché en session ou sauvegardé dans `live/recap-YYYYMMDD.md`.

### Routine 2 — Veille + Contenu Social (Mercredi 10h00)

Lance `recherche-tendances` sur "workflows agentiques PME MENA" → génère findings JSON → enchaîne avec `contenu-social` Mode A → 3 posts prêts + PDF dans `live/research/`.

### Routine 3 — Bilan Semaine (Vendredi 17h00)

Résumé de la semaine : tâches completées, leads contactés, revenus générés. Met à jour `live/state.md` (section Last Session + Open Tasks). Liste les 3 priorités de la semaine suivante.

### Déploiement

Chaque routine est enregistrée via le `schedule` skill (CronCreate). Tourne dans le cloud indépendamment de Claude Code.

Fichiers de définition dans `routines/` : format markdown avec champs `Cron`, `Description`, `Prompt`.

---

## Séquence d'implémentation (Approche A)

1. `brand.py` — module + tests
2. Brancher `generate_pdf_facture.py` + flag `--paid`
3. Brancher `generate_pdf_devis.py`
4. Brancher `generate_pdf_social.py`
5. Créer skill `devis-et-factures/SKILL.md`
6. Mettre à niveau skill `contenu-social` (Mode B)
7. Créer fichiers `routines/` + enregistrer via `schedule`

---

## Tests de validation

| Test | Commande | Résultat attendu |
|------|----------|-----------------|
| Facture standard | `generate_pdf_facture.py --input ... --output ...` | PDF brandé, logo gold, pas de filigrane |
| Facture payée | `generate_pdf_facture.py --input ... --output ... --paid` | PDF brandé + filigrane PAYÉ diagonal rouge |
| Posts autonomes | "génère les posts pour Soukwany sur le e-commerce" | 3 posts + JSON + PDF sans findings préalable |
| Pipeline Recap | Déclenchement manuel de la routine | Résumé CRM complet |

---

*Spec validée : 2026-05-20 · Client de test : Soukwany · Skill social-content v2.0.0 installé*
