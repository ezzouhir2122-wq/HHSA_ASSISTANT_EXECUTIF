#!/usr/bin/env python3
"""
generate_pdf_devis.py -- HHSA Agency Devis PDF Generator
Generates a professional devis PDF from a Markdown source file.

Usage:
    python equipment/generate_pdf_devis.py \
        --input live/documents/devis/DEV-YYYYMMDD-NNN.md \
        --output live/documents/exports-pdf/DEV-YYYYMMDD-NNN.pdf
"""

import sys
import re
import argparse
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from brand import safe, BRAND, apply_header, apply_footer


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


DARK       = BRAND["dark"]
LIGHT_TEXT = BRAND["light"]
BODY_TEXT  = BRAND["body"]
ACCENT     = (59, 130, 246)
PAGE_BG    = (248, 250, 252)


def parse_markdown_table(lines):
    rows = []
    for line in lines:
        if line.startswith("|") and not re.match(r"\|[-| ]+\|", line):
            cols = [c.strip() for c in line.strip("|").split("|")]
            rows.append(cols)
    return rows


def generate_devis(input_path: str, output_path: str) -> str:
    FPDF, XPos, YPos = ensure_fpdf()

    content = Path(input_path).read_text(encoding="utf-8")
    lines = content.split("\n")

    def extract_field(label):
        for line in lines:
            if label in line:
                parts = line.split("**")
                if len(parts) >= 3:
                    return parts[2].strip().lstrip(":").strip()
                parts = line.split(":")
                if len(parts) >= 2:
                    return ":".join(parts[1:]).strip()
        return ""

    numero = extract_field("N° Devis")
    date_emission = extract_field("Date d'émission")
    validite = extract_field("Validité")

    in_prestations = False
    table_lines = []
    for line in lines:
        if "DÉTAIL DES PRESTATIONS" in line:
            in_prestations = True
            continue
        if in_prestations and line.startswith("|"):
            table_lines.append(line)
        elif in_prestations and line.startswith("##"):
            break

    prestations = parse_markdown_table(table_lines)

    total_line = ""
    for line in lines:
        if "Total TTC" in line or "Total" in line and "**" in line:
            total_line = line
            break

    class DevisPDF(FPDF):
        def header(self):
            apply_header(self)

        def footer(self):
            apply_footer(self)

    pdf = DevisPDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=22)
    pdf.set_margins(22, 26, 22)
    pdf.add_page()

    # Title
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*DARK)
    pdf.ln(4)
    pdf.cell(0, 10, safe("DEVIS"), new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # Reference line
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*LIGHT_TEXT)
    ref = safe(f"Ref : {numero}  --  Emis le : {date_emission}  --  Validite : {validite}")
    pdf.cell(0, 6, ref, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    # Divider
    pdf.ln(4)
    pdf.set_draw_color(*DARK)
    pdf.set_line_width(0.7)
    pdf.line(22, pdf.get_y(), 188, pdf.get_y())
    pdf.ln(8)

    # Render full markdown content
    skip_headers = {"HHSA Agency", "# Template", "Source :"}
    for line in lines:
        stripped = line.strip()
        if not stripped:
            pdf.ln(3)
            continue
        if any(s in stripped for s in skip_headers):
            continue
        if stripped.startswith("# "):
            pdf.set_font("Helvetica", "B", 14)
            pdf.set_text_color(*DARK)
            pdf.multi_cell(0, 8, safe(stripped[2:]), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        elif stripped.startswith("## "):
            pdf.ln(3)
            pdf.set_font("Helvetica", "B", 11)
            pdf.set_text_color(*ACCENT)
            pdf.multi_cell(0, 7, safe(stripped[3:]), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            pdf.ln(1)
        elif stripped.startswith("|"):
            if re.match(r"\|[-| ]+\|", stripped):
                continue
            cols = [safe(c.strip()) for c in stripped.strip("|").split("|")]
            col_w = 166 / len(cols)
            is_header = any(c.startswith("**") or c == "#" for c in cols)
            if is_header:
                pdf.set_fill_color(*PAGE_BG)
                pdf.set_font("Helvetica", "B", 9)
                pdf.set_text_color(*DARK)
            else:
                pdf.set_fill_color(255, 255, 255)
                pdf.set_font("Helvetica", "", 9)
                pdf.set_text_color(*BODY_TEXT)
            for col in cols:
                col_clean = col.replace("**", "")
                pdf.cell(col_w, 7, col_clean, border=1, fill=is_header)
            pdf.ln()
        elif stripped.startswith("**") and stripped.endswith("**"):
            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(*DARK)
            pdf.multi_cell(0, 6, safe(stripped.replace("**", "")), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        elif stripped.startswith("*") and stripped.endswith("*"):
            pdf.set_font("Helvetica", "I", 8)
            pdf.set_text_color(*LIGHT_TEXT)
            pdf.multi_cell(0, 5, safe(stripped.replace("*", "")), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        elif stripped.startswith("---"):
            pdf.ln(2)
            pdf.set_draw_color(210, 218, 230)
            pdf.set_line_width(0.25)
            pdf.line(22, pdf.get_y(), 188, pdf.get_y())
            pdf.ln(4)
        else:
            pdf.set_font("Helvetica", "", 9.5)
            pdf.set_text_color(*BODY_TEXT)
            pdf.multi_cell(0, 5.5, safe(stripped), new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(out))
    print(f"PDF genere : {out.resolve()}")
    return str(out.resolve())


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Genere un PDF de devis HHSA depuis un fichier Markdown."
    )
    parser.add_argument("--input",  required=True, help="Chemin vers le fichier devis .md")
    parser.add_argument("--output", required=True, help="Chemin de sortie du PDF")
    args = parser.parse_args()

    path = generate_devis(args.input, args.output)
    print(f"Succes : {path}")
