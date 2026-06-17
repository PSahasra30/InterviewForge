import requests

response = requests.get(
    "http://127.0.0.1:8000/workspaces/saha@gmail.com"
)

print(response.json())