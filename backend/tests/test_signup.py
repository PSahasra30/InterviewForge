import requests

response = requests.post(
    "http://127.0.0.1:8000/signup",
    json={
        "name": "Saha",
        "email": "saha@gmail.com",
        "password": "123456"
    }
)

print(response.status_code)
print(response.text)