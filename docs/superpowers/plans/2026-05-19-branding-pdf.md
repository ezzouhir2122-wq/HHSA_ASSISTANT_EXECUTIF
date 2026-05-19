# Branding System — PDF Documents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer `equipment/brand.py` comme source unique de l'identité visuelle HHSA Agency, puis brancher les 3 générateurs PDF existants dessus pour éliminer tout rendu générique.

**Architecture:** Un module `brand.py` expose `BRAND` (dict de couleurs/logo/nom) et deux fonctions `apply_header(pdf, subtitle)` / `apply_footer(pdf)`. Chaque script PDF supprime sa classe interne de header/footer et ses couleurs hardcodées, et délègue à `brand.py`. La logique de parsing (Markdown, JSON) ne change pas.

**Tech Stack:** Python 3, fpdf2, pytest

---

## Fichiers

| Fichier | Action |
|---------|--------|
| `equipment/brand.py` | Créer |
| `equipment/assets/LOGO.png` | Déjà en place (déposé par l'utilisateur) |
| `tests/test_brand.py` | Créer |
| `tests/test_pdf_generators.py` | Créer |
| `equipment/generate_pdf_devis.py` | Modifier |
| `equipment/generate_pdf_facture.py` | Modifier |
| `equipment/generate_pdf_social.py` | Modifier |

---

## Task 1 : brand.py (TDD)

**Files:**
- Create: `tests/test_brand.py`
- Create: `equipment/brand.py`

- [ ] **Step 1 : Installer les dépendances de test**

```bash
pip install fpdf2 pytest
```

- [ ] **Step 2 : Écrire les tests qui échouent**

Créer `tests/test_brand.py` :

```python
import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "equipment"))
from brand import BRAND, apply_header, apply_footer


def test_brand_dict_has_required_keys():
    required = {"gold", "dark", "body", "light", "page_bg", "white", "name", "logo"}
    assert required.issubset(BRAND.keys())


def test_brand_colors_are_rgb_tuples():
    for key in ("gold", "dark", "body", "light", "page_bg", "white"):
        assert isinstance(BRAND[key], tuple), f"{key} should be a tuple"
        assert len(BRAND[key]) == 3, f"{key} should have 3 components"
        assert all(0 <= v <= 255 for v in BRAND[key]), f"{key} values should be 0-255"


def test_brand_gold_value():
    assert BRAND["gold"] == (212, 161, 23)


def test_brand_name():
    assert BRAND["name"] == "HHSA Agency"


def test_apply_header_runs_without_error():
    from fpdf import FPDF
    pdf = FPDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    apply_header(pdf, "Test")


def test_apply_header_fallback_when_logo_missing(tmp_path, monkeypatch):
    from fpdf import FPDF
    monkeypatch.setitem(BRAND, "logo", str(tmp_path / "nonexistent.png"))
    pdf = FPDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    apply_header(pdf, "Test")  # must not raise


def test_apply_footer_runs_without_error():
    from fpdf import FPDF
    pdf = FPDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    apply_footer(pdf)
```

- [ ] **Step 3 : Vérifier que les tests échouent**

```bash
pytest tests/test_brand.py -v
```

Résultat attendu : `ModuleNotFoundError: No module named 'brand'`

- [ ] **Step 4 : Créer `equipment/brand.py`**

```python
#!/usr/bin/env python3
"""
brand.py — HHSA Agency Brand Module
Single source of truth for visual identity across all PDF documents.
"""
import os
from pathlib import Path

BRAND = {
    "gold":    (212, 161, 23),
    "dark":    (26, 26, 26),
    "body":    (51, 53, 71),
    "light":   (100, 116, 139),
    "page_bg": (255, 253, 247),
    "white":   (255, 255, 255),
    "name":    "HHSA Agency",
    "logo":    str(Path(__file__).parent / "assets" / "LOGO.png"),
}


def apply_header(pdf, subtitle: str = "") -> None:
    """White header: logo left, subtitle centered, gold bottom line."""
    pdf.set_fill_color(*BRAND["white"])
    pdf.rect(0, 0, 210, 20, "F")

    logo_path = BRAND["logo"]
    logo_placed = False
    if os.path.exists(logo_path):
        try:
            pdf.image(logo_path, x=8, y=3, h=14)
            logo_placed = True
        except Exception:
            pass

    if not logo_placed:
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(*BRAND["gold"])
        pdf.set_xy(8, 6)
        pdf.cell(60, 8, BRAND["name"])

    if subtitle:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_text_color(*BRAND["light"])
        pdf.set_xy(0, 7)
        pdf.cell(210, 6, subtitle.upper(), align="C")

    pdf.set_draw_color(*BRAND["gold"])
    pdf.set_line_width(0.5)
    pdf.line(0, 20, 210, 20)

    pdf.set_text_color(0, 0, 0)
    pdf.set_y(22)


def apply_footer(pdf) -> None:
    """Gold separator line + centered brand/page text."""
    pdf.set_y(-14)
    pdf.set_draw_color(*BRAND["gold"])
    pdf.set_line_width(0.4)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(2)
    pdf.set_font("Helvetica", "I", 7.5)
    pdf.set_text_color(*BRAND["gold"])
    pdf.cell(
        0, 6,
        f"{BRAND['name']}  --  Document confidentiel  --  Page {pdf.page_no()}/{{nb}}",
        align="C",
    )
```

- [ ] **Step 5 : Vérifier que les tests passent**

```bash
pytest tests/test_brand.py -v
```

Résultat attendu : `7 passed`

- [ ] **Step 6 : Commit**

```bash
git add equipment/brand.py tests/test_brand.py
git commit -m "feat: add brand.py — centralized HHSA Agency visual identity module"
```

---

## Task 2 : Brancher generate_pdf_devis.py

**Files:**
- Create: `tests/test_pdf_generators.py`
- Modify: `equipment/generate_pdf_devis.py`

- [ ] **Step 1 : Écrire le test d'intégration devis (échouera après modification)**

Créer `tests/test_pdf_generators.py` :

```python
import os
import sys
import json
import pytest
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "equipment"))


def test_generate_devis_produces_pdf(tmp_path):
    from generate_pdf_devis import generate_devis

    md = tmp_path / "DEV-20260519-001.md"
    md.write_text(
        "# DEVIS\n\n"
        "**N° Devis :** DEV-20260519-001\n"
        "**Date d'émission :** 19/05/2026\n"
        "**Validité :** 30 jours\n\n"
        "## DÉTAIL DES PRESTATIONS\n\n"
        "| # | Prestation | Prix HT |\n"
        "|---|-----------|--------|\n"
        "| **1** | **Service test** | **100 EUR** |\n\n"
        "**Total TTC : 100 EUR**\n",
        encoding="utf-8",
    )
    out = tmp_path / "devis.pdf"
    result = generate_devis(str(md), str(out))
    assert Path(result).exists()
    assert Path(result).stat().st_size > 1000
```

- [ ] **Step 2 : Lancer le test pour vérifier qu'il passe avant modification**

```bash
pytest tests/test_pdf_generators.py::test_generate_devis_produces_pdf -v
```

Résultat attendu : `PASSED` (le script fonctionne encore — c'est une baseline).

- [ ] **Step 3 : Modifier generate_pdf_devis.py**

Dans `equipment/generate_pdf_devis.py`, effectuer ces 4 changements :

**Changement 1** — Ajouter l'import brand après les imports existants (après `from pathlib import Path`) :

Remplacer :
```python
from pathlib import Path


def ensure_fpdf():
```

Par :
```python
from pathlib import Path

import sys as _sys
import os as _os
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from brand import BRAND, apply_header, apply_footer


def ensure_fpdf():
```

**Changement 2** — Supprimer les 5 constantes de couleur hardcodées :

Remplacer :
```python
DARK = (15, 23, 42)
LIGHT_TEXT = (100, 116, 139)
BODY_TEXT = (51, 65, 85)
ACCENT = (59, 130, 246)
PAGE_BG = (248, 250, 252)
```

Par :
```python
DARK = BRAND["dark"]
LIGHT_TEXT = BRAND["light"]
BODY_TEXT = BRAND["body"]
ACCENT = BRAND["gold"]
PAGE_BG = BRAND["page_bg"]
```

**Changement 3** — Remplacer la classe `DevisPDF` interne :

Remplacer :
```python
    class DevisPDF(FPDF):
        def header(self):
            self.set_fill_color(*DARK)
            self.rect(0, 0, 210, 20, "F")
            self.set_font("Helvetica", "B", 10)
            self.set_text_color(255, 255, 255)
            self.set_y(6)
            self.cell(0, 8, "HHSA AGENCY  --  Devis", align="C",
                      new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.set_text_color(0, 0, 0)
            self.set_y(22)

        def footer(self):
            self.set_y(-14)
            self.set_font("Helvetica", "I", 7.5)
            self.set_text_color(*LIGHT_TEXT)
            self.cell(
                0, 10,
                f"HHSA Agency  --  Document confidentiel  --  Page {self.page_no()}/{{nb}}",
                align="C",
            )
```

Par :
```python
    class DevisPDF(FPDF):
        def header(self):
            apply_header(self, "Devis")

        def footer(self):
            apply_footer(self)
```

- [ ] **Step 4 : Relancer le test**

```bash
pytest tests/test_pdf_generators.py::test_generate_devis_produces_pdf -v
```

Résultat attendu : `PASSED`

- [ ] **Step 5 : Commit**

```bash
git add equipment/generate_pdf_devis.py tests/test_pdf_generators.py
git commit -m "feat: apply HHSA brand to devis PDF generator"
```

---

## Task 3 : Brancher generate_pdf_facture.py

**Files:**
- Modify: `equipment/generate_pdf_facture.py`
- Modify: `tests/test_pdf_generators.py` (ajouter le test)

- [ ] **Step 1 : Ajouter le test d'intégration facture dans `tests/test_pdf_generators.py`**

Ajouter à la fin du fichier :

```python
def test_generate_facture_produces_pdf(tmp_path):
    from generate_pdf_facture import generate_facture

    md = tmp_path / "FAC-20260519-001.md"
    md.write_text(
        "# FACTURE\n\n"
        "**N° Facture :** FAC-20260519-001\n"
        "**Date d'émission :** 19/05/2026\n"
        "**Date d'échéance :** 19/06/2026\n\n"
        "## PRESTATIONS\n\n"
        "| # | Prestation | Prix HT |\n"
        "|---|-----------|--------|\n"
        "| **1** | **Service test** | **100 EUR** |\n\n"
        "**Total TTC : 100 EUR**\n",
        encoding="utf-8",
    )
    out = tmp_path / "facture.pdf"
    result = generate_facture(str(md), str(out))
    assert Path(result).exists()
    assert Path(result).stat().st_size > 1000
```

- [ ] **Step 2 : Vérifier baseline**

```bash
pytest tests/test_pdf_generators.py::test_generate_facture_produces_pdf -v
```

Résultat attendu : `PASSED`

- [ ] **Step 3 : Modifier generate_pdf_facture.py**

**Changement 1** — Ajouter import brand (après `from pathlib import Path`) :

Remplacer :
```python
from pathlib import Path


def ensure_fpdf():
```

Par :
```python
from pathlib import Path

import sys as _sys
import os as _os
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from brand import BRAND, apply_header, apply_footer


def ensure_fpdf():
```

**Changement 2** — Remplacer les constantes :

Remplacer :
```python
DARK = (15, 23, 42)
LIGHT_TEXT = (100, 116, 139)
BODY_TEXT = (51, 65, 85)
ACCENT = (16, 185, 129)  # Green for invoices (vs blue for devis)
PAGE_BG = (248, 250, 252)
```

Par :
```python
DARK = BRAND["dark"]
LIGHT_TEXT = BRAND["light"]
BODY_TEXT = BRAND["body"]
ACCENT = BRAND["gold"]
PAGE_BG = BRAND["page_bg"]
```

**Changement 3** — Remplacer la classe `FacturePDF` interne :

Remplacer :
```python
    class FacturePDF(FPDF):
        def header(self):
            self.set_fill_color(*DARK)
            self.rect(0, 0, 210, 20, "F")
            self.set_font("Helvetica", "B", 10)
            self.set_text_color(255, 255, 255)
            self.set_y(6)
            self.cell(0, 8, "HHSA AGENCY  --  Facture", align="C",
                      new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.set_text_color(0, 0, 0)
            self.set_y(22)

        def footer(self):
            self.set_y(-14)
            self.set_font("Helvetica", "I", 7.5)
            self.set_text_color(*LIGHT_TEXT)
            self.cell(
                0, 10,
                f"HHSA Agency  --  Document confidentiel  --  Page {self.page_no()}/{{nb}}",
                align="C",
            )
```

Par :
```python
    class FacturePDF(FPDF):
        def header(self):
            apply_header(self, "Facture")

        def footer(self):
            apply_footer(self)
```

- [ ] **Step 4 : Relancer le test**

```bash
pytest tests/test_pdf_generators.py::test_generate_facture_produces_pdf -v
```

Résultat attendu : `PASSED`

- [ ] **Step 5 : Commit**

```bash
git add equipment/generate_pdf_facture.py tests/test_pdf_generators.py
git commit -m "feat: apply HHSA brand to facture PDF generator"
```

---

## Task 4 : Brancher generate_pdf_social.py

**Files:**
- Modify: `equipment/generate_pdf_social.py`
- Modify: `tests/test_pdf_generators.py` (ajouter le test)

- [ ] **Step 1 : Ajouter le test d'intégration social**

Ajouter à la fin de `tests/test_pdf_generators.py` :

```python
def test_generate_social_produces_pdf(tmp_path):
    from generate_pdf_social import generate_social_pdf

    data = {
        "brand": "HHSA Agency",
        "topic": "Test IA",
        "date": "19 Mai 2026",
        "posts": {
            "linkedin": {"text": "Post LinkedIn test.", "hashtags": ["#IA", "#Test"]},
            "facebook": {"text": "Post Facebook test.", "hashtags": ["#IA"]},
            "instagram": {"text": "Post Instagram test.", "hashtags": ["#IA", "#Test"]},
        },
    }
    inp = tmp_path / "posts-test.json"
    inp.write_text(json.dumps(data), encoding="utf-8")
    out = tmp_path / "social.pdf"
    result = generate_social_pdf(str(inp), str(out))
    assert Path(result).exists()
    assert Path(result).stat().st_size > 1000
```

Note : ajouter `import json` en haut du fichier si absent.

- [ ] **Step 2 : Vérifier baseline**

```bash
pytest tests/test_pdf_generators.py::test_generate_social_produces_pdf -v
```

Résultat attendu : `PASSED`

- [ ] **Step 3 : Modifier generate_pdf_social.py**

**Changement 1** — Ajouter import brand (après `from pathlib import Path`) :

Remplacer :
```python
from pathlib import Path


def ensure_fpdf():
```

Par :
```python
from pathlib import Path

import sys as _sys
import os as _os
_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from brand import BRAND, apply_header, apply_footer


def ensure_fpdf():
```

**Changement 2** — Remplacer les 3 constantes générales (garder `PLATFORMS` intact — ce sont des couleurs des plateformes, pas de la marque) :

Remplacer :
```python
DARK = (15, 23, 42)
LIGHT_TEXT = (100, 116, 139)
BODY_TEXT = (51, 65, 85)
```

Par :
```python
DARK = BRAND["dark"]
LIGHT_TEXT = BRAND["light"]
BODY_TEXT = BRAND["body"]
```

**Changement 3** — Remplacer la classe `SocialPDF` interne :

Remplacer :
```python
    class SocialPDF(FPDF):
        def header(self):
            self.set_fill_color(*DARK)
            self.rect(0, 0, 210, 20, "F")
            self.set_font("Helvetica", "B", 10)
            self.set_text_color(255, 255, 255)
            self.set_y(6)
            self.cell(0, 8, "HHSA AGENCY  --  Contenu Reseaux Sociaux", align="C",
                      new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.set_text_color(0, 0, 0)
            self.set_y(22)

        def footer(self):
            self.set_y(-14)
            self.set_font("Helvetica", "I", 7.5)
            self.set_text_color(*LIGHT_TEXT)
            self.cell(
                0, 10,
                f"HHSA Agency  --  Rapport confidentiel  --  Page {self.page_no()}/{{nb}}",
                align="C",
            )
```

Par :
```python
    class SocialPDF(FPDF):
        def header(self):
            apply_header(self, "Contenus Reseaux Sociaux")

        def footer(self):
            apply_footer(self)
```

- [ ] **Step 4 : Relancer tous les tests**

```bash
pytest tests/ -v
```

Résultat attendu : `10 passed`

- [ ] **Step 5 : Commit final**

```bash
git add equipment/generate_pdf_social.py tests/test_pdf_generators.py
git commit -m "feat: apply HHSA brand to social PDF generator — branding system complete"
```

---

## Vérification finale

Générer un PDF de chaque type depuis la racine du projet et vérifier visuellement l'en-tête :

```bash
# Devis de test
python equipment/generate_pdf_devis.py \
  --input templates/devis/DEV-template.md \
  --output live/documents/exports-pdf/test-brand-devis.pdf

# Facture de test (adapter le chemin si nécessaire)
# Social de test
python equipment/generate_pdf_social.py \
  --input live/research/posts-*.json \
  --output live/documents/exports-pdf/test-brand-social.pdf
```

Critères visuels à vérifier dans chaque PDF :
- En-tête : fond blanc, logo HHSA à gauche, ligne gold en bas
- Corps : sections `##` en gold, corps en gris-bleu foncé
- Pied de page : ligne gold fine + texte "HHSA Agency -- Document confidentiel -- Page X/N" en gold
