#!/usr/bin/env python3
"""brand.py — HHSA Agency centralized branding. Imported by all PDF scripts."""

from pathlib import Path

BRAND = {
    "name":  "HHSA Agency",
    "gold":  (212, 160, 23),
    "dark":  (26, 26, 26),
    "body":  (51, 53, 71),
    "light": (100, 116, 139),
    "logo":  str(Path(__file__).parent / "assets" / "LOGO.png"),
}

_REPLACEMENTS = {
    "—": "--", "–": "-", "‒": "-",
    "‘": "'",  "’": "'", "‚": ",",
    "“": '"',  "”": '"', "„": '"',
    "…": "...", "·": "-", "•": "-",
    " ": " ",  "​": "",
    "→": "->", "←": "<-", "×": "x",
}


def safe(text: str) -> str:
    for src, dst in _REPLACEMENTS.items():
        text = text.replace(src, dst)
    return text.encode("latin-1", errors="replace").decode("latin-1")


def apply_header(pdf) -> None:
    from fpdf import XPos, YPos
    pdf.set_fill_color(*BRAND["dark"])
    pdf.rect(0, 0, 210, 20, "F")
    logo = BRAND["logo"]
    if Path(logo).exists():
        try:
            pdf.image(logo, x=85, y=3, h=14)
        except Exception:
            _header_text_fallback(pdf)
    else:
        _header_text_fallback(pdf)
    pdf.set_text_color(0, 0, 0)
    pdf.set_y(22)


def _header_text_fallback(pdf) -> None:
    from fpdf import XPos, YPos
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(255, 255, 255)
    pdf.set_y(6)
    pdf.cell(0, 8, "HHSA AGENCY", align="C",
             new_x=XPos.LMARGIN, new_y=YPos.NEXT)


def apply_footer(pdf) -> None:
    pdf.set_y(-16)
    pdf.set_draw_color(*BRAND["light"])
    pdf.set_line_width(0.25)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(2)
    pdf.set_font("Helvetica", "I", 7.5)
    pdf.set_text_color(*BRAND["light"])
    pdf.cell(
        0, 10,
        f"HHSA Agency  --  Document confidentiel  --  Page {pdf.page_no()}/{{nb}}",
        align="C",
    )


def apply_paid_watermark(pdf, text: str = "PAYE") -> None:
    current_y = pdf.get_y()
    pdf.set_font("Helvetica", "B", 72)
    pdf.set_text_color(220, 53, 69)
    pdf.set_alpha(0.25)
    with pdf.rotation(45, x=105, y=148.5):
        pdf.text(x=25, y=170, txt=safe(text))
    pdf.set_alpha(1.0)
    pdf.set_text_color(0, 0, 0)
    pdf.set_y(current_y)
