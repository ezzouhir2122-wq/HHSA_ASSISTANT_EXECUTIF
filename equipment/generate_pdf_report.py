#!/usr/bin/env python3
"""
generate_pdf_report.py — HHSA Agency Research Report Generator
Generates a structured PDF from a JSON findings file.

Usage:
    python equipment/generate_pdf_report.py \
        --input live/research/findings-YYYYMMDD.json \
        --output live/research/agentic-trends-YYYYMMDD.pdf

JSON input format:
    {
        "topic": "Tendances Agentic AI — Mai 2026",
        "date": "09 Mai 2026",
        "executive_summary": "...",
        "findings": [
            {
                "title": "...",
                "finding": "...",
                "impact": "...",
                "source": "..."
            }
        ]
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
        "‘": "'", "’": "'", "‚": ",",
        "“": '"', "”": '"', "„": '"',
        "…": "...", "·": "-", "•": "-",
        " ": " ", " ": " ", "​": "",
        "→": "->", "←": "<-", "×": "x",
        "é": "\xe9", "è": "\xe8", "ê": "\xea",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return text.encode("latin-1", errors="replace").decode("latin-1")


def generate_report(findings_path: str, output_path: str) -> str:
    FPDF, XPos, YPos = ensure_fpdf()

    with open(findings_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    findings = data.get("findings", [])[:5]
    report_date = safe(data.get("date", datetime.now().strftime("%d %B %Y")))
    topic = safe(data.get("topic", "Agentic AI Trends"))
    executive_summary = safe(data.get("executive_summary", ""))

    findings = [
        {k: safe(v) if isinstance(v, str) else v for k, v in f.items()}
        for f in findings
    ]

    ACCENT_COLORS = [
        (59, 130, 246),   # Bleu
        (16, 185, 129),   # Vert
        (245, 158, 11),   # Ambre
        (239, 68, 68),    # Rouge
        (139, 92, 246),   # Violet
    ]
    DARK = (15, 23, 42)
    LIGHT_TEXT = (100, 116, 139)
    BODY_TEXT = (51, 65, 85)
    PAGE_BG = (248, 250, 252)

    class ReportPDF(FPDF):
        def header(self):
            self.set_fill_color(*DARK)
            self.rect(0, 0, 210, 20, "F")
            self.set_font("Helvetica", "B", 10)
            self.set_text_color(255, 255, 255)
            self.set_y(6)
            self.cell(0, 8, "HHSA AGENCY  --  Research Intelligence", align="C",
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

    pdf = ReportPDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=22)
    pdf.set_margins(22, 26, 22)
    pdf.add_page()

    # ── Title block ──────────────────────────────────────────────────────────
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(*DARK)
    pdf.ln(4)
    pdf.multi_cell(0, 11, topic, align="L",
                   new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*LIGHT_TEXT)
    pdf.cell(0, 6, safe(f"Rapport de veille strategique  --  {report_date}"),
             align="L", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # Divider
    pdf.ln(4)
    pdf.set_draw_color(*DARK)
    pdf.set_line_width(0.7)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(8)

    # ── Executive Summary ────────────────────────────────────────────────────
    if executive_summary:
        pdf.set_fill_color(*PAGE_BG)
        y_before = pdf.get_y()
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*DARK)
        pdf.cell(0, 6, safe("Synth\xe8se ex\xe9cutive"), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(2)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*BODY_TEXT)
        pdf.multi_cell(0, 5.5, executive_summary, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(10)

    # ── Findings ─────────────────────────────────────────────────────────────
    for idx, finding in enumerate(findings):
        r, g, b = ACCENT_COLORS[idx % len(ACCENT_COLORS)]

        # Numbered badge + title bar
        pdf.set_fill_color(r, g, b)
        pdf.set_text_color(255, 255, 255)
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(18, 8, f"  #{idx + 1}", fill=True)

        # Title on a lighter bg
        pdf.set_fill_color(min(r + 185, 255), min(g + 185, 255), min(b + 185, 255))
        pdf.set_text_color(*DARK)
        pdf.set_font("Helvetica", "B", 10.5)
        title = finding.get("title", f"D\xe9couverte {idx + 1}")
        pdf.multi_cell(0, 8, f"  {title}", fill=True,
                       new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(3)

        # Body
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*BODY_TEXT)
        body = finding.get("finding", "")
        pdf.multi_cell(0, 5.5, body, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        # Impact callout
        impact = finding.get("impact", "")
        if impact:
            pdf.ln(3)
            pdf.set_font("Helvetica", "B", 8.5)
            pdf.set_text_color(r, g, b)
            pdf.cell(26, 5.5, ">> Impact :", new_x=XPos.RIGHT, new_y=YPos.TOP)
            pdf.set_font("Helvetica", "I", 9)
            pdf.set_text_color(*BODY_TEXT)
            pdf.multi_cell(0, 5.5, impact, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        # Source
        source = finding.get("source", "")
        if source:
            pdf.ln(1)
            pdf.set_font("Helvetica", "I", 7.5)
            pdf.set_text_color(*LIGHT_TEXT)
            pdf.cell(0, 5, f"Source : {source}",
                     new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        pdf.ln(7)

        # Thin separator between findings
        if idx < len(findings) - 1:
            pdf.set_draw_color(210, 218, 230)
            pdf.set_line_width(0.25)
            pdf.line(22, pdf.get_y(), 188, pdf.get_y())
            pdf.ln(7)

    # ── Closing line ─────────────────────────────────────────────────────────
    pdf.ln(2)
    pdf.set_draw_color(*DARK)
    pdf.set_line_width(0.4)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(4)
    pdf.set_font("Helvetica", "I", 7.5)
    pdf.set_text_color(*LIGHT_TEXT)
    pdf.multi_cell(
        0, 5,
        safe(f"Rapport g\xe9n\xe9r\xe9 automatiquement par HHSA Agency Executive Assistant  --  {report_date}  --  Usage interne uniquement."),
    )

    # ── Save ─────────────────────────────────────────────────────────────────
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(out))
    print(f"PDF généré : {out.resolve()}")
    return str(out.resolve())


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Génère un PDF de rapport de recherche HHSA depuis un fichier JSON."
    )
    parser.add_argument("--input", required=True, help="Chemin vers le fichier findings JSON")
    parser.add_argument("--output", required=True, help="Chemin de sortie du PDF")
    args = parser.parse_args()

    path = generate_report(args.input, args.output)
    print(f"Succès : {path}")
