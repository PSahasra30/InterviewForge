from fastapi import APIRouter
from pydantic import BaseModel

from langchain_chroma import Chroma

import os

from app.rag.embeddings import (
    get_embedding_model
)

from app.services.interview_service import (
    create_interview_questions
)

from app.services.interview_session import (
    interview_session
)

from app.services.report_service import (
    generate_interview_report
)

from datetime import datetime

from app.models.interview_report_model import (
    interview_reports_collection
)

router = APIRouter()


class InterviewRequest(
    BaseModel
):
    workspace_id: str
    source_pdf: str
    duration: int
    difficulty: str
    interview_type: str


class AnswerRequest(
    BaseModel
):
    workspace_id: str
    answer: str

class FinishInterviewRequest(
    BaseModel
):
    workspace_id: str
    answers: list[str]


@router.post("/start-interview")
def start_interview(
    data: InterviewRequest
):

    duration_map = {
        15: 5,
        30: 10,
        45: 15,
        60: 20
    }

    question_count = duration_map.get(
        data.duration,
        10
    )

    embeddings = get_embedding_model()

    workspace_db = os.path.join(
        "chroma_db",
        data.workspace_id
    )

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
    print("=" * 50)
    print(
            "SELECTED PDF:",
            data.source_pdf
        )
    print(
            "TOTAL DOCS:",
            len(documents)
        )
    print(
            "FILTERED DOCS:",
            len(filtered_docs)
        )

    if len(filtered_docs) > 0:

            print(
                filtered_docs[0][:500]
            )

    print("=" * 50)

    for metadata in metadatas:
      print("METADATA:", metadata)

    print("=" * 50)

    context = "\n\n".join(
        filtered_docs
    )

    questions = create_interview_questions(
        context=context,
        count=question_count,
        difficulty=data.difficulty,
        interview_type=data.interview_type
    )

    interview_session[
        data.workspace_id
    ] = {

        "questions":
        questions,

        "current_question":
        0,

        "answers":
        [],

        "source_pdf":
        data.source_pdf,

        "difficulty":
        data.difficulty,

        "interview_type":
        data.interview_type,

        "duration":
        data.duration,

        "started_at":
        datetime.utcnow()

    }

    if len(questions) == 0:

        return {

            "message":
            "Unable to generate interview questions. Please check API quota."

        }

    return {

    "questions":
    questions,

    "total_questions":
    len(questions)

}


@router.post("/submit-answer")
def submit_answer(
    data: AnswerRequest
):

    session = interview_session.get(
        data.workspace_id
    )

    if not session:

        return {
            "message":
            "Interview session not found"
        }

    session["answers"].append(
        data.answer
    )

    session["current_question"] += 1

    current = session[
        "current_question"
    ]

    questions = session[
        "questions"
    ]

    if current >= len(questions):

        report = generate_interview_report(

            questions=session[
                "questions"
            ],

            answers=session[
                "answers"
            ]

        )

        interview_reports_collection.insert_one(

            {

                "workspace_id":
                data.workspace_id,

                "questions":
                session["questions"],

                "answers":
                session["answers"],

                "report":
                report,

                "created_at":
                datetime.utcnow()

            }

        )

        return {

            "message":
            "Interview Completed",

            "report":
            report

        }

    return {

        "question_number":
        current + 1,

        "total_questions":
        len(questions),

        "question":
        questions[current]

    }

@router.post(
    "/finish-interview"
)
def finish_interview(
    data: FinishInterviewRequest
):

    session = interview_session.get(
        data.workspace_id
    )

    if not session:

        return {
            "message":
            "Interview session not found"
        }

    report = generate_interview_report(

        questions=session[
            "questions"
        ],

        answers=data.answers

    )

    interview_reports_collection.insert_one(

        {

            "workspace_id":
            data.workspace_id,

            "questions":
            session["questions"],

            "answers":
            data.answers,

            "report":
            report,

            "created_at":
            datetime.utcnow()

        }

    )

    return {

        "message":
        "Interview Completed",

        "report":
        report

    }

@router.get(
    "/interview-reports/{workspace_id}"
)
def get_interview_reports(
    workspace_id: str
):

    reports = list(

        interview_reports_collection.find(
            {
                "workspace_id":
                workspace_id
            }
        ).sort(
            "created_at",
            -1
        )

    )

    for report in reports:

        report["_id"] = str(
            report["_id"]
        )

    return reports