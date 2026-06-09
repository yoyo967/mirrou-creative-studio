import os
import pypdf
import shutil

def extract_pdf_text(pdf_path):
    print(f"Extracting text from {pdf_path}...")
    try:
        reader = pypdf.PdfReader(pdf_path)
        text_pages = []
        for i, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            text_pages.append(f"## Seite {i+1}\n\n{page_text}")
        return "\n\n".join(text_pages)
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}")
        return f"Fehler beim Extrahieren des Texts aus {pdf_path}: {e}"

def main():
    workspace_dir = "."
    artifacts_dir = "C:/Users/HP/.gemini/antigravity/brain/9ad75e8c-7bcb-4273-8ab4-9910c8bb819c"
    
    # We will search for all PDFs in the workspace
    pdf_files = []
    for root, dirs, files in os.walk(workspace_dir):
        # Skip node_modules, dist, .git, .firebase
        if any(skip in root for skip in ["node_modules", "dist", ".git", ".firebase"]):
            continue
        for file in files:
            if file.lower().endswith(".pdf"):
                pdf_files.append(os.path.join(root, file))
                
    print(f"Found {len(pdf_files)} PDF files in workspace.")
    
    for pdf_path in pdf_files:
        # Get filename and folder
        filename = os.path.basename(pdf_path)
        folder = os.path.dirname(pdf_path)
        
        # Check if there is a matching .md file in the same folder
        base_name = os.path.splitext(filename)[0]
        md_source_path = os.path.join(folder, base_name + ".md")
        
        # Determine target artifact filename
        # To avoid collisions, we'll prefix folder name if it's not the main folder
        folder_prefix = os.path.basename(folder)
        if folder_prefix in ["00_abschlussbericht", "follow_ups", "03_deliverables_pdf", "06_perplexity_skills", "07_compliance", "04_praesentationen"]:
            target_filename = f"{folder_prefix}_{base_name}.md"
        else:
            target_filename = f"{base_name}.md"
            
        target_path = os.path.join(artifacts_dir, target_filename)
        
        if os.path.exists(md_source_path):
            # If a source .md file exists, copy it directly (preserves markdown structure)
            print(f"Source MD found for {filename}: {md_source_path}. Copying...")
            try:
                shutil.copy(md_source_path, target_path)
                print(f"Copied source MD to {target_path}")
            except Exception as e:
                print(f"Error copying {md_source_path}: {e}")
        else:
            # Otherwise, extract text from PDF
            print(f"No source MD for {filename}. Extracting text from PDF...")
            extracted_text = extract_pdf_text(pdf_path)
            
            # Create a markdown document wrapper
            md_content = f"# {base_name.replace('_', ' ')}\n\n"
            md_content += f"> **HINWEIS:** Dieser Text wurde automatisch aus der PDF-Datei `{filename}` extrahiert.\n\n"
            md_content += extracted_text
            
            try:
                with open(target_path, "w", encoding="utf-8") as f:
                    f.write(md_content)
                print(f"Saved extracted text to {target_path}")
            except Exception as e:
                print(f"Error writing to {target_path}: {e}")
                
    print("PDF to MD conversion and copying finished!")

if __name__ == "__main__":
    main()
