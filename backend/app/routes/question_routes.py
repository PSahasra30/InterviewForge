from fastapi import APIRouter
from pydantic import BaseModel
from langchain_chroma import Chroma
import os

from app.rag.embeddings import (
    get_embedding_model
)

from app.services.question_generator import (
    generate_questions
)

router = APIRouter()


class QuestionGenerationRequest(
    BaseModel
):
    workspace_id: str
    count: int
    difficulty: str
    question_type: str
    source_pdf: str


@router.post(
    "/generate-questions"
)
def generate_interview_questions(
    data: QuestionGenerationRequest
):

    embeddings = get_embedding_model()

    workspace_db = os.path.join(
        "chroma_db",
        data.workspace_id
    )

    if not os.path.exists(
        workspace_db
    ):

        return {
            "questions":
            [
                "Please upload PDFs to this workspace first."
            ]
        }

    vector_store = Chroma(
        persist_directory=workspace_db,
        embedding_function=embeddings
    )

    all_docs = vector_store.get(
        include=[
            "documents",
            "metadatas"
        ]
    )

    documents = all_docs[
        "documents"
    ]

    metadatas = all_docs[
        "metadatas"
    ]

    filtered_docs = []

    if data.source_pdf == "All Documents":

        filtered_docs = documents

    else:

        for doc, metadata in zip(
            documents,
            metadatas
        ):

            if metadata.get(
                "source"
            ) == data.source_pdf:

                filtered_docs.append(
                    doc
                )

    context = "\n\n".join(
        filtered_docs
    )

    questions = generate_questions(
        context,
        data.count,
        data.difficulty,
        data.question_type
    )

    return {
        "questions":
        questions
    }