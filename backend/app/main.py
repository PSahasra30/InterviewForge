from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.pdf_routes import router as pdf_router
from app.routes.chat_routes import router as chat_router
from app.routes.question_routes import (
    router as question_router
)
from app.routes.interview_routes import (
    router as interview_router
)
from app.routes.auth_routes import (
    router as auth_router
)
from app.routes.workspace_routes import (
    router as workspace_router
)

from app.routes.chat_history_routes import (
    router as chat_history_router
)

app = FastAPI()

app.mount(
    "/uploads",
    StaticFiles(
        directory="uploads"
    ),
    name="uploads"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router)
app.include_router(chat_router)
app.include_router(question_router)
app.include_router(interview_router)
app.include_router(auth_router)
app.include_router(workspace_router)
app.include_router(chat_history_router)

@app.get("/")
def home():

    return {
        "message":
        "Backend is running successfully"
    }