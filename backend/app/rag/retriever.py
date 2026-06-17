from langchain_chroma import Chroma
import os

def get_retriever(
    embeddings,
    workspace_id
):

    persist_directory = os.path.join(
        "chroma_db",
        workspace_id
    )

    vector_store = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 10}
    )

    return retriever