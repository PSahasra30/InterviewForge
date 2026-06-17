from app.rag.embeddings import get_embedding_model
from app.rag.retriever import get_retriever

embeddings = get_embedding_model()

retriever = get_retriever(embeddings)

docs = retriever.invoke(
    "What is Object Oriented Programming?"
)

print("Retrieved docs:", len(docs))

for doc in docs:
    print("-" * 50)
    print(doc.page_content[:300])