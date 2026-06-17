import requests

response = requests.post(
    "http://127.0.0.1:8000/generate-questions",
    json={
        "count": 5,
        "difficulty": "Medium"
    }
)

print(
    response.json()["questions"]
)