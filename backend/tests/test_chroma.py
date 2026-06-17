from app.services.pdf_service import extract_pdf_text
from app.rag.chunker import create_chunks
from app.rag.embeddings import get_embedding_model
from app.rag.vector_store import create_vector_store

documents = extract_pdf_text("uploads/OOPS in java.pdf")   # replace if needed

chunks = create_chunks(documents)

embeddings = get_embedding_model()

vector_store = create_vector_store(
    chunks,
    embeddings
)

print("Chunks Stored:", len(chunks))
print("ChromaDB Created Successfully")