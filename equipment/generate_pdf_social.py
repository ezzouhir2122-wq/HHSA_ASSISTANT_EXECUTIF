#!/usr/bin/env python3
"""
generate_pdf_social.py — HHSA Agency Social Posts PDF Generator
Generates a structured PDF from a JSON social posts file.

Usage:
    python equipment/generate_pdf_social.py \
        --input live/research/posts-YYYYMMDD.json \
        --output live/research/posts-YYYYMMDD.pdf

JSON input format:
    {
        "brand": "HHSA Agency",
        "topic": "Utilisation de l'IA — Création de Contenu",
        "date": "15 Mai 2026",
        "posts": {
            "linkedin": {"text": "...", "hashtags": ["#IA", ...]},
            "facebook": {"text": "...", "hashtags": ["#IA", ...]},
            "instagram": {"text": "...", "hashtags": ["#IA", ...]}
        }
    }
"""

import json
import sys
import argparse
from datetime import datetime
from pathlib import Path


def ensure_fpdf():
    try:
        from fpdf import FPDF, XPos, YPos
        return FPDF, XPos, YPos
    except ImportError:
        import subprocess
        print("Installation de fpdf2...", file=sys.stderr)
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "fpdf2"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        from fpdf import FPDF, XPos, YPos
        return FPDF, XPos, YPos


def safe(text: str) -> str:
    """Replace Unicode chars outside latin-1 with ASCII equivalents."""
    replacements = {
        "—": "--", "–": "-", "‒": "-",
        "'": "'", "'": "'", "‚": ",",
        "“": '"', "”": '"', "„": '"',
        "…": "...", "·": "-", "•": "-",
        " ": " ", " ": " ", "​": "",
        "→": "->", "←": "<-", "×": "x",
        "é": "\xe9", "è": "\xe8", "ê": "\xea",
        "à": "\xe0", "â": "\xe2", "ù": "\xf9",
        "û": "\xfb", "î": "\xee", "ô": "\xf4",
        "ë": "\xeb", "ï": "\xef", "ü": "\xfc",
        "ç": "\xe7", "É": "\xc9", "È": "\xc8",
        "À": "\xc0", "Ê": "\xca", "Î": "\xce",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return text.encode("latin-1", errors="replace").decode("latin-1")


PLATFORMS = [
    {
        "key": "linkedin",
        "label": "LinkedIn",
        "color": (10, 102, 194),       # LinkedIn blue
        "bg": (232, 240, 254),
    },
    {
        "key": "facebook",
        "label": "Facebook",
        "color": (24, 119, 242),       # Facebook blue
        "bg": (232, 240, 255),
    },
    {
        "key": "instagram",
        "label": "Instagram",
        "color": (193, 53, 132),       # Instagram pink/purple
        "bg": (253, 232, 245),
    },
]

DARK = (15, 23, 42)
LIGHT_TEXT = (100, 116, 139)
BODY_TEXT = (51, 65, 85)


def generate_social_pdf(input_path: str, output_path: str) -> str:
    FPDF, XPos, YPos = ensure_fpdf()

    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    brand = safe(data.get("brand", "HHSA Agency"))
    topic = safe(data.get("topic", "Contenu Social"))
    report_date = safe(data.get("date", datetime.now().strftime("%d %B %Y")))
    posts = data.get("posts", {})

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

    pdf = SocialPDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=22)
    pdf.set_margins(22, 26, 22)
    pdf.add_page()

    # ── Title block ──────────────────────────────────────────────────────────
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*DARK)
    pdf.ln(4)
    pdf.multi_cell(0, 10, safe("Contenus Reseaux Sociaux"), align="L",
                   new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*LIGHT_TEXT)
    pdf.cell(0, 6, safe(f"Marque : {brand}  --  Sujet : {topic}  --  {report_date}"),
             align="L", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # Divider
    pdf.ln(4)
    pdf.set_draw_color(*DARK)
    pdf.set_line_width(0.7)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(10)

    # ── Platform sections ────────────────────────────────────────────────────
    for platform in PLATFORMS:
        key = platform["key"]
        post = posts.get(key, {})
        text = safe(post.get("text", ""))
        hashtags = post.get("hashtags", [])
        hashtag_line = safe("  ".join(hashtags))

        r, g, b = platform["color"]
        br, bg, bb = platform["bg"]

        # Platform header bar
        pdf.set_fill_color(r, g, b)
        pdf.set_text_color(255, 255, 255)
        pdf.set_font("Helvetica", "B", 12)
        pdf.cell(0, 10, f"  {platform['label']}", fill=True,
                 new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(4)

        # Post text on light background
        pdf.set_fill_color(br, bg, bb)
        pdf.set_text_color(*BODY_TEXT)
        pdf.set_font("Helvetica", "", 9.5)

        # Draw background rect manually then write text
        x = pdf.get_x()
        y = pdf.get_y()
        # Estimate height: write first to measure, then re-draw with bg
        # Simpler: just use multi_cell with fill
        pdf.multi_cell(0, 5.5, text, fill=True,
                       new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        # Hashtags
        if hashtag_line:
            pdf.ln(3)
            pdf.set_font("Helvetica", "B", 8.5)
            pdf.set_text_color(r, g, b)
            pdf.multi_cell(0, 5, hashtag_line,
                           new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        pdf.ln(10)

        # Separator between platforms
        if key != "instagram":
            pdf.set_draw_color(210, 218, 230)
            pdf.set_line_width(0.25)
            pdf.line(22, pdf.get_y(), 188, pdf.get_y())
            pdf.ln(10)

    # ── Closing line ─────────────────────────────────────────────────────────
    pdf.set_draw_color(*DARK)
    pdf.set_line_width(0.4)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(4)
    pdf.set_font("Helvetica", "I", 7.5)
    pdf.set_text_color(*LIGHT_TEXT)
    pdf.multi_cell(
        0, 5,
        safe(f"Genere automatiquement par HHSA Agency Executive Assistant  --  {report_date}  --  Usage interne uniquement."),
    )

    # ── Save ─────────────────────────────────────────────────────────────────
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(out))
    print(f"PDF genere : {out.resolve()}")
    return str(out.resolve())


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Genere un PDF de posts sociaux HHSA depuis un fichier JSON."
    )
    parser.add_argument("--input", required=True, help="Chemin vers le fichier posts JSON")
    parser.add_argument("--output", required=True, help="Chemin de sortie du PDF")
    args = parser.parse_args()

    path = generate_social_pdf(args.input, args.output)
    print(f"Succes : {path}")
