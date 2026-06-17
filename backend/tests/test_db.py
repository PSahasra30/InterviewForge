# test_db.py

from langchain_chroma import Chroma
from app.rag.embeddings import get_embedding_model

embeddings = get_embedding_model()

db = Chroma(
    persist_directory="chroma_db",
    embedding_function=embeddings
)

print("Document Count:", db._collection.count())