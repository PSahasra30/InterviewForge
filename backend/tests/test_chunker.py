from app.services.pdf_service import extract_pdf_text
from app.rag.chunker import create_chunks

documents = extract_pdf_text("uploads/OOPS in java.pdf")

chunks = create_chunks(documents)

print("Total Pages:", len(documents))
print("Total Chunks:", len(chunks))

print("\nFirst Chunk:\n")
print(chunks[0].page_content[:500])