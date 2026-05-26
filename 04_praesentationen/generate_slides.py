"""
Mirrou Creative Studio — Abschlusspräsentation PPTX Generator
Dark Luxury Design: Deep Onyx #080808 + Gold #C8A25A + Ivory #F2EFE9
15 Slides, 4 Speakers, Speaker Notes included
Import into Google Slides: File → Import slides
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Brand Colors
BG_COLOR = RGBColor(0x08, 0x08, 0x08)        # Deep Onyx
SURFACE = RGBColor(0x11, 0x11, 0x13)          # Surface
GOLD = RGBColor(0xC8, 0xA2, 0x5A)            # Mirrou Gold
GOLD_LIGHT = RGBColor(0xE4, 0xC0, 0x7A)       # Gold Light
IVORY = RGBColor(0xF2, 0xEF, 0xE9)           # Ivory
BODY_COLOR = RGBColor(0xB8, 0xB4, 0xAE)      # Body Text
MUTED = RGBColor(0x6E, 0x6B, 0x66)           # Muted

# Speaker colors
YAHYA_COLOR = GOLD
OLHA_COLOR = RGBColor(0xE0, 0x7A, 0x5F)
DENYS_COLOR = RGBColor(0x4A, 0x90, 0xE2)
RALPH_COLOR = RGBColor(0xD8, 0xD3, 0xCB)

prs = Presentation()
prs.slide_width = Inches(13.333)   # 16:9
prs.slide_height = Inches(7.5)

def set_slide_bg(slide, color=BG_COLOR):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_gold_line(slide, left, top, width):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, Pt(1))
    shape.fill.solid()
    shape.fill.fore_color.rgb = GOLD
    shape.line.fill.background()
    return shape

def add_text_box(slide, left, top, width, height, text, font_size=18,
                 font_name='Inter', color=IVORY, bold=False, alignment=PP_ALIGN.LEFT,
                 italic=False):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.name = font_name
    p.font.color.rgb = color
    p.font.bold = bold
    p.font.italic = italic
    p.alignment = alignment
    return txBox

def add_multiline_box(slide, left, top, width, height, lines, font_size=16,
                      font_name='Inter', color=IVORY, line_spacing=1.5):
    """Add a text box with multiple paragraphs."""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    for i, (text, text_color, text_bold, text_size) in enumerate(lines):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = text
        p.font.size = Pt(text_size if text_size else font_size)
        p.font.name = font_name
        p.font.color.rgb = text_color if text_color else color
        p.font.bold = text_bold
        p.space_after = Pt(4)
    return txBox

def add_speaker_badge(slide, name, color, top=Inches(0.5)):
    """Add a small speaker badge in the top right."""
    add_text_box(slide, Inches(10.5), top, Inches(2.5), Inches(0.4),
                 f"SPRECHER: {name}", font_size=10, font_name='JetBrains Mono',
                 color=color, bold=True, alignment=PP_ALIGN.RIGHT)

def make_slide(notes_text=""):
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout
    set_slide_bg(slide)
    if notes_text:
        notes_slide = slide.notes_slide
        notes_slide.notes_text_frame.text = notes_text
    return slide

# ═══════════════════════════════════════════════════════════
# SLIDE 01 — TITEL & BEGRÜSSUNG
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Guten Tag und herzlich willkommen zur Abschlusspräsentation von Mirrou Creative Studio. "
    "Mein Name ist Yahya Yildirim, und gemeinsam mit meinen Partnern Olha Yevtushenko, "
    "Denys Demyanyshyn und Ralph Kindermann präsentieren wir Ihnen heute den Aufbau einer "
    "KI-integrierten Performance Creative Agency."
)
set_slide_bg(s)

# Centered layout
add_text_box(s, Inches(1), Inches(1.5), Inches(11.3), Inches(0.5),
             "MIRROU CREATIVE STUDIO", font_size=12, font_name='JetBrains Mono',
             color=GOLD, bold=True, alignment=PP_ALIGN.CENTER)

add_text_box(s, Inches(1), Inches(2.3), Inches(11.3), Inches(1.2),
             "Aufbau einer KI-integrierten\nPerformance Creative Agency",
             font_size=40, font_name='Cormorant Garamond', color=IVORY,
             bold=False, alignment=PP_ALIGN.CENTER, italic=True)

add_gold_line(s, Inches(5.5), Inches(3.7), Inches(2.3))

add_text_box(s, Inches(1), Inches(4.1), Inches(11.3), Inches(0.8),
             "Frontier Firm Architektur · Hybrid Production · EU AI Act-Compliance",
             font_size=16, font_name='Inter', color=BODY_COLOR,
             alignment=PP_ALIGN.CENTER)

add_text_box(s, Inches(1), Inches(5.2), Inches(11.3), Inches(0.6),
             "Olha Yevtushenko  ·  Denys Demyanyshyn  ·  Ralph Kindermann  ·  Yahya Yildirim",
             font_size=14, font_name='Inter', color=MUTED,
             alignment=PP_ALIGN.CENTER)

add_text_box(s, Inches(1), Inches(5.9), Inches(11.3), Inches(0.5),
             "DCI Digital Career Institute · Abschlussprojekt 2026",
             font_size=11, font_name='JetBrains Mono', color=MUTED,
             alignment=PP_ALIGN.CENTER)

add_text_box(s, Inches(1), Inches(6.5), Inches(11.3), Inches(0.4),
             "Algorithm of Soul", font_size=18, font_name='Cormorant Garamond',
             color=GOLD, italic=True, alignment=PP_ALIGN.CENTER)


# ═══════════════════════════════════════════════════════════
# SLIDE 02 — DAS MIRROU-BETRIEBSSYSTEM (Ralph)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Um ein verteiltes Team über zwei Großstädte hinweg fehlerfrei zu orchestrieren, "
    "arbeiten wir nach dem Prinzip einer Frontier Firm. Das bedeutet: Wir setzen nicht "
    "auf klassische, träge Strukturen, sondern auf ein digitales, hochgradig automatisiertes "
    "Betriebssystem. In Hamburg steuern Olha die visuelle Exzellenz und Denys die "
    "Performance-Daten. In Berlin übernehmen Yahya die Inbound-Tech-Architektur und ich "
    "das CRM-System sowie die Standard Operating Procedures."
)
add_speaker_badge(s, "RALPH", RALPH_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "02 · DAS MIRROU-BETRIEBSSYSTEM", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Zwei Städte. Ein System.", font_size=36,
             font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# Hamburg column
add_text_box(s, Inches(0.8), Inches(2.6), Inches(5), Inches(0.4),
             "HAMBURG", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
add_multiline_box(s, Inches(0.8), Inches(3.1), Inches(5), Inches(2),
    [
        ("Olha Yevtushenko — Creative Direction", OLHA_COLOR, True, 15),
        ("Design-System, Hybrid Production, Visual Identity", BODY_COLOR, False, 13),
        ("", None, False, 8),
        ("Denys Demyanyshyn — Performance & Analytics", DENYS_COLOR, True, 15),
        ("Creative Testing, KPI-Frameworks, Daten-Loop", BODY_COLOR, False, 13),
    ])

# Berlin column
add_text_box(s, Inches(7), Inches(2.6), Inches(5), Inches(0.4),
             "BERLIN", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
add_multiline_box(s, Inches(7), Inches(3.1), Inches(5.5), Inches(2),
    [
        ("Yahya Yildirim — Growth & Project Lead", YAHYA_COLOR, True, 15),
        ("Website, Frontier Firm, Inbound, Compliance", BODY_COLOR, False, 13),
        ("", None, False, 8),
        ("Ralph Kindermann — CRM & Client Success", RALPH_COLOR, True, 15),
        ("HubSpot, SOPs, Onboarding, Pipeline", BODY_COLOR, False, 13),
    ])

# Agenda
add_gold_line(s, Inches(0.8), Inches(5.5), Inches(11.7))
add_text_box(s, Inches(0.8), Inches(5.8), Inches(11.7), Inches(1.2),
             "AGENDA: Problem → Positionierung → Branding → Hybrid Workflow → Testing → CRM → Tech & Compliance",
             font_size=12, font_name='JetBrains Mono', color=MUTED)


# ═══════════════════════════════════════════════════════════
# SLIDE 03 — WHY: CREATIVE FATIGUE (Yahya)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Der Grund für Mirrou liegt in einem lautlosen Killer im Paid-Social-Bereich: Creative Fatigue. "
    "Beauty-, Health- und Lifestyle-Marken im DACH-Raum stoßen ab einem Monats-Spend von 20.000 Euro "
    "an ein unsichtbares Limit. Daten aus dem Meta-Ecosystem zeigen, dass Werbemittel bereits nach "
    "14 bis 28 Tagen ausbrennen. Das führt zu einem dramatischen Klickraten-Einbruch von 35 bis 55 "
    "Prozent und einem gleichzeitigen Anstieg der CPC-Kosten um bis zu 70 Prozent."
)
add_speaker_badge(s, "YAHYA", YAHYA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "03 · WHY — DAS KERNPROBLEM", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(1),
             "70 % des Kampagnenerfolgs\nhängt am Creative.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.6), Inches(3))

# Key metrics in boxes
for i, (label, value, detail) in enumerate([
    ("CTR-EINBRUCH", "−35–55 %", "nach Fatigue-Onset (14–28 Tage)"),
    ("CPC-ANSTIEG", "+45–70 %", "bei gleichem Targeting"),
    ("FATIGUE-ONSET", "2–4 Wochen", "bei 20–50 k€ / Monat Ad-Spend"),
]):
    x = Inches(0.8 + i * 4.1)
    # Metric box background
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(3.2), Inches(3.6), Inches(2.2))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    add_text_box(s, x + Inches(0.3), Inches(3.4), Inches(3), Inches(0.3),
                 label, font_size=10, font_name='JetBrains Mono', color=GOLD, bold=True)
    add_text_box(s, x + Inches(0.3), Inches(3.9), Inches(3), Inches(0.6),
                 value, font_size=32, font_name='Cormorant Garamond', color=IVORY, bold=True)
    add_text_box(s, x + Inches(0.3), Inches(4.6), Inches(3), Inches(0.5),
                 detail, font_size=11, font_name='Inter', color=BODY_COLOR)

add_text_box(s, Inches(0.8), Inches(5.8), Inches(11), Inches(0.8),
             "Klassische Agenturen: zu langsam. Reine Performance-Agenturen: zu seelenlos.\nNiemand hat ein System für beides gebaut.",
             font_size=14, font_name='Inter', color=MUTED)


# ═══════════════════════════════════════════════════════════
# SLIDE 04 — POSITIONIERUNG & CLAIM (Yahya)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Unsere Positionierung lässt sich in unserem Leitmotiv zusammenfassen: Algorithm of Soul. "
    "Wo Ästhetik Algorithmus wird. Wir kombinieren die emotionale, künstlerische Seele eines "
    "Premium-Markenbildes mit der kalten Datenlogik des Algorithmus. Unser Angebot richtet sich "
    "an D2C-Brands mit 10.000 bis 150.000 Euro monatlichem Ad-Spend."
)
add_speaker_badge(s, "YAHYA", YAHYA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "04 · POSITIONIERUNG & CLAIM", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.5), Inches(11), Inches(1),
             "Algorithm of Soul", font_size=48,
             font_name='Cormorant Garamond', color=GOLD, italic=True)

add_text_box(s, Inches(0.8), Inches(2.6), Inches(8), Inches(0.5),
             "Wo Ästhetik Algorithmus wird.", font_size=20,
             font_name='Inter', color=IVORY)

add_gold_line(s, Inches(0.8), Inches(3.3), Inches(3))

# Three packages
for i, (name, desc, price) in enumerate([
    ("E-COMMERCE & CATALOG", "Einmalige Shootings\nKatalog-Pflege", "ab 3.500 €"),
    ("SOCIAL & ADVERTISING", "Kampagnen-Launches\nAd-Creative-Systeme", "ab 5.000 €"),
    ("CREATIVE RETAINER", "Fortlaufende Creative-Engine\nTiers S / M / L", "ab 4.500 € / Monat"),
]):
    x = Inches(0.8 + i * 4.1)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(3.8), Inches(3.6), Inches(2.8))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    add_text_box(s, x + Inches(0.3), Inches(4.0), Inches(3), Inches(0.3),
                 name, font_size=11, font_name='JetBrains Mono', color=GOLD, bold=True)
    add_text_box(s, x + Inches(0.3), Inches(4.5), Inches(3), Inches(1),
                 desc, font_size=14, font_name='Inter', color=BODY_COLOR)
    add_text_box(s, x + Inches(0.3), Inches(5.8), Inches(3), Inches(0.4),
                 price, font_size=16, font_name='Inter', color=IVORY, bold=True)


# ═══════════════════════════════════════════════════════════
# SLIDE 05 — FRONTIER FIRM ARCHITEKTUR (Yahya)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Um diesen kontinuierlichen Output ohne massiven Personalüberhang zu liefern, haben wir die "
    "Frontier-Firm-Architektur implementiert. Sie basiert auf vier Schichten: Dem Intelligence Layer "
    "über Perplexity Spaces, dem Production Layer über Adobe und Midjourney, dem Infrastructure Layer "
    "auf der Google Cloud und dem Performance Layer über die Werbemanager. Wir arbeiten nach dem "
    "Perfect Twin-Prinzip: Jeder menschliche Spezialist wird durch ein maßgeschneidertes KI-Pendant erweitert."
)
add_speaker_badge(s, "YAHYA", YAHYA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "05 · FRONTIER FIRM ARCHITEKTUR", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Das Frontier Firm Modell", font_size=36,
             font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# 4 layers
for i, (layer, tools, desc) in enumerate([
    ("INTELLIGENCE", "Perplexity Spaces", "5 Spaces · 44+ Dokumente · Echtzeit-Recherche"),
    ("PRODUCTION", "Adobe CC · Midjourney · Runway", "Hybrid Production · Foto + KI-Backgrounds"),
    ("INFRASTRUCTURE", "GCP Cloud Run · Docker · Claude Code", "europe-west3 · CLI-Deployment · GitHub"),
    ("PERFORMANCE", "Meta · TikTok · GA4", "Testing Matrix · Learning Log · Benchmarks"),
]):
    y = Inches(2.6 + i * 1.1)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y, Inches(11.7), Inches(0.9))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    add_text_box(s, Inches(1.1), y + Inches(0.1), Inches(2.5), Inches(0.3),
                 layer, font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
    add_text_box(s, Inches(4), y + Inches(0.1), Inches(4), Inches(0.3),
                 tools, font_size=13, font_name='Inter', color=IVORY, bold=True)
    add_text_box(s, Inches(4), y + Inches(0.45), Inches(8), Inches(0.3),
                 desc, font_size=11, font_name='Inter', color=BODY_COLOR)

# Perfect Twin
add_text_box(s, Inches(0.8), Inches(6.3), Inches(11), Inches(0.5),
             "PERFECT TWIN: 1 Mensch + 1 KI-Pendant = Verdopplung ohne Headcount",
             font_size=13, font_name='JetBrains Mono', color=GOLD)


# ═══════════════════════════════════════════════════════════
# SLIDE 06 — DARK LUXURY BRANDING (Olha)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Als Creative Director ist meine Aufgabe, Mirrous Identität visuell spürbar zu machen. "
    "Wir nutzen einen restriktiven Design Code namens Dark Luxury. Die Basis bildet ein sattes "
    "Deep Onyx (#080808) für maximale visuelle Ruhe. Muted Gold (#C8A25A) setzen wir extrem "
    "kontrolliert als Akzent ein. Unsere Typografie kombiniert die luxuriöse Display-Serif "
    "Cormorant Garamond mit der präzisen serifenlosen Inter und technischen Details in JetBrains Mono."
)
add_speaker_badge(s, "OLHA", OLHA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "06 · BRAND IDENTITY — DARK LUXURY", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Design als System, nicht als Dekoration.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# Color swatches
for i, (name, hex_code, rgb) in enumerate([
    ("Deep Onyx", "#080808", BG_COLOR),
    ("Mirrou Gold", "#C8A25A", GOLD),
    ("Ivory", "#F2EFE9", IVORY),
]):
    x = Inches(0.8 + i * 4.1)
    swatch = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(2.8), Inches(3.6), Inches(1.2))
    swatch.fill.solid()
    swatch.fill.fore_color.rgb = rgb
    swatch.line.fill.background()

    label_color = IVORY if i < 2 else BG_COLOR
    add_text_box(s, x + Inches(0.3), Inches(3.0), Inches(3), Inches(0.3),
                 name, font_size=13, font_name='Inter', color=label_color, bold=True)
    add_text_box(s, x + Inches(0.3), Inches(3.5), Inches(3), Inches(0.3),
                 hex_code, font_size=11, font_name='JetBrains Mono', color=label_color)

# Typography
add_text_box(s, Inches(0.8), Inches(4.5), Inches(3.5), Inches(0.4),
             "TYPOGRAFIE", font_size=11, font_name='JetBrains Mono', color=GOLD, bold=True)
add_multiline_box(s, Inches(0.8), Inches(5.0), Inches(11), Inches(2),
    [
        ("Cormorant Garamond — Display & Headlines", IVORY, True, 18),
        ("Inter — Body & Interface", BODY_COLOR, False, 14),
        ("JetBrains Mono — Technical & Labels", MUTED, False, 12),
    ])


# ═══════════════════════════════════════════════════════════
# SLIDE 07 — VIER VISUAL-SYSTEME / CASE STUDIES (Olha)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Um unsere visuelle und strategische Bandbreite zu beweisen, haben wir vier Demo-Cases entwickelt: "
    "Luminous Aura zeigt ein Premium-Serum auf dunklem Marmor. Vitality Pulse setzt auf kinetische Energie "
    "für TikTok. Essence Drift nutzt Nebel für emotionales Storytelling. Neural Glow ist vollständig "
    "KI-generiert und beweist, dass wir auch synthetische Welten fotorealistisch beherrschen."
)
add_speaker_badge(s, "OLHA", OLHA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "07 · VIER VISUAL-SYSTEME", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Vier Welten. Eine Methode.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# 4 Case Study cards
cases = [
    ("LUMINOUS AURA", "Premium-Serum · Marmor · Goldstaub", "Conversion-optimiert", GOLD),
    ("VITALITY PULSE", "Energie · Wasserspritzer · harte Schatten", "TikTok Thumb-Stop", RGBColor(0x4A, 0xE2, 0x7A)),
    ("ESSENCE DRIFT", "Nebel · Spiegelungen · Fragrance", "Emotional Storytelling", RGBColor(0x7A, 0xB8, 0xE2)),
    ("NEURAL GLOW", "Biotech · Schaltkreise · 100 % KI", "Synthetische Welten", RGBColor(0xE2, 0x7A, 0xD4)),
]
for i, (name, desc, goal, accent) in enumerate(cases):
    x = Inches(0.8 + i * 3.1)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(2.8), Inches(2.8), Inches(3.5))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    # Accent line at top of card
    line = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(2.8), Inches(2.8), Pt(3))
    line.fill.solid()
    line.fill.fore_color.rgb = accent
    line.line.fill.background()

    add_text_box(s, x + Inches(0.2), Inches(3.1), Inches(2.4), Inches(0.4),
                 name, font_size=12, font_name='JetBrains Mono', color=accent, bold=True)
    add_text_box(s, x + Inches(0.2), Inches(3.7), Inches(2.4), Inches(1),
                 desc, font_size=12, font_name='Inter', color=BODY_COLOR)
    add_text_box(s, x + Inches(0.2), Inches(5.2), Inches(2.4), Inches(0.4),
                 goal, font_size=11, font_name='JetBrains Mono', color=MUTED)

add_text_box(s, Inches(0.8), Inches(6.5), Inches(11), Inches(0.4),
             "[Hier: Case Study Visuals von Olha einfügen — Luminous Aura, Vitality Pulse, Essence Drift, Neural Glow]",
             font_size=10, font_name='JetBrains Mono', color=MUTED, italic=True)


# ═══════════════════════════════════════════════════════════
# SLIDE 08 — HYBRID PRODUCTION (Olha)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Unser Kernprozess ist die Hybrid Production. Wir trennen das Produkt von seiner Umgebung: "
    "Das physische Produkt wird real fotografiert. Die Hintergründe werden digital per Midjourney "
    "oder Adobe Firefly gerendert. Die Produktion schrumpft von 6 Tagen auf 4 Stunden. "
    "Alle hybriden Assets werden mit C2PA-Metadaten versehen für EU AI Act Compliance."
)
add_speaker_badge(s, "OLHA", OLHA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "08 · HYBRID PRODUCTION WORKFLOW", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Echtes Produkt. Digitale Welt. Volle Transparenz.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# Comparison: Classic vs Hybrid
for col, (title, items) in enumerate([
    ("KLASSISCH", ["6 Tage Studio-Set-Bau", "15.000–40.000 € pro Shooting", "Keine Skalierung", "Kein KI-Labeling nötig"]),
    ("HYBRID (MIRROU)", ["4 Stunden digitales Composing", "3.500–8.000 € pro Produktion", "Unbegrenzt skalierbar", "C2PA-Metadaten integriert"]),
]):
    x = Inches(0.8 + col * 6.2)
    accent = MUTED if col == 0 else GOLD

    add_text_box(s, x, Inches(2.8), Inches(5.5), Inches(0.4),
                 title, font_size=12, font_name='JetBrains Mono', color=accent, bold=True)

    for j, item in enumerate(items):
        y = Inches(3.4 + j * 0.55)
        item_color = BODY_COLOR if col == 0 else IVORY
        prefix = "✗  " if col == 0 else "✓  "
        add_text_box(s, x + Inches(0.2), y, Inches(5), Inches(0.4),
                     prefix + item, font_size=14, font_name='Inter', color=item_color)

# Process flow
add_gold_line(s, Inches(0.8), Inches(5.8), Inches(11.7))
add_text_box(s, Inches(0.8), Inches(6.1), Inches(11.7), Inches(0.6),
             "WORKFLOW:  Studio-Foto (Produkt)  →  KI-Background (Midjourney/Firefly)  →  Composing  →  C2PA-Labeling  →  Delivery",
             font_size=12, font_name='JetBrains Mono', color=BODY_COLOR)


# ═══════════════════════════════════════════════════════════
# SLIDE 09 — KANALGEWICHTUNG & KPIs (Denys)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Als Performance Manager übersetze ich Olhas Kreation in messbare Werbe-KPIs. "
    "Wir verteilen das Mediabudget strategisch auf 5 Kanäle: 40% Meta Ads, 25% TikTok Ads, "
    "20% Google Search, 10% E-Mail-Marketing, 5% LinkedIn B2B."
)
add_speaker_badge(s, "DENYS", DENYS_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "09 · KANALGEWICHTUNG & KPIs", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "5 Kanäle. 1 System.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

channels = [
    ("META ADS", "40 %", "Awareness & Consideration", "CTR · CPM · Frequency"),
    ("TIKTOK ADS", "25 %", "Thumb-Stop & Virality", "Thumb-Stop Rate > 35 %"),
    ("GOOGLE SEARCH", "20 %", "Conversion-Sicherung", "CPA · ROAS"),
    ("E-MAIL", "10 %", "Lead-Reaktivierung", "Open Rate · CLV"),
    ("LINKEDIN", "5 %", "B2B-Trust", "Engagement · Pipeline"),
]
for i, (name, pct, goal, kpi) in enumerate(channels):
    y = Inches(2.8 + i * 0.85)

    # Bar visualization
    bar_width = float(pct.replace(" %", "")) / 100 * 8
    bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y, Inches(bar_width), Inches(0.6))
    bar.fill.solid()
    bar.fill.fore_color.rgb = SURFACE
    bar.line.fill.background()

    add_text_box(s, Inches(1.0), y + Inches(0.05), Inches(2), Inches(0.3),
                 f"{name}  {pct}", font_size=11, font_name='JetBrains Mono', color=GOLD, bold=True)
    add_text_box(s, Inches(1.0), y + Inches(0.3), Inches(3), Inches(0.25),
                 goal, font_size=10, font_name='Inter', color=BODY_COLOR)
    add_text_box(s, Inches(9.5), y + Inches(0.1), Inches(3.5), Inches(0.4),
                 kpi, font_size=10, font_name='JetBrains Mono', color=MUTED,
                 alignment=PP_ALIGN.RIGHT)


# ═══════════════════════════════════════════════════════════
# SLIDE 10 — DATEN-LOOP / 5-SCHRITT-ALGORITHMUS (Denys)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Dafür nutzen wir unseren geschlossenen Datenkreislauf, den 5-Schritt-Algorithmus. "
    "Er startet mit dem Creative Audit zur Fatigue-Erkennung. Daraufhin formulieren wir "
    "3 Performance-Hypothesen. Wir testen mit minimalem Budget-Split über 5 Tage. "
    "Erst nach statistischer Signifikanz skalieren wir die Gewinner."
)
add_speaker_badge(s, "DENYS", DENYS_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "10 · DER 5-SCHRITT-ALGORITHMUS", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Daten treiben die Kreation. Nicht umgekehrt.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

steps = [
    ("01", "DIAGNOSE", "Creative Audit · Fatigue-Erkennung"),
    ("02", "HYPOTHESEN", "3 Performance-Hypothesen formulieren"),
    ("03", "EXECUTION", "Hybrid Production · Asset-Erstellung"),
    ("04", "TESTING", "A/B-Split · 5 Tage · minimales Budget"),
    ("05", "LOOP", "Gewinner skalieren · Verlierer archivieren · Learning Log"),
]
for i, (num, name, desc) in enumerate(steps):
    x = Inches(0.8 + i * 2.45)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(2.8), Inches(2.2), Inches(2.5))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    add_text_box(s, x + Inches(0.2), Inches(3.0), Inches(1.8), Inches(0.4),
                 num, font_size=28, font_name='Cormorant Garamond', color=GOLD, bold=True)
    add_text_box(s, x + Inches(0.2), Inches(3.6), Inches(1.8), Inches(0.3),
                 name, font_size=11, font_name='JetBrains Mono', color=IVORY, bold=True)
    add_text_box(s, x + Inches(0.2), Inches(4.1), Inches(1.8), Inches(0.8),
                 desc, font_size=10, font_name='Inter', color=BODY_COLOR)

# Testing Matrix mention
add_text_box(s, Inches(0.8), Inches(5.8), Inches(11.7), Inches(0.8),
             "TESTING MATRIX: Craft-Winkel · Data-Winkel · Luxury-Winkel · Results-Winkel\nJeder Winkel isoliert einen psychologischen Hebel der Zielgruppe.",
             font_size=12, font_name='JetBrains Mono', color=MUTED)


# ═══════════════════════════════════════════════════════════
# SLIDE 11 — 25-TAGE-TESTPLAN (Denys)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Ein Kampagnen-Launch folgt einem strikten 25-Tage-Testplan. Sprint 1 (Tag 1-8): "
    "Pixel-Tracking, Audiences, Baseline. Sprint 2 (Tag 9-16): A/B-Tests für Hooks und "
    "Landingpages. Sprint 3 (Tag 17-25): Gewinner skalieren. Feste Rules-Engines eliminieren "
    "emotionale Entscheidungen beim Media-Buying."
)
add_speaker_badge(s, "DENYS", DENYS_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "11 · 25-TAGE-TESTPLAN", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "3 Sprints. 25 Tage. Null Emotion.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

sprints = [
    ("SPRINT 1", "TAG 1–8", "Setup", ["Pixel-Tracking aufbauen", "Audiences definieren", "Baseline-Metriken erfassen"]),
    ("SPRINT 2", "TAG 9–16", "Testing", ["A/B-Tests: Hooks", "A/B-Tests: Landingpages", "Budget-Split isoliert"]),
    ("SPRINT 3", "TAG 17–25", "Scale", ["Gewinner skalieren", "Verlierer archivieren", "+25 % Budget/Tag bei CPL < 12 €"]),
]
for i, (name, days, phase, items) in enumerate(sprints):
    x = Inches(0.8 + i * 4.1)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(2.8), Inches(3.6), Inches(3.2))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    add_text_box(s, x + Inches(0.3), Inches(3.0), Inches(3), Inches(0.3),
                 f"{name}  ·  {days}", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
    add_text_box(s, x + Inches(0.3), Inches(3.5), Inches(3), Inches(0.4),
                 phase, font_size=20, font_name='Cormorant Garamond', color=IVORY, italic=True)

    for j, item in enumerate(items):
        add_text_box(s, x + Inches(0.5), Inches(4.1 + j * 0.5), Inches(2.8), Inches(0.35),
                     f"→  {item}", font_size=12, font_name='Inter', color=BODY_COLOR)

# Rules Engine
add_text_box(s, Inches(0.8), Inches(6.3), Inches(11.7), Inches(0.5),
             "RULES:  CTR < 1,5 % nach 3d → Hook tauschen  |  CPL < 12 € → Budget +25 %/Tag  |  ROAS > 3x → Skalierung freigeben",
             font_size=11, font_name='JetBrains Mono', color=GOLD)


# ═══════════════════════════════════════════════════════════
# SLIDE 12 — CUSTOMER JOURNEYS (Ralph)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Um die generierten Leads verlustfrei zu konvertieren, nutzen wir zwei Pfade im CRM. "
    "Pfad 1 Inbound: Kunde sieht Ad, landet auf mirrou.studio, bucht Strategiegespräch. "
    "Pfad 2 Outbound: Wir recherchieren aktive Ads von Skincare-Brands, erstellen ein "
    "personalisiertes Video-Audit und kontaktieren den CMO auf LinkedIn."
)
add_speaker_badge(s, "RALPH", RALPH_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "12 · CUSTOMER JOURNEYS", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Zwei Pfade. Ein Ziel: Retainer.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# Inbound
add_text_box(s, Inches(0.8), Inches(2.6), Inches(5.5), Inches(0.4),
             "INBOUND-JOURNEY", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
inbound_steps = ["Meta-Ad sehen", "mirrou.studio besuchen", "Mission Deck laden", "Strategiegespräch buchen", "Creative-Audit → Abschluss"]
for j, step in enumerate(inbound_steps):
    add_text_box(s, Inches(1.0), Inches(3.2 + j * 0.45), Inches(5), Inches(0.35),
                 f"0{j+1}.  {step}", font_size=13, font_name='Inter', color=BODY_COLOR)

# Outbound
add_text_box(s, Inches(7), Inches(2.6), Inches(5.5), Inches(0.4),
             "OUTBOUND-JOURNEY", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
outbound_steps = ["Meta Ad Library recherchieren", "90s Video-Audit erstellen", "CMO auf LinkedIn kontaktieren", "14-Tage-Testpaket anbieten", "Performance → Retainer-Konversion"]
for j, step in enumerate(outbound_steps):
    add_text_box(s, Inches(7.2), Inches(3.2 + j * 0.45), Inches(5.5), Inches(0.35),
                 f"0{j+1}.  {step}", font_size=13, font_name='Inter', color=BODY_COLOR)

add_gold_line(s, Inches(0.8), Inches(5.8), Inches(11.7))
add_text_box(s, Inches(0.8), Inches(6.1), Inches(11.7), Inches(0.5),
             "TRIGGER:  Lead-Event in HubSpot → Qualifizierungs-Score → Slack-Alert (< 15 Min. Reaktionszeit)",
             font_size=11, font_name='JetBrains Mono', color=MUTED)


# ═══════════════════════════════════════════════════════════
# SLIDE 13 — CRM PIPELINE (Ralph)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Dafür haben wir HubSpot Starter als CRM implementiert. Unsere Pipeline hat 7 Stufen: "
    "Vom Inbound Lead über den Intro Call und das Creative Audit bis zum Angebot und Closed Won. "
    "Ein automatisierter Qualifizierungs-Score vergibt Punkte für Ad-Spend, Branche und "
    "Erreichbarkeit. Leads mit Score 8+ triggern sofort einen Slack-Alarm."
)
add_speaker_badge(s, "RALPH", RALPH_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "13 · CRM PIPELINE & LEAD-SCORING", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "7 Stufen. Automatische Qualifizierung.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# Pipeline stages
stages = ["Inbound Lead", "Intro Call", "Creative Audit", "Angebot", "Verhandlung", "Closed Won", "Onboarding"]
for i, stage in enumerate(stages):
    x = Inches(0.8 + i * 1.72)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(2.8), Inches(1.5), Inches(1.2))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE if i < 5 else RGBColor(0x1A, 0x2A, 0x1A)
    box.line.fill.background()

    add_text_box(s, x + Inches(0.1), Inches(2.9), Inches(1.3), Inches(0.3),
                 f"0{i+1}", font_size=18, font_name='Cormorant Garamond', color=GOLD)
    add_text_box(s, x + Inches(0.1), Inches(3.3), Inches(1.3), Inches(0.5),
                 stage, font_size=10, font_name='Inter', color=IVORY)

# Scoring
add_text_box(s, Inches(0.8), Inches(4.5), Inches(5), Inches(0.4),
             "QUALIFIZIERUNGS-SCORE", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
add_multiline_box(s, Inches(0.8), Inches(5.0), Inches(11), Inches(2),
    [
        ("Ad-Spend > 20 k€/Monat = +3 Punkte  ·  Beauty/Health-Branche = +2 Punkte  ·  CM erreichbar = +2 Punkte", BODY_COLOR, False, 13),
        ("", None, False, 6),
        ("Score ≥ 8  →  Sofort Slack-Alarm → Yahya antwortet in < 15 Minuten", IVORY, True, 14),
        ("Score < 8  →  Automatische Boutique-Segment-Zuweisung", MUTED, False, 13),
    ])


# ═══════════════════════════════════════════════════════════
# SLIDE 14 — SOPs & NOTION OS (Ralph)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Qualität entsteht durch Wiederholbarkeit. Deshalb haben wir ein strukturiertes Betriebssystem "
    "mit 4 Kernordnern aufgebaut: Growth, Production, Operations und Client Records. Jedes "
    "Teammitglied arbeitet nach festen Standard Operating Procedures."
)
add_speaker_badge(s, "RALPH", RALPH_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "14 · SOPs & BETRIEBSSYSTEM", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Qualität entsteht durch Wiederholbarkeit.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# SOP cards
sops = [
    ("SOP 01", "LEAD-HANDLING", "Qualifizierung → Scoring → Zuweisung → Reaktion < 15 Min"),
    ("SOP 02", "KUNDEN-ONBOARDING", "Kick-off → Briefing → Space Setup → Approval-Flow"),
    ("SOP 03", "CASE-STUDY-ERSTELLUNG", "Data Pull → Visual Select → Copy → Approval → Publish"),
]
for i, (num, name, desc) in enumerate(sops):
    y = Inches(2.8 + i * 1.3)
    box = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), y, Inches(11.7), Inches(1.1))
    box.fill.solid()
    box.fill.fore_color.rgb = SURFACE
    box.line.fill.background()

    add_text_box(s, Inches(1.2), y + Inches(0.15), Inches(1.5), Inches(0.3),
                 num, font_size=18, font_name='Cormorant Garamond', color=GOLD, bold=True)
    add_text_box(s, Inches(3), y + Inches(0.1), Inches(3), Inches(0.3),
                 name, font_size=12, font_name='JetBrains Mono', color=IVORY, bold=True)
    add_text_box(s, Inches(3), y + Inches(0.5), Inches(9), Inches(0.4),
                 desc, font_size=12, font_name='Inter', color=BODY_COLOR)

# Folder structure
add_text_box(s, Inches(0.8), Inches(6.3), Inches(11.7), Inches(0.5),
             "ORDNER:  Growth  ·  Production  ·  Operations  ·  Client Records  |  NAMING:  [DATE]_[BRAND]_[PROJECT]_[VERSION]_[INITIALS]",
             font_size=11, font_name='JetBrains Mono', color=MUTED)


# ═══════════════════════════════════════════════════════════
# SLIDE 15 — TECH STACK, LIVE & EU AI ACT (Yahya)
# ═══════════════════════════════════════════════════════════
s = make_slide(
    "Zum Abschluss: Mirrou ist voll einsatzbereit. Unsere Plattform basiert auf React 19 mit "
    "Vite 6, TypeScript und Tailwind CSS v4, deployed über Docker auf GCP Cloud Run in Frankfurt. "
    "Ab August 2026 tritt die KI-Kennzeichnungspflicht des EU AI Acts voll in Kraft. "
    "Mirrou ist durch C2PA-Metadaten und unsere Labeling-Matrix bereits heute vollständig compliant."
)
add_speaker_badge(s, "YAHYA", YAHYA_COLOR)

add_text_box(s, Inches(0.8), Inches(0.5), Inches(8), Inches(0.4),
             "15 · TECH STACK & EU AI ACT COMPLIANCE", font_size=11,
             font_name='JetBrains Mono', color=GOLD)

add_text_box(s, Inches(0.8), Inches(1.2), Inches(11), Inches(0.8),
             "Mirrou ist live. Mirrou ist compliant.",
             font_size=36, font_name='Cormorant Garamond', color=IVORY, italic=True)

add_gold_line(s, Inches(0.8), Inches(2.2), Inches(3))

# Tech stack left column
add_text_box(s, Inches(0.8), Inches(2.6), Inches(5.5), Inches(0.4),
             "TECH STACK", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
tech_items = [
    "Frontend: React 19 + Vite 6 + TypeScript 5.8",
    "Styling: Tailwind CSS v4 + Motion",
    "i18n: 8 Sprachen (DE/EN/ES/IT/FR/TR/RU/UK)",
    "Hosting: GCP Cloud Run · europe-west3 · Frankfurt",
    "Container: Docker + nginx · Auto-Scaling",
    "Analytics: GA4 · IP-anonymisiert · DSGVO-konform",
]
for j, item in enumerate(tech_items):
    add_text_box(s, Inches(1.0), Inches(3.2 + j * 0.42), Inches(5.2), Inches(0.35),
                 item, font_size=12, font_name='Inter', color=BODY_COLOR)

# Compliance right column
add_text_box(s, Inches(7), Inches(2.6), Inches(5.5), Inches(0.4),
             "EU AI ACT COMPLIANCE", font_size=12, font_name='JetBrains Mono', color=GOLD, bold=True)
compliance_items = [
    "Klassifikation: Limited-Risk (Art. 50)",
    "C2PA-Metadaten auf allen KI-Assets",
    "Labeling-Matrix: 4 Transparenzstufen",
    "No-Training-Policy für Kunden-Assets",
    "Trust Center auf mirrou.studio",
    "3-Jahres-Audit-Trail",
]
for j, item in enumerate(compliance_items):
    add_text_box(s, Inches(7.2), Inches(3.2 + j * 0.42), Inches(5.5), Inches(0.35),
                 item, font_size=12, font_name='Inter', color=BODY_COLOR)

# URL and QR
add_gold_line(s, Inches(0.8), Inches(5.8), Inches(11.7))
add_text_box(s, Inches(0.8), Inches(6.1), Inches(8), Inches(0.5),
             "mirrou.studio  ·  [QR-Code hier einfügen]",
             font_size=16, font_name='Inter', color=IVORY, bold=True)
add_text_box(s, Inches(0.8), Inches(6.6), Inches(11.7), Inches(0.4),
             "Vielen Dank für Ihre Aufmerksamkeit. Wir eröffnen nun die Fragerunde.",
             font_size=13, font_name='Inter', color=MUTED, italic=True)


# ═══════════════════════════════════════════════════════════
# SAVE
# ═══════════════════════════════════════════════════════════
output_path = r"C:\Users\HP\Desktop\abschlussprojekt\04_praesentationen\Mirrou_Abschlusspraesentation_DCI.pptx"
prs.save(output_path)
print(f"Presentation saved: {output_path}")
print(f"Slides: {len(prs.slides)}")
