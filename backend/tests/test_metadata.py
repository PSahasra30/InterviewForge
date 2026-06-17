# test_metadata.py

from app.services.pdf_service import extract_pdf_text

docs = extract_pdf_text(
    "uploads/OOPS in Java.pdf"
)

print(docs[0].metadata)