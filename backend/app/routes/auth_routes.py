from fastapi import (
    APIRouter,
    HTTPException
)

from pydantic import BaseModel

from app.models.user_model import (
    users_collection
)

from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(
    data: SignupRequest
):

    existing_user = users_collection.find_one(
        {
            "email": data.email
        }
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail=
            "Email already registered"
        )

    user = {
        "name": data.name,
        "email": data.email,
        "password":
        hash_password(
            data.password
        )
    }

    users_collection.insert_one(
        user
    )

    token = create_access_token(
        {
            "email": data.email
        }
    )

    return {
        "message": "User registered successfully",
        "access_token": token,
        "name": data.name,
        "email": data.email
    }

@router.post("/login")
def login(
    data: LoginRequest
):

    user = users_collection.find_one(
        {
            "email": data.email
        }
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail=
            "Invalid credentials"
        )

    if not verify_password(
        data.password,
        user["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail=
            "Invalid credentials"
        )

    token = create_access_token(
        {
            "email":
            user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "name": user["name"],
        "email": user["email"]
    }