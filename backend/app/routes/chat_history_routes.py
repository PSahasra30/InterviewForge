from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

from app.models.chat_model import (
    chat_collection
)

router = APIRouter()


class ChatMessageRequest(
    BaseModel
):
    workspace_id: str
    role: str
    message: str


@router.post(
    "/chat-message"
)
def save_chat_message(
    data: ChatMessageRequest
):

    chat_collection.insert_one(
        {
            "workspace_id":
            data.workspace_id,

            "role":
            data.role,

            "message":
            data.message,

            "created_at":
            datetime.utcnow()
        }
    )

    return {
        "message":
        "Saved"
    }


@router.get(
    "/chat-history/{workspace_id}"
)
def get_chat_history(
    workspace_id: str
):

    messages = list(

        chat_collection.find(
            {
                "workspace_id":
                workspace_id
            }
        ).sort(
            "created_at",
            1
        )
    )

    for message in messages:

        message["_id"] = str(
            message["_id"]
        )

    return messages