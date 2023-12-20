import requests

def fetch():
    api_url="http://127.0.0.1:8000/"
    response=requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        print(data)
    else:
        print("error")
    
fetch()
