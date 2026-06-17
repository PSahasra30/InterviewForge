import requests

response = requests.post(
    "http://127.0.0.1:8000/start-interview",
    json={
        "duration": 15,
        "difficulty": "Mixed"
    }
)

print("\nFIRST QUESTION\n")
print(response.json())

response = requests.post(
    "http://127.0.0.1:8000/submit-answer",
    json={
        "answer":
        "This is my answer"
    }
)

print("\nNEXT QUESTION\n")
print(response.json())