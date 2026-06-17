import requests

response = requests.post(

    "http://127.0.0.1:8000/workspace",

    json={
        "user_email":
        "saha@gmail.com",

        "workspace_name":
        "Java Preparation"
    }
)

print(
    response.json()
)