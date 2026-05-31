import os
import json
from playwright.sync_api import sync_playwright

def compile_pdf(md_path, pdf_path, title):
    print(f"Reading markdown from {md_path}...")
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    escaped_md = json.dumps(md_content)

    html_template = """
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <style>
            body {
                background-color: #080808 !important;
                color: #F2EFE9 !important;
                font-family: 'Inter', sans-serif;
                line-height: 1.6;
                padding: 40px;
                margin: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            #content {
                max-width: 900px;
                margin: 0 auto;
            }
            h1, h2, h3, h4 {
                font-family: 'Cormorant Garamond', serif;
                color: #C8A25A !important;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
                font-weight: 600;
                page-break-after: avoid;
            }
            h1 {
                font-size: 2.6em;
                border-bottom: 2px solid #C8A25A;
                padding-bottom: 10px;
                margin-top: 0;
            }
            h2 {
                font-size: 1.8em;
                border-bottom: 1px solid #C8A25A;
                padding-bottom: 5px;
            }
            h3 {
                font-size: 1.4em;
            }
            p, li {
                font-size: 1.05em;
                color: #e2dfd9;
            }
            a {
                color: #C8A25A;
                text-decoration: none;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 25px 0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9em;
                page-break-inside: avoid;
            }
            th, td {
                border: 1px solid #C8A25A;
                padding: 12px;
                text-align: left;
            }
            th {
                background-color: #121212 !important;
                color: #C8A25A !important;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background-color: #0f0f0f !important;
            }
            code {
                font-family: 'JetBrains Mono', monospace;
                background-color: #121212 !important;
                color: #C8A25A !important;
                padding: 3px 6px;
                border-radius: 4px;
                font-size: 0.9em;
                border: 1px solid #1a1a1a;
            }
            pre {
                background-color: #121212 !important;
                padding: 15px;
                border-radius: 6px;
                overflow-x: auto;
                border: 1px solid #C8A25A;
                page-break-inside: avoid;
            }
            pre code {
                border: none;
                padding: 0;
                background-color: transparent !important;
                color: #F2EFE9 !important;
            }
            hr {
                border: 0;
                border-top: 1px solid #C8A25A;
                margin: 40px 0;
            }
            blockquote {
                border-left: 4px solid #C8A25A;
                padding-left: 15px;
                margin-left: 0;
                font-style: italic;
                color: #e2dfd9;
            }
            @media print {
                body {
                    background-color: #080808 !important;
                    color: #F2EFE9 !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                th {
                    background-color: #121212 !important;
                }
                tr:nth-child(even) {
                    background-color: #0f0f0f !important;
                }
            }
        </style>
    </head>
    <body>
        <div id="content"></div>
        <script>
            const md = {escaped_md};
            document.getElementById('content').innerHTML = marked.parse(md);
        </script>
    </body>
    </html>
    """

    # Replace placeholders manually to avoid f-string brackets escaping madness
    html_content = html_template.replace("{title}", title).replace("{escaped_md}", escaped_md)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.set_content(html_content, wait_until="networkidle")
        page.wait_for_timeout(1500)
        print(f"Printing PDF to {pdf_path}...")
        page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={
                "top": "20mm",
                "bottom": "20mm",
                "left": "20mm",
                "right": "20mm"
            }
        )
        browser.close()

def main():
    files = [
        ("1_Roadmap_Frontier_Firm.md", "6-Wochen-Roadmap: MIRROU Creative zum 'Frontier Firm' entwickeln"),
        ("2_ICP_Audit_Mandanten_Akquise.md", "ICP-Audit & Mandanten-Akquise"),
        ("3_Checkliste_Operative_Skalierung.md", "Checkliste für die ersten 30 Tage der operativen Skalierung"),
        ("4_Vertriebs_Roadmap_Zahlender_Kunde.md", "Vertriebs-Roadmap zur Gewinnung des ersten zahlenden Kunden"),
        ("5_Strategische_Preismodellierung.md", "Strategische Preismodellierung für Performance Creative Services")
    ]
    
    dir_path = "00_abschlussbericht/follow_ups"
    
    for filename, title in files:
        md_file = os.path.join(dir_path, filename)
        pdf_file = os.path.join(dir_path, filename.replace(".md", ".pdf"))
        print(f"Compiling {filename}...")
        compile_pdf(md_file, pdf_file, title)
        print(f"Finished {filename}.\n")

if __name__ == "__main__":
    main()
