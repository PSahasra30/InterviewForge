import requests

response = requests.post(
    "http://127.0.0.1:8000/start-interview",
    json={
        "duration": 30,
        "difficulty": "Mixed"
    }
)

print(response.json())