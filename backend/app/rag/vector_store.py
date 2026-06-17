from langchain_chroma import Chroma
import os

def create_vector_store(
    chunks,
    embeddings,
    workspace_id
):

    persist_directory = os.path.join(
        "chroma_db",
        workspace_id
    )

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=persist_directory
    )

    return vector_store