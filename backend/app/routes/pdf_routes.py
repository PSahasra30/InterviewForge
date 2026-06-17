from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

import os

from bson import ObjectId

from langchain_chroma import Chroma

from app.services.pdf_service import (
    extract_pdf_text
)

from app.services.document_service import (
    extract_docx_text,
    extract_md_text,
    extract_txt_text
)

from app.rag.chunker import (
    create_chunks
)

from app.rag.embeddings import (
    get_embedding_model
)

from app.rag.vector_store import (
    create_vector_store
)

from app.models.pdf_model import (
    pdfs_collection
)


router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/upload-pdf")
async def upload_pdf(

    workspace_id: str = Form(...),

    file: UploadFile = File(...)
):

    workspace_folder = os.path.join(
        UPLOAD_FOLDER,
        workspace_id
    )

    os.makedirs(
        workspace_folder,
        exist_ok=True
    )

    file_path = os.path.join(
        workspace_folder,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        content = await file.read()

        buffer.write(
            content
        )

    file_extension = os.path.splitext(
        file.filename
    )[1].lower()

    documents = []

    if file_extension == ".pdf":

        documents = extract_pdf_text(
            file_path
        )

    elif file_extension == ".docx":

        documents = extract_docx_text(
            file_path
        )

    elif file_extension == ".md":

        documents = extract_md_text(
            file_path
        )

    elif file_extension == ".txt":

        documents = extract_txt_text(
            file_path
        )

    else:

        return {
            "message":
            "Unsupported file type"
        }

    chunks = []

    if documents:

        chunks = create_chunks(
            documents
        )
        for chunk in chunks:

            chunk.metadata["source"] = (
            file.filename
            )

            chunk.metadata["file_name"] = (
                file.filename
            )

            chunk.metadata["workspace_id"] = (
                workspace_id
            )

        print("=" * 50)
        print(
            "FILE:",
            file.filename
        )
        print(
            "DOCUMENTS:",
            len(documents)
        )
        print(
            "CHUNKS:",
            len(chunks)
        )
        print("=" * 50)

        if len(chunks) > 0:

            embeddings = (
                get_embedding_model()
            )

            create_vector_store(
                chunks,
                embeddings,
                workspace_id
            )

    pdfs_collection.insert_one(
        {
            "workspace_id":
            workspace_id,

            "pdf_name":
            file.filename,

            "file_path":
            file_path
        }
    )

    return {

        "message":
        f"{file.filename} uploaded successfully",

        "pages":
        len(documents),

        "chunks":
        len(chunks)
    }


@router.get(
    "/pdfs/{workspace_id}"
)
def get_pdfs(
    workspace_id: str
):

    pdfs = list(

        pdfs_collection.find(
            {
                "workspace_id":
                workspace_id
            }
        )
    )

    for pdf in pdfs:

        pdf["_id"] = str(
            pdf["_id"]
        )

    return pdfs


@router.delete("/pdf/{pdf_id}")
def delete_pdf(
    pdf_id: str
):

    pdf = pdfs_collection.find_one(
        {
            "_id":
            ObjectId(pdf_id)
        }
    )

    if not pdf:

        return {
            "message":
            "PDF not found"
        }

    try:

        vector_store = Chroma(

            persist_directory=
            os.path.join(
                "chroma_db",
                pdf["workspace_id"]
            ),

            embedding_function=
            get_embedding_model()
        )

        vector_store.delete(

            where={
                "file_name":
                pdf["pdf_name"]
            }

        )

        print(
            f"Deleted embeddings for {pdf['pdf_name']}"
        )

    except Exception as e:

        print(
            "Vector delete error:",
            e
        )

    if os.path.exists(
        pdf["file_path"]
    ):

        os.remove(
            pdf["file_path"]
        )

    pdfs_collection.delete_one(
        {
            "_id":
            ObjectId(pdf_id)
        }
    )

    return {
        "message":
        "PDF deleted successfully"
    }