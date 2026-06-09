import csv
import os

def csv_to_md(csv_path, md_path):
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        rows = list(reader)
    
    if not rows:
        return
        
    headers = rows[0]
    md_content = []
    md_content.append("# Mirrou Creative Studio - Aufgabenverteilung (Master)")
    md_content.append("")
    md_content.append("> Übersicht über die Primär- und Support-Zuständigkeiten sowie Arbeitsaufträge und Repos-Textauszüge.")
    md_content.append("")
    
    # Table header
    md_content.append("| " + " | ".join(headers) + " |")
    md_content.append("| " + " | ".join(["---"] * len(headers)) + " |")
    
    # Rows
    for row in rows[1:]:
        # Escape pipe characters in cell content to avoid breaking the markdown table structure
        escaped_row = [cell.replace("|", "\\|").replace("\n", " ") for cell in row]
        md_content.append("| " + " | ".join(escaped_row) + " |")
        
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_content))
    print(f"Wrote MD to {md_path}")

if __name__ == "__main__":
    csv_path = "00_abschlussbericht/mirrou_aufgabenverteilung_master.csv"
    
    # Write to workspace
    csv_to_md(csv_path, "00_abschlussbericht/mirrou_aufgabenverteilung_master.md")
    
    # Write to artifacts
    artifacts_dir = "C:/Users/HP/.gemini/antigravity/brain/9ad75e8c-7bcb-4273-8ab4-9910c8bb819c"
    csv_to_md(csv_path, os.path.join(artifacts_dir, "mirrou_aufgabenverteilung_master.md"))
