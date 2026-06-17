from fastapi import APIRouter
from pydantic import BaseModel
import os

from app.rag.embeddings import (
    get_embedding_model
)

from app.rag.retriever import (
    get_retriever
)

from app.services.qa_service import (
    generate_answer
)

from app.models.chat_model import (
    chat_collection
)

router = APIRouter()


class QuestionRequest(BaseModel):

    workspace_id: str
    question: str


@router.post("/ask")
def ask_question(
    data: QuestionRequest
):

    greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening"
    ]

    if data.question.lower().strip() in greetings:

        return {
            "answer":
            "Hello! 👋 I am your AI Interview Assistant. Upload PDFs and ask questions."
        }

    workspace_db = os.path.join(
        "chroma_db",
        data.workspace_id
    )

    if not os.path.exists(
        workspace_db
    ):

        return {
            "answer":
            "Please upload PDFs to this workspace first."
        }

    embeddings = get_embedding_model()

    retriever = get_retriever(
        embeddings,
        data.workspace_id
    )

    docs = retriever.invoke(
        data.question
    )

    context = "\n\n".join(
        [
            doc.page_content
            for doc in docs
        ]
    )

    previous_messages = list(

        chat_collection.find(
            {
                "workspace_id":
                data.workspace_id
            }
        ).sort(
            "created_at",
            -1
        ).limit(8)

    )

    previous_messages.reverse()

    chat_history = "\n".join(

        [
            f"{msg['role']}: {msg['message']}"
            for msg in previous_messages
        ]

    )

    answer = generate_answer(
        context,
        data.question,
        chat_history
    )

    return {
        "answer":
        answer
    }


@router.delete(
    "/chat-history/{workspace_id}"
)
def clear_chat_history(
    workspace_id: str
):

    chat_collection.delete_many(
        {
            "workspace_id":
            workspace_id
        }
    )

    return {
        "message":
        "Chat history cleared"
    }