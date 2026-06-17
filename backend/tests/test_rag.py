from app.rag.embeddings import get_embedding_model
from app.rag.retriever import get_retriever
from app.services.qa_service import generate_answer

question = "What is Object Oriented Programming?"

embeddings = get_embedding_model()

retriever = get_retriever(embeddings)

docs = retriever.invoke(question)

context = "\n\n".join(
    [doc.page_content for doc in docs]
)

answer = generate_answer(
    context,
    question
)

print("\nANSWER:\n")
print(answer)