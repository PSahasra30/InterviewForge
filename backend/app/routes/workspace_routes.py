from fastapi import APIRouter
from pydantic import BaseModel
from bson import ObjectId

from app.models.workspace_model import (
    workspaces_collection
)

router = APIRouter()


class WorkspaceRequest(BaseModel):
    user_email: str
    workspace_name: str


@router.post("/workspace")
def create_workspace(
    data: WorkspaceRequest
):

    workspace = {
        "user_email":
        data.user_email,

        "workspace_name":
        data.workspace_name
    }

    result = workspaces_collection.insert_one(
        workspace
    )

    return {
        "message":
        "Workspace Created",

        "workspace_id":
        str(result.inserted_id)
    }


@router.get("/workspaces/{user_email}")
def get_workspaces(
    user_email: str
):

    workspaces = list(
        workspaces_collection.find(
            {
                "user_email":
                user_email
            }
        )
    )

    for workspace in workspaces:

        workspace["_id"] = str(
            workspace["_id"]
        )

    return workspaces


@router.get("/workspace/{workspace_id}")
def get_workspace(
    workspace_id: str
):

    workspace = (
        workspaces_collection.find_one(
            {
                "_id":
                ObjectId(
                    workspace_id
                )
            }
        )
    )

    if not workspace:

        return {
            "message":
            "Workspace not found"
        }

    workspace["_id"] = str(
        workspace["_id"]
    )

    return workspace