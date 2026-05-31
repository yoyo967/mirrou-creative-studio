import os
import json
from playwright.sync_api import sync_playwright

def generate_pdf():
    md_path = "00_abschlussbericht/Deep_Audit_Report.md"
    pdf_path = "00_abschlussbericht/Deep_Audit_Report.pdf"
    
    print(f"Reading markdown from {md_path}...")
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    # Escape the markdown content for JS embedding
    # We JSON dump it to safely pass it as a string to the browser context
    escaped_md = json.dumps(md_content)

    html_template = f"""
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <title>MIRROU CREATIVE STUDIO - Deep Audit Report</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <style>
            body {{
                background-color: #080808 !important;
                color: #F2EFE9 !important;
                font-family: 'Inter', sans-serif;
                line-height: 1.6;
                padding: 40px;
                margin: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }}
            #content {{
                max-width: 900px;
                margin: 0 auto;
            }}
            h1, h2, h3, h4 {{
                font-family: 'Cormorant Garamond', serif;
                color: #C8A25A !important;
                margin-top: 1.5em;
                margin-bottom: 0.5em;
                font-weight: 600;
                page-break-after: avoid;
            }}
            h1 {{
                font-size: 2.6em;
                border-bottom: 2px solid #C8A25A;
                padding-bottom: 10px;
                margin-top: 0;
            }}
            h2 {{
                font-size: 1.8em;
                border-bottom: 1px solid #C8A25A;
                padding-bottom: 5px;
            }}
            h3 {{
                font-size: 1.4em;
            }}
            p, li {{
                font-size: 1.05em;
                color: #e2dfd9;
            }}
            a {{
                color: #C8A25A;
                text-decoration: none;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                margin: 25px 0;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9em;
                page-break-inside: avoid;
            }}
            th, td {{
                border: 1px solid #C8A25A;
                padding: 12px;
                text-align: left;
            }}
            th {{
                background-color: #121212 !important;
                color: #C8A25A !important;
                font-weight: bold;
            }}
            tr:nth-child(even) {{
                background-color: #0f0f0f !important;
            }}
            code {{
                font-family: 'JetBrains Mono', monospace;
                background-color: #121212 !important;
                color: #C8A25A !important;
                padding: 3px 6px;
                border-radius: 4px;
                font-size: 0.9em;
                border: 1px solid #1a1a1a;
            }}
            pre {{
                background-color: #121212 !important;
                padding: 15px;
                border-radius: 6px;
                overflow-x: auto;
                border: 1px solid #C8A25A;
                page-break-inside: avoid;
            }}
            pre code {{
                border: none;
                padding: 0;
                background-color: transparent !important;
                color: #F2EFE9 !important;
            }}
            hr {{
                border: 0;
                border-top: 1px solid #C8A25A;
                margin: 40px 0;
                page-break-after: always;
            }}
            /* Specific print style overrides */
            @media print {{
                body {{
                    background-color: #080808 !important;
                    color: #F2EFE9 !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }}
                /* Keep background colors for table headers and rows */
                th {{
                    background-color: #121212 !important;
                }}
                tr:nth-child(even) {{
                    background-color: #0f0f0f !important;
                }}
            }}
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

    print("Launching Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        
        print("Setting page content...")
        page.set_content(html_template, wait_until="networkidle")
        
        # Wait a small amount for any async scripts/fonts to finish loading
        page.wait_for_timeout(2000)
        
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
    print("PDF generated successfully!")

if __name__ == "__main__":
    generate_pdf()
