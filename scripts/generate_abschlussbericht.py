"""Generate Abschlussbericht_Mirrou_Creative_Studio.html + .pdf from the .md.

Source of truth is the Markdown file. This renders it to a *static* HTML file
(light house-style, no client-side JS) and prints a matching A4 PDF via Playwright.
`\\newpage` directives in the Markdown become CSS page breaks.

Run from repo root:  python scripts/generate_abschlussbericht.py
"""
import json
import os
from playwright.sync_api import sync_playwright

BASE = "00_abschlussbericht"
MD = os.path.join(BASE, "Abschlussbericht_Mirrou_Creative_Studio.md")
HTML = os.path.join(BASE, "Abschlussbericht_Mirrou_Creative_Studio.html")
PDF = os.path.join(BASE, "Abschlussbericht_Mirrou_Creative_Studio.pdf")

STYLE = """<style>
  @page { size: A4; margin: 25mm; }
  body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  h1 { font-size: 28px; color: #080808; border-bottom: 3px solid #C8A25A; padding-bottom: 10px; margin-top: 40px; }
  h2 { font-size: 22px; color: #080808; border-bottom: 2px solid #e0d5c0; padding-bottom: 8px; margin-top: 35px; }
  h3 { font-size: 18px; color: #333; margin-top: 25px; }
  blockquote { border-left: 4px solid #C8A25A; padding: 10px 20px; background: #faf8f5; margin: 20px 0; font-style: italic; }
  table { border-collapse: collapse; width: 100%; margin: 15px 0; page-break-inside: avoid; }
  td, th { border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-size: 14px; }
  tbody tr:nth-child(even) { background: #f9f9f9; }
  thead tr { background: #080808; color: #F2EFE9; font-weight: bold; }
  pre { background: #1a1a1a; color: #F2EFE9; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 13px; }
  code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 14px; }
  hr { border: none; border-top: 1px solid #C8A25A; margin: 30px 0; }
  li { margin: 4px 0; }
  strong { color: #080808; }
  .page-break { page-break-before: always; }
  @media print { body { padding: 0; } }
</style>"""

FOOTER = (
    '<hr>\n<p style="text-align:center"><em>Mirrou Creative Studio — Algorithm of Soul</em><br>'
    '\n<em>Hamburg und Berlin · MMXXVI</em></p>'
)


def main():
    md = open(MD, encoding="utf-8").read()
    md = md.replace("\\newpage", '<div class="page-break"></div>')
    escaped = json.dumps(md)

    render_doc = (
        '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">'
        '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>'
        '</head><body><div id="content"></div><script>'
        f'document.getElementById("content").innerHTML = marked.parse({escaped});'
        '</script></body></html>'
    )

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_context().new_page()
        page.set_content(render_doc, wait_until="networkidle")
        page.wait_for_timeout(1500)
        rendered = page.eval_on_selector("#content", "el => el.innerHTML")

        final_html = (
            '<!DOCTYPE html>\n<html lang="de">\n<head>\n<meta charset="UTF-8">\n'
            '<title>Mirrou Creative Studio — Abschlussbericht</title>\n'
            f'{STYLE}\n</head>\n<body>\n{rendered}\n{FOOTER}\n</body>\n</html>\n'
        )
        with open(HTML, "w", encoding="utf-8") as f:
            f.write(final_html)
        print(f"Wrote {HTML}")

        page.set_content(final_html, wait_until="networkidle")
        page.wait_for_timeout(800)
        page.pdf(path=PDF, print_background=True, prefer_css_page_size=True)
        print(f"Wrote {PDF}")
        browser.close()


if __name__ == "__main__":
    main()
