import requests

response = requests.post(
    "http://127.0.0.1:8000/start-interview",
    json={
        "duration": 15,
        "difficulty": "Mixed"
    }
)

print("FIRST QUESTION")
print(response.json())

response = requests.post(
    "http://127.0.0.1:8000/submit-answer",
    json={
        "answer":
        "Object oriented programming is a programming paradigm based on classes and objects."
    }
)

print("\nEVALUATION + NEXT QUESTION")
print(response.json())