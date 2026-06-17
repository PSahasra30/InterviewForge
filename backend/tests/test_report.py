import requests

# Start interview
response = requests.post(
    "http://127.0.0.1:8000/start-interview",
    json={
        "duration": 15,
        "difficulty": "Mixed"
    }
)

data = response.json()

print("Interview Started")
print(data)

# Answer all questions
for i in range(5):

    response = requests.post(
        "http://127.0.0.1:8000/submit-answer",
        json={
            "answer":
            "This is my sample answer"
        }
    )

    result = response.json()

    print("\n-------------------")

    if "report" in result:
        print("FINAL REPORT")
        print(result["report"])
        break

    print(result["question"])