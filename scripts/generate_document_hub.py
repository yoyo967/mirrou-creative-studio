"""Generate the Interactive Document Hub v3 — a self-contained HTML dashboard
that bundles all Markdown files into a premium, presentation-ready viewer.

Run from repo root:  python scripts/generate_document_hub.py
"""

import os
import json

# ──────────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────────
ARTIFACTS_DIR = "C:/Users/HP/.gemini/antigravity/brain/9ad75e8c-7bcb-4273-8ab4-9910c8bb819c"
TARGETS = [
    "00_abschlussbericht/document_hub.html",
    "public/document_hub.html",
]

# ──────────────────────────────────────────────
# Document Registry
# ──────────────────────────────────────────────
DOCS = [
    # ── 1. Hauptberichte ──
    {"key":"abschlussbericht","file":"Abschlussbericht_Mirrou_Creative_Studio.md","title":"DCI Abschlussbericht","cat":"Hauptberichte & Grundlagen","desc":"Der vollständige offizielle Abschlussbericht für das DCI-Projekt.","icon":"book-open","badge":"📘"},
    {"key":"aos_buch","file":"AOS_AbschlussprojektBuch_KOMPLETT.md","title":"AOS Buch (Komplett)","cat":"Hauptberichte & Grundlagen","desc":"Das komplette Abschlussbuch mit allen 12 Kapiteln.","icon":"book","badge":"📘"},
    {"key":"deep_audit","file":"Deep_Audit_Report.md","title":"Deep Audit Report","cat":"Hauptberichte & Grundlagen","desc":"Detaillierter Audit-Bericht der GCP-Projekte, Git-Repos und der Infrastruktur.","icon":"shield-check","badge":"📘"},
    {"key":"system_urls","file":"URLS.md","title":"System-URLs & DNS","cat":"Hauptberichte & Grundlagen","desc":"Authoritative Übersicht aller Repositories, GCP-Projekte und DNS-Einträge bei IONOS.","icon":"link","badge":"📘"},
    {"key":"eu_ai_act","file":"Positionspapier_Compliance_Architektur_EU_AI_Act.md","title":"EU AI Act Positionspapier","cat":"Hauptberichte & Grundlagen","desc":"Compliance-Architektur unter der EU-Verordnung 2024/1689.","icon":"landmark","badge":"📘"},
    {"key":"team_briefing","file":"TEAM_BRIEFING.md","title":"Team Briefing","cat":"Hauptberichte & Grundlagen","desc":"Das offizielle Onboarding- und Briefing-Dokument für das Team.","icon":"users","badge":"📘"},
    {"key":"aufgabenverteilung","file":"mirrou_aufgabenverteilung_master.md","title":"Aufgabenverteilung Master","cat":"Hauptberichte & Grundlagen","desc":"Strukturierte Übersicht über die Primär- und Support-Aufgaben.","icon":"clipboard-list","badge":"📘"},
    {"key":"speech_script","file":"graduation_speech_script.md","title":"Graduation Speech Script","cat":"Hauptberichte & Grundlagen","desc":"Das Redeskript für die Abschlusspräsentation.","icon":"mic","badge":"📘"},

    # ── 2. Playbooks ──
    {"key":"playbook_1","file":"1_Roadmap_Frontier_Firm.md","title":"1 · Roadmap Frontier Firm","cat":"Strategische Follow-up Playbooks","desc":"6-Wochen-Roadmap: Mirrou zum Frontier Firm entwickeln.","icon":"trending-up","badge":"🚀"},
    {"key":"playbook_2","file":"2_ICP_Audit_Mandanten_Akquise.md","title":"2 · ICP Audit & Akquise","cat":"Strategische Follow-up Playbooks","desc":"Zielgruppen-Audit und Outbound-Strategien.","icon":"target","badge":"🚀"},
    {"key":"playbook_3","file":"3_Checkliste_Operative_Skalierung.md","title":"3 · Operative Skalierung","cat":"Strategische Follow-up Playbooks","desc":"Checkliste für die ersten 30 Tage.","icon":"check-square","badge":"🚀"},
    {"key":"playbook_4","file":"4_Vertriebs_Roadmap_Zahlender_Kunde.md","title":"4 · Erster zahlender Kunde","cat":"Strategische Follow-up Playbooks","desc":"Vertriebs-Roadmap zur Gewinnung des ersten Retainers.","icon":"dollar-sign","badge":"🚀"},
    {"key":"playbook_5","file":"5_Strategische_Preismodellierung.md","title":"5 · Preismodellierung","cat":"Strategische Follow-up Playbooks","desc":"Kalkulations- und Paketstruktur.","icon":"sliders","badge":"🚀"},

    # ── 3. Deliverables ──
    {"key":"deliv_asset","file":"03_deliverables_pdf_01_Priorisierte_Asset_Liste.md","title":"Priorisierte Asset-Liste","cat":"Kampagnen- & Brand-Deliverables","desc":"Übersicht über die produzierten Visuals und Formate.","icon":"list","badge":"🛠️"},
    {"key":"deliv_review","file":"03_deliverables_pdf_02_Review_Checkliste.md","title":"Review-Checkliste","cat":"Kampagnen- & Brand-Deliverables","desc":"Qualitätskriterien und Freigabeschritte.","icon":"thumbs-up","badge":"🛠️"},
    {"key":"deliv_prompts","file":"03_deliverables_pdf_03_AI_Prompt_Blueprints.md","title":"AI Prompt Blueprints","cat":"Kampagnen- & Brand-Deliverables","desc":"Midjourney- und Firefly-Prompts für Hintergründe.","icon":"zap","badge":"🛠️"},
    {"key":"deliv_video","file":"03_deliverables_pdf_04_Hero_Video_Spezifikation.md","title":"Hero-Video-Spezifikation","cat":"Kampagnen- & Brand-Deliverables","desc":"Motion-Design-Skript und Easing-Werte.","icon":"video","badge":"🛠️"},
    {"key":"deliv_layer","file":"03_deliverables_pdf_MIRROU_Creative_Layer_Komplett.md","title":"Creative Layer Komplett","cat":"Kampagnen- & Brand-Deliverables","desc":"Gesamtzusammenstellung aller Design-Spezifikationen.","icon":"layers","badge":"🛠️"},
    {"key":"deliv_proposal","file":"03_deliverables_pdf_01_mirrou_launch_proposal - Copy.md","title":"Launch Proposal","cat":"Kampagnen- & Brand-Deliverables","desc":"Go-To-Market Kampagnen-Proposal.","icon":"file-text","badge":"🛠️"},
    {"key":"deliv_icp","file":"03_deliverables_pdf_02_mirrou_icp_research.md","title":"ICP Research","cat":"Kampagnen- & Brand-Deliverables","desc":"Recherche-Ergebnisse zu den D2C Beauty & Wellness ICPs.","icon":"search","badge":"🛠️"},
    {"key":"deliv_msg","file":"03_deliverables_pdf_03_mirrou_messaging_guide.md","title":"Messaging Guide","cat":"Kampagnen- & Brand-Deliverables","desc":"Target-Kunden-Ansprache, Angles & Hooks.","icon":"message-square","badge":"🛠️"},
    {"key":"deliv_brief","file":"03_deliverables_pdf_04_mirrou_creative_briefing.md","title":"Creative Briefing","cat":"Kampagnen- & Brand-Deliverables","desc":"Handlungsanweisung und Vorlage für Shootings.","icon":"image","badge":"🛠️"},
    {"key":"deliv_price","file":"03_deliverables_pdf_05_mirrou_pricing_strategy.md","title":"Pricing Strategy","cat":"Kampagnen- & Brand-Deliverables","desc":"Paket- und B2B-Preiskalkulation.","icon":"tag","badge":"🛠️"},
    {"key":"deliv_growth","file":"03_deliverables_pdf_06_mirrou_growth_playbook.md","title":"Growth Playbook (Deliverable)","cat":"Kampagnen- & Brand-Deliverables","desc":"90-Tage-Launch-Playbook.","icon":"compass","badge":"🛠️"},
    {"key":"deliv_compliance","file":"03_deliverables_pdf_07_mirrou_compliance_framework.md","title":"Compliance Framework","cat":"Kampagnen- & Brand-Deliverables","desc":"DSGVO, Data Act und AI Act operativ.","icon":"check-circle","badge":"🛠️"},
    {"key":"deliv_tech","file":"03_deliverables_pdf_08_mirrou_tech_architecture.md","title":"Tech Architecture","cat":"Kampagnen- & Brand-Deliverables","desc":"Firebase, GCP Cloud Run, HubSpot Stack.","icon":"cpu","badge":"🛠️"},
    {"key":"deliv_case1","file":"03_deliverables_pdf_09_mirrou_case_study_luminous_aura.md","title":"Case Study: Luminous Aura","cat":"Kampagnen- & Brand-Deliverables","desc":"Kunden-Case Beauty / D2C Skincare.","icon":"award","badge":"🛠️"},
    {"key":"deliv_case2","file":"03_deliverables_pdf_10_mirrou_case_study_vitality_pulse.md","title":"Case Study: Vitality Pulse","cat":"Kampagnen- & Brand-Deliverables","desc":"Kunden-Case Wellness / Nutrition.","icon":"heart","badge":"🛠️"},
    {"key":"deliv_partner","file":"03_deliverables_pdf_11_mirrou_agency_partner_program.md","title":"Agency Partner Program","cat":"Kampagnen- & Brand-Deliverables","desc":"White-Label-Partnerprogramm.","icon":"handshake","badge":"🛠️"},
    {"key":"deliv_investor","file":"03_deliverables_pdf_12_mirrou_investor_deck.md","title":"Investor Deck","cat":"Kampagnen- & Brand-Deliverables","desc":"Pitch-Struktur und GTM-Abläufe.","icon":"pie-chart","badge":"🛠️"},
    {"key":"deliv_gtm","file":"03_deliverables_pdf_Mirrou_GTM_Strategy.md","title":"GTM Strategy","cat":"Kampagnen- & Brand-Deliverables","desc":"Go-To-Market Vertriebsstrategie.","icon":"map","badge":"🛠️"},
    {"key":"deliv_playbook2","file":"03_deliverables_pdf_Mirrou_Growth_Playbook.md","title":"Growth Playbook (Full)","cat":"Kampagnen- & Brand-Deliverables","desc":"Detailliertes Growth Playbook.","icon":"bar-chart-2","badge":"🛠️"},

    # ── 4. Decks ──
    {"key":"deck_aos","file":"04_praesentationen_Algorithm_of_Soul.md","title":"Algorithm of Soul Pitch Deck","cat":"Präsentationen & Folien-Decks","desc":"Die Folieninhalte des Pitch Decks.","icon":"presentation","badge":"📈"},
    {"key":"deck_grad","file":"04_praesentationen_Mirrou_Abschlusspraesentation_2026.md","title":"Abschlusspräsentation 2026","cat":"Präsentationen & Folien-Decks","desc":"Folienstruktur der DCI-Abschlusspräsentation.","icon":"tv","badge":"📈"},
    {"key":"deck_hand","file":"04_praesentationen_Mirrou_Presenter_Handouts.md","title":"Presenter Handouts","cat":"Präsentationen & Folien-Decks","desc":"Handouts für das Prüfungskomitee.","icon":"printer","badge":"📈"},

    # ── 5. Guides ──
    {"key":"perp_best","file":"06_perplexity_skills_Perplexity Spaces Best Practices für Mirrou.md","title":"Perplexity Best Practices","cat":"Perplexity Spaces & Guides","desc":"Workflow-Leitfaden für Team-Recherche.","icon":"info","badge":"🧭"},
    {"key":"perp_conf","file":"06_perplexity_skills_Perplexity-Konfiguration für Mirrou.md","title":"Perplexity-Konfiguration","cat":"Perplexity Spaces & Guides","desc":"System-Prompts und Quellenauswahl.","icon":"settings","badge":"🧭"},
    {"key":"onboard","file":"06_perplexity_skills_Team Onboarding Guide.md","title":"Team Onboarding Guide","cat":"Perplexity Spaces & Guides","desc":"Einarbeitungsplan für neue Consultants.","icon":"user-plus","badge":"🧭"},
]

CATEGORY_META = {
    "Hauptberichte & Grundlagen":       {"emoji":"📘","color":"#6C9BCF","gradient":"linear-gradient(135deg,#1a2a3a,#0d1b2a)"},
    "Strategische Follow-up Playbooks": {"emoji":"🚀","color":"#E8C97A","gradient":"linear-gradient(135deg,#2a2210,#1a1508)"},
    "Kampagnen- & Brand-Deliverables":  {"emoji":"🛠️","color":"#C9A84C","gradient":"linear-gradient(135deg,#201a0d,#151008)"},
    "Präsentationen & Folien-Decks":    {"emoji":"📈","color":"#7EC8A0","gradient":"linear-gradient(135deg,#0d2a1a,#081a10)"},
    "Perplexity Spaces & Guides":       {"emoji":"🧭","color":"#B08CD0","gradient":"linear-gradient(135deg,#1a0d2a,#10081a)"},
}


def resolve_repo_path(filename):
    if filename == "URLS.md":
        return "docs/URLS.md"
    elif filename == "Positionspapier_Compliance_Architektur_EU_AI_Act.md":
        return "07_compliance/Positionspapier_Compliance_Architektur_EU_AI_Act.md"
    elif filename in [
        "Abschlussbericht_Mirrou_Creative_Studio.md",
        "AOS_AbschlussprojektBuch_KOMPLETT.md",
        "Deep_Audit_Report.md",
        "TEAM_BRIEFING.md",
        "mirrou_aufgabenverteilung_master.md"
    ]:
        return os.path.join("00_abschlussbericht", filename)
    elif filename == "graduation_speech_script.md":
        return "04_praesentationen/graduation_speech_script.md"
    elif filename.startswith("03_deliverables_pdf_"):
        return os.path.join("03_deliverables_pdf", filename[20:])
    elif filename.startswith("04_praesentationen_"):
        return os.path.join("04_praesentationen", filename[19:])
    elif filename.startswith("06_perplexity_skills_"):
        return os.path.join("06_perplexity_skills", filename[21:])
    elif len(filename) > 0 and filename[0].isdigit() and "_" in filename:
        return os.path.join("00_abschlussbericht/follow_ups", filename)
    return None


def load_documents():
    db = {}
    for item in DOCS:
        rel_path = resolve_repo_path(item["file"])
        fp = rel_path if rel_path and os.path.exists(rel_path) else None
        
        # Fallback to absolute brain artifacts folder
        if not fp:
            fp = os.path.join(ARTIFACTS_DIR, item["file"])
            
        if os.path.exists(fp):
            try:
                with open(fp, "r", encoding="utf-8") as f:
                    content = f.read()
                if content.startswith("---"):
                    parts = content.split("---", 2)
                    if len(parts) >= 3:
                        content = parts[2].strip()
                words = len(content.split())
                db[item["key"]] = {
                    "title": item["title"],
                    "cat": item["cat"],
                    "desc": item["desc"],
                    "icon": item["icon"],
                    "badge": item["badge"],
                    "file": item["file"],
                    "words": words,
                    "readMin": max(1, round(words / 230)),
                    "content": content,
                }
                print(f"  > {item['title']} ({words:,} words) [loaded from: {fp}]")
            except Exception as e:
                print(f"  X Error: {item['file']}: {e}")
        else:
            print(f"  ! Missing: {item['file']}")
    return db



# ──────────────────────────────────────────────
# HTML Template  (v3 — fully expanded)
# ──────────────────────────────────────────────
HTML_TEMPLATE = r"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mirrou Creative Studio — Document Hub</title>
<meta name="description" content="Interaktives Prasentations-Dashboard mit allen Berichten, Playbooks, Deliverables und Folien-Decks des Mirrou Creative Studio Abschlussprojekts.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ═══════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════ */
:root{
  /* OPUS MAGNUM MEDIA v3.0 // CHROMATIC MATRIX */
  --bg:#030303;--surface:#0a0a0a;--surface-2:#121212;--surface-3:#1a1a1a;
  --border:rgba(255,255,255,.08);--border-active:#A855F7;
  /* legacy accent tokens remapped to Aurora Purple (intelligence) */
  --gold:#A855F7;--gold-light:#D8B4FE;--gold-dim:rgba(168,85,247,.30);--gold-glow:rgba(168,85,247,.07);
  --text:#F5F5F5;--text-2:#9a9aa3;--text-3:#5a5a63;
  --accent-blue:#3B82F6;--accent-green:#10B981;--accent-purple:#A855F7;--accent-rose:#EC4899;
  --sidebar-w:290px;--radius:10px;--radius-lg:14px;
  --ease:cubic-bezier(.4,0,.2,1);--ease-out:cubic-bezier(0,.7,.3,1);
  --font-serif:'Cormorant Garamond','Inter',serif;
  --font-sans:'Inter',system-ui,-apple-system,sans-serif;
  --font-mono:'JetBrains Mono','Fira Code',monospace;
}
*{margin:0;padding:0;box-sizing:border-box}

/* ═══════════════════════════════════════
   GLOBAL
   ═══════════════════════════════════════ */
html,body{height:100%;overflow:hidden;background:var(--bg);color:var(--text);font-family:var(--font-sans)}
body{display:flex}
button{font-family:inherit}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--gold-dim);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:var(--gold)}
::selection{background:rgba(201,168,76,.25);color:#fff}

/* ═══════════════════════════════════════
   READING PROGRESS
   ═══════════════════════════════════════ */
#progress-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--gold-light),var(--gold));width:0;z-index:999;transition:width .08s linear;pointer-events:none}
#progress-bar::after{content:'';position:absolute;right:0;top:0;width:80px;height:100%;background:linear-gradient(90deg,transparent,rgba(232,201,122,.5));filter:blur(3px)}

/* ═══════════════════════════════════════
   TOAST NOTIFICATIONS
   ═══════════════════════════════════════ */
#toast-container{position:fixed;top:70px;right:24px;z-index:1000;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{background:var(--surface-2);border:1px solid var(--border-active);border-radius:var(--radius);padding:10px 18px;font-size:.82rem;color:var(--gold-light);display:flex;align-items:center;gap:8px;animation:toastIn .3s var(--ease-out),toastOut .3s .8s var(--ease) forwards;pointer-events:none;backdrop-filter:blur(12px);box-shadow:0 8px 32px rgba(0,0,0,.5)}
.toast svg{width:14px;height:14px;color:var(--gold)}
@keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes toastOut{to{opacity:0;transform:translateX(40px)}}

/* ═══════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════ */
#sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;height:100%;flex-shrink:0;transition:margin-left .35s var(--ease-out),opacity .25s;z-index:50}
#sidebar.collapsed{margin-left:calc(-1*var(--sidebar-w));opacity:0}

.sb-header{padding:18px 18px 14px;border-bottom:1px solid var(--border)}
.sb-brand{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.sb-logo{width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-weight:700;font-size:.9rem;color:var(--bg)}
.sb-brand-text{display:flex;flex-direction:column}
.sb-brand-text .sb-name{font-family:var(--font-serif);font-weight:700;font-size:1.15rem;color:var(--text);letter-spacing:.5px;line-height:1.1}
.sb-brand-text .sb-sub{font-size:.6rem;text-transform:uppercase;letter-spacing:2px;color:var(--text-3);margin-top:1px}

.sb-search{position:relative}
.sb-search input{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:9px 12px 9px 34px;color:var(--text);font-size:.82rem;outline:none;transition:border .2s,box-shadow .2s}
.sb-search input:focus{border-color:var(--border-active);box-shadow:0 0 0 3px var(--gold-glow)}
.sb-search input::placeholder{color:var(--text-3)}
.sb-search .search-icon{position:absolute;left:10px;top:9px;color:var(--text-3);width:15px;height:15px;pointer-events:none}
.sb-search .search-count{position:absolute;right:10px;top:8px;font-size:.65rem;color:var(--gold);font-weight:600;opacity:0;transition:opacity .15s}
.sb-search .search-count.visible{opacity:1}
.sb-search .search-clear{position:absolute;right:8px;top:7px;width:18px;height:18px;background:var(--surface-2);border:1px solid var(--border);border-radius:50%;color:var(--text-3);font-size:.65rem;cursor:pointer;display:none;align-items:center;justify-content:center;line-height:1}
.sb-search .search-clear.visible{display:flex}

.sb-stats{display:flex;gap:0;padding:0;border-bottom:1px solid var(--border)}
.sb-stats .stat{flex:1;padding:10px 0;text-align:center;border-right:1px solid var(--border);font-size:.65rem;color:var(--text-3);text-transform:uppercase;letter-spacing:.8px}
.sb-stats .stat:last-child{border-right:none}
.sb-stats .stat b{display:block;color:var(--gold);font-weight:700;font-size:1rem;font-family:var(--font-serif);line-height:1.1}

.sb-recent{padding:10px 16px;border-bottom:1px solid var(--border);display:none}
.sb-recent.visible{display:block}
.sb-recent-title{font-size:.6rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-3);margin-bottom:6px;font-weight:700}
.sb-recent-items{display:flex;flex-direction:column;gap:2px}
.sb-recent-item{font-size:.75rem;color:var(--text-2);padding:3px 8px;border-radius:4px;cursor:pointer;transition:all .12s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sb-recent-item:hover{background:var(--surface-2);color:var(--gold-light)}

.sb-nav{flex:1;overflow-y:auto;padding:6px 0}

.cat-group{margin-bottom:1px}
.cat-head{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;font-size:.65rem;font-weight:700;text-transform:uppercase;color:var(--gold);letter-spacing:1.2px;cursor:pointer;user-select:none;transition:background .15s}
.cat-head:hover{background:rgba(201,168,76,.03)}
.cat-head .cat-left{display:flex;align-items:center;gap:6px}
.cat-head .cat-left .cat-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.cat-head .cat-right{display:flex;align-items:center;gap:6px}
.cat-head .cat-badge{background:rgba(201,168,76,.08);color:var(--gold-light);padding:1px 6px;border-radius:8px;font-size:.6rem;font-weight:600}
.cat-head .chev{width:11px;height:11px;transition:transform .2s var(--ease);color:var(--text-3)}
.cat-group.closed .chev{transform:rotate(-90deg)}
.cat-items{overflow:hidden;transition:max-height .3s var(--ease)}
.cat-group.closed .cat-items{max-height:0!important}

.doc-btn{display:flex;align-items:center;gap:9px;padding:7px 16px 7px 28px;font-size:.8rem;color:var(--text-2);cursor:pointer;transition:all .12s;border-left:2px solid transparent;position:relative}
.doc-btn:hover{background:var(--surface-2);color:var(--text)}
.doc-btn.active{background:rgba(201,168,76,.05);border-left-color:var(--border-active);color:var(--gold-light)}
.doc-btn svg{width:13px;height:13px;flex-shrink:0;opacity:.5}
.doc-btn.active svg{opacity:1;color:var(--gold)}
.doc-btn .doc-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}

/* ═══════════════════════════════════════
   MAIN
   ═══════════════════════════════════════ */
#main{flex:1;display:flex;flex-direction:column;height:100%;overflow:hidden;position:relative}

/* ── Toolbar ── */
.toolbar{height:52px;background:var(--surface);border-bottom:1px solid var(--border);padding:0 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.tl{display:flex;align-items:center;gap:12px}
.tr{display:flex;align-items:center;gap:6px}

.tb{background:none;border:1px solid var(--border);color:var(--text-2);border-radius:var(--radius);padding:5px 9px;font-size:.78rem;cursor:pointer;display:flex;align-items:center;gap:5px;transition:all .15s}
.tb:hover{border-color:var(--border-active);color:var(--text);background:var(--gold-glow)}
.tb.active-tb{border-color:var(--gold);color:var(--gold);background:rgba(201,168,76,.08)}
.tb svg{width:14px;height:14px}
.tb .tb-label{display:none}
@media(min-width:1200px){.tb .tb-label{display:inline}}

.breadcrumb{display:flex;flex-direction:column;gap:0}
.breadcrumb .bc-cat{font-size:.6rem;text-transform:uppercase;color:var(--gold);letter-spacing:1px;font-weight:600;opacity:.8}
.breadcrumb .bc-title{font-size:.95rem;font-family:var(--font-serif);font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px}
.bc-pos{font-size:.65rem;color:var(--text-3);font-family:var(--font-sans);font-weight:400;background:var(--surface-2);padding:1px 6px;border-radius:4px}

.divider-v{width:1px;height:24px;background:var(--border);margin:0 4px}

.zoom-grp{display:flex;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.zoom-grp button{background:var(--bg);border:none;color:var(--text-2);padding:5px 9px;cursor:pointer;font-size:.75rem;transition:all .12s;font-family:var(--font-mono)}
.zoom-grp button:hover{background:var(--surface-2);color:var(--text)}
.zoom-grp button:not(:last-child){border-right:1px solid var(--border)}

/* ── Content Area ── */
.content-area{flex:1;display:flex;overflow:hidden;position:relative}

/* ═══════════════════════════════════════
   WELCOME SCREEN
   ═══════════════════════════════════════ */
#welcome{position:absolute;inset:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;align-items:center;z-index:5;background:var(--bg)}
#welcome.hidden{display:none;opacity:0}

.welcome-bg{position:fixed;top:-200px;left:50%;width:800px;height:800px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.04) 0%,transparent 70%);pointer-events:none;z-index:0}

.welcome-inner{position:relative;z-index:1;padding:60px 48px 80px;width:100%;max-width:1100px;margin:0 auto}

.welcome-hero{text-align:center;margin-bottom:52px}
.welcome-hero h1{font-family:var(--font-serif);font-size:3.6rem;font-weight:300;letter-spacing:1px;margin-bottom:6px;line-height:1.1}
.welcome-hero h1 .w-mirrou{color:var(--text)}
.welcome-hero h1 .w-hub{font-weight:700;font-style:italic;background:linear-gradient(135deg,var(--gold),var(--gold-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.welcome-hero .w-sub{color:var(--text-3);font-size:.85rem;line-height:1.5;margin-top:14px;max-width:560px;margin-left:auto;margin-right:auto}
.welcome-hero .w-divider{width:60px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:20px auto 0}
.w-quick-links{display:flex;justify-content:center;gap:12px;margin-top:24px;flex-wrap:wrap}
.w-ql-btn{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:10px 18px;color:var(--text-2);text-decoration:none;font-size:.82rem;font-weight:500;transition:all .2s var(--ease)}
.w-ql-btn:hover{border-color:var(--border-active);color:var(--text);background:var(--gold-glow);transform:translateY(-1px)}
.w-ql-btn.primary{background:linear-gradient(135deg,rgba(201,168,76,.15),rgba(201,168,76,.05));border-color:var(--border-active);color:var(--gold-light)}
.w-ql-btn.primary:hover{background:linear-gradient(135deg,rgba(201,168,76,.25),rgba(201,168,76,.1));box-shadow:0 0 16px rgba(201,168,76,.15)}
.w-ql-btn svg{width:16px;height:16px}

.welcome-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:52px}
.ws-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:22px 16px;text-align:center;transition:all .3s var(--ease);position:relative;overflow:hidden}
.ws-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,var(--gold-glow),transparent 70%);opacity:0;transition:opacity .3s;pointer-events:none}
.ws-card:hover{border-color:rgba(201,168,76,.25);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.ws-card:hover::before{opacity:1}
.ws-card .ws-icon{color:var(--gold);margin-bottom:8px;opacity:.6}
.ws-card .ws-icon svg{width:20px;height:20px}
.ws-card .ws-num{font-family:var(--font-serif);font-size:2.4rem;font-weight:700;color:var(--gold-light);line-height:1;position:relative}
.ws-card .ws-label{font-size:.65rem;text-transform:uppercase;letter-spacing:1.8px;color:var(--text-3);margin-top:4px}

.welcome-cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-bottom:40px}

.wc-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:0;cursor:pointer;transition:all .3s var(--ease);position:relative;overflow:hidden}
.wc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--card-accent,var(--gold));opacity:0;transition:opacity .25s}
.wc-card:hover{border-color:rgba(201,168,76,.2);transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,.35)}
.wc-card:hover::before{opacity:1}

.wc-card-head{padding:22px 22px 14px;display:flex;align-items:flex-start;gap:14px}
.wc-card-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;border:1px solid var(--border)}
.wc-card-meta{flex:1}
.wc-card-meta .wc-name{font-family:var(--font-serif);font-weight:700;font-size:1.15rem;color:var(--text);line-height:1.2;margin-bottom:3px}
.wc-card-meta .wc-count{font-size:.7rem;color:var(--text-3);display:flex;align-items:center;gap:10px}
.wc-card-meta .wc-count span{display:flex;align-items:center;gap:3px}
.wc-card-meta .wc-count svg{width:11px;height:11px}

.wc-card-body{padding:0 22px 18px}
.wc-card-body .wc-doc{display:flex;align-items:center;gap:8px;font-size:.78rem;color:var(--text-2);padding:5px 10px;border-radius:6px;transition:all .12s;margin-bottom:2px}
.wc-card-body .wc-doc:hover{background:var(--surface-2);color:var(--gold-light)}
.wc-card-body .wc-doc svg{width:12px;height:12px;opacity:.4;flex-shrink:0}
.wc-card-body .wc-more{font-size:.72rem;color:var(--gold);padding:3px 10px;font-style:italic;opacity:.7}

/* ═══════════════════════════════════════
   READER
   ═══════════════════════════════════════ */
#reader-wrap{position:absolute;inset:0;display:flex;overflow:hidden;opacity:0;transition:opacity .2s var(--ease)}
#reader-wrap.visible{opacity:1}
#reader-wrap.hidden{display:none}

.reader-scroll{flex:1;overflow-y:auto;padding:32px 36px 100px;display:flex;justify-content:center}
.reader-card{width:100%;max-width:840px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:48px 56px 60px;box-shadow:0 4px 28px rgba(0,0,0,.35);position:relative;min-height:50vh}

/* Document meta */
.doc-meta{display:flex;align-items:flex-start;gap:16px;margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.dm-icon-wrap{width:44px;height:44px;border-radius:10px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dm-icon-wrap svg{width:20px;height:20px;color:var(--gold)}
.dm-info{flex:1;min-width:0}
.dm-title{font-family:var(--font-serif);font-size:1.5rem;font-weight:700;color:var(--text);line-height:1.2}
.dm-desc{font-size:.82rem;color:var(--text-2);margin-top:3px}
.dm-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.dm-tag{font-size:.65rem;text-transform:uppercase;letter-spacing:.5px;color:var(--text-3);background:var(--bg);padding:3px 8px;border-radius:12px;border:1px solid var(--border);display:flex;align-items:center;gap:4px}
.dm-tag svg{width:10px;height:10px}
.dm-tag.dm-cat{color:var(--gold);border-color:rgba(201,168,76,.15)}

/* Prev/Next nav */
.doc-nav{display:flex;gap:12px;margin-top:48px;padding-top:24px;border-top:1px solid var(--border)}
.doc-nav-btn{flex:1;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:14px 18px;cursor:pointer;transition:all .2s var(--ease);text-align:left}
.doc-nav-btn:hover{border-color:var(--border-active);background:var(--gold-glow)}
.doc-nav-btn.next{text-align:right}
.doc-nav-btn .dn-label{font-size:.6rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-3);margin-bottom:4px;display:flex;align-items:center;gap:4px}
.doc-nav-btn.next .dn-label{justify-content:flex-end}
.doc-nav-btn .dn-label svg{width:10px;height:10px}
.doc-nav-btn .dn-title{font-family:var(--font-serif);font-size:.95rem;font-weight:600;color:var(--text)}
.doc-nav-btn:hover .dn-title{color:var(--gold-light)}

/* ── TOC ── */
/* ── TOC ── */
.toc-panel{width:220px;flex-shrink:0;padding:24px 16px 24px 0;overflow-y:auto;align-self:flex-start;position:sticky;top:0;display:none;border-left:1px solid var(--border);margin-left:20px}
.toc-panel.visible{display:block}
.toc-head{font-size:.65rem;text-transform:uppercase;letter-spacing:2px;color:var(--gold);margin-bottom:12px;font-weight:700;display:flex;align-items:center;gap:6px}
.toc-head svg{width:12px;height:12px}
.toc-progress{width:100%;height:2px;background:var(--border);border-radius:1px;margin-bottom:14px;overflow:hidden}
.toc-progress-fill{height:100%;background:var(--gold);width:0;transition:width .15s linear;border-radius:1px}
.toc-link{display:block;padding:4px 0 4px 16px;font-size:.76rem;color:var(--text-2);text-decoration:none;border-left:2px solid transparent;margin-left:-1px;transition:all .15s var(--ease);line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.toc-link:hover{color:var(--text);border-left-color:var(--gold-dim)}
.toc-link.active{color:var(--gold-light);border-left-color:var(--gold);font-weight:500}
.toc-link.depth-3{padding-left:26px;font-size:.72rem;opacity:0.8}

/* ═══════════════════════════════════════
   SLIDE MODE (Pitch Deck)
   ═══════════════════════════════════════ */
#slide-overlay{position:fixed;inset:0;background:var(--bg);z-index:200;display:none;flex-direction:column}
#slide-overlay.visible{display:flex}
.slide-toolbar{height:48px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 20px;flex-shrink:0}
.slide-toolbar .st-title{font-family:var(--font-serif);font-weight:700;color:var(--text);font-size:.95rem}
.slide-toolbar .st-pos{font-size:.75rem;color:var(--text-3);font-family:var(--font-mono)}
.slide-area{flex:1;display:flex;align-items:center;justify-content:center;padding:40px;overflow:hidden}
.slide-card{width:100%;max-width:900px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:60px 72px;box-shadow:0 8px 48px rgba(0,0,0,.5);animation:slideIn .3s var(--ease-out)}
@keyframes slideIn{from{opacity:0;transform:scale(.97) translateY(10px)}to{opacity:1;transform:none}}
.slide-card .md h1{font-size:2.8rem}
.slide-card .md h2{font-size:2rem;border-bottom:none}
.slide-nav{height:60px;display:flex;align-items:center;justify-content:center;gap:12px;flex-shrink:0}
.slide-nav button{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:8px 20px;color:var(--text-2);cursor:pointer;font-size:.8rem;transition:all .15s;display:flex;align-items:center;gap:6px}
.slide-nav button:hover{border-color:var(--border-active);color:var(--text)}
.slide-nav button svg{width:14px;height:14px}
.slide-dots{display:flex;gap:6px;margin:0 16px}
.slide-dot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all .2s;cursor:pointer}
.slide-dot.active{background:var(--gold);box-shadow:0 0 8px rgba(201,168,76,.4)}

/* Slide Editor Styles */
.slide-edit-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
}
.slide-edit-textarea {
  flex: 1;
  background: rgba(8, 8, 10, 0.6);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  padding: 16px;
  resize: none;
  outline: none;
  line-height: 1.6;
  transition: border-color 0.25s, box-shadow 0.25s;
  min-height: 250px;
}
.slide-edit-textarea:focus {
  border-color: var(--gold);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.15);
}
.slide-edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* ═══════════════════════════════════════
   MARKDOWN
   ═══════════════════════════════════════ */
.md{font-size:.95rem;line-height:1.8;color:var(--text)}
.md h1,.md h2,.md h3,.md h4{font-family:var(--font-serif);color:var(--gold-light);font-weight:500;scroll-margin-top:24px;letter-spacing:0.2px}
.md h1{font-size:2.5rem;border-bottom:1px solid var(--border);padding-bottom:12px;margin:0 0 .8em}
.md h2{font-size:1.8rem;border-bottom:1px solid var(--border);padding-bottom:8px;margin:2em 0 .6em;position:relative}
.md h2::after{content:'';position:absolute;bottom:-1px;left:0;width:60px;height:2px;background:linear-gradient(90deg,var(--gold),transparent)}
.md h3{font-size:1.35rem;margin:1.6em 0 .5em;font-weight:600}
.md h4{font-size:1.1rem;margin:1.4em 0 .4em;color:var(--text);font-weight:600}
.md p{margin-bottom:1.2em;color:#c8c5c0;text-align:justify}
.md strong{color:var(--text);font-weight:600}
.md em{color:var(--gold-light);font-style:italic}
.md a{color:var(--gold);text-decoration:none;border-bottom:1px dashed rgba(168,85,247,.3);transition:all .15s}
.md a:hover{color:var(--gold-light);border-bottom-color:var(--gold)}
.md blockquote{border-left:3px solid var(--border-active);background:rgba(168,85,247,.01);padding:14px 20px;margin:20px 0;border-radius:0 var(--radius) var(--radius) 0;font-style:italic}
.md blockquote p{margin:0;color:var(--text-2)}
.md ul,.md ol{padding-left:22px;margin-bottom:1.2em}
.md li{margin-bottom:.4em;color:#c8c5c0}
.md li::marker{color:var(--gold-dim)}
.md hr{border:none;height:1px;background:linear-gradient(90deg,transparent,var(--border-active),transparent);margin:36px 0}
.md img{max-width:100%;height:auto;border-radius:var(--radius-lg);border:1px solid var(--border);margin:24px 0 8px;display:block;box-shadow:0 10px 30px rgba(0,0,0,0.5);transition:transform 0.3s var(--ease)}
.md img:hover{transform:scale(1.01);border-color:var(--border-active)}
.md img + em{display:block;text-align:center;font-size:0.76rem;color:var(--text-3);margin-bottom:24px;font-style:normal}

/* Tables */
.md table{width:100%;border-collapse:separate;border-spacing:0;margin:28px 0;font-size:.82rem;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.2)}
.md th,.md td{padding:12px 16px;text-align:left;border-bottom:1px solid var(--border);border-right:1px solid var(--border)}
.md th:last-child,.md td:last-child{border-right:none}
.md tr:last-child td{border-bottom:none}
.md th{background:rgba(168,85,247,0.04);color:var(--gold-light);font-weight:700;font-size:.74rem;text-transform:uppercase;letter-spacing:.8px}
.md tr:nth-child(even){background:rgba(255,255,255,.005)}
.md tr:hover td{background:rgba(168,85,247,.02);color:var(--text)}

/* Code */
.md code{font-family:var(--font-mono);background:rgba(255,255,255,.05);color:var(--gold-light);padding:2px 5px;border-radius:3px;font-size:.85em}
.md pre{background:#080808;border:1px solid var(--border);border-radius:var(--radius);padding:24px 20px 20px;overflow-x:auto;margin:24px 0;position:relative}
.md pre::before{content:'';position:absolute;top:10px;left:14px;width:8px;height:8px;border-radius:50%;background:#ff5f56;box-shadow:14px 0 0 #ffbd2e,28px 0 0 #27c93f;opacity:0.6}
.md pre code{background:transparent;border:none;padding:0;color:#E2E8F0;font-size:.82em;line-height:1.6}
.md pre .copy-btn{position:absolute;top:8px;right:8px;background:var(--surface-2);border:1px solid var(--border);border-radius:4px;color:var(--text-3);padding:3px 7px;font-size:.65rem;cursor:pointer;opacity:0;transition:all .15s;display:flex;align-items:center;gap:3px;font-family:var(--font-sans)}
.md pre:hover .copy-btn{opacity:1}
.md pre .copy-btn:hover{border-color:var(--border-active);color:var(--gold)}

/* Callouts / GitHub-style alerts */
.callout{margin:24px 0;padding:16px 20px;border-radius:var(--radius);border-left:4px solid transparent;background:rgba(255,255,255,0.015);backdrop-filter:blur(8px)}
.callout-note{border-left-color:var(--accent-blue);background:rgba(59,130,246,0.02)}
.callout-tip{border-left-color:var(--accent-green);background:rgba(16,185,129,0.02)}
.callout-warning{border-left-color:#F59E0B;background:rgba(245,158,11,0.02)}
.callout-important{border-left-color:var(--accent-purple);background:rgba(168,85,247,0.02)}
.callout-caution{border-left-color:#EF4444;background:rgba(239,68,68,0.02)}
.callout-header{display:flex;align-items:center;gap:8px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px}
.callout-note .callout-header{color:#60A5FA}
.callout-tip .callout-header{color:#34D399}
.callout-warning .callout-header{color:#FBBF24}
.callout-important .callout-header{color:#C084FC}
.callout-caution .callout-header{color:#FCA5A5}
.callout-header svg{width:14px;height:14px}
.callout-content{font-size:0.9rem;color:var(--text-2);line-height:1.6}
.callout-content p{margin-bottom:0}

/* Search highlight */
.hl{background:rgba(201,168,76,.3);color:#fff;padding:1px 2px;border-radius:2px}

/* ═══════════════════════════════════════
   SCROLL-TO-TOP
   ═══════════════════════════════════════ */
#scroll-top{position:fixed;bottom:28px;right:28px;width:38px;height:38px;border-radius:50%;background:var(--surface);border:1px solid var(--border);color:var(--gold);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;pointer-events:none;transition:all .25s var(--ease);z-index:50;box-shadow:0 4px 20px rgba(0,0,0,.5)}
#scroll-top.visible{opacity:1;pointer-events:all}
#scroll-top:hover{border-color:var(--border-active);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5)}
#scroll-top svg{width:16px;height:16px}

/* ═══════════════════════════════════════
   KEYBOARD HINTS
   ═══════════════════════════════════════ */
.kbd-hint{position:fixed;bottom:12px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:5px 14px;font-size:.65rem;color:var(--text-3);display:flex;gap:14px;z-index:40;opacity:0;transition:opacity .3s;pointer-events:none}
body:hover .kbd-hint{opacity:.5}
.kbd-hint:hover{opacity:1!important;pointer-events:all}
kbd{background:var(--bg);border:1px solid var(--border);border-radius:3px;padding:1px 5px;font-family:var(--font-mono);font-size:.6rem;color:var(--text-2)}

/* ═══════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════ */
@media(max-width:900px){
  #sidebar{position:fixed;left:0;top:0;bottom:0;z-index:100;box-shadow:20px 0 60px rgba(0,0,0,.5)}
  #sidebar.collapsed{margin-left:calc(-1*var(--sidebar-w))}
  .reader-card{padding:32px 28px 48px}
  .toc-panel{display:none!important}
  .welcome-stats{grid-template-columns:repeat(2,1fr)}
  .welcome-hero h1{font-size:2.4rem}
  .kbd-hint{display:none}
}
@media(max-width:600px){
  .welcome-inner{padding:32px 20px 60px}
  .welcome-cats{grid-template-columns:1fr}
  .welcome-stats{grid-template-columns:repeat(2,1fr);gap:10px}
  .reader-scroll{padding:16px 12px 80px}
  .reader-card{padding:24px 20px 40px}
  .toolbar{padding:0 12px}
}

/* Print */
@media print{
  #sidebar,.toolbar,.toc-panel,#scroll-top,.kbd-hint,#progress-bar,.doc-nav,#toast-container{display:none!important}
  body{background:#fff!important;color:#000!important}
  #main{width:100%!important}
  .reader-card{border:none!important;box-shadow:none!important;max-width:100%!important;padding:0!important;background:#fff!important}
  .md,.md p,.md li{color:#000!important}
  .md h1,.md h2,.md h3,.md h4{color:#222!important}
  .md table{page-break-inside:avoid}
  .md th{background:#eee!important;color:#000!important}
  .doc-meta{border-bottom-color:#ddd!important}
  .dm-tag{background:#f5f5f5!important;border-color:#ddd!important;color:#333!important}
}

/* ═══════════════════════════════════════
   OPUS MAGNUM MEDIA v3.0 ADDITIONS
   ═══════════════════════════════════════ */
.sb-brand-text .sb-sub {
  font-family: var(--font-mono);
  font-size: 8px;
  letter-spacing: 1.5px;
}
#omm-boot {
  position: fixed;
  inset: 0;
  background: #030303;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  color: #F5F5F5;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
#omm-boot.done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.boot-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.boot-logo {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: 3.2rem;
  color: #A855F7;
  text-align: center;
  text-shadow: 0 0 30px rgba(168, 85, 247, 0.45);
  margin-bottom: 5px;
  letter-spacing: -2px;
}
.boot-title {
  font-size: 10px;
  letter-spacing: 3px;
  text-align: center;
  font-weight: 700;
  color: #F5F5F5;
  text-transform: uppercase;
}
.boot-subtitle {
  font-size: 8px;
  letter-spacing: 2px;
  color: #3B82F6;
  text-align: center;
  opacity: 0.8;
  text-transform: uppercase;
}
.boot-progress-bar {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1px;
  overflow: hidden;
}
.boot-progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #3B82F6, #A855F7);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
  transition: width 0.2s ease;
}
.boot-log {
  height: 85px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 12px;
  font-size: 9px;
  color: #9a9aa3;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
  text-align: left;
}
.boot-log div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.boot-log span.sys {
  color: #3B82F6;
}
.boot-log span.ok {
  color: #A855F7;
}

.w-protocol-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #A855F7;
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 4px;
  padding: 4px 10px;
  margin-bottom: 24px;
  text-transform: uppercase;
  text-align: center;
}
.w-footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--border);
}
.w-footer-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}
.w-footer-title {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--gold);
  text-transform: uppercase;
}
.w-footer-text {
  font-size: 11px;
  line-height: 1.6;
  color: var(--text-3);
}
@media(max-width:768px){
  .w-footer-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* --- Theme Matrix Overrides --- */
body.theme-matrix {
  --bg: #050806;
  --surface: #0a100c;
  --surface-2: #101a14;
  --surface-3: #18281f;
  --border: rgba(16, 185, 129, 0.12);
  --border-active: #10B981;
  --gold: #10B981;
  --gold-light: #6EE7B7;
  --gold-dim: rgba(16, 185, 129, 0.30);
  --gold-glow: rgba(16, 185, 129, 0.07);
}

/* --- Theme Amber Overrides --- */
body.theme-amber {
  --bg: #15100a;
  --surface: #201a12;
  --surface-2: #2a2219;
  --surface-3: #352b20;
  --border: rgba(217, 119, 6, 0.12);
  --border-active: #D97706;
  --gold: #D97706;
  --gold-light: #FBBF24;
  --gold-dim: rgba(217, 119, 6, 0.30);
  --gold-glow: rgba(217, 119, 6, 0.07);
}

/* --- Theme Dropdown --- */
.dropdown-menu {
  animation: dropdownIn 0.2s var(--ease-out);
}
@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
.theme-option {
  color: var(--text-2);
  transition: all 0.12s;
}
.theme-option:hover {
  background: var(--surface-3);
  color: var(--gold-light);
}

/* --- Drawers --- */
.copilot-drawer {
  position: fixed;
  top: 0;
  right: -380px;
  width: 380px;
  height: 100%;
  background: var(--surface);
  border-left: 1px solid var(--border);
  box-shadow: -10px 0 40px rgba(0,0,0,.6);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: right 0.3s var(--ease-out);
  backdrop-filter: blur(12px);
}
.copilot-drawer.open {
  right: 0;
}
.copilot-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0,0,0,0.15);
}
.copilot-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.copilot-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 8px;
  background: rgba(0,0,0,0.15);
}

/* --- Chat Messages --- */
.chat-msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: var(--radius);
  font-size: .8rem;
  line-height: 1.5;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.chat-msg.ai {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  align-self: flex-start;
  border-bottom-left-radius: 2px;
}
.chat-msg.user {
  background: var(--gold-glow);
  border: 1px solid var(--border-active);
  color: var(--gold-light);
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}
.chat-msg p {
  margin-bottom: 8px;
}
.chat-msg p:last-child {
  margin-bottom: 0;
}
.chat-msg ul, .chat-msg ol {
  padding-left: 16px;
  margin-top: 4px;
}
.chat-msg li {
  margin-bottom: 2px;
}
.chat-msg strong {
  color: var(--gold-light);
}

/* --- Storage Inspector --- */
.storage-item {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.storage-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: var(--gold-light);
}
.storage-item-val {
  font-size: 10px;
  color: var(--text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Lightbox Overlay */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 10, 0.95);
  backdrop-filter: blur(16px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.lightbox-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
.lightbox-content {
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 24px 64px rgba(0,0,0,0.8);
  transform: scale(0.95);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: zoom-out;
}
.lightbox-overlay.open .lightbox-content {
  transform: scale(1);
}
.lightbox-caption {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--gold-light);
  margin-top: 20px;
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
  line-height: 1.4;
}
.lightbox-overlay.open .lightbox-caption {
  opacity: 1;
  transform: translateY(0);
}
.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  color: var(--text-2);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  outline: none;
}
.lightbox-close:hover {
  background: rgba(168,85,247,0.08);
  border-color: var(--gold);
  color: var(--gold-light);
}

/* Make reader view images look clickable and premium */
#md-output img {
  cursor: zoom-in;
  transition: transform 0.25s var(--ease-out), border-color 0.25s;
  border: 1px solid transparent;
}
#md-output img:hover {
  transform: translateY(-2px);
  border-color: var(--gold-dim);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}

/* --- Suggested Questions Widget (FAQ) --- */
.faq-widget {
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-bottom: 24px;
}
.faq-title {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.faq-pills {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.faq-pill {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 14px;
  font-size: 0.8rem;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  width: 100%;
}
.faq-pill:hover {
  border-color: var(--border-active);
  color: var(--gold-light);
  background: var(--gold-glow);
  transform: translateX(2px);
}
.faq-pill svg {
  width: 12px;
  height: 12px;
  color: var(--text-3);
  transition: color 0.15s;
}
.faq-pill:hover svg {
  color: var(--gold);
}

/* --- Slide Presenter Mode Layout --- */
.slide-workspace {
  display: flex;
  flex: 1;
  width: 100%;
  height: calc(100% - 108px);
  overflow: hidden;
}
.slide-main-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: all 0.3s var(--ease);
}
#slide-overlay.presenter-active .slide-main-view {
  flex: 0.65;
  border-right: 1px solid var(--border);
}
.slide-presenter-panel {
  display: none;
  flex: 0.35;
  background: var(--surface-2);
  flex-direction: column;
  padding: 24px;
  gap: 20px;
  overflow-y: auto;
  border-left: 1px solid var(--border);
}
#slide-overlay.presenter-active .slide-presenter-panel {
  display: flex;
}

/* Presenter Widgets */
.pres-widget-title {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 1.5px;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pres-timer-widget {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  text-align: center;
}
.pres-timer-display {
  font-family: var(--font-mono);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text);
  margin: 6px 0 12px;
  text-shadow: 0 0 10px var(--gold-glow);
}
.pres-timer-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.pres-timer-controls button {
  background: var(--surface-3);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-2);
  padding: 6px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s;
}
.pres-timer-controls button:hover {
  border-color: var(--gold);
  color: var(--gold-light);
}
.pres-next-preview {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  max-height: 160px;
  overflow: hidden;
}
.pres-next-card {
  font-size: 0.8rem;
  color: var(--text-3);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.pres-next-card h1, .pres-next-card h2, .pres-next-card h3 {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--gold-light);
  margin-bottom: 6px;
}
.pres-notes-widget {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.pres-notes-content {
  font-size: 0.82rem;
  color: var(--text-2);
  line-height: 1.6;
  overflow-y: auto;
  flex: 1;
}
.pres-notes-textarea {
  flex: 1;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 0.82rem;
  padding: 8px;
  resize: none;
  outline: none;
  font-family: var(--font-mono);
}
.pres-notes-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 10px;
}
.pres-notes-actions button {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-2);
  padding: 5px 10px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s;
}
.pres-notes-actions button:hover {
  border-color: var(--gold);
  color: var(--gold-light);
}
.pres-notes-actions button.hidden {
  display: none;
}
.pres-notes-textarea.hidden {
  display: none;
}
</style>
</head>
<body>

<div id="omm-boot">
  <div class="boot-container">
    <div class="boot-logo">M</div>
    <div class="boot-title">OPUS MAGNUM MEDIA // v3.0</div>
    <div class="boot-subtitle">INITIALIZING IDENTITY PROTOCOL...</div>
    <div class="boot-progress-bar">
      <div class="boot-progress-fill" id="boot-fill"></div>
    </div>
    <div class="boot-log" id="boot-log"></div>
  </div>
</div>

<div id="progress-bar"></div>
<div id="toast-container"></div>

<!-- ═══════════════════════════════════════
     SIDEBAR
     ═══════════════════════════════════════ -->
<div id="sidebar">
  <div class="sb-header">
    <div class="sb-brand">
      <div class="sb-logo">M</div>
      <div class="sb-brand-text">
        <span class="sb-name">Mirrou Hub</span>
        <span class="sb-sub">OMM ENGINE · DOC PROTOCOL</span>
      </div>
    </div>
    <div class="sb-search">
      <i data-lucide="search" class="search-icon"></i>
      <input type="text" id="search" placeholder="Dokumente durchsuchen..." oninput="onSearch()" onkeydown="if(event.key==='Escape'){this.value='';onSearch();this.blur()}">
      <span class="search-count" id="search-count"></span>
      <span class="search-clear" id="search-clear" onclick="document.getElementById('search').value='';onSearch()">&#x2715;</span>
    </div>
  </div>
  <div class="sb-stats" id="sb-stats"></div>
  <div class="sb-recent" id="sb-recent">
    <div class="sb-recent-title">Zuletzt angesehen</div>
    <div class="sb-recent-items" id="sb-recent-items"></div>
  </div>
  <div class="sb-nav" id="sb-nav"></div>
  <div class="sb-footer" style="padding:12px; border-top:1px solid var(--border); background:var(--surface);">
    <button class="tb" id="db-analytics" onclick="openAnalytics()" style="width:100%; justify-content:center; border-color:var(--gold-dim); color:var(--gold-light);"><i data-lucide="bar-chart-2"></i>HQ Analytics Dashboard</button>
  </div>
</div>

<!-- ═══════════════════════════════════════
     MAIN
     ═══════════════════════════════════════ -->
<div id="main">
  <div class="toolbar">
    <div class="tl">
      <button class="tb" onclick="toggleSidebar()" title="Sidebar ein/aus (S)"><i data-lucide="panel-left"></i></button>
      <div class="breadcrumb" id="breadcrumb">
        <span class="bc-cat" id="bc-cat">WILLKOMMEN</span>
        <span class="bc-title" id="bc-title">Document Hub</span>
      </div>
    </div>
    <div class="tr">
      <button class="tb" onclick="goHome()" title="Startseite (Esc)"><i data-lucide="home"></i></button>
      <div class="divider-v"></div>
      <!-- Theme Selection Dropdown -->
      <div class="theme-select-container" style="position:relative; display:inline-block;">
        <button class="tb" onclick="toggleThemeMenu(event)" title="Farbschema wechseln"><i data-lucide="palette"></i><span class="tb-label">Design</span></button>
        <div id="theme-menu" class="dropdown-menu" style="display:none; position:absolute; right:0; top:100%; margin-top:6px; background:var(--surface-2); border:1px solid var(--border); border-radius:var(--radius); padding:6px; z-index:999; box-shadow:0 8px 32px rgba(0,0,0,.5); min-width:160px; backdrop-filter:blur(12px);">
          <div class="theme-option" onclick="changeTheme('dark')" style="padding:6px 12px; border-radius:6px; cursor:pointer; font-size:.78rem; display:flex; align-items:center; gap:8px;"><span style="width:10px; height:10px; border-radius:50%; background:#A855F7;"></span>Dark Luxury</div>
          <div class="theme-option" onclick="changeTheme('matrix')" style="padding:6px 12px; border-radius:6px; cursor:pointer; font-size:.78rem; display:flex; align-items:center; gap:8px;"><span style="width:10px; height:10px; border-radius:50%; background:#10B981;"></span>Obsidian Matrix</div>
          <div class="theme-option" onclick="changeTheme('amber')" style="padding:6px 12px; border-radius:6px; cursor:pointer; font-size:.78rem; display:flex; align-items:center; gap:8px;"><span style="width:10px; height:10px; border-radius:50%; background:#D97706;"></span>Solarized Amber</div>
        </div>
      </div>
      <button class="tb" id="btn-storage" onclick="toggleStorageDrawer()" title="Lokalen Speicher verwalten"><i data-lucide="database"></i><span class="tb-label">Storage</span></button>
      <button class="tb" id="btn-copilot" onclick="toggleCopilot()" title="OMM AI Doc Co-Pilot"><i data-lucide="message-square"></i><span class="tb-label">AI Co-Pilot</span></button>
      <div class="divider-v"></div>
      <div class="zoom-grp">
        <button onclick="zoom(-1)" title="Kleiner">A-</button>
        <button onclick="zoom(0)" title="Normal">A</button>
        <button onclick="zoom(1)" title="Groesser">A+</button>
      </div>
      <div class="divider-v"></div>
      <button class="tb" id="btn-summary" onclick="triggerSummary()" title="Zusammenfassung generieren"><i data-lucide="sparkles"></i><span class="tb-label">Zusammenfassung</span></button>
      <div class="divider-v"></div>
      <button class="tb" id="btn-toc" onclick="toggleToc()" title="Inhaltsverzeichnis (T)"><i data-lucide="list-tree"></i></button>
      <button class="tb" id="btn-slides" onclick="enterSlideMode()" title="Folien-Modus (P)"><i data-lucide="presentation"></i></button>
      <button class="tb" onclick="toggleFullscreen()" title="Vollbild (F)"><i data-lucide="maximize-2"></i></button>
      <div class="divider-v"></div>
      <button class="tb" onclick="copyMd()" title="Markdown kopieren"><i data-lucide="copy"></i></button>
      <button class="tb" onclick="window.print()" title="Drucken / PDF"><i data-lucide="printer"></i></button>
    </div>
  </div>

  <div class="content-area">
    <div id="welcome"></div>
    <div id="reader-wrap" class="hidden">
      <div class="reader-scroll" id="reader-scroll">
        <div class="reader-card">
          <div class="doc-meta" id="doc-meta"></div>
          <div id="faq-widget-container"></div>
          <div class="md" id="md-output"></div>
          <div class="doc-nav" id="doc-nav"></div>
        </div>
      </div>
      <div class="toc-panel" id="toc-panel">
        <div class="toc-head"><i data-lucide="list-tree"></i> Inhalt</div>
        <div class="toc-progress"><div class="toc-progress-fill" id="toc-progress-fill"></div></div>
        <div id="toc-links"></div>
      </div>
    </div>
  </div>
</div>

<!-- Slide Overlay -->
<div id="slide-overlay">
  <div class="slide-toolbar">
    <div style="display:flex; align-items:center; gap:12px;">
      <button class="tb" onclick="exitSlideMode()"><i data-lucide="x"></i> Schliessen</button>
      <button class="tb" id="btn-slide-edit" onclick="toggleSlideEdit()"><i data-lucide="edit-3"></i> Bearbeiten</button>
      <button class="tb" id="btn-slide-presenter" onclick="togglePresenterMode()"><i data-lucide="tv"></i> Referenten-Ansicht</button>
    </div>
    <span class="st-title" id="slide-title"></span>
    <span class="st-pos" id="slide-pos"></span>
  </div>
  <div class="slide-workspace" id="slide-workspace">
    <div class="slide-main-view">
      <div class="slide-area">
        <div class="slide-card"><div class="md" id="slide-content"></div></div>
      </div>
    </div>
    <div class="slide-presenter-panel" id="slide-presenter-panel">
      <!-- Presenter Controls -->
      <div class="pres-timer-widget">
        <div class="pres-widget-title"><i data-lucide="clock"></i> PRÄSENTATIONS-TIMER</div>
        <div class="pres-timer-display" id="pres-timer">00:00:00</div>
        <div class="pres-timer-controls">
          <button onclick="startPresTimer()">Start</button>
          <button onclick="pausePresTimer()">Pause</button>
          <button onclick="resetPresTimer()">Reset</button>
        </div>
      </div>
      <!-- Next Slide Preview -->
      <div class="pres-next-preview">
        <div class="pres-widget-title"><i data-lucide="eye"></i> NÄCHSTE FOLIE</div>
        <div class="pres-next-card" id="pres-next-content">Keine weitere Folie</div>
      </div>
      <!-- Speaker Notes -->
      <div class="pres-notes-widget">
        <div class="pres-widget-title"><i data-lucide="file-text"></i> REFERENTEN-NOTIZEN</div>
        <div class="pres-notes-content" id="pres-notes">Keine Notizen vorhanden.</div>
        <textarea id="pres-notes-editor" class="pres-notes-textarea hidden" placeholder="Notizen für diese Folie eingeben..."></textarea>
        <div class="pres-notes-actions">
          <button id="btn-edit-notes" onclick="toggleEditNotes()"><i data-lucide="edit-2"></i> Notizen bearbeiten</button>
          <button id="btn-save-notes" class="hidden" onclick="saveNotesOverride()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
  <div class="slide-nav">
    <button onclick="slideNav(-1)"><i data-lucide="chevron-left"></i> Zurueck</button>
    <div class="slide-dots" id="slide-dots"></div>
    <button onclick="slideNav(1)">Weiter <i data-lucide="chevron-right"></i></button>
  </div>
</div>

<button id="scroll-top" onclick="scrollToTop()"><i data-lucide="arrow-up"></i></button>

<div class="kbd-hint">
  <span><kbd>&larr;</kbd><kbd>&rarr;</kbd> Dokument</span>
  <span><kbd>/</kbd> Suche</span>
  <span><kbd>S</kbd> Sidebar</span>
  <span><kbd>T</kbd> TOC</span>
  <span><kbd>P</kbd> Folien</span>
  <span><kbd>F</kbd> Vollbild</span>
  <span><kbd>Esc</kbd> Home</span>
</div>

<script>
// ════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════
const DB=__DB_JSON__;
const CAT_META=__CAT_META__;
const DOC_KEYS=Object.keys(DB);
let activeKey=null,zoomLvl=0,tocVisible=true,searchQ='';
let recentKeys=[];
let slides=[],slideIdx=0,slideActive=false;

const SUGGESTED_QUESTIONS = {
  "abschlussbericht": [
    "Was sind die Kern-Ergebnisse der Positionierung?",
    "Wie hoch war der ROAS für den Luminous Aura Launch?",
    "Welche Skalierungs-Szenarien wurden für Mirrou modelliert?"
  ],
  "aos_buch": [
    "Welche 12 Kapitel umfasst das AOS-Buch?",
    "Welche Rolle spielt die 'Brand Soul' im Marketing?",
    "Wie wird das Marketing Mix Framework definiert?"
  ],
  "deep_audit": [
    "Welche GCP-Ressourcen wurden auditiert?",
    "Welche Sicherheitsmängel wurden identifiziert?",
    "Wie sieht die Roadmap für die DNS-Migration aus?"
  ],
  "system_urls": [
    "Welche Repositories und GCP-Projekte gibt es?",
    "Welche DNS-Einträge sind bei IONOS konfiguriert?",
    "Wie ist der HTTPS-Zertifikatsstatus?"
  ],
  "eu_ai_act": [
    "Wie stuft der EU AI Act das Mirrou-System ein?",
    "Welche Pflichten gelten für Hochrisiko-Systeme?",
    "Was ist der Zeitplan für die AI-Act-Compliance?"
  ],
  "team_briefing": [
    "Was sind die Ziele des Team-Briefings?",
    "Welche Kernkompetenzen werden benötigt?",
    "Wie sieht der Onboarding-Zeitplan aus?"
  ],
  "aufgabenverteilung": [
    "Wer übernimmt die Hauptverantwortung für Design?",
    "Wie sind die Support-Rollen verteilt?",
    "Welche GTM-Aufgaben fallen unter die Hauptverantwortung?"
  ],
  "speech_script": [
    "Was sind die Kernbotschaften der Abschlussrede?",
    "Wie wird das Storytelling strukturiert?",
    "Welche Meilensteine werden besonders hervorgehoben?"
  ],
  "playbook_1": [
    "Wie sieht die 6-Wochen-Roadmap aus?",
    "Was sind die Meilensteine für die Transformation?",
    "Welche KPIs werden wöchentlich getrackt?"
  ],
  "playbook_2": [
    "Wer ist das ideale Kundenprofil (ICP)?",
    "Welche Outbound-Strategien werden empfohlen?",
    "Wie sieht die Qualifizierungskette aus?"
  ],
  "playbook_3": [
    "Welche operativen Schritte stehen in den ersten 30 Tagen an?",
    "Wie wird die HubSpot-Integration aufgesetzt?",
    "Welche wöchentlichen Jour Fixes werden benötigt?"
  ],
  "playbook_4": [
    "Wie gewinnen wir den ersten Retainer-Kunden?",
    "Wie sieht das Cold-Outbound-Skript aus?",
    "Welche Einwandbehandlungen werden vorgeschlagen?"
  ],
  "playbook_5": [
    "Wie sind die Service-Pakete kalkuliert?",
    "Was kostet das Pilot-Paket?",
    "Wie sieht die Provisionierung für Partner aus?"
  ],
  "deliv_asset": [
    "Welche Visual-Assets wurden für den Launch produziert?",
    "Wie sind die Bildgrößen spezifiziert?",
    "Welche Stockfoto-Lizenzen wurden genutzt?"
  ],
  "deliv_review": [
    "Welche Kriterien umfasst die Review-Checkliste?",
    "Wer führt die finale Freigabe durch?",
    "Wie läuft der Freigabeprozess ab?"
  ],
  "deliv_prompts": [
    "Wie lauten die Midjourney Prompts für Hero-Visuals?",
    "Welche Parameter werden in Adobe Firefly empfohlen?",
    "Wie wird die Marken-Ästhetik in Prompts übersetzt?"
  ],
  "deliv_video": [
    "Wie lautet das Drehbuch für das Launch-Video?",
    "Welche Musik und Easing-Werte werden verwendet?",
    "Wie lang ist die geplante Laufzeit?"
  ],
  "deliv_layer": [
    "Wie sind die Layout-Spastermengen festgelegt?",
    "Welches Farbsystem wird im Creative Layer definiert?",
    "Welche Schriftkombinationen sind vorgeschrieben?"
  ],
  "deliv_proposal": [
    "Was beinhaltet das Go-To-Market Kampagnen-Proposal?",
    "Wie hoch ist das empfohlene Media-Budget?",
    "Welche Phasen hat die Launch-Kampagne?"
  ],
  "deliv_icp": [
    "Welche demografischen Merkmale hat die Zielgruppe?",
    "Welche Pain Points haben D2C Beauty Brands?",
    "Welche Kauf-Trigger wurden identifiziert?"
  ],
  "deliv_msg": [
    "Welche Ansprachen und Hooks werden empfohlen?",
    "Wie unterscheidet sich die Tonalität je Kanal?",
    "Welche Text-Blueprints gibt es für LinkedIn?"
  ],
  "deliv_brief": [
    "Wie lauten die Anweisungen für das Fotoshooting?",
    "Welche Beleuchtung und Props werden benötigt?",
    "Wie sieht der Zeitplan für das Shooting aus?"
  ],
  "deliv_price": [
    "Wie sind die B2B-Konditionen strukturiert?",
    "Welche Rabattstaffeln gibt es?",
    "Welche Zahlungsbedingungen gelten?"
  ],
  "deliv_growth": [
    "Welche Phasen umfasst das 90-Tage-Launch-Playbook?",
    "Wie wird das organische Wachstum initiiert?",
    "Welche Performance-Kanäle werden genutzt?"
  ],
  "deliv_compliance": [
    "Welche DSGVO-Anforderungen müssen erfüllt sein?",
    "Wie wird das Opt-in verarbeitet?",
    "Welche Vorgaben macht das Compliance Framework?"
  ],
  "deliv_tech": [
    "Wie sieht die Firebase & Cloud Run Architektur aus?",
    "Welche API-Endpunkte sind spezifiziert?",
    "Wie läuft die Daten-Synchronisierung?"
  ],
  "deliv_case1": [
    "Was waren die Erfolge der Luminous Aura Case Study?",
    "Welche Kampagnen-Struktur führte zum Erfolg?",
    "Wie hoch war die Steigerung des ROAS?"
  ],
  "deliv_case2": [
    "Welche Ergebnisse brachte Vitality Pulse?",
    "Wie wurde die Zielgruppenansprache optimiert?",
    "Welche KPIs wurden im Reporting gemessen?"
  ],
  "deliv_partner": [
    "Wie funktioniert das White-Label-Partnerprogramm?",
    "Welche Umsatzbeteiligungen erhalten Partner?",
    "Welche Marketingmaterialien werden bereitgestellt?"
  ],
  "deliv_investor": [
    "Wie ist das Investor Deck aufgebaut?",
    "Wie sieht der Finanzplan für das erste Jahr aus?",
    "Welche GTM-Phasen werden Investoren präsentiert?"
  ],
  "deliv_gtm": [
    "Welche Vertriebskanäle werden vorrangig genutzt?",
    "Wie sieht die Sales Pipeline aus?",
    "Welche Conversion-Raten sind prognostiziert?"
  ],
  "deliv_playbook2": [
    "Wie stufen wir das Growth Playbook ein?",
    "Welche organischen Loops sind eingebaut?",
    "Wie hoch ist das Viralitätsziel?"
  ],
  "deck_aos": [
    "Wie ist das Algorithm of Soul Pitch Deck gegliedert?",
    "Was ist das Alleinstellungsmerkmal (USP) des Projekts?",
    "Welches finanzielle Ziel verfolgt das Pitch Deck?"
  ],
  "deck_grad": [
    "Welchen Inhalt zeigt die Abschlusspräsentation 2026?",
    "Wie wird die Storyline aufgebaut?",
    "Wie sieht das Abschlussfazit aus?"
  ],
  "deck_hand": [
    "Welche Keyfacts enthält das Presenter Handout?",
    "Welche Handlungsanweisungen gibt es?",
    "Wie lautet das finale Prüfungsfazit?"
  ],
  "perp_best": [
    "Welche Best Practices gelten für Perplexity Spaces?",
    "Wie wird the Team-Workflow koordiniert?",
    "Welche Qualitätssicherungs-Schritte gibt es?"
  ],
  "perp_conf": [
    "Wie sieht die Perplexity-Konfiguration aus?",
    "Welche Quellen werden bevorzugt abgefragt?",
    "Wie lauten die vordefinierten System-Prompts?"
  ],
  "onboard": [
    "Wie sieht the Onboarding-Plan für neue Consultants aus?",
    "Welche Tools und Zugänge müssen eingerichtet werden?",
    "Welche Trainingsmodule müssen absolviert werden?"
  ]
};

const DOCUMENT_SUMMARIES = {
  "abschlussbericht": `### 📘 DCI Abschlussbericht — Zusammenfassung
* **Fokus**: Vollständige Dokumentation und Abschlusspräsentation des Mirrou Creative Studio-Projekts.
* **Kernpunkte**:
  - **Markenidentität**: Entwicklung des "Algorithm of Soul" Frameworks.
  - **Technologie**: Umsetzung eines High-End, offline-fähigen Document Hubs sowie Firebase/Cloud Run Deployments.
  - **Ergebnisse**: Signifikante Performance-Steigerung durch harmonisierten B2B/D2C Marketing-Mix.
* **Wichtigstes Takeaway**: Erfolgreiche Orchestrierung aller Brand- und Tech-Säulen des Projekts unter Einhaltung strenger AI-Act-Richtlinien.`,

  "aos_buch": `### 📘 AOS Buch (Komplett) — Zusammenfassung
* **Fokus**: Strategisches Werk über die Synergie von menschlicher Kreativität und Künstlicher Intelligenz im Brand Building.
* **Kernpunkte**:
  - **Kreativ-Philosophie**: Verschmelzung von "Soul" (menschlicher Emotion) und "Algorithm" (technologischer Präzision).
  - **Marketing-Frameworks**: Innovative Ansätze für generative Brand-Assets.
  - **Zukunftsblick**: Ethische Leitlinien und Positionierung im post-generativen Zeitalter.
* **Wichtigstes Takeaway**: Markenführung erfordert die Balance aus KI-gestützter Skalierung und emotionaler Tiefe.`,

  "deep_audit": `### 📘 Deep Audit Report — Zusammenfassung
* **Fokus**: System- und Infrastruktur-Audit der genutzten Google Cloud Platform (GCP) Ressourcen und Git-Repositories.
* **Kernpunkte**:
  - **DNS & Domains**: DNS-Konfiguration bei IONOS (mirrou.de, etc.) und DNS-Migration.
  - **Sicherheit & Berechtigungen**: Rollen-Audit (IAM) für GCP Service Accounts.
  - **Code-Qualität**: Git-Verlaufsanalyse, CI/CD-Pipelines und Code-Reviews.
* **Wichtigstes Takeaway**: Strukturierte Behebung von Sicherheitsmängeln und DNS-Konsolidierung zur Gewehrleistung maximaler Stabilität.`,

  "eu_ai_act": `### 📘 EU AI Act Positionspapier — Zusammenfassung
* **Fokus**: Strategische und operative Einordnung des Mirrou Systems unter die EU-Verordnung 2024/1689.
* **Kernpunkte**:
  - **Risikoklassifizierung**: Einstufung als minimales Risiko; Ausschluss von Hochrisiko-Praktiken.
  - **Compliance-Säulen**: Data Governance, Transparenz (Kennzeichnung generierter Medien) und menschliche Aufsicht.
  - **Praktische Umsetzung**: Standard-Operating-Procedures (SOPs) zur Einhaltung aller EU AI Act Deadlines.
* **Wichtigstes Takeaway**: Proaktive Einhaltung sorgt für Marktvorteile und minimiert regulatorische Risiken im B2B-Vertrieb.`,

  "playbook_5": `### 🚀 Playbook 5: Strategische Preismodellierung — Zusammenfassung
* **Fokus**: Preisgestaltungs- und Paketierungsstruktur für das B2B-Skalierungsmodell von Mirrou.
* **Kernpunkte**:
  - **Preiskalkulation**: Wertbasierte Bepreisung (Value-Based Pricing) anstelle von Stundenabrechnung.
  - **Modelle**: 3 klare Pakete (Standard Pilot, Growth Core, Enterprise Elite).
  - **Musterrechnung**: Detaillierte Darstellung der Umsatzbeteiligung und des ROI-Rechners für Neukunden.
* **Wichtigstes Takeaway**: Ein transparenter, ROI-getriebener Pricing-Ansatz verkürzt den Vertriebszyklus signifikant.`
};

const LOCAL_LUCIDE_ICONS = {
  "activity": "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" />",
  "arrow-left": "<path d=\"m12 19-7-7 7-7\" /> <path d=\"M19 12H5\" />",
  "arrow-right": "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />",
  "arrow-up": "<path d=\"m5 12 7-7 7 7\" /> <path d=\"M12 19V5\" />",
  "award": "<path d=\"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526\" /> <circle cx=\"12\" cy=\"8\" r=\"6\" />",
  "bar-chart-2": "<path d=\"M5 21v-6\" /> <path d=\"M12 21V3\" /> <path d=\"M19 21V9\" />",
  "book": "<path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\" />",
  "book-open": "<path d=\"M12 7v14\" /> <path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "check-circle": "<path d=\"M21.801 10A10 10 0 1 1 17 3.335\" /> <path d=\"m9 11 3 3L22 4\" />",
  "check-square": "<path d=\"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344\" /> <path d=\"m9 11 3 3L22 4\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "chevron-up": "<path d=\"m18 15-6-6-6 6\" />",
  "clipboard-list": "<rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\" /> <path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\" /> <path d=\"M12 11h4\" /> <path d=\"M12 16h4\" /> <path d=\"M8 11h.01\" /> <path d=\"M8 16h.01\" />",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 6v6l4 2\" />",
  "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\" />",
  "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /> <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />",
  "cpu": "<path d=\"M12 20v2\" /> <path d=\"M12 2v2\" /> <path d=\"M17 20v2\" /> <path d=\"M17 2v2\" /> <path d=\"M2 12h2\" /> <path d=\"M2 17h2\" /> <path d=\"M2 7h2\" /> <path d=\"M20 12h2\" /> <path d=\"M20 17h2\" /> <path d=\"M20 7h2\" /> <path d=\"M7 20v2\" /> <path d=\"M7 2v2\" /> <rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" /> <rect x=\"8\" y=\"8\" width=\"8\" height=\"8\" rx=\"1\" />",
  "database": "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /> <path d=\"M3 5V19A9 3 0 0 0 21 19V5\" /> <path d=\"M3 12A9 3 0 0 0 21 12\" />",
  "dollar-sign": "<line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"22\" /> <path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\" />",
  "download": "<path d=\"M12 15V3\" /> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <path d=\"m7 10 5 5 5-5\" />",
  "external-link": "<path d=\"M15 3h6v6\" /> <path d=\"M10 14 21 3\" /> <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />",
  "file-text": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /> <path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />",
  "folder": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" />",
  "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /> <path d=\"M2 12h20\" />",
  "handshake": "<path d=\"m11 17 2 2a1 1 0 1 0 3-3\" /> <path d=\"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4\" /> <path d=\"m21 3 1 11h-2\" /> <path d=\"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3\" /> <path d=\"M3 4h8\" />",
  "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />",
  "home": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
  "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 16v-4\" /> <path d=\"M12 8h.01\" />",
  "landmark": "<path d=\"M10 18v-7\" /> <path d=\"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z\" /> <path d=\"M14 18v-7\" /> <path d=\"M18 18v-7\" /> <path d=\"M3 22h18\" /> <path d=\"M6 18v-7\" />",
  "layers": "<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /> <path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /> <path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />",
  "link": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /> <path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" />",
  "list": "<path d=\"M3 5h.01\" /> <path d=\"M3 12h.01\" /> <path d=\"M3 19h.01\" /> <path d=\"M8 5h13\" /> <path d=\"M8 12h13\" /> <path d=\"M8 19h13\" />",
  "list-tree": "<path d=\"M8 5h13\" /> <path d=\"M13 12h8\" /> <path d=\"M13 19h8\" /> <path d=\"M3 10a2 2 0 0 0 2 2h3\" /> <path d=\"M3 5v12a2 2 0 0 0 2 2h3\" />",
  "map": "<path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\" /> <path d=\"M15 5.764v15\" /> <path d=\"M9 3.236v15\" />",
  "maximize-2": "<path d=\"M15 3h6v6\" /> <path d=\"m21 3-7 7\" /> <path d=\"m3 21 7-7\" /> <path d=\"M9 21H3v-6\" />",
  "message-square": "<path d=\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\" />",
  "mic": "<path d=\"M12 19v3\" /> <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" /> <rect x=\"9\" y=\"2\" width=\"6\" height=\"13\" rx=\"3\" />",
  "palette": "<path d=\"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z\" /> <circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
  "panel-left": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" /> <path d=\"M9 3v18\" />",
  "pie-chart": "<path d=\"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z\" /> <path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\" />",
  "presentation": "<path d=\"M2 3h20\" /> <path d=\"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3\" /> <path d=\"m7 21 5-5 5 5\" />",
  "printer": "<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\" /> <path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\" /> <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\" />",
  "search": "<path d=\"m21 21-4.34-4.34\" /> <circle cx=\"11\" cy=\"11\" r=\"8\" />",
  "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />",
  "settings": "<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" />",
  "sliders": "<path d=\"M10 8h4\" /> <path d=\"M12 21v-9\" /> <path d=\"M12 8V3\" /> <path d=\"M17 16h4\" /> <path d=\"M19 12V3\" /> <path d=\"M19 21v-5\" /> <path d=\"M3 14h4\" /> <path d=\"M5 10V3\" /> <path d=\"M5 21v-7\" />",
  "tag": "<path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\" /> <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
  "target": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <circle cx=\"12\" cy=\"12\" r=\"6\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" />",
  "thumbs-up": "<path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 1 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\" /> <path d=\"M7 10v12\" />",
  "trash-2": "<path d=\"M10 11v6\" /> <path d=\"M14 11v6\" /> <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" /> <path d=\"M3 6h18\" /> <path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" />",
  "trending-up": "<path d=\"M16 7h6v6\" /> <path d=\"m22 7-8.5 8.5-5-5L2 17\" />",
  "tv": "<path d=\"m17 2-5 5-5-5\" /> <rect width=\"20\" height=\"15\" x=\"2\" y=\"7\" rx=\"2\" />",
  "type": "<path d=\"M12 4v16\" /> <path d=\"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2\" /> <path d=\"M9 20h6\" />",
  "upload": "<path d=\"M12 3v12\" /> <path d=\"m17 8-5-5-5 5\" /> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" />",
  "user-plus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> <line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\" /> <line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\" />",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\" /> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" />",
  "video": "<path d=\"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5\" /> <rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\" />",
  "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />",
  "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\" />"
};

function createIcons(){
  // Replace icons locally where possible
  document.querySelectorAll('i[data-lucide]').forEach(el => {
    const name = el.getAttribute('data-lucide');
    const path = LOCAL_LUCIDE_ICONS[name];
    if (path) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', el.getAttribute('width') || '24');
      svg.setAttribute('height', el.getAttribute('height') || '24');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      
      const baseClass = `lucide lucide-${name}`;
      if (el.className) {
        svg.setAttribute('class', `${baseClass} ${el.className}`);
      } else {
        svg.setAttribute('class', baseClass);
      }
      
      if (el.getAttribute('style')) {
        svg.setAttribute('style', el.getAttribute('style'));
      }
      
      svg.innerHTML = path;
      el.replaceWith(svg);
    }
  });

  // Fallback to global lucide if available and any <i> tags remain
  if(document.querySelector('i[data-lucide]') && typeof lucide!=='undefined' && typeof lucide.createIcons==='function'){
    try{lucide.createIcons()}catch(e){console.warn(e)}
  }
}

if(typeof marked!=='undefined'){
  try{marked.setOptions({gfm:true,breaks:true});}catch(e){}
}

// ════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════
function init(){
  const defaultTheme = '__DEFAULT_THEME__';
  const savedTheme = localStorage.getItem('omm-hub-theme') || (defaultTheme.startsWith('__') ? 'dark' : defaultTheme);
  if (savedTheme) {
    changeTheme(savedTheme, false);
  }
  renderStats();
  renderNav();
  renderWelcome();
  initCopilotSearch();
  initLightbox();
  createIcons();
  document.addEventListener('keydown',onKey);
  const rs=document.getElementById('reader-scroll');
  if(rs)rs.addEventListener('scroll',onReaderScroll);
  
  const mdOut=document.getElementById('md-output');
  if(mdOut){
    mdOut.addEventListener('click',e=>{
      const a=e.target.closest('a');
      if(!a)return;
      const href=a.getAttribute('href');
      if(!href)return;
      
      if(href.startsWith('#')){
        const targetEl=document.getElementById(href.substring(1)) || document.querySelector(`#md-output [name="${href.substring(1)}"]`);
        if(targetEl){
          e.preventDefault();
          targetEl.scrollIntoView({behavior:'smooth',block:'start'});
        }
        return;
      }
      
      const decodedHref=decodeURIComponent(href);
      const basename=decodedHref.split('/').pop().split('\\').pop();
      if(basename.endsWith('.md') && !decodedHref.includes('://')){
        const key=Object.keys(DB).find(k=>DB[k].file===basename || (DB[k].file && DB[k].file.endsWith(basename)));
        if(key){
          e.preventDefault();
          openDoc(key);
          toast(`Navigiert zu: ${DB[key].title}`,'link');
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ════════════════════════════════════════════════
// TOAST
// ════════════════════════════════════════════════
function toast(msg,icon='check'){
  const c=document.getElementById('toast-container');
  const t=document.createElement('div');t.className='toast';
  t.innerHTML=`<i data-lucide="${icon}"></i>${msg}`;
  c.appendChild(t);createIcons();
  setTimeout(()=>t.remove(),1200);
}

// ════════════════════════════════════════════════
// STATS
// ════════════════════════════════════════════════
function renderStats(){
  const n=DOC_KEYS.length;
  const w=DOC_KEYS.reduce((s,k)=>s+DB[k].words,0);
  const r=DOC_KEYS.reduce((s,k)=>s+DB[k].readMin,0);
  const cats=new Set(DOC_KEYS.map(k=>DB[k].cat));
  document.getElementById('sb-stats').innerHTML=`
    <div class="stat"><b>${n}</b>Dokumente</div>
    <div class="stat"><b>${Math.round(w/1000)}k</b>Woerter</div>
    <div class="stat"><b>${r}</b>Min.</div>
    <div class="stat"><b>${cats.size}</b>Kategorien</div>`;
}

// ════════════════════════════════════════════════
// SIDEBAR NAV
// ════════════════════════════════════════════════
function renderNav(){
  const nav=document.getElementById('sb-nav');
  const cats={};
  DOC_KEYS.forEach(k=>{const d=DB[k];if(!cats[d.cat])cats[d.cat]=[];cats[d.cat].push(k)});
  nav.innerHTML='';
  for(const cat in cats){
    const keys=cats[cat];
    const g=document.createElement('div');g.className='cat-group';g.id='cg-'+css(cat);
    const meta=CAT_META[cat]||{emoji:'&#128196;',color:'#C9A84C'};
    g.innerHTML=`
      <div class="cat-head" onclick="this.parentElement.classList.toggle('closed')">
        <span class="cat-left"><span class="cat-dot" style="background:${meta.color}"></span>${cat}</span>
        <span class="cat-right"><span class="cat-badge">${keys.length}</span><i data-lucide="chevron-down" class="chev"></i></span>
      </div>
      <div class="cat-items" style="max-height:${keys.length*36}px">
        ${keys.map(k=>`<div class="doc-btn" id="db-${k}" onclick="openDoc('${k}')"><i data-lucide="${DB[k].icon}"></i><span class="doc-label">${DB[k].title}</span></div>`).join('')}
      </div>`;
    nav.appendChild(g);
  }
  createIcons();
}

// ════════════════════════════════════════════════
// RECENT
// ════════════════════════════════════════════════
function addRecent(key){
  recentKeys=recentKeys.filter(k=>k!==key);
  recentKeys.unshift(key);
  if(recentKeys.length>5)recentKeys.length=5;
  renderRecent();
}
function renderRecent(){
  const wrap=document.getElementById('sb-recent');
  const list=document.getElementById('sb-recent-items');
  if(!recentKeys.length){wrap.classList.remove('visible');return}
  wrap.classList.add('visible');
  list.innerHTML=recentKeys.map(k=>DB[k]?`<div class="sb-recent-item" onclick="openDoc('${k}')">${DB[k].title}</div>`:'').join('');
}

// ════════════════════════════════════════════════
// WELCOME
// ════════════════════════════════════════════════
function renderWelcome(){
  const n=DOC_KEYS.length;
  const w=DOC_KEYS.reduce((s,k)=>s+DB[k].words,0);
  const r=DOC_KEYS.reduce((s,k)=>s+DB[k].readMin,0);
  const cats={};
  DOC_KEYS.forEach(k=>{const d=DB[k];if(!cats[d.cat])cats[d.cat]=[];cats[d.cat].push(k)});

  let catCards='';
  for(const cat in cats){
    const meta=CAT_META[cat]||{emoji:'&#128196;',color:'#C9A84C'};
    const keys=cats[cat];
    const docs=keys.slice(0,6).map(k=>`<div class="wc-doc" onclick="event.stopPropagation();openDoc('${k}')"><i data-lucide="${DB[k].icon}"></i><span>${DB[k].title}</span></div>`).join('');
    const more=keys.length>6?`<div class="wc-more">+${keys.length-6} weitere Dokumente</div>`:'';
    const readMin=keys.reduce((s,k)=>s+DB[k].readMin,0);
    catCards+=`
      <div class="wc-card" style="--card-accent:${meta.color}" onclick="openDoc('${keys[0]}')">
        <div class="wc-card-head">
          <div class="wc-card-icon" style="background:${meta.gradient};border-color:${meta.color}30">${meta.emoji}</div>
          <div class="wc-card-meta">
            <div class="wc-name">${cat}</div>
            <div class="wc-count"><span><i data-lucide="file-text"></i>${keys.length} Dok.</span><span><i data-lucide="clock"></i>${readMin} Min.</span></div>
          </div>
        </div>
        <div class="wc-card-body">${docs}${more}</div>
      </div>`;
  }

  document.getElementById('welcome').innerHTML=`
    <div class="welcome-bg"></div>
    <div class="welcome-inner">
      <div class="welcome-hero">
        <div class="w-protocol-badge">OPUS MAGNUM MEDIA v3.0 // IDENTITY PROTOCOL</div>
        <h1><span class="w-mirrou">Mirrou</span> <span class="w-hub">Document Hub</span></h1>
        <p class="w-sub">Zentrale Architektur für sämtliche Berichte, Playbooks, Deliverables und Folien-Decks des Mirrou Creative Studio Abschlussprojekts. Initialisiert, synthetisiert und ausgeliefert von der OPUS MAGNUM MEDIA Engine.</p>
        <div class="w-quick-links">
          <a href="#" id="link-deck" class="w-ql-btn primary" target="_blank">
            <i data-lucide="presentation"></i>
            <span>Präsentations-Deck öffnen</span>
          </a>
          <a href="https://mirrou.studio" class="w-ql-btn" target="_blank">
            <i data-lucide="globe"></i>
            <span>mirrou.studio</span>
          </a>
          <a href="https://github.com/yoyo967/mirrou-creative-studio" class="w-ql-btn" target="_blank">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-right:2px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>GitHub Repository</span>
          </a>
        </div>
        <div class="w-divider"></div>
      </div>
      <div class="welcome-stats">
        <div class="ws-card"><div class="ws-icon"><i data-lucide="file-text"></i></div><div class="ws-num">${n}</div><div class="ws-label">Dokumente</div></div>
        <div class="ws-card"><div class="ws-icon"><i data-lucide="type"></i></div><div class="ws-num">${Math.round(w/1000)}k</div><div class="ws-label">Woerter</div></div>
        <div class="ws-card"><div class="ws-icon"><i data-lucide="clock"></i></div><div class="ws-num">${r}</div><div class="ws-label">Min. Lesezeit</div></div>
        <div class="ws-card"><div class="ws-icon"><i data-lucide="layers"></i></div><div class="ws-num">${Object.keys(cats).length}</div><div class="ws-label">Kategorien</div></div>
      </div>
      <div class="welcome-cats">${catCards}</div>
      
      <!-- OMM Footer Grid -->
      <div class="w-footer-grid">
        <div class="w-footer-col">
          <div class="w-footer-title">OPUS MAGNUM MEDIA</div>
          <div class="w-footer-text">Project OS & System Synthesis Core. Powered by 49 autonomous operator agents in secure EU FastAPI & Firestore infrastructure.</div>
        </div>
        <div class="w-footer-col">
          <div class="w-footer-title">IDENTITY PROTOCOL</div>
          <div class="w-footer-text">Version 3.0.4 [Active Status]. All copywriting and visual assets strictly aligned with corporate design DNA.</div>
        </div>
        <div class="w-footer-col">
          <div class="w-footer-title">SYSTEM PROTOCOL</div>
          <div class="w-footer-text">Security: AES-256. Compliance: EU AI Act Verordnung 2024/1689. Environment: Production Core.</div>
        </div>
      </div>
    </div>`;
  const deckPath = window.location.pathname.includes('00_abschlussbericht') ? '../public/deck.html' : 'deck.html';
  const lDeck = document.getElementById('link-deck');
  if(lDeck)lDeck.href = deckPath;
}

// ════════════════════════════════════════════════
// OPEN DOCUMENT
// ════════════════════════════════════════════════
function openDoc(key){
  if(!DB[key])return;
  activeKey=key;
  const d=DB[key];
  addRecent(key);

  // Views
  document.getElementById('welcome').classList.add('hidden');
  const rw=document.getElementById('reader-wrap');
  rw.classList.remove('hidden');
  requestAnimationFrame(()=>rw.classList.add('visible'));

  // Breadcrumb
  const idx=DOC_KEYS.indexOf(key);
  document.getElementById('bc-cat').textContent=d.cat;
  document.getElementById('bc-title').innerHTML=`${d.title} <span class="bc-pos">${idx+1} / ${DOC_KEYS.length}</span>`;

  // Meta bar
  document.getElementById('doc-meta').innerHTML=`
    <div class="dm-icon-wrap"><i data-lucide="${d.icon}"></i></div>
    <div class="dm-info">
      <div class="dm-title">${d.title}</div>
      <div class="dm-desc">${d.desc}</div>
      <div class="dm-tags">
        <span class="dm-tag dm-cat"><i data-lucide="folder"></i>${d.cat}</span>
        <span class="dm-tag"><i data-lucide="book-open"></i>${d.words.toLocaleString('de-DE')} Woerter</span>
        <span class="dm-tag"><i data-lucide="clock"></i>${d.readMin} Min. Lesezeit</span>
      </div>
    </div>`;

  // Render markdown or embed interactive presentation app
  const isDeck = key === 'deck_aos' || key === 'deck_grad' || key === 'deck_hand';
  if (isDeck) {
    let fileMap = {
      'deck_aos': 'deck.html',
      'deck_grad': 'mirrou_abschlusspraesentation_2026.html',
      'deck_hand': 'presenter-handouts.html'
    };
    let htmlFile = fileMap[key];
    document.getElementById('md-output').innerHTML = `
      <div class="deck-iframe-container" style="position:relative; width:100%; height:75vh; border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; background:#080808;">
        <iframe src="${htmlFile}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
      </div>
      <div style="margin-top:16px; text-align:right;">
        <a href="${htmlFile}" target="_blank" class="tb" style="display:inline-flex; align-items:center; gap:6px; padding:6px 12px; font-size:.78rem; text-decoration:none; border:1px solid var(--border); border-radius:var(--radius); color:var(--text-2);">
          <i data-lucide="external-link"></i> In neuem Fenster öffnen
        </a>
      </div>
    `;
    createIcons();
  } else {
    let html = '';
    if (typeof marked !== 'undefined') {
      html = marked.parse(d.content);
      // Post-process HTML to transform GitHub-style alert blockquotes
      const types = {
        'NOTE': { class: 'note', icon: 'info', title: 'Notiz' },
        'TIP': { class: 'tip', icon: 'zap', title: 'Tipp' },
        'WARNING': { class: 'warning', icon: 'alert-triangle', title: 'Warnung' },
        'IMPORTANT': { class: 'important', icon: 'alert-circle', title: 'Wichtig' },
        'CAUTION': { class: 'caution', icon: 'shield-alert', title: 'Achtung' }
      };
      html = html.replace(/<blockquote>\s*<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*(?:<br\s*\/?>)?([\s\S]*?)<\/blockquote>/gi, (match, type, content) => {
        const t = types[type.toUpperCase()];
        return `<div class="callout callout-${t.class}">
                  <div class="callout-header"><i data-lucide="${t.icon}"></i> ${t.title}</div>
                  <div class="callout-content"><p>${content.trim()}</div>
                </div>`;
      });
    } else {
      html = `
        <div style="background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.2); padding:12px; border-radius:8px; margin-bottom:20px; color:#FCA5A5; font-size:.82rem; font-family:var(--font-mono);">
          [OFFLINE-MODUS] Die Markdown-Bibliothek konnte nicht geladen werden. Dokument wird als Reintext angezeigt.
        </div>
        <div style="white-space: pre-wrap; font-family: var(--font-sans); color: var(--text-2); line-height: 1.6;">${escapeHtml(d.content)}</div>
      `;
    }
    if(searchQ.length>=2)html=highlightAll(html,searchQ);
    document.getElementById('md-output').innerHTML=html;
    addCopyButtons();
  }

  // Render FAQs
  const faqContainer = document.getElementById('faq-widget-container');
  if (faqContainer) {
    const questions = SUGGESTED_QUESTIONS[key];
    if (questions && questions.length > 0) {
      faqContainer.innerHTML = `
        <div class="faq-widget">
          <div class="faq-title"><i data-lucide="help-circle"></i> Häufig gestellte Fragen</div>
          <div class="faq-pills">
            ${questions.map(q => `
              <button class="faq-pill" onclick="askFAQ('${q.replace(/'/g, "\\\\'")}')">
                <span>${q}</span>
                <i data-lucide="chevron-right"></i>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      faqContainer.innerHTML = '';
    }
  }

  // Prev/Next nav
  renderDocNav(idx);

  // Sidebar active
  document.querySelectorAll('.doc-btn').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('db-'+key);
  if(el){el.classList.add('active');el.scrollIntoView({block:'nearest'})}

  // TOC
  buildToc();

  // Reset scroll & progress
  const rs=document.getElementById('reader-scroll');
  if(rs)rs.scrollTop=0;
  document.getElementById('progress-bar').style.width='0';

  createIcons();
}

// ════════════════════════════════════════════════
// PREV / NEXT NAV
// ════════════════════════════════════════════════
function renderDocNav(idx){
  const nav=document.getElementById('doc-nav');
  let html='';
  if(idx>0){
    const p=DB[DOC_KEYS[idx-1]];
    html+=`<div class="doc-nav-btn" onclick="openDoc('${DOC_KEYS[idx-1]}')">
      <div class="dn-label"><i data-lucide="arrow-left"></i> Vorheriges</div>
      <div class="dn-title">${p.title}</div>
    </div>`;
  }else{html+='<div></div>'}
  if(idx<DOC_KEYS.length-1){
    const nx=DB[DOC_KEYS[idx+1]];
    html+=`<div class="doc-nav-btn next" onclick="openDoc('${DOC_KEYS[idx+1]}')">
      <div class="dn-label">Naechstes <i data-lucide="arrow-right"></i></div>
      <div class="dn-title">${nx.title}</div>
    </div>`;
  }
  nav.innerHTML=html;
}

// ════════════════════════════════════════════════
// CODE COPY BUTTONS
// ════════════════════════════════════════════════
function addCopyButtons(){
  document.querySelectorAll('#md-output pre').forEach(pre=>{
    const btn=document.createElement('button');btn.className='copy-btn';
    btn.innerHTML='<i data-lucide="copy"></i>Copy';
    btn.onclick=()=>{
      const code=pre.querySelector('code');
      navigator.clipboard.writeText(code?code.textContent:pre.textContent).then(()=>{
        btn.innerHTML='<i data-lucide="check"></i>Kopiert!';
        setTimeout(()=>{btn.innerHTML='<i data-lucide="copy"></i>Copy';createIcons()},1200);
        createIcons();
      });
    };
    pre.appendChild(btn);
  });
}

// ════════════════════════════════════════════════
// TABLE OF CONTENTS
// ════════════════════════════════════════════════
function buildToc(){
  const panel=document.getElementById('toc-panel');
  const links=document.getElementById('toc-links');
  const headings=document.querySelectorAll('#md-output h1,#md-output h2,#md-output h3');
  if(headings.length<3){panel.classList.remove('visible');return}
  if(tocVisible)panel.classList.add('visible');
  links.innerHTML='';
  headings.forEach((h,i)=>{
    h.id='heading-'+i;
    const depth=parseInt(h.tagName[1]);
    if(depth>3)return;
    const a=document.createElement('a');
    a.className='toc-link'+(depth===3?' depth-3':'');
    a.href='#heading-'+i;
    a.textContent=h.textContent.substring(0,45)+(h.textContent.length>45?'...':'');
    a.onclick=e=>{e.preventDefault();h.scrollIntoView({behavior:'smooth',block:'start'})};
    links.appendChild(a);
  });
}

function toggleToc(){
  const p=document.getElementById('toc-panel');
  const btn=document.getElementById('btn-toc');
  tocVisible=!tocVisible;
  p.classList.toggle('visible',tocVisible);
  btn.classList.toggle('active-tb',tocVisible);
}

// ════════════════════════════════════════════════
// SLIDE MODE
// ════════════════════════════════════════════════
let isEditingSlide = false;

function enterSlideMode(){
  if(!activeKey||!DB[activeKey])return;
  const d=DB[activeKey];
  // Split content by H1/H2 headings into slides
  const parts=d.content.split(/(?=^#{1,2}\s)/m).filter(s=>s.trim());
  if(parts.length<2){toast('Zu wenig Abschnitte fuer Folien','alert-circle');return}
  slides=parts;slideIdx=0;slideActive=true;
  isEditingSlide = false;
  resetSlideEditBtnState();
  document.getElementById('slide-title').textContent=d.title;
  renderSlide();
  document.getElementById('slide-overlay').classList.add('visible');
  createIcons();
}
function exitSlideMode(){
  slideActive=false;
  isEditingSlide = false;
  isPresenterMode = false;
  isEditingNotes = false;
  pausePresTimer();
  const overlay = document.getElementById('slide-overlay');
  if (overlay) overlay.classList.remove('presenter-active');
  const btn = document.getElementById('btn-slide-presenter');
  if (btn) btn.classList.remove('active-tb');
  resetSlideEditBtnState();
  document.getElementById('slide-overlay').classList.remove('visible');
}
function renderSlide(){
  const slideMarkdown = localStorage.getItem('omm-slide-' + activeKey + '-' + slideIdx) || slides[slideIdx];
  const cleanMd = stripSpeakerNotes(slideMarkdown);
  document.getElementById('slide-content').innerHTML=marked.parse(cleanMd);
  document.getElementById('slide-pos').textContent=`${slideIdx+1} / ${slides.length}`;
  // Dots
  const dots=document.getElementById('slide-dots');
  dots.innerHTML=slides.map((_,i)=>`<div class="slide-dot${i===slideIdx?' active':''}" onclick="isEditingSlide=false; isEditingNotes=false; resetSlideEditBtnState(); slideIdx=${i}; renderSlide()"></div>`).join('');
  
  // Update speaker notes display
  const notes = parseSpeakerNotes(slideMarkdown);
  const savedNotes = localStorage.getItem('omm-notes-' + activeKey + '-' + slideIdx);
  const finalNotes = savedNotes !== null ? savedNotes : notes;
  const notesDiv = document.getElementById('pres-notes');
  if (notesDiv) {
    notesDiv.innerHTML = finalNotes ? marked.parse(finalNotes) : '<div style="color:var(--text-3); font-style:italic;">Keine Referenten-Notizen vorhanden.</div>';
  }
  
  // Update preview next
  updateNextSlidePreview();
  
  // Re-animate
  const card=document.querySelector('.slide-card');
  if (card) {
    card.style.animation='none';card.offsetHeight;card.style.animation='slideIn .3s var(--ease-out)';
  }
}
function slideNav(dir){
  isEditingSlide = false;
  isEditingNotes = false;
  resetSlideEditBtnState();
  
  // Reset notes edit UI
  const display = document.getElementById('pres-notes');
  const editor = document.getElementById('pres-notes-editor');
  const btnEdit = document.getElementById('btn-edit-notes');
  const btnSave = document.getElementById('btn-save-notes');
  if (editor) editor.classList.add('hidden');
  if (display) display.classList.remove('hidden');
  if (btnEdit) btnEdit.innerHTML = '<i data-lucide="edit-2"></i> Notizen bearbeiten';
  if (btnSave) btnSave.classList.add('hidden');
  
  slideIdx=Math.max(0,Math.min(slides.length-1,slideIdx+dir));
  renderSlide();
}

function resetSlideEditBtnState() {
  const btn = document.getElementById('btn-slide-edit');
  if (btn) {
    btn.innerHTML = '<i data-lucide="edit-3"></i> Bearbeiten';
    btn.classList.remove('active-tb');
  }
}

function toggleSlideEdit() {
  const card = document.querySelector('.slide-card');
  const btn = document.getElementById('btn-slide-edit');
  if (!card || !btn) return;
  
  isEditingSlide = !isEditingSlide;
  
  if (isEditingSlide) {
    btn.innerHTML = '<i data-lucide="eye"></i> Vorschau';
    btn.classList.add('active-tb');
    
    const currentMarkdown = localStorage.getItem('omm-slide-' + activeKey + '-' + slideIdx) || slides[slideIdx];
    
    document.getElementById('slide-content').innerHTML = `
      <div class="slide-edit-area">
        <div style="font-size:11px; text-transform:uppercase; color:var(--gold); font-family:var(--font-mono); letter-spacing:1px; margin-bottom:-4px;">Folie bearbeiten (Markdown unterstützt)</div>
        <textarea id="slide-editor-input" class="slide-edit-textarea" placeholder="Geben Sie hier den Inhalt für diese Folie ein...">${currentMarkdown}</textarea>
        <div class="slide-edit-actions">
          <button class="tb" onclick="resetSlideOverride()" style="border-color:#EF4444; color:#FCA5A5;">Zurücksetzen</button>
          <button class="tb" onclick="saveSlideOverride()" style="border-color:var(--gold); color:var(--gold-light); background:rgba(168,85,247,0.08); font-weight:600;">Speichern</button>
        </div>
      </div>
    `;
  } else {
    btn.innerHTML = '<i data-lucide="edit-3"></i> Bearbeiten';
    btn.classList.remove('active-tb');
    renderSlide();
  }
  createIcons();
}

function saveSlideOverride() {
  const textarea = document.getElementById('slide-editor-input');
  if (!textarea) return;
  
  const val = textarea.value;
  localStorage.setItem('omm-slide-' + activeKey + '-' + slideIdx, val);
  toast('Folie angepasst & im Speicher gesichert', 'save');
  
  isEditingSlide = false;
  resetSlideEditBtnState();
  renderSlide();
}

function resetSlideOverride() {
  if (confirm('Möchten Sie diese Folie wirklich auf das Original zurücksetzen?')) {
    localStorage.removeItem('omm-slide-' + activeKey + '-' + slideIdx);
    toast('Folie auf Original zurückgesetzt', 'trash-2');
    
    isEditingSlide = false;
    resetSlideEditBtnState();
    renderSlide();
  }
}

// ════════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════════
function onSearch(){
  searchQ=document.getElementById('search').value.trim().toLowerCase();
  const countEl=document.getElementById('search-count');
  const clearEl=document.getElementById('search-clear');
  let matchCount=0;

  DOC_KEYS.forEach(k=>{
    const d=DB[k];const el=document.getElementById('db-'+k);if(!el)return;
    const m=!searchQ||d.title.toLowerCase().includes(searchQ)||d.desc.toLowerCase().includes(searchQ)||d.content.toLowerCase().includes(searchQ);
    el.style.display=m?'flex':'none';
    if(m&&searchQ)matchCount++;
  });
  document.querySelectorAll('.cat-group').forEach(g=>{
    const items=g.querySelectorAll('.doc-btn');
    const vis=[...items].filter(b=>b.style.display!=='none');
    g.style.display=(vis.length||!searchQ)?'':'none';
    if(searchQ&&vis.length)g.classList.remove('closed');
  });

  if(searchQ){
    countEl.textContent=matchCount+' Treffer';
    countEl.classList.add('visible');
    clearEl.classList.add('visible');
  }else{
    countEl.classList.remove('visible');
    clearEl.classList.remove('visible');
  }

  if(activeKey)openDoc(activeKey);
}

function highlightAll(html,q){
  const esc=q.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');
  const re=new RegExp('('+esc+')','gi');
  const tmp=document.createElement('div');tmp.innerHTML=html;
  function walk(n){
    if(n.nodeType===3){
      if(re.test(n.nodeValue)){
        re.lastIndex=0;
        const s=document.createElement('span');
        s.innerHTML=n.nodeValue.replace(re,'<span class="hl">$1</span>');
        n.parentNode.replaceChild(s,n);
      }
    }else if(n.nodeType===1&&!/(style|script|code|pre)/i.test(n.tagName)){
      for(let i=0;i<n.childNodes.length;i++)walk(n.childNodes[i]);
    }
  }
  walk(tmp);return tmp.innerHTML;
}

// ════════════════════════════════════════════════
// SCROLL + PROGRESS
// ════════════════════════════════════════════════
function onReaderScroll(){
  const el=document.getElementById('reader-scroll');
  if(!el)return;
  const pct=el.scrollTop/(el.scrollHeight-el.clientHeight||1)*100;
  const clamped=Math.min(pct,100);
  document.getElementById('progress-bar').style.width=clamped+'%';
  document.getElementById('toc-progress-fill').style.width=clamped+'%';

  const btn=document.getElementById('scroll-top');
  btn.classList.toggle('visible',el.scrollTop>250);

  // TOC tracking
  const headings=document.querySelectorAll('#md-output h1,#md-output h2,#md-output h3');
  const tocLinks=document.querySelectorAll('.toc-link');
  let activeIdx=0;
  headings.forEach((h,i)=>{if(h.getBoundingClientRect().top<130)activeIdx=i});
  tocLinks.forEach((l,i)=>l.classList.toggle('active',i===activeIdx));
}
function scrollToTop(){
  const el=document.getElementById('reader-scroll');
  if(el)el.scrollTo({top:0,behavior:'smooth'});
}

// ════════════════════════════════════════════════
// TOOLBAR
// ════════════════════════════════════════════════
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('collapsed')}
function goHome(){
  activeKey=null;
  document.getElementById('welcome').classList.remove('hidden');
  const rw=document.getElementById('reader-wrap');rw.classList.remove('visible');
  setTimeout(()=>rw.classList.add('hidden'),200);
  document.getElementById('bc-cat').textContent='WILLKOMMEN';
  document.getElementById('bc-title').innerHTML='Document Hub';
  document.getElementById('progress-bar').style.width='0';
  document.querySelectorAll('.doc-btn').forEach(b=>b.classList.remove('active'));
}
function zoom(d){
  const el=document.getElementById('md-output');
  if(d===0)zoomLvl=0;else zoomLvl=Math.max(-2,Math.min(3,zoomLvl+d));
  el.style.fontSize=['.82rem','.88rem','.95rem','1.05rem','1.15rem','1.25rem'][zoomLvl+2];
  toast(`Schriftgroesse: ${['XS','S','M','L','XL','XXL'][zoomLvl+2]}`,'type');
}
function copyMd(){
  if(!activeKey||!DB[activeKey])return;
  navigator.clipboard.writeText(DB[activeKey].content).then(()=>toast('Markdown in Zwischenablage kopiert','clipboard')).catch(()=>toast('Kopieren fehlgeschlagen','alert-circle'));
}
function toggleFullscreen(){
  if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});
  else document.exitFullscreen();
}

// ════════════════════════════════════════════════
// KEYBOARD
// ════════════════════════════════════════════════
function onKey(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;

  // Slide mode keys
  if(slideActive){
    if(e.key==='Escape'){exitSlideMode();e.preventDefault();return}
    if(e.key==='ArrowLeft'){slideNav(-1);e.preventDefault();return}
    if(e.key==='ArrowRight'||e.key===' '){slideNav(1);e.preventDefault();return}
    return;
  }

  if(e.key==='/'){e.preventDefault();document.getElementById('search').focus();return}
  if(e.key==='Escape'){goHome();return}
  if(e.key==='s'||e.key==='S'){toggleSidebar();return}
  if(e.key==='t'||e.key==='T'){toggleToc();return}
  if(e.key==='f'||e.key==='F'){toggleFullscreen();return}
  if(e.key==='p'||e.key==='P'){enterSlideMode();return}

  if(!activeKey)return;
  const idx=DOC_KEYS.indexOf(activeKey);
  if(e.key==='ArrowLeft'&&idx>0){openDoc(DOC_KEYS[idx-1]);e.preventDefault()}
  if(e.key==='ArrowRight'&&idx<DOC_KEYS.length-1){openDoc(DOC_KEYS[idx+1]);e.preventDefault()}
}

// ════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════
function css(s){return s.replace(/[^a-zA-Z0-9]/g,'-')}
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ════════════════════════════════════════════════
// THEME SWITCHER
// ════════════════════════════════════════════════
function toggleThemeMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('theme-menu');
  if (!menu) return;
  const isVisible = menu.style.display === 'block';
  menu.style.display = isVisible ? 'none' : 'block';
  
  if (!isVisible) {
    const closeMenu = (event) => {
      if (!event.target.closest('.theme-select-container')) {
        menu.style.display = 'none';
        document.removeEventListener('click', closeMenu);
      }
    };
    document.addEventListener('click', closeMenu);
  }
}

function changeTheme(theme, showToast = true) {
  document.body.classList.remove('theme-matrix', 'theme-amber');
  if (theme === 'matrix') {
    document.body.classList.add('theme-matrix');
  } else if (theme === 'amber') {
    document.body.classList.add('theme-amber');
  }
  localStorage.setItem('omm-hub-theme', theme);
  if (showToast) {
    const label = theme === 'matrix' ? 'Obsidian Matrix' : theme === 'amber' ? 'Solarized Amber' : 'Dark Luxury';
    toast(`Farbschema: ${label}`, 'palette');
  }
  const menu = document.getElementById('theme-menu');
  if (menu) menu.style.display = 'none';
}

// ════════════════════════════════════════════════
// CO-PILOT
// ════════════════════════════════════════════════
let copilotSearchBlocks = [];

function initCopilotSearch() {
  copilotSearchBlocks = [];
  for (const key of Object.keys(DB)) {
    const doc = DB[key];
    const content = doc.content || '';
    const lines = content.split('\n');
    
    let currentSection = 'Einleitung';
    let currentText = [];
    
    let virtualKeywords = '';
    const titleLower = doc.title.toLowerCase();
    const catLower = doc.cat.toLowerCase();
    
    if (titleLower.includes('case study')) {
      virtualKeywords += ' kpi kpis leistungskennzahlen roas ctr cvr cpa conversion zahlen erfolg metrik metrics case cases luminous vitality aura pulse';
    }
    if (titleLower.includes('abschlussbericht')) {
      virtualKeywords += ' abschlussbericht dci digital career institute bericht';
    }
    if (titleLower.includes('preis') || titleLower.includes('pricing') || titleLower.includes('kosten')) {
      virtualKeywords += ' preis preise kosten tier budget angebot modell paket pricing retainer setup';
    }
    if (titleLower.includes('compliance') || titleLower.includes('ai act') || titleLower.includes('dsgvo') || titleLower.includes('positionspapier') || catLower.includes('compliance')) {
      virtualKeywords += ' compliance eu ai act dsgvo risiko gesetz recht transparent audit verordnung governance';
    }
    if (titleLower.includes('timeline') || titleLower.includes('roadmap') || titleLower.includes('zeitplan') || titleLower.includes('onboarding')) {
      virtualKeywords += ' timeline roadmap zeitplan ablauf onboarding schritte phase';
    }
    if (titleLower.includes('architecture') || titleLower.includes('tech') || titleLower.includes('url') || titleLower.includes('infrastruktur') || titleLower.includes('perplexity')) {
      virtualKeywords += ' omm engine backend database fastapi cloud run agenten architecture firestore tech links dns';
    }
    
    const flushBlock = () => {
      const text = currentText.join('\n').trim();
      if (text && text.length > 20) {
        copilotSearchBlocks.push({
          docKey: key,
          docTitle: doc.title,
          docCat: doc.cat,
          section: currentSection,
          text: text,
          searchText: (text + ' ' + doc.title + ' ' + doc.cat + ' ' + currentSection + ' ' + virtualKeywords).toLowerCase()
        });
      }
      currentText = [];
    };
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('#')) {
        flushBlock();
        currentSection = trimmedLine.replace(/^#+\s+/, '');
      } else if (trimmedLine === '') {
        flushBlock();
      } else {
        currentText.push(line);
      }
    });
    flushBlock();
  }
}

function searchCopilot(query) {
  if (!query) return [];
  
  const stopWords = new Set([
    'der', 'die', 'das', 'und', 'ist', 'in', 'im', 'für', 'von', 'mit', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines', 'einem', 'einen', 'oder',
    'the', 'and', 'is', 'in', 'of', 'to', 'with', 'for', 'a', 'an', 'on', 'at', 'by', 'this', 'that', 'it', 'from', 'as', 'are', 'was', 'were', 'or'
  ]);
  
  const terms = query.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length > 1 && !stopWords.has(t));
    
  if (terms.length === 0) {
    const fallback = query.toLowerCase().split(/\s+/).map(t => t.trim()).filter(t => t.length > 0);
    if (fallback.length > 0) terms.push(...fallback);
  }
  
  const queryLower = query.toLowerCase();
  const results = [];
  
  copilotSearchBlocks.forEach(block => {
    let score = 0;
    const textLower = block.searchText;
    const sectionLower = block.section.toLowerCase();
    const docTitleLower = block.docTitle.toLowerCase();
    const docCatLower = block.docCat.toLowerCase();
    
    let matchedTerms = 0;
    
    terms.forEach(term => {
      const termRegex = new RegExp(term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      const textMatches = (textLower.match(termRegex) || []).length;
      if (textMatches > 0) {
        score += textMatches * 2;
        matchedTerms++;
      }
      
      if (sectionLower.includes(term)) {
        score += 15;
        matchedTerms++;
      }
      
      if (docTitleLower.includes(term)) {
        score += 10;
        matchedTerms++;
      }
      
      if (docCatLower.includes(term)) {
        score += 5;
      }
    });
    
    if (terms.length > 1 && textLower.includes(queryLower)) {
      score += 20;
    }
    
    if (matchedTerms > 1) {
      score += matchedTerms * 4;
    }
    
    if (score > 2) {
      results.push({
        block: block,
        score: score
      });
    }
  });
  
  results.sort((a, b) => b.score - a.score);
  return results;
}

function highlightTerms(html, terms) {
  if (!terms || terms.length === 0) return html;
  let tempEl = document.createElement('div');
  tempEl.innerHTML = html;
  
  const walk = (node) => {
    if (node.nodeType === 3) {
      let text = node.nodeValue;
      let newHtml = text;
      terms.forEach(term => {
        const regex = new RegExp('(' + term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'gi');
        newHtml = newHtml.replace(regex, '<span class="hl">$1</span>');
      });
      if (newHtml !== text) {
        let span = document.createElement('span');
        span.innerHTML = newHtml;
        node.parentNode.replaceChild(span, node);
      }
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(node.nodeName)) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        walk(node.childNodes[i]);
      }
    }
  };
  
  walk(tempEl);
  return tempEl.innerHTML;
}

function jumpToCitation(docKey, sectionTitle, excerptText) {
  openDoc(docKey);
  
  setTimeout(() => {
    const mdOut = document.getElementById('md-output');
    if (!mdOut) return;
    
    let targetEl = null;
    const headings = mdOut.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (const h of headings) {
      if (h.textContent.includes(sectionTitle)) {
        targetEl = h;
        break;
      }
    }
    
    if (!targetEl) {
      const paragraphs = mdOut.querySelectorAll('p, li, tr, pre');
      const excerptSnippet = excerptText.substring(0, 50).trim();
      for (const p of paragraphs) {
        if (p.textContent.includes(excerptSnippet)) {
          targetEl = p;
          break;
        }
      }
    }
    
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.style.transition = 'background-color 0.5s ease';
      targetEl.style.backgroundColor = 'rgba(168, 85, 247, 0.25)';
      targetEl.style.borderRadius = '4px';
      setTimeout(() => {
        targetEl.style.backgroundColor = 'transparent';
      }, 2500);
    }
  }, 200);
}

function toggleCopilot() {
  const drawer = document.getElementById('copilot-drawer');
  const isOpening = !drawer.classList.contains('open');
  
  const stDrawer = document.getElementById('storage-drawer');
  if (stDrawer) stDrawer.classList.remove('open');
  const stBtn = document.getElementById('btn-storage');
  if (stBtn) stBtn.classList.remove('active-tb');
  
  drawer.classList.toggle('open');
  const btn = document.getElementById('btn-copilot');
  if (btn) btn.classList.toggle('active-tb', isOpening);
  
  const msgs = document.getElementById('copilot-messages');
  if (isOpening && msgs.children.length === 0) {
    msgs.innerHTML = `
      <div class="chat-msg ai">
        <p><strong>OMM AI Doc Co-Pilot</strong></p>
        <p>Hallo! Ich bin Ihr OMM AI Doc Co-Pilot. Ich kann Ihnen helfen, die Projektdokumente, KPIs, B2B-Preise und die AI compliance-Architektur zu analysieren.</p>
        <p>Wählen Sie eine Frage oder schreiben Sie mir:</p>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:10px;">
          <button class="tb" onclick="sendCopilotPill('Leistungskennzahlen / KPIs')" style="font-size:10px; padding:3px 6px;">📈 KPIs & Cases</button>
          <button class="tb" onclick="sendCopilotPill('Preismodellierung')" style="font-size:10px; padding:3px 6px;">💳 B2B Pricing</button>
          <button class="tb" onclick="sendCopilotPill('EU AI Act')" style="font-size:10px; padding:3px 6px;">⚖️ Compliance</button>
          <button class="tb" onclick="sendCopilotPill('Onboarding Timeline')" style="font-size:10px; padding:3px 6px;">📅 Zeitplan</button>
        </div>
      </div>
    `;
  }
}

function sendCopilotPill(text) {
  const input = document.getElementById('copilot-input');
  if (input) {
    input.value = text;
    askCopilot();
  }
}

function askCopilot() {
  const input = document.getElementById('copilot-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  
  input.value = '';
  
  const msgs = document.getElementById('copilot-messages');
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = val;
  msgs.appendChild(userMsg);
  
  const typing = document.createElement('div');
  typing.className = 'chat-msg ai';
  typing.id = 'copilot-typing';
  typing.innerHTML = '<span style="font-style:italic; color:var(--text-3);">Co-Pilot analysiert Dokumente...</span>';
  msgs.appendChild(typing);
  
  msgs.scrollTop = msgs.scrollHeight;
  
  setTimeout(() => {
    const typingEl = document.getElementById('copilot-typing');
    if (typingEl) typingEl.remove();
    
    const matches = searchCopilot(val);
    if (matches.length > 0) {
      const introText = "Basierend auf Ihrer Anfrage habe ich relevante Informationen in den Projektdokumenten gefunden:";
      
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-msg ai';
      aiMsg.innerHTML = `<p><strong>OMM AI Co-Pilot</strong></p><span class="stream-text"></span>`;
      msgs.appendChild(aiMsg);
      msgs.scrollTop = msgs.scrollHeight;
      
      const textSpan = aiMsg.querySelector('.stream-text');
      const words = introText.split(' ');
      let wIdx = 0;
      
      function typeWord() {
        if (wIdx < words.length) {
          textSpan.textContent += words[wIdx] + ' ';
          wIdx++;
          msgs.scrollTop = msgs.scrollHeight;
          setTimeout(typeWord, 20);
        } else {
          let mIdx = 0;
          const stopWords = new Set([
            'der', 'die', 'das', 'und', 'ist', 'in', 'im', 'für', 'von', 'mit', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines', 'einem', 'einen', 'oder'
          ]);
          const terms = val.toLowerCase().split(/\s+/).map(t => t.trim()).filter(t => t.length > 1 && !stopWords.has(t));
          
          function nextMatch() {
            if (mIdx < Math.min(matches.length, 3)) {
              const item = matches[mIdx];
              const block = item.block;
              
              const matchContainer = document.createElement('div');
              matchContainer.style.opacity = '0';
              matchContainer.style.transform = 'translateY(10px)';
              matchContainer.style.transition = 'all 0.4s var(--ease-out)';
              matchContainer.style.marginTop = '12px';
              
              let mdHtml = '';
              if (typeof marked !== 'undefined') {
                mdHtml = marked.parse(block.text);
              } else {
                mdHtml = `<p>${block.text}</p>`;
              }
              
              const highlightedHtml = highlightTerms(mdHtml, terms);
              
              matchContainer.innerHTML = `
                <div style="font-size: 0.65rem; color: var(--gold); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 1px; display:flex; justify-content:space-between; margin-bottom:4px;">
                  <span>📍 ${block.docTitle} &rsaquo; ${block.section}</span>
                  <span style="opacity:0.6;">Score: ${item.score}</span>
                </div>
                <div class="callout callout-important" style="margin: 0; padding: 12px 16px;">
                  <div class="callout-content" style="font-size: 0.82rem; color: var(--text-2);">
                    ${highlightedHtml}
                  </div>
                </div>
              `;
              
              aiMsg.appendChild(matchContainer);
              
              setTimeout(() => {
                matchContainer.style.opacity = '1';
                matchContainer.style.transform = 'translateY(0)';
                msgs.scrollTop = msgs.scrollHeight;
              }, 50);
              
              mIdx++;
              setTimeout(nextMatch, 300);
            } else {
              const citContainer = document.createElement('div');
              citContainer.style.opacity = '0';
              citContainer.style.transform = 'translateY(10px)';
              citContainer.style.transition = 'all 0.4s var(--ease-out)';
              citContainer.style.marginTop = '16px';
              citContainer.style.borderTop = '1px solid var(--border)';
              citContainer.style.paddingTop = '10px';
              
              let listHtml = '';
              const seenDocs = new Set();
              
              matches.slice(0, 3).forEach(item => {
                const block = item.block;
                const key = `${block.docKey}-${block.section}`;
                if (seenDocs.has(key)) return;
                seenDocs.add(key);
                
                const escapedText = block.text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                listHtml += `
                  <div onclick="jumpToCitation('${block.docKey}', '${block.section.replace(/'/g, "\\'")}', '${escapedText.substring(0, 80)}')" 
                       style="font-size: 0.72rem; color: var(--gold-light); cursor: pointer; padding: 6px 10px; border-radius: 6px; background: rgba(168,85,247,0.03); border: 1px solid var(--border); margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s;"
                       onmouseover="this.style.borderColor='var(--gold)'; this.style.background='rgba(168,85,247,0.08)'"
                       onmouseout="this.style.borderColor='var(--border)'; this.style.background='rgba(168,85,247,0.03)'">
                    <span>📘 <strong>${block.docTitle}</strong> &mdash; ${block.section}</span>
                    <i data-lucide="external-link" style="width:11px; height:11px; opacity:0.6;"></i>
                  </div>
                `;
              });
              
              citContainer.innerHTML = `
                <div style="font-size: 0.65rem; color: var(--text-3); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px; font-weight: 700;">Zitate & Verweise:</div>
                ${listHtml}
              `;
              
              aiMsg.appendChild(citContainer);
              
              setTimeout(() => {
                citContainer.style.opacity = '1';
                citContainer.style.transform = 'translateY(0)';
                createIcons();
                msgs.scrollTop = msgs.scrollHeight;
              }, 50);
            }
          }
          nextMatch();
        }
      }
      typeWord();
      
    } else {
      const textReply = `<p>Ich konnte in den Projektdokumenten keine direkte Antwort auf Ihre Frage finden.</p>
                         <p>Fragen Sie mich gerne nach:</p>
                         <ul>
                           <li><strong>Performance KPIs</strong> (ROAS, CTR, CPA)</li>
                           <li><strong>B2B Pricing</strong> (Paketstrukturen, Setup-Kosten)</li>
                           <li><strong>Compliance</strong> (EU AI Act, DSGVO)</li>
                           <li><strong>Timeline</strong> (25-Tage Client Onboarding)</li>
                           <li><strong>Tech Stack</strong> (FastAPI, Cloud Run, WIF)</li>
                         </ul>`;
      
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-msg ai';
      aiMsg.innerHTML = `<p><strong>OMM AI Co-Pilot</strong></p>`+textReply;
      msgs.appendChild(aiMsg);
      msgs.scrollTop = msgs.scrollHeight;
      createIcons();
    }
  }, 600);
}


function toggleStorageDrawer() {
  const drawer = document.getElementById('storage-drawer');
  const isOpening = !drawer.classList.contains('open');
  
  const cpDrawer = document.getElementById('copilot-drawer');
  if (cpDrawer) cpDrawer.classList.remove('open');
  const cpBtn = document.getElementById('btn-copilot');
  if (cpBtn) cpBtn.classList.remove('active-tb');
  
  drawer.classList.toggle('open');
  const btn = document.getElementById('btn-storage');
  if (btn) btn.classList.toggle('active-tb', isOpening);
  
  if (isOpening) {
    refreshStorageList();
  }
}

function refreshStorageList() {
  const list = document.getElementById('storage-list');
  if (!list) return;
  list.innerHTML = '';
  
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('omm-')) {
      count++;
      const val = localStorage.getItem(key);
      const isBase64 = val.startsWith('data:image');
      const displayVal = isBase64 ? '[Bild-Daten (Base64)]' : val.substring(0, 40) + (val.length > 40 ? '...' : '');
      
      const item = document.createElement('div');
      item.className = 'storage-item';
      item.innerHTML = `
        <div class="storage-item-header">
          <strong>${key}</strong>
          <button class="tb" onclick="deleteOverride('${key}')" style="padding:2px 5px; border-color:#EF4444; color:#FCA5A5; font-size:9px; cursor:pointer;"><i data-lucide="trash-2" style="width:10px; height:10px;"></i></button>
        </div>
        <div class="storage-item-val">${escapeHtml(displayVal)}</div>
      `;
      list.appendChild(item);
    }
  }
  
  if (count === 0) {
    list.innerHTML = '<div style="color:var(--text-3); font-style:italic; font-size:11px;">Keine Anpassungen im Speicher vorhanden.</div>';
  }
  createIcons();
}

function deleteOverride(key) {
  localStorage.removeItem(key);
  toast(`Gelöscht: ${key}`, 'trash-2');
  refreshStorageList();
}

function clearOverrides() {
  if (confirm('Möchten Sie wirklich alle lokalen Overrides löschen? Dies setzt alle angepassten Folien-Texte und Bilder zurück.')) {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('omm-')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    toast('Alle Overrides gelöscht', 'trash-2');
    refreshStorageList();
  }
}

function exportOverrides() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('omm-')) {
      data[key] = localStorage.getItem(key);
    }
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mirrou_slide_overrides.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('Overrides exportiert', 'download');
}

function triggerImport() {
  const input = document.getElementById('import-file');
  if (input) input.click();
}

function importOverrides(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const r = new FileReader();
  r.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      let count = 0;
      for (const k in data) {
        if (k.startsWith('omm-')) {
          localStorage.setItem(k, data[k]);
          count++;
        }
      }
      toast(`${count} Overrides importiert`, 'upload');
      refreshStorageList();
    } catch(err) {
      toast('Fehler beim Importieren der Datei', 'alert-circle');
    }
  };
  r.readAsText(file);
  e.target.value = '';
}

// ════════════════════════════════════════════════
// HQ ANALYTICS DASHBOARD
// ════════════════════════════════════════════════
function openAnalytics(){
  activeKey='analytics';
  document.getElementById('welcome').classList.add('hidden');
  const rw=document.getElementById('reader-wrap');
  rw.classList.remove('hidden');
  
  document.getElementById('bc-cat').textContent='SYSTEM STATUS';
  document.getElementById('bc-title').innerHTML='HQ Analytics Dashboard <span class="bc-pos">Live</span>';
  
  document.getElementById('doc-meta').innerHTML=`
    <div class="dm-icon-wrap"><i data-lucide="bar-chart-2" style="color:var(--gold);"></i></div>
    <div class="dm-info">
      <div class="dm-title">HQ Analytics Dashboard</div>
      <div class="dm-desc">Echtzeit-Statistiken, Systemkonfigurationen und Asset-Metriken.</div>
      <div class="dm-tags">
        <span class="dm-tag dm-cat"><i data-lucide="activity"></i>Status: Active</span>
        <span class="dm-tag"><i data-lucide="cpu"></i>OMM Engine v3.0</span>
      </div>
    </div>`;
    
  const n=DOC_KEYS.length;
  const w=DOC_KEYS.reduce((s,k)=>s+DB[k].words,0);
  const r=DOC_KEYS.reduce((s,k)=>s+DB[k].readMin,0);
  
  document.getElementById('md-output').innerHTML=`
    <div class="analytics-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:32px;">
      <div class="ws-card" style="text-align:left; padding:20px;">
        <div style="font-size:11px; text-transform:uppercase; color:var(--text-3); letter-spacing:1px;">Gesamtwortschatz</div>
        <div style="font-family:var(--font-serif); font-size:2rem; font-weight:700; color:var(--gold); margin:8px 0;">\${w.toLocaleString('de-DE')}</div>
        <div style="font-size:11px; color:var(--text-2);">Wörter über alle Berichte hinweg</div>
      </div>
      <div class="ws-card" style="text-align:left; padding:20px;">
        <div style="font-size:11px; text-transform:uppercase; color:var(--text-3); letter-spacing:1px;">Lesezeit gesamt</div>
        <div style="font-family:var(--font-serif); font-size:2rem; font-weight:700; color:var(--accent-blue); margin:8px 0;">\${r} Minuten</div>
        <div style="font-size:11px; color:var(--text-2);">~\${(r/60).toFixed(1)} Stunden Lesezeit</div>
      </div>
      <div class="ws-card" style="text-align:left; padding:20px;">
        <div style="font-size:11px; text-transform:uppercase; color:var(--text-3); letter-spacing:1px;">Infrastruktur-Status</div>
        <div style="font-family:var(--font-serif); font-size:2rem; font-weight:700; color:var(--accent-green); margin:8px 0; display:flex; align-items:center; gap:8px;"><span style="width:12px; height:12px; border-radius:50%; background:var(--accent-green); display:inline-block; animation: pulse 2s infinite;"></span> Operational</div>
        <div style="font-size:11px; color:var(--text-2);">49 Agents on GCP Cloud Run</div>
      </div>
    </div>
    
    <style>
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
      70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    </style>

    <div class="analytics-tools" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:32px;">
      
      <!-- Mandanten-Hub Cloner Card -->
      <div class="ws-card" style="text-align:left; padding:20px; display:flex; flex-direction:column; justify-content:space-between; border-color:var(--gold-dim);">
        <div>
          <h3 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--gold-light); margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            <i data-lucide="copy"></i> Mandanten-Hub Cloner
          </h3>
          <p style="font-size:11px; color:var(--text-2); margin-bottom:16px; line-height:1.4;">
            Erstellen und exportieren Sie ein vollständig maßgeschneidertes, eigenständiges Client-Dashboard mit angepassten Branding-Parametern und Styling.
          </p>
          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
              <label style="font-size:9px; font-family:var(--font-mono); text-transform:uppercase; color:var(--text-3);">Mandanten-Name</label>
              <input type="text" id="clone-client-name" value="Acme Corp" placeholder="z.B. Acme Corp" style="background:var(--bg); border:1px solid var(--border); border-radius:var(--radius); padding:8px; color:var(--text); font-size:11px; outline:none;" onfocus="this.select()">
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              <label style="font-size:9px; font-family:var(--font-mono); text-transform:uppercase; color:var(--text-3);">Paket-Kategorie & Design</label>
              <select id="clone-package-type" style="background:var(--bg); border:1px solid var(--border); border-radius:var(--radius); padding:8px; color:var(--text); font-size:11px; outline:none; font-family:var(--font-sans);">
                <option value="Standard Pilot">Standard Pilot (Solarized Amber Theme)</option>
                <option value="Growth Core" selected>Growth Core (Obsidian Matrix Theme)</option>
                <option value="Enterprise Elite">Enterprise Elite (Dark Luxury Theme)</option>
              </select>
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              <label style="font-size:9px; font-family:var(--font-mono); text-transform:uppercase; color:var(--text-3);">Branding Akzentfarbe (Live)</label>
              <div style="display:flex; gap:6px; align-items:center;">
                <select id="clone-brand-color" onchange="updateLiveBrandColor()" style="flex:1; background:var(--bg); border:1px solid var(--border); border-radius:var(--radius); padding:8px; color:var(--text); font-size:11px; outline:none; font-family:var(--font-sans);">
                  <option value="purple" selected>Purple Royalty (Default)</option>
                  <option value="matrix">Obsidian Matrix (Green)</option>
                  <option value="amber">Solarized Amber (Gold)</option>
                  <option value="blue">Electric Strategy (Blue)</option>
                  <option value="rose">Velvet Rose (Pink)</option>
                  <option value="custom">Custom Color...</option>
                </select>
                <input type="color" id="clone-custom-color" value="#A855F7" style="width:28px; height:28px; border:1px solid var(--border); border-radius:6px; background:none; padding:0; cursor:pointer; display:none;" onchange="updateCustomColorLive(this.value)">
              </div>
            </div>
          </div>
        </div>
        <button class="tb" onclick="exportClientHub()" style="width:100%; justify-content:center; padding:10px; border-color:var(--gold); color:var(--gold-light); background:rgba(168,85,247,0.08); font-weight:600;">
          <i data-lucide="download"></i> Mandanten-Hub exportieren
        </button>
      </div>

      <!-- Report Compiler Card -->
      <div class="ws-card" style="text-align:left; padding:20px; display:flex; flex-direction:column; justify-content:space-between; border-color:rgba(59,130,246,0.3);">
        <div>
          <h3 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--accent-blue); margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            <i data-lucide="file-text"></i> PDF Report Compiler
          </h3>
          <p style="font-size:11px; color:var(--text-2); margin-bottom:12px; line-height:1.4;">
            Wählen Sie Dokumente aus, um sie in ein pagination-optimiertes, druckfertiges PDF-Dossier inklusive Deckblatt zu kompilieren.
          </p>
          <div style="display:flex; gap:8px; margin-bottom:10px;">
            <button class="tb" onclick="selectAllReportDocs(true)" style="font-size:9px; padding:3px 6px;">Alle auswählen</button>
            <button class="tb" onclick="selectAllReportDocs(false)" style="font-size:9px; padding:3px 6px;">Keine auswählen</button>
          </div>
          <div style="max-height:120px; overflow-y:auto; border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--surface-2); display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
            ${DOC_KEYS.map(k => {
              const d = DB[k];
              return '<label style="display:flex; align-items:center; gap:8px; font-size:10.5px; color:var(--text-2); cursor:pointer;">' +
                     '<input type="checkbox" class="report-checkbox" value="' + k + '" checked style="accent-color:var(--gold);">' +
                     '<span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="' + d.title + '">' + d.title + '</span>' +
                     '</label>';
            }).join('')}
          </div>
        </div>
        <button class="tb" onclick="compileReport()" style="width:100%; justify-content:center; padding:10px; border-color:var(--accent-blue); color:var(--text); background:rgba(59,130,246,0.12); font-weight:600;">
          <i data-lucide="printer"></i> PDF-Dossier kompilieren & drucken
        </button>
      </div>

    </div>
    
    <h2 style="font-family:var(--font-serif); font-size:1.4rem; color:var(--gold-light); margin-bottom:16px; border-bottom:1px solid var(--border); padding-bottom:8px; margin-top:24px;">Dokument-Metriken im Detail</h2>
    <table style="width:100%; border-collapse:collapse; margin-bottom:32px;">
      <thead>
        <tr>
          <th>Dokument</th>
          <th>Kategorie</th>
          <th>Wörter</th>
          <th>Lesezeit</th>
          <th>Dateiname</th>
        </tr>
      </thead>
      <tbody>
        ${DOC_KEYS.map(k => {
          const d = DB[k];
          return '<tr style="cursor:pointer;" onclick="openDoc(\'' + k + '\')">' +
                 '<td style="font-weight:600; color:var(--text);">' + d.title + '</td>' +
                 '<td style="color:var(--text-2);">' + d.cat + '</td>' +
                 '<td style="font-family:var(--font-mono);">' + d.words.toLocaleString('de-DE') + '</td>' +
                 '<td style="font-family:var(--font-mono);">' + d.readMin + ' Min</td>' +
                 '<td style="font-family:var(--font-mono); font-size:10px; color:var(--text-3);">' + d.file + '</td>' +
                 '</tr>';
        }).join('')}
      </tbody>
    </table>
    
    <h2 style="font-family:var(--font-serif); font-size:1.4rem; color:var(--gold-light); margin-bottom:16px; border-bottom:1px solid var(--border); padding-bottom:8px;">System-Konfiguration</h2>
    <div style="background:var(--surface-2); border:1px solid var(--border); border-radius:var(--radius); padding:16px; font-family:var(--font-mono); font-size:11px; color:var(--text-2); line-height:1.6; display:flex; flex-direction:column; gap:8px;">
      <div><strong>Engine Version:</strong> OPUS MAGNUM MEDIA v3.0.4</div>
      <div><strong>Base URL:</strong> <a href="https://mirrou.studio" target="_blank" style="color:var(--gold);">https://mirrou.studio</a></div>
      <div><strong>GCP Project ID:</strong> mirrou-creative-studio-180023265254</div>
      <div><strong>Deployment Region:</strong> europe-west3 (Frankfurt)</div>
      <div><strong>DNS Registry:</strong> IONOS Nameserver Active</div>
      <div><strong>Compliance Status:</strong> Art. 52 EU AI Act Konform (Low Risk AI Profile)</div>
    </div>
  `;
  
  document.getElementById('toc-panel').classList.remove('visible');
  document.getElementById('doc-nav').innerHTML='';
  
  document.querySelectorAll('.doc-btn').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('db-analytics');
  if(el)el.classList.add('active');
  
  createIcons();
}

// ════════════════════════════════════════════════
// ENTERPRISE COMPILER & CLONER TOOLS
// ════════════════════════════════════════════════
function selectAllReportDocs(checked) {
  document.querySelectorAll('.report-checkbox').forEach(cb => {
    cb.checked = checked;
  });
}

function exportClientHub() {
  const clientName = document.getElementById('clone-client-name').value.trim();
  const packageType = document.getElementById('clone-package-type').value;
  
  if (!clientName) {
    toast('Bitte geben Sie einen Mandanten-Namen ein', 'alert-circle');
    return;
  }
  
  // Clean the DOM programmatically to remove administrative elements
  const parser = new DOMParser();
  const cloneDoc = parser.parseFromString(document.documentElement.outerHTML, 'text/html');
  
  // Remove admin sidebar button wrapper
  const sbFooter = cloneDoc.querySelector('.sb-footer');
  if (sbFooter) sbFooter.remove();
  
  // Remove storage inspector button from toolbar
  const btnStorage = cloneDoc.querySelector('#btn-storage');
  if (btnStorage) btnStorage.remove();
  
  // Remove storage overrides drawer
  const storageDrawer = cloneDoc.querySelector('#storage-drawer');
  if (storageDrawer) storageDrawer.remove();
  
  // Reset active drawer states if open
  const drawers = cloneDoc.querySelectorAll('.copilot-drawer');
  drawers.forEach(d => d.classList.remove('open'));
  
  const activeTbs = cloneDoc.querySelectorAll('.active-tb');
  activeTbs.forEach(b => b.classList.remove('active-tb'));
  
  // Clear any existing toasts
  const toastContainer = cloneDoc.querySelector('#toast-container');
  if (toastContainer) toastContainer.innerHTML = '';
  
  // Reset views
  const welcome = cloneDoc.querySelector('#welcome');
  if (welcome) {
    welcome.classList.remove('hidden');
    welcome.style.display = '';
  }
  const readerWrap = cloneDoc.querySelector('#reader-wrap');
  if (readerWrap) {
    readerWrap.classList.add('hidden');
    readerWrap.classList.remove('visible');
    readerWrap.style.opacity = '0';
  }
  
  let htmlContent = cloneDoc.documentElement.outerHTML;
  
  let defaultTheme = 'dark';
  if (packageType === 'Standard Pilot') defaultTheme = 'amber';
  else if (packageType === 'Growth Core') defaultTheme = 'matrix';
  
  // Custom brand color injection
  const brandColorSelect = document.getElementById('clone-brand-color').value;
  let customStyleTag = '';
  if (brandColorSelect === 'blue') {
    customStyleTag = `<style>:root{--gold:#3B82F6;--gold-light:#60A5FA;--gold-dim:rgba(59,130,246,0.30);--gold-glow:rgba(59,130,246,0.07);--border-active:#3B82F6;}</style>`;
  } else if (brandColorSelect === 'rose') {
    customStyleTag = `<style>:root{--gold:#EC4899;--gold-light:#F472B6;--gold-dim:rgba(236,72,153,0.30);--gold-glow:rgba(236,72,153,0.07);--border-active:#EC4899;}</style>`;
  } else if (brandColorSelect === 'custom') {
    const hex = document.getElementById('clone-custom-color').value;
    const hexLight = lightenColor(hex, 30);
    const glow = hexToRgba(hex, 0.07);
    const dim = hexToRgba(hex, 0.30);
    customStyleTag = `<style>:root{--gold:${hex};--gold-light:${hexLight};--gold-dim:${dim};--gold-glow:${glow};--border-active:${hex};}</style>`;
  }
  
  if (customStyleTag) {
    htmlContent = htmlContent.replace('</head>', `${customStyleTag}\n</head>`);
  }
  
  // Replace names and default theme
  htmlContent = htmlContent.replaceAll('Mirrou Hub', clientName + ' Hub');
  htmlContent = htmlContent.replaceAll('Mirrou Creative Studio', clientName + ' Creative Studio');
  htmlContent = htmlContent.replaceAll('Mirrou', clientName);
  htmlContent = htmlContent.replace("const defaultTheme = '__DEFAULT_THEME__';", `const defaultTheme = '${defaultTheme}';`);
  
  const fullHtml = '<!DOCTYPE html>\n' + htmlContent;
  
  const blob = new Blob([fullHtml], {type: 'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${clientName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_document_hub.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast(`Mandanten-Hub für ${clientName} exportiert`, 'download');
}

function compileReport() {
  const selectedKeys = [];
  document.querySelectorAll('.report-checkbox:checked').forEach(cb => {
    selectedKeys.push(cb.value);
  });
  
  if (selectedKeys.length === 0) {
    toast('Bitte wählen Sie mindestens ein Dokument aus', 'alert-circle');
    return;
  }
  
  const pWin = window.open('', '_blank');
  if (!pWin) {
    toast('Popup-Blocker verhindert das Öffnen des Compilers', 'alert-circle');
    return;
  }
  
  const docsData = selectedKeys.map(k => ({
    key: k,
    title: DB[k].title,
    cat: DB[k].cat,
    content: DB[k].content
  }));
  
  const docsDataJson = JSON.stringify(docsData);
  
  const compilerHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>OPUS MAGNUM MEDIA — Interactive Dossier Compiler</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:wght@300..700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
  <style>
    :root {
      --primary: #A855F7;
      --primary-light: #D8B4FE;
      --bg: #0c0c0e;
      --surface: #121215;
      --border: rgba(255,255,255,0.08);
      --text: #F5F5F5;
      --text-muted: #9a9aa3;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      color: var(--text);
      background: #18181b;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .compiler-sidebar {
      width: 340px;
      background: var(--bg);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      height: 100%;
      flex-shrink: 0;
      padding: 24px;
      overflow-y: auto;
    }
    .sidebar-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--primary-light);
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    .sidebar-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      letter-spacing: 1.5px;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .control-group {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .control-label {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      color: var(--text-muted);
      letter-spacing: 1px;
    }
    select, input[type="text"] {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 10px;
      color: var(--text);
      font-size: 12px;
      outline: none;
      transition: border-color 0.2s;
    }
    select:focus, input[type="text"]:focus {
      border-color: var(--primary);
    }
    .doc-list {
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--surface);
      max-height: 220px;
      overflow-y: auto;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .doc-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 11px;
    }
    .doc-item-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 160px;
      cursor: pointer;
    }
    .doc-item-actions {
      display: flex;
      gap: 4px;
    }
    .action-btn {
      background: none;
      border: 1px solid var(--border);
      color: var(--text-muted);
      border-radius: 4px;
      padding: 2px 6px;
      cursor: pointer;
      font-size: 10px;
      transition: all 0.15s;
    }
    .action-btn:hover {
      border-color: var(--primary);
      color: var(--primary-light);
    }
    .btn-compile {
      width: 100%;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 12px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.2s;
    }
    .btn-compile:hover {
      background: #9333ea;
    }
    
    /* Preview Area */
    .preview-canvas {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #18181b;
    }
    .preview-title-bar {
      width: 100%;
      max-width: 210mm;
      margin: 0 auto 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }
    .page-preview {
      background: #ffffff;
      color: #111111;
      width: 210mm;
      min-height: 297mm;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      margin-bottom: 40px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: padding 0.2s;
      page-break-after: always;
    }
    
    /* Cover Styles */
    .cover-luxury {
      background: #030303 !important;
      color: #ffffff !important;
      border: 20px solid #030303;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2in !important;
    }
    .cover-luxury::before {
      content: '';
      position: absolute;
      inset: 20px;
      border: 1px solid rgba(168, 85, 247, 0.3);
      pointer-events: none;
    }
    .cover-luxury .cover-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 38pt;
      font-weight: 300;
      color: #ffffff;
      line-height: 1.1;
    }
    .cover-luxury .cover-subtitle {
      font-size: 13pt;
      color: #94a3b8;
    }
    .cover-luxury .cover-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      letter-spacing: 3px;
      color: var(--primary);
    }
    
    .cover-minimal {
      background: #ffffff !important;
      color: #111111 !important;
      border: 1px solid #111;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2in !important;
    }
    .cover-minimal .cover-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36pt;
      font-weight: 700;
      color: #111111;
      line-height: 1.1;
      border-bottom: 4px solid #111111;
      padding-bottom: 20px;
    }
    .cover-minimal .cover-subtitle {
      font-size: 12pt;
      color: #475569;
    }
    .cover-minimal .cover-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      letter-spacing: 2px;
      color: #111111;
    }
    
    .cover-blue {
      background: #0f172a !important;
      color: #ffffff !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2in !important;
      border-left: 24px solid #3b82f6;
    }
    .cover-blue .cover-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 40pt;
      font-weight: 400;
      color: #ffffff;
      line-height: 1.1;
    }
    .cover-blue .cover-subtitle {
      font-size: 13pt;
      color: #94a3b8;
    }
    .cover-blue .cover-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      letter-spacing: 3px;
      color: #3b82f6;
    }
    
    /* Markdown formatting in print preview */
    .pdf-content {
      font-size: 11pt;
      line-height: 1.6;
      color: #111111;
    }
    .pdf-content h1, .pdf-content h2, .pdf-content h3, .pdf-content h4 {
      font-family: 'Cormorant Garamond', serif;
      color: #000000;
      margin-top: 24px;
      margin-bottom: 8px;
    }
    .pdf-content h1 { font-size: 20pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; }
    .pdf-content h2 { font-size: 16pt; margin-top: 28px; }
    .pdf-content h3 { font-size: 13pt; }
    .pdf-content p { margin-bottom: 12px; text-align: justify; }
    .pdf-content ul, .pdf-content ol { margin-bottom: 15px; padding-left: 20px; }
    .pdf-content li { margin-bottom: 4px; }
    .pdf-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }
    .pdf-content th, .pdf-content td {
      border: 1px solid #cbd5e1;
      padding: 8px 12px;
      text-align: left;
    }
    .pdf-content th { background: #f1f5f9; font-weight: 700; }
    
    .pdf-content blockquote {
      border-left: 3px solid var(--primary);
      background: #f8fafc;
      padding: 10px 15px;
      margin: 15px 0;
      font-style: italic;
    }
    .pdf-content code {
      font-family: 'JetBrains Mono', monospace;
      background: #f1f5f9;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 8.5pt;
    }
    .pdf-content pre {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 12px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 15px 0;
      page-break-inside: avoid;
    }
    .pdf-content pre code { background: transparent; padding: 0; }
    
    /* Callouts in PDF */
    .pdf-content .callout {
      margin: 20px 0;
      padding: 12px 16px;
      border-radius: 6px;
      border-left: 4px solid #cbd5e1;
      background: #f8fafc;
    }
    .pdf-content .callout-note { border-left-color: #3b82f6; background: rgba(59,130,246,0.03); }
    .pdf-content .callout-tip { border-left-color: #10b981; background: rgba(16,185,129,0.03); }
    .pdf-content .callout-warning { border-left-color: #f59e0b; background: rgba(245,158,11,0.03); }
    .pdf-content .callout-important { border-left-color: #a855f7; background: rgba(168,85,247,0.03); }
    .pdf-content .callout-caution { border-left-color: #ef4444; background: rgba(239,68,68,0.03); }
    .pdf-content .callout-header { font-weight: bold; font-size: 8.5pt; text-transform: uppercase; margin-bottom: 6px; }
    .pdf-content .callout-note .callout-header { color: #2563eb; }
    .pdf-content .callout-tip .callout-header { color: #059669; }
    .pdf-content .callout-warning .callout-header { color: #d97706; }
    .pdf-content .callout-important .callout-header { color: #7c3aed; }
    .pdf-content .callout-caution .callout-header { color: #dc2626; }
    
    /* Header and Footer */
    .pdf-doc-header {
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 10px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .pdf-header-cat {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .pdf-header-title {
      font-size: 8pt;
      color: #64748b;
    }
    .pdf-footer {
      position: absolute;
      bottom: 0.5in;
      left: 0.75in;
      right: 0.75in;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #64748b;
    }
    
    /* Landscape Support */
    .landscape .page-preview {
      width: 297mm;
      min-height: 210mm;
    }
    
    /* Media Print */
    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
      }
      .compiler-sidebar {
        display: none !important;
      }
      .preview-canvas {
        padding: 0 !important;
        background: transparent !important;
        overflow: visible !important;
      }
      .page-preview {
        box-shadow: none !important;
        margin: 0 !important;
        width: 100% !important;
        min-height: 100vh !important;
      }
      .preview-title-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body class="portrait">

  <div class="compiler-sidebar">
    <h1 class="sidebar-title">Dossier Compiler</h1>
    <div class="sidebar-sub">Interactive Preview Workspace</div>
    
    <div class="control-group">
      <label class="control-label">Cover Page Design</label>
      <select id="cover-style" onchange="updateSettings()">
        <option value="luxury">Luxury Dark</option>
        <option value="minimal">Minimal White</option>
        <option value="blue">Strategy Blue</option>
      </select>
    </div>
    
    <div class="control-group">
      <label class="control-label">Ausrichtung (Page Size)</label>
      <select id="orientation" onchange="updateSettings()">
        <option value="portrait">A4 Hochformat (Portrait)</option>
        <option value="landscape">A4 Querformat (Landscape)</option>
      </select>
    </div>
    
    <div class="control-group">
      <label class="control-label">Seitenränder (Margins)</label>
      <select id="margins" onchange="updateSettings()">
        <option value="0.5">Schmal (0.5 Zoll)</option>
        <option value="0.75" selected>Normal (0.75 Zoll)</option>
        <option value="1.0">Breit (1.0 Zoll)</option>
      </select>
    </div>
    
    <div class="control-group">
      <label class="control-label">Dossier Titel</label>
      <input type="text" id="pdf-title" value="Projekt-Dossier" oninput="updateSettings()" style="background:var(--surface); border:1px solid var(--border); border-radius:6px; padding:10px; color:var(--text); font-size:12px; outline:none;">
    </div>
    
    <div class="control-group">
      <label class="control-label">Untertitel</label>
      <input type="text" id="pdf-subtitle" value="Kompilierte Zusammenstellung strategischer Berichte" oninput="updateSettings()" style="background:var(--surface); border:1px solid var(--border); border-radius:6px; padding:10px; color:var(--text); font-size:12px; outline:none;">
    </div>
    
    <div class="control-group">
      <label class="control-label">Herausgeber & Vertraulichkeit</label>
      <input type="text" id="pdf-confidential" value="Mirrou Hub &mdash; Vertraulich" oninput="updateSettings()" style="background:var(--surface); border:1px solid var(--border); border-radius:6px; padding:10px; color:var(--text); font-size:12px; outline:none;">
    </div>
    
    <div class="control-group">
      <label class="control-label">Vorwort / Einleitung (Optional)</label>
      <textarea id="pdf-preface" placeholder="Geben Sie ein optionales Vorwort ein, das als Seite 2 eingefügt wird..." oninput="updateSettings()" style="width:100%; background:var(--surface); border:1px solid var(--border); border-radius:6px; padding:10px; color:var(--text); font-size:12px; outline:none; font-family:var(--font-sans); height:70px; resize:vertical;"></textarea>
    </div>
    
    <div class="control-group" style="flex:1; min-height: 150px; display:flex; flex-direction:column;">
      <label class="control-label">Reihenfolge & Auswahl</label>
      <div class="doc-list" id="doc-list-container"></div>
    </div>
    
    <div class="control-group" style="flex-direction:row; gap:10px; margin-top:10px;">
      <label style="display:flex; align-items:center; gap:8px; font-size:11px; cursor:pointer;">
        <input type="checkbox" id="show-headers" checked onchange="updateSettings()" style="accent-color:var(--primary);">
        Kopfzeilen anzeigen
      </label>
    </div>
    
    <div class="control-group" style="flex-direction:row; gap:10px;">
      <label style="display:flex; align-items:center; gap:8px; font-size:11px; cursor:pointer;">
        <input type="checkbox" id="show-footers" checked onchange="updateSettings()" style="accent-color:var(--primary);">
        Seitenzahlen anzeigen
      </label>
    </div>
    
    <button class="btn-compile" onclick="window.print()">
      🖨️ PDF Dossier drucken
    </button>
  </div>
  
  <div class="preview-canvas">
    <div class="preview-title-bar">
      <span>🖥️ VORSCHAU-MODUS (Print Preview)</span>
      <span>TIPP: Zum Speichern als PDF im Druckdialog "Als PDF speichern" wählen.</span>
    </div>
    <div id="preview-pages-container" style="display:contents;"></div>
  </div>

  <script>
    const docs = ` + docsDataJson + `;
    
    function init() {
      renderDocList();
      updateSettings();
    }
    
    function renderDocList() {
      const container = document.getElementById('doc-list-container');
      container.innerHTML = '';
      
      docs.forEach((doc, idx) => {
        const item = document.createElement('div');
        item.className = 'doc-item';
        item.innerHTML = \`
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer; flex:1; min-width:0;">
            <input type="checkbox" class="doc-checkbox" data-key="\${doc.key}" \${doc.active !== false ? 'checked' : ''} onchange="toggleDoc('\${doc.key}')" style="accent-color:var(--primary);">
            <span class="doc-item-title" title="\${doc.title}">\${doc.title}</span>
          </label>
          <div class="doc-item-actions">
            <button class="action-btn" onclick="moveDoc(\${idx}, -1)" \${idx === 0 ? 'disabled' : ''}>&uarr;</button>
            <button class="action-btn" onclick="moveDoc(\${idx}, 1)" \${idx === docs.length - 1 ? 'disabled' : ''}>&darr;</button>
          </div>
        \`;
        container.appendChild(item);
      });
    }
    
    function toggleDoc(key) {
      const doc = docs.find(d => d.key === key);
      if (doc) {
        doc.active = !doc.active;
        renderPreview();
      }
    }
    
    function moveDoc(idx, dir) {
      if (idx + dir < 0 || idx + dir >= docs.length) return;
      const temp = docs[idx];
      docs[idx] = docs[idx + dir];
      docs[idx + dir] = temp;
      renderDocList();
      renderPreview();
    }
    
    function updateSettings() {
      const orientation = document.getElementById('orientation').value;
      const styleEl = document.getElementById('orientation-style') || document.createElement('style');
      styleEl.id = 'orientation-style';
      
      const margin = document.getElementById('margins').value;
      const showHeaders = document.getElementById('show-headers').checked;
      const showFooters = document.getElementById('show-footers').checked;
      
      document.body.className = orientation;
      
      styleEl.innerHTML = \\\`
        @page {
          size: A4 \\\${orientation};
          margin: \\\${margin}in;
        }
        .page-preview {
          padding: \\\${margin}in;
        }
        \\\${!showHeaders ? '.pdf-doc-header { display:none !important; }' : ''}
        \\\${!showFooters ? '.pdf-footer { display:none !important; }' : ''}
      \\\`;
      
      if (!styleEl.parentNode) document.head.appendChild(styleEl);
      
      renderPreview();
    }
    
    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
    }

    function renderPreview() {
      const container = document.getElementById('preview-pages-container');
      container.innerHTML = '';
      
      const coverStyle = document.getElementById('cover-style').value;
      const showHeaders = document.getElementById('show-headers').checked;
      const showFooters = document.getElementById('show-footers').checked;
      
      const dossierTitle = document.getElementById('pdf-title').value.trim() || 'Projekt-Dossier';
      const dossierSubtitle = document.getElementById('pdf-subtitle').value.trim() || '';
      const publisherLabel = document.getElementById('pdf-confidential').value.trim() || 'Mirrou Hub &mdash; Vertraulich';
      const prefaceText = document.getElementById('pdf-preface').value.trim();
      
      const coverPage = document.createElement('div');
      coverPage.className = \\\`page-preview cover-\\\${coverStyle}\\\`;
      
      const today = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
      
      if (coverStyle === 'luxury') {
        coverPage.innerHTML = \\\`
          <div class="cover-header">OPUS MAGNUM MEDIA // DOSSIER COMPILER</div>
          <div class="cover-body">
            <div style="font-size: 11pt; text-transform: uppercase; letter-spacing: 2px; color: var(--primary); font-weight: bold;">Systemische Berichte</div>
            <h1 class="cover-title">\\\${escapeHtml(dossierTitle)}</h1>
            \\\${dossierSubtitle ? \\\`<p class="cover-subtitle">\\\${escapeHtml(dossierSubtitle)}</p>\\\` : ''}
          </div>
          <div class="cover-footer">
            <div>Datum: \\\${today}</div>
            <div>Zusammenstellung: OMM Compiler Engine</div>
          </div>
        \\\`;
      } else if (coverStyle === 'minimal') {
        coverPage.innerHTML = \\\`
          <div class="cover-header">OPUS MAGNUM MEDIA — SYSTEM ARCHIVE</div>
          <div class="cover-body" style="padding-top:100px;">
            <h1 class="cover-title" style="border-bottom: 4px solid #111; padding-bottom: 20px; font-weight:700;">\\\${escapeHtml(dossierTitle.toUpperCase())}</h1>
            \\\${dossierSubtitle ? \\\`<p class="cover-subtitle" style="margin-top:20px; color:#475569;">\\\${escapeHtml(dossierSubtitle)}</p>\\\` : ''}
          </div>
          <div class="cover-footer" style="border-top:1px solid #111; padding-top:15px; color:#111; font-weight:600;">
            <div>Datum: \\\${today}</div>
            <div>Compiler Engine v3.0</div>
          </div>
        \\\`;
      } else if (coverStyle === 'blue') {
        coverPage.innerHTML = \\\`
          <div class="cover-header">MIRROU CREATIVE STUDIO // STRATEGY REPORT</div>
          <div class="cover-body">
            <div style="font-size: 10pt; text-transform: uppercase; letter-spacing: 2px; color: #3b82f6; font-weight: bold; font-family:'JetBrains Mono', monospace;">CLIENT WORKSPACE</div>
            <h1 class="cover-title" style="font-size:38pt; font-weight:bold; margin-top:10px;">\\\${escapeHtml(dossierTitle)}</h1>
            \\\${dossierSubtitle ? \\\`<p class="cover-subtitle" style="margin-top:15px; color:#94a3b8; font-size:12pt;">\\\${escapeHtml(dossierSubtitle)}</p>\\\` : ''}
          </div>
          <div class="cover-footer" style="border-top: 1px solid #1e293b; color:#64748b;">
            <div>Datum: \\\${today}</div>
            <div>Branding DNA Document Hub</div>
          </div>
        \\\`;
      }
      container.appendChild(coverPage);
      
      if (prefaceText) {
        const prefacePage = document.createElement('div');
        prefacePage.className = 'page-preview';
        
        let prefaceHtml = '';
        if (typeof marked !== 'undefined') {
          prefaceHtml = marked.parse(prefaceText);
        } else {
          prefaceHtml = \\\`<p style="white-space:pre-wrap;">\\\${escapeHtml(prefaceText)}</p>\\\`;
        }
        
        prefacePage.innerHTML = \\\`
          <div class="pdf-doc-header">
            <span class="pdf-header-cat">Präambel</span>
            <span class="pdf-header-title">Vorwort & Einleitung</span>
          </div>
          <div class="pdf-content" style="flex:1; display:flex; flex-direction:column; justify-content:center; max-width:600px; margin:0 auto;">
            <h2 style="font-family:'Cormorant Garamond', serif; font-size:24pt; font-weight:400; text-align:center; margin-bottom:24px; color:#111;">Geleitwort</h2>
            <div style="font-size:11.5pt; line-height:1.8; color:#333; font-style:italic; text-align:justify;">
              \\\${prefaceHtml}
            </div>
            <div style="margin-top:48px; border-top:1px solid #cbd5e1; padding-top:12px; display:flex; justify-content:space-between; font-size:10pt; color:#475569;">
              <div>Herausgegeben durch: OMM Engine</div>
              <div style="text-align:right; font-family:'Cormorant Garamond', serif; font-style:italic;">Freigegeben am \\\${today}</div>
            </div>
          </div>
          <div class="pdf-footer">
            <span>\\\${publisherLabel}</span>
            <span>Vorwort</span>
          </div>
        \\\`;
        container.appendChild(prefacePage);
      }
      
      let activeCount = 0;
      docs.forEach((doc) => {
        if (doc.active === false) return;
        activeCount++;
        
        const page = document.createElement('div');
        page.className = 'page-preview';
        
        let docContent = '';
        if (typeof marked !== 'undefined') {
          docContent = marked.parse(doc.content);
        } else {
          docContent = \\\`<pre style="white-space: pre-wrap;">\\\${doc.content}</pre>\\\`;
        }
        
        page.innerHTML = \\\`
          <div class="pdf-doc-header">
            <span class="pdf-header-cat">\\\${doc.cat}</span>
            <span class="pdf-header-title">\\\${doc.title}</span>
          </div>
          <div class="pdf-content" style="flex:1;">
            \\\${docContent}
          </div>
          <div class="pdf-footer">
            <span>\\\${publisherLabel}</span>
            <span>Dokument \\\${activeCount}</span>
          </div>
        \\\`;
        container.appendChild(page);
      });
    }
    
    window.onload = init;
  <\/script>
</body>
</html>`;

  pWin.document.open();
  pWin.document.write(compilerHtml);
  pWin.document.close();
  toast('Dossier-Compiler geladen', 'printer');
}

// ════════════════════════════════════════════════
// PREMIUM UPGRADE UTILITIES
// ════════════════════════════════════════════════

// FAQ Widget Trigger
function askFAQ(questionText) {
  const drawer = document.getElementById('copilot-drawer');
  if (drawer && !drawer.classList.contains('open')) {
    toggleCopilot();
  }
  const input = document.getElementById('copilot-input');
  if (input) {
    input.value = questionText;
    askCopilot();
  }
}

// Auto-Summary Generator
function getSummaryMarkdown(key) {
  if (DOCUMENT_SUMMARIES[key]) {
    return DOCUMENT_SUMMARIES[key];
  }
  const d = DB[key];
  if (!d) return '';
  return `### ✨ \${d.badge || '📄'} \${d.title} — Zusammenfassung
* **Kategorie**: \${d.cat}
* **Beschreibung**: \${d.desc}
* **Umfang**: \${d.words.toLocaleString('de-DE')} Wörter (ca. \${d.readMin} Min. Lesezeit)
* **Kernaussage**: Dieses Dokument befasst sich intensiv mit Aspekten aus dem Bereich *\${d.cat}*. Es stellt grundlegende Konzepte und operative Leitlinien bereit, um die Skalierung, Compliance und Effizienz des Systems zu unterstützen.
* **Empfohlene Aktion**: Nutzen Sie die Suchfunktion des Co-Pilots oder klicken Sie auf die häufig gestellten Fragen, um tiefer in spezifische Abschnitte einzutauchen.`;
}

function triggerSummary() {
  if (!activeKey || !DB[activeKey]) return;
  
  const drawer = document.getElementById('copilot-drawer');
  if (drawer && !drawer.classList.contains('open')) {
    toggleCopilot();
  }
  
  const msgs = document.getElementById('copilot-messages');
  if (!msgs) return;
  
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.innerHTML = `<p><i data-lucide="sparkles"></i> Zusammenfassung anfordern...</p>`;
  msgs.appendChild(userDiv);
  
  const aiDiv = document.createElement('div');
  aiDiv.className = 'chat-msg ai';
  aiDiv.innerHTML = `<p><em>Generiere Zusammenfassung...</em></p>`;
  msgs.appendChild(aiDiv);
  msgs.scrollTop = msgs.scrollHeight;
  createIcons();
  
  const summaryText = getSummaryMarkdown(activeKey);
  let idx = 0;
  aiDiv.innerHTML = '';
  
  const words = summaryText.split(' ');
  function streamWord() {
    if (idx < words.length) {
      aiDiv.innerHTML = marked.parse(words.slice(0, idx + 1).join(' '));
      idx++;
      msgs.scrollTop = msgs.scrollHeight;
      setTimeout(streamWord, 15);
    } else {
      createIcons();
    }
  }
  setTimeout(streamWord, 350);
}

// Presenter Mode Stopwatch Timer
let presTimerId = null;
let presTimeElapsed = 0;

function startPresTimer() {
  if (presTimerId) return;
  presTimerId = setInterval(() => {
    presTimeElapsed++;
    updatePresTimerDisplay();
  }, 1000);
}

function pausePresTimer() {
  if (presTimerId) {
    clearInterval(presTimerId);
    presTimerId = null;
  }
}

function resetPresTimer() {
  pausePresTimer();
  presTimeElapsed = 0;
  updatePresTimerDisplay();
}

function updatePresTimerDisplay() {
  const display = document.getElementById('pres-timer');
  if (!display) return;
  const hrs = Math.floor(presTimeElapsed / 3600).toString().padStart(2, '0');
  const mins = Math.floor((presTimeElapsed % 3600) / 60).toString().padStart(2, '0');
  const secs = (presTimeElapsed % 60).toString().padStart(2, '0');
  display.textContent = `\${hrs}:\${mins}:\${secs}`;
}

// Speaker Notes Parser & Stripper
function parseSpeakerNotes(md) {
  const commentMatch = md.match(/<!--\s*notes:([\s\S]*?)-->/i);
  if (commentMatch) return commentMatch[1].trim();
  
  const lineMatch = md.match(/(?:^|\n)(?:Note|Notes|Notiz|Notizen):\s*([\s\S]*?)$/i);
  if (lineMatch) return lineMatch[1].trim();
  
  return '';
}

function stripSpeakerNotes(md) {
  let stripped = md.replace(/<!--\s*notes:([\s\S]*?)-->/gi, '');
  stripped = stripped.replace(/(?:^|\n)(?:Note|Notes|Notiz|Notizen):\s*([\s\S]*?)$/i, '');
  return stripped.trim();
}

// Presenter View Next Slide Preview
function updateNextSlidePreview() {
  const container = document.getElementById('pres-next-content');
  if (!container) return;
  if (slideIdx + 1 < slides.length) {
    const nextMarkdown = localStorage.getItem('omm-slide-' + activeKey + '-' + (slideIdx + 1)) || slides[slideIdx + 1];
    const cleanMd = stripSpeakerNotes(nextMarkdown);
    container.innerHTML = marked.parse(cleanMd);
  } else {
    container.innerHTML = '<div style="color:var(--text-3); font-style:italic;">Ende der Präsentation</div>';
  }
}

// Presenter Mode Toggle
let isPresenterMode = false;
let isEditingNotes = false;

function togglePresenterMode() {
  isPresenterMode = !isPresenterMode;
  const overlay = document.getElementById('slide-overlay');
  const btn = document.getElementById('btn-slide-presenter');
  if (!overlay || !btn) return;
  
  if (isPresenterMode) {
    overlay.classList.add('presenter-active');
    btn.classList.add('active-tb');
    startPresTimer();
    updateNextSlidePreview();
    renderSlide(); // Re-render to load notes
  } else {
    overlay.classList.remove('presenter-active');
    btn.classList.remove('active-tb');
    pausePresTimer();
  }
  createIcons();
}

// Speaker Notes Editing
function toggleEditNotes() {
  const display = document.getElementById('pres-notes');
  const editor = document.getElementById('pres-notes-editor');
  const btnEdit = document.getElementById('btn-edit-notes');
  const btnSave = document.getElementById('btn-save-notes');
  if (!display || !editor || !btnEdit || !btnSave) return;
  
  isEditingNotes = !isEditingNotes;
  if (isEditingNotes) {
    const slideMarkdown = localStorage.getItem('omm-slide-' + activeKey + '-' + slideIdx) || slides[slideIdx];
    const notes = parseSpeakerNotes(slideMarkdown);
    const savedNotes = localStorage.getItem('omm-notes-' + activeKey + '-' + slideIdx);
    const finalNotes = savedNotes !== null ? savedNotes : notes;
    
    editor.value = finalNotes;
    editor.classList.remove('hidden');
    display.classList.add('hidden');
    btnEdit.innerHTML = '<i data-lucide="x"></i> Abbrechen';
    btnSave.classList.remove('hidden');
  } else {
    editor.classList.add('hidden');
    display.classList.remove('hidden');
    btnEdit.innerHTML = '<i data-lucide="edit-2"></i> Notizen bearbeiten';
    btnSave.classList.add('hidden');
  }
  createIcons();
}

function saveNotesOverride() {
  const editor = document.getElementById('pres-notes-editor');
  if (!editor) return;
  
  const val = editor.value.trim();
  localStorage.setItem('omm-notes-' + activeKey + '-' + slideIdx, val);
  toast('Referenten-Notiz gespeichert', 'save');
  
  isEditingNotes = false;
  const display = document.getElementById('pres-notes');
  const btnEdit = document.getElementById('btn-edit-notes');
  const btnSave = document.getElementById('btn-save-notes');
  
  if (editor) editor.classList.add('hidden');
  if (display) {
    display.classList.remove('hidden');
    display.innerHTML = val ? marked.parse(val) : '<div style="color:var(--text-3); font-style:italic;">Keine Referenten-Notizen vorhanden.</div>';
  }
  if (btnEdit) btnEdit.innerHTML = '<i data-lucide="edit-2"></i> Notizen bearbeiten';
  if (btnSave) btnSave.classList.add('hidden');
  createIcons();
}

// Cloner Color Customizer live updates
function updateLiveBrandColor() {
  const selection = document.getElementById('clone-brand-color').value;
  const customPicker = document.getElementById('clone-custom-color');
  if (!customPicker) return;
  
  if (selection === 'custom') {
    customPicker.style.display = 'block';
    updateCustomColorLive(customPicker.value);
  } else {
    customPicker.style.display = 'none';
    
    document.body.className = ''; // reset themes
    if (selection === 'matrix') {
      document.body.className = 'theme-matrix';
    } else if (selection === 'amber') {
      document.body.className = 'theme-amber';
    } else if (selection === 'blue') {
      applyCustomColorsLive('#3B82F6', '#60A5FA', 'rgba(59,130,246,0.30)', 'rgba(59,130,246,0.07)');
    } else if (selection === 'rose') {
      applyCustomColorsLive('#EC4899', '#F472B6', 'rgba(236,72,153,0.30)', 'rgba(236,72,153,0.07)');
    } else { // purple
      resetCustomColorsLive();
    }
  }
}

function updateCustomColorLive(hex) {
  const hexLight = lightenColor(hex, 30);
  const glow = hexToRgba(hex, 0.07);
  const dim = hexToRgba(hex, 0.30);
  applyCustomColorsLive(hex, hexLight, dim, glow);
}

function applyCustomColorsLive(primary, light, dim, glow) {
  const root = document.documentElement;
  root.style.setProperty('--gold', primary);
  root.style.setProperty('--gold-light', light);
  root.style.setProperty('--gold-dim', dim);
  root.style.setProperty('--gold-glow', glow);
  root.style.setProperty('--border-active', primary);
}

function resetCustomColorsLive() {
  const root = document.documentElement;
  root.style.removeProperty('--gold');
  root.style.removeProperty('--gold-light');
  root.style.removeProperty('--gold-dim');
  root.style.removeProperty('--gold-glow');
  root.style.removeProperty('--border-active');
}

function lightenColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

function hexToRgba(hex, alpha) {
  let c = hex.substring(1);
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  let r = parseInt(c.substring(0, 2), 16);
  let g = parseInt(c.substring(2, 4), 16);
  let b = parseInt(c.substring(4, 6), 16);
  return `rgba(\${r}, \${g}, \${b}, \${alpha})`;
}

// ════════════════════════════════════════════════
// IMAGE LIGHTBOX
// ════════════════════════════════════════════════
function initLightbox() {
  let overlay = document.getElementById('lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Schließen"><i data-lucide="x"></i></button>
      <img class="lightbox-content" src="" alt="">
      <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', (e) => {
      if (!e.target.closest('.lightbox-content')) {
        closeLightbox();
      }
    });
  }
  
  // Bind clicks to md-output images
  const mdOut = document.getElementById('md-output');
  if (mdOut) {
    mdOut.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  }
}

function openLightbox(src, alt) {
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;
  const img = overlay.querySelector('.lightbox-content');
  const caption = overlay.querySelector('.lightbox-caption');
  
  if (img) {
    img.src = src;
    img.alt = alt || '';
  }
  if (caption) {
    caption.textContent = alt || '';
  }
  
  overlay.classList.add('open');
  createIcons();
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  if (overlay) {
    overlay.classList.remove('open');
  }
}


/* OMM BOOT SEQUENCE */
(function(){
  var boot=document.getElementById('omm-boot');if(!boot)return;
  var log=document.getElementById('boot-log'),fill=document.getElementById('boot-fill');
  function done(){boot.classList.add('done')}
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){if(fill)fill.style.width='100%';setTimeout(done,400);return}
  var steps=[['SYS','Magnum Core geladen','sys'],['OK','Chromatic Matrix initialisiert','ok'],['OK','Engine Typography gebunden','ok'],['SYS','Dokument-Protokoll synchronisiert','sys'],['OK','Synthese abgeschlossen — Hub operational','ok']];
  var i=0;
  function tick(){
    if(i<steps.length){
      var s=steps[i],line=document.createElement('div');
      line.innerHTML='<span class="'+s[2]+'">['+s[0]+']</span> '+s[1];
      log.appendChild(line);while(log.children.length>3)log.removeChild(log.firstChild);
      fill.style.width=Math.round((i+1)/steps.length*100)+'%';i++;setTimeout(tick,360);
    } else { setTimeout(done,480); }
  }
  setTimeout(tick,260);
  setTimeout(done,6000);
})();
</script>

<!-- Co-Pilot Drawer -->
<div id="copilot-drawer" class="copilot-drawer">
  <div class="copilot-header">
    <div style="display:flex; align-items:center; gap:8px;">
      <i data-lucide="message-square" style="color:var(--gold);"></i>
      <span style="font-family:var(--font-serif); font-weight:700; font-size:1.1rem;">OMM AI Co-Pilot</span>
    </div>
    <button class="tb" onclick="toggleCopilot()" style="padding:4px;"><i data-lucide="x"></i></button>
  </div>
  <div class="copilot-body" id="copilot-messages"></div>
  <div class="copilot-footer">
    <input type="text" id="copilot-input" class="copilot-input" placeholder="Fragen Sie den Co-Pilot..." onkeydown="if(event.key==='Enter')askCopilot()">
    <button class="copilot-send" onclick="askCopilot()"><i data-lucide="send" style="width:14px; height:14px;"></i></button>
  </div>
</div>

<!-- Storage Overrides Drawer -->
<div id="storage-drawer" class="copilot-drawer">
  <div class="copilot-header">
    <div style="display:flex; align-items:center; gap:8px;">
      <i data-lucide="database" style="color:var(--gold);"></i>
      <span style="font-family:var(--font-serif); font-weight:700; font-size:1.1rem;">Storage Inspector</span>
    </div>
    <button class="tb" onclick="toggleStorageDrawer()" style="padding:4px;"><i data-lucide="x"></i></button>
  </div>
  <div class="copilot-body" style="gap:16px;">
    <div style="font-size:.75rem; color:var(--text-2); line-height:1.4;">
      Verwalten Sie hier alle lokalen Anpassungen (Titel, Notizen, Bilder), die im Präsentations-Deck vorgenommen wurden.
    </div>
    <div class="storage-actions" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <button class="tb" onclick="exportOverrides()" style="justify-content:center;"><i data-lucide="download"></i> Export (JSON)</button>
      <button class="tb" onclick="triggerImport()" style="justify-content:center;"><i data-lucide="upload"></i> Import (JSON)</button>
      <input type="file" id="import-file" style="display:none;" accept=".json" onchange="importOverrides(event)">
    </div>
    <button class="tb" onclick="clearOverrides()" style="border-color:#EF4444; color:#FCA5A5; justify-content:center; width:100%;"><i data-lucide="trash-2"></i> Alle Overrides löschen</button>
    <div style="border-top:1px solid var(--border); padding-top:14px;">
      <div style="font-family:var(--font-mono); font-size:9px; letter-spacing:1px; color:var(--gold); margin-bottom:8px; text-transform:uppercase;">Aktive Overrides im Speicher:</div>
      <div id="storage-list" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; max-height:400px; font-family:var(--font-mono); font-size:11px;"></div>
    </div>
  </div>
</div>

</body>
</html>
"""


def build():
    print(">> Loading documents...")
    db = load_documents()
    print(f"\n>> Loaded {len(db)} / {len(DOCS)} documents.")

    db_json = json.dumps(db, ensure_ascii=False)
    cat_json = json.dumps(CATEGORY_META, ensure_ascii=False)

    html = HTML_TEMPLATE.replace("__DB_JSON__", db_json).replace("__CAT_META__", cat_json)

    for target in TARGETS:
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "w", encoding="utf-8") as f:
            f.write(html)
        print(f">> Wrote {target}")

    art_target = os.path.join(ARTIFACTS_DIR, "document_hub.html")
    with open(art_target, "w", encoding="utf-8") as f:
        f.write(html)
    print(f">> Wrote {art_target}")

    # Copy slide presentation HTML files to destinations
    import shutil
    src_deck = "public/deck.html" if os.path.exists("public/deck.html") else "04_praesentationen/mirrou_final_presentation_32.html"
    decks = {
        "deck.html": src_deck,
        "mirrou_abschlusspraesentation_2026.html": "04_praesentationen/mirrou_abschlusspraesentation_2026.html",
        "presenter-handouts.html": "04_praesentationen/presenter-handouts.html"
    }

    for filename, src in decks.items():
        if os.path.exists(src):
            # Target directories
            targets = [
                os.path.join("public", filename),
                os.path.join("00_abschlussbericht", filename),
                os.path.join(ARTIFACTS_DIR, filename)
            ]
            for dest in targets:
                if os.path.abspath(src) != os.path.abspath(dest):
                    os.makedirs(os.path.dirname(dest), exist_ok=True)
                    shutil.copy2(src, dest)
                    print(f">> Copied {src} to {dest}")
        else:
            print(f"!! Warning: Slide source {src} not found for copying.")

    # Synchronize the visuals directory to all output targets
    src_visuals = "visuals"
    if os.path.exists(src_visuals):
        for dest_parent in ["public", "00_abschlussbericht", ARTIFACTS_DIR]:
            dest_visuals = os.path.join(dest_parent, "visuals")
            if os.path.abspath(src_visuals) != os.path.abspath(dest_visuals):
                os.makedirs(dest_visuals, exist_ok=True)
                # Copy files inside visuals
                for f_name in os.listdir(src_visuals):
                    src_f = os.path.join(src_visuals, f_name)
                    dest_f = os.path.join(dest_visuals, f_name)
                    if os.path.isfile(src_f):
                        shutil.copy2(src_f, dest_f)
                # Copy files inside visuals/team if exists
                src_team = os.path.join(src_visuals, "team")
                if os.path.exists(src_team):
                    dest_team = os.path.join(dest_visuals, "team")
                    os.makedirs(dest_team, exist_ok=True)
                    for f_name in os.listdir(src_team):
                        src_f = os.path.join(src_team, f_name)
                        dest_f = os.path.join(dest_team, f_name)
                        if os.path.isfile(src_f):
                            shutil.copy2(src_f, dest_f)
                print(f">> Synced visuals folder to {dest_visuals}")

    print("\n>> Document Hub v3 generated successfully!")


if __name__ == "__main__":
    build()
