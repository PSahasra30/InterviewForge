import requests

response = requests.post(
    "http://127.0.0.1:8000/login",
    json={
        "email":
        "saha@gmail.com",

        "password":
        "123456"
    }
)

print(
    response.json()
)