import os

# Check which PDF libraries are available
libraries = ["pypdf", "PyPDF2", "pdfplumber", "fitz"]
available = []
for lib in libraries:
    try:
        __import__(lib)
        available.append(lib)
    except ImportError:
        pass

print("Available PDF libraries:", available)

if "pypdf" in available:
    import pypdf
    def extract_text(pdf_path):
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"\n--- Page {i+1} ---\n"
            text += page.extract_text() or ""
        return text
elif "PyPDF2" in available:
    import PyPDF2
    def extract_text(pdf_path):
        reader = PyPDF2.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"\n--- Page {i+1} ---\n"
            text += page.extract_text() or ""
        return text
elif "pdfplumber" in available:
    import pdfplumber
    def extract_text(pdf_path):
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for i, page in enumerate(pdf.pages):
                text += f"\n--- Page {i+1} ---\n"
                text += page.extract_text() or ""
        return text
else:
    def extract_text(pdf_path):
        return "No library available for direct text extraction."

# Let's try to extract text from 01_Priorisierte_Asset_Liste.pdf
pdf_path = "03_deliverables_pdf/01_Priorisierte_Asset_Liste.pdf"
if os.path.exists(pdf_path):
    text = extract_text(pdf_path)
    print(f"Extracted {len(text)} characters from {pdf_path}")
    print(text[:500])
else:
    print(f"File {pdf_path} not found.")
