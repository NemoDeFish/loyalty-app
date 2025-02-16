import requests
import mysql.connector

# Connect to Local Database
local_db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="10052001",
    database="loyalty_app"
)
cursor = local_db.cursor()

# Fetch customer data
cursor.execute("SELECT phone_number, points FROM users")
data = cursor.fetchall()

data = [('0168400877', 1), ('0198833600', 200), ('0168010808', 100)]

# API endpoint
api_url = "http://192.168.68.112:8000/api/sync"

# Send data to the API
for row in data:
    phone, points = row
    payload = {"phone_number": phone, "points": points}

    response = requests.post(api_url, json=payload)
    
    print(f"Sent: {payload} | Response: {response.json()}")

# Close connection
cursor.close()
local_db.close()
