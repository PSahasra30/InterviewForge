import requests

workspace_id = input(
    "Enter Workspace ID: "
)

response = requests.get(
    f"http://127.0.0.1:8000/pdfs/{workspace_id}"
)

print(
    response.status_code
)

print(
    response.json()
)