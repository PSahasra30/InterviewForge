import requests

workspace_id = input(
    "Workspace ID: "
)

pdf_path = input(
    "PDF Path: "
)

with open(
    pdf_path,
    "rb"
) as file:

    response = requests.post(
        "http://127.0.0.1:8000/upload-pdf",
        data={
            "workspace_id":
            workspace_id
        },
        files={
            "file":
            file
        }
    )

print(
    response.status_code
)

print(
    response.json()
)