# Branding System — PDF Documents
*Design spec · 2026-05-19*

## Objectif

Appliquer automatiquement l'identité visuelle HHSA Agency à tous les documents clients générés en PDF : devis, factures, exports réseaux sociaux. Éliminer tout rendu générique.

---

## Architecture

```
equipment/
├── brand.py                  ← source unique du branding (nouveau)
├── assets/
│   └── logo.png              ← logo HHSA Agency fond blanc (à déposer)
├── generate_pdf_devis.py     ← modifié
├── generate_pdf_facture.py   ← modifié
└── generate_pdf_social.py    ← modifié
```

Un seul fichier `brand.py` centralise couleurs, logo, nom de marque, et fonctions de rendu. Les 3 scripts PDF l'importent — aucune couleur ni logique de header n'est dupliquée.

---

## Identité visuelle

### Logo
- Fichier : `equipment/assets/logo.png`
- Variante utilisée : fond blanc, mark buildings gold, texte "HHS Agency" script gold
- Placement dans les PDFs : en-tête gauche, hauteur 14mm
- Fallback si fichier absent : texte "HHSA Agency" en gold bold (le script ne plante pas)

### Palette

| Rôle | Hex | RGB | Usage |
|------|-----|-----|-------|
| Brand gold | `#D4A017` | (212, 161, 23) | Sections `##`, accents, lignes décoratives, footer |
| Dark | `#1A1A1A` | (26, 26, 26) | Titres `#`, texte fort |
| Body | `#333547` | (51, 53, 71) | Corps de texte courant |
| Light | `#64748B` | (100, 116, 139) | Références, mentions légales, métadonnées |
| Page BG | `#FFFDF7` | (255, 253, 247) | Fond de page (légèrement chaud, cohérent avec le gold) |
| White | `#FFFFFF` | (255, 255, 255) | Fond en-tête, cellules de tableau |

---

## Contrat de `brand.py`

```python
BRAND = {
    "gold":    (212, 161, 23),
    "dark":    (26, 26, 26),
    "body":    (51, 53, 71),
    "light":   (100, 116, 139),
    "page_bg": (255, 253, 247),
    "white":   (255, 255, 255),
    "name":    "HHSA Agency",
    "logo":    "equipment/assets/logo.png",
}

def apply_header(pdf: FPDF, subtitle: str) -> None:
    """
    Dessine l'en-tête sur la page courante :
    - Logo à gauche (ou texte fallback si logo absent)
    - Sous-titre centré (ex: "Devis", "Facture", "Réseaux Sociaux")
    - Ligne décorative gold (#D4A017) en bas, 0.5pt
    - Hauteur totale : 20mm
    """

def apply_footer(pdf: FPDF) -> None:
    """
    Dessine le pied de page :
    - Ligne gold fine au-dessus
    - "HHSA Agency  ·  Document confidentiel  ·  Page X / N"
    - Texte gold 7.5pt, centré
    """
```

---

## Modifications des scripts existants

### Ce qui change dans chaque script
1. Supprimer la classe interne `DevisPDF(FPDF)` / `FacturePDF(FPDF)` / `SocialPDF(FPDF)`
2. La remplacer par une classe anonyme simple qui appelle `apply_header` et `apply_footer` depuis `brand`
3. Remplacer toutes les constantes hardcodées (`DARK`, `ACCENT`, `LIGHT_TEXT`, `PAGE_BG`) par les entrées `BRAND[...]`
4. Ajouter `import sys, os; sys.path.insert(0, os.path.dirname(__file__))` + `from brand import BRAND, apply_header, apply_footer`

### Ce qui ne change pas
- Toute la logique de parsing Markdown (devis, facture)
- Le parsing JSON (social)
- La génération des tableaux, sections, cellules
- Les signatures de fonctions publiques (`generate_devis`, `generate_facture`, `generate_social_pdf`)
- Les arguments CLI

---

## Comportement du fallback logo

```
Si equipment/assets/logo.png existe → l'image est insérée dans l'en-tête
Sinon → "HHSA Agency" affiché en Helvetica Bold gold 11pt à la place
Le script continue dans les deux cas, sans exception
```

---

## Critères de succès

- Générer un devis PDF → en-tête avec logo gold, pied de page gold, couleurs brand appliquées
- Générer une facture PDF → même résultat
- Générer un PDF réseaux sociaux → même résultat
- Supprimer `logo.png` → les 3 scripts fonctionnent encore (fallback texte)
- Modifier `BRAND["gold"]` dans `brand.py` → les 3 PDFs changent sans toucher aux scripts

---

## Fichiers concernés

| Fichier | Action |
|---------|--------|
| `equipment/brand.py` | Créer |
| `equipment/assets/logo.png` | Déposer (par l'utilisateur) |
| `equipment/generate_pdf_devis.py` | Modifier |
| `equipment/generate_pdf_facture.py` | Modifier |
| `equipment/generate_pdf_social.py` | Modifier |
