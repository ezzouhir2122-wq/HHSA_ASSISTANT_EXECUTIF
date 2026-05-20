from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OUTPUT = "Week Plan — 4-9 mai 2026.pdf"

# Palette
C_RED    = HexColor("#DC2626")
C_BLUE   = HexColor("#1D4ED8")
C_INDIGO = HexColor("#4338CA")
C_GRAY   = HexColor("#6B7280")
C_LIGHT  = HexColor("#F3F4F6")
C_BORDER = HexColor("#E5E7EB")
C_WHITE  = white
C_BLACK  = HexColor("#111827")

# Styles
styles = getSampleStyleSheet()

def s(name, **kw):
    return ParagraphStyle(name, **kw)

TITLE = s("title",
    fontName="Helvetica-Bold", fontSize=20, textColor=C_BLACK,
    spaceAfter=2, leading=24)

SUBTITLE = s("subtitle",
    fontName="Helvetica", fontSize=10, textColor=C_GRAY,
    spaceAfter=0, leading=14)

DAY_HEADER = s("day_header",
    fontName="Helvetica-Bold", fontSize=12, textColor=C_WHITE,
    leading=16, spaceBefore=0, spaceAfter=0)

SECTION_HEADER = s("section_header",
    fontName="Helvetica-Bold", fontSize=10, textColor=C_GRAY,
    spaceBefore=8, spaceAfter=4, leading=14)

TASK = s("task",
    fontName="Helvetica-Bold", fontSize=9, textColor=C_BLACK,
    leading=12, spaceBefore=0, spaceAfter=0)

DETAIL = s("detail",
    fontName="Helvetica", fontSize=8, textColor=C_GRAY,
    leading=11, spaceBefore=0, spaceAfter=0)

WAITING = s("waiting",
    fontName="Helvetica", fontSize=9, textColor=C_BLACK,
    leading=12, spaceBefore=0, spaceAfter=0)

FOOTER = s("footer",
    fontName="Helvetica", fontSize=8, textColor=C_GRAY,
    alignment=TA_CENTER, spaceBefore=0)

# Data
days = [
    {
        "label": "Lundi 4 mai",
        "badge": "🔴 URGENT",
        "color": C_RED,
        "tasks": [
            ("Régler paiement Shopify", "SOUKWANY gelée — compte bloqué"),
            ("Régler paiement Etsy", "MAD 55.60 échoué — privilèges suspendus"),
            ("Livrer audit Najim Travel", "En retard depuis le 2 mai — client en attente"),
            ("Livrer audit Cotton & Stitch", "En retard depuis le 30 avril — client en attente"),
            ("Confirmer discovery Noor Beauty", "Pour Nabil — mardi 5 mai 08h00 Maroc"),
            ("Confirmer call DeltaLogix", "Pour Omar (COO) — mercredi 6 mai 11h00 — deal proche de la signature"),
            ("Confirmer re-kickoff Cedar Wealth", "Pour Sami — mercredi 6 mai 15h00 — 6.5k USD"),
        ]
    },
    {
        "label": "Mardi 5 mai",
        "badge": "📅 CALLS + FOLLOW-UPS",
        "color": C_BLUE,
        "tasks": [
            ("Discovery call — Noor Beauty", "Nabil · 08h00 Maroc · 14-person beauty retail Dubai · 8h/sem perdues"),
            ("Répondre Atlas Build", "Confirmer discovery vendredi 8 mai — Youssef Tazi (GM)"),
            ("Follow up Zayd Property", "Devis en attente 6.5k USD — Maya"),
            ("Authentifier Google Sheets dans Zapier", "Lien dans live/state.md"),
            ("Mettre à jour Last Contact Foster & Marsh", "CRM — date : 2026-04-28"),
        ]
    },
    {
        "label": "Mercredi 6 mai",
        "badge": "📅 CALLS + EMAILS",
        "color": C_BLUE,
        "tasks": [
            ("Call DeltaLogix", "Omar (COO) · 11h00 Maroc · livrable + plan 30j + paiement NET 30 vs 50/50"),
            ("Re-kickoff Cedar Wealth Advisory", "Sami · 15h00 Maroc · Draft replies 50 clients HNW · 6.5k USD"),
            ("Follow up Foster & Marsh Legal", "Scale package 45k AED — James Foster"),
            ("Répondre — extension scope LinkedIn", "Client existant demande automation LinkedIn content"),
            ("Gérer 3 demandes accès Drive", "Yassmine, Marcos, Nabil B. — dossier « Skills recommandés »"),
        ]
    },
    {
        "label": "Jeudi 7 mai",
        "badge": "⚙️ OPS + STRATÉGIE",
        "color": C_INDIGO,
        "tasks": [
            ("Répondre — B2B SaaS Saudi F&B", "SDR drowning — veut intro call outbound automation"),
            ("Définir structure site web HHSA + grille tarifaire", "8 jours avant lancement 15 mai"),
        ]
    },
    {
        "label": "Vendredi 8 mai",
        "badge": "📅 CALL + POINT LANCEMENT",
        "color": C_BLUE,
        "tasks": [
            ("Discovery call — Atlas Build", "Youssef Tazi (GM) · 09h00–13h00 Maroc · referral Sahel Cafe · 40 personnes"),
            ("Point lancement agence", "État des lieux à J-7 pour le 15 mai"),
        ]
    },
]

waiting = [
    ("DeltaLogix (Omar)", "Signature après call mer 6 mai", "since 4 mai"),
    ("Foster & Marsh Legal (James Foster)", "Retour Scale package 45k AED", "since 28 avr"),
    ("Zayd Property (Maya)", "Réponse devis 6.5k USD", "since 23 avr"),
    ("Noor Beauty (Nabil)", "Confirmation discovery call 5 mai", "since 4 mai"),
    ("Cedar Wealth Advisory (Sami)", "Confirmation re-kickoff 6 mai", "since 4 mai"),
]

def build_day_block(day):
    elems = []

    # Header row with colored background
    header_data = [[
        Paragraph(day["label"], DAY_HEADER),
        Paragraph(day["badge"], ParagraphStyle("badge",
            fontName="Helvetica", fontSize=8, textColor=C_WHITE,
            alignment=TA_LEFT, leading=12))
    ]]
    header_table = Table(header_data, colWidths=[90*mm, 80*mm])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), day["color"]),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (0, 0), 8),
        ("LEFTPADDING", (1, 0), (1, 0), 4),
        ("RIGHTPADDING", (-1, -1), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ROUNDEDCORNERS", [4, 4, 0, 0]),
    ]))
    elems.append(header_table)

    # Tasks inside a bordered box
    task_rows = []
    for i, (title, detail) in enumerate(day["tasks"]):
        checkbox = "☐"
        row = [
            Paragraph(checkbox, ParagraphStyle("cb", fontName="Helvetica", fontSize=11,
                textColor=C_GRAY, leading=13)),
            [Paragraph(title, TASK), Paragraph(detail, DETAIL)]
        ]
        task_rows.append(row)

    task_table = Table(task_rows, colWidths=[8*mm, 162*mm])
    bg_colors = [("BACKGROUND", (0, i), (-1, i), C_LIGHT if i % 2 == 0 else C_WHITE)
                 for i in range(len(task_rows))]
    task_table.setStyle(TableStyle([
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (0, -1), 8),
        ("LEFTPADDING", (1, 0), (1, -1), 4),
        ("RIGHTPADDING", (-1, -1), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (-1, -1), 0.5, C_BORDER),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, C_BORDER),
        *bg_colors,
    ]))
    elems.append(task_table)
    elems.append(Spacer(1, 6*mm))
    return elems


def build_waiting_block():
    elems = []
    elems.append(Paragraph("EN ATTENTE", SECTION_HEADER))

    rows = []
    for contact, subject, since in waiting:
        rows.append([
            Paragraph("⏳", ParagraphStyle("ic", fontName="Helvetica", fontSize=10,
                textColor=C_GRAY, leading=12)),
            Paragraph(f"<b>{contact}</b>", WAITING),
            Paragraph(subject, DETAIL),
            Paragraph(since, ParagraphStyle("since", fontName="Helvetica-Oblique",
                fontSize=8, textColor=C_GRAY, leading=11)),
        ])

    t = Table(rows, colWidths=[8*mm, 52*mm, 88*mm, 22*mm])
    t.setStyle(TableStyle([
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (0, -1), 6),
        ("LEFTPADDING", (1, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOX", (0, 0), (-1, -1), 0.5, C_BORDER),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, C_BORDER),
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#FFFBEB")),
    ]))
    elems.append(t)
    return elems


def generate():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=15*mm,
        bottomMargin=15*mm,
    )

    story = []

    # Title block
    story.append(Paragraph("Plan Semaine", TITLE))
    story.append(Paragraph("4 – 9 mai 2026  ·  HHSA Agency", SUBTITLE))
    story.append(Spacer(1, 5*mm))
    story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER))
    story.append(Spacer(1, 4*mm))

    for day in days:
        story.extend(build_day_block(day))

    story.extend(build_waiting_block())

    story.append(Spacer(1, 6*mm))
    story.append(HRFlowable(width="100%", thickness=0.5, color=C_BORDER))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("HHSA Agency · Généré le 4 mai 2026", FOOTER))

    doc.build(story)
    print(f"PDF généré : {OUTPUT}")


if __name__ == "__main__":
    generate()
