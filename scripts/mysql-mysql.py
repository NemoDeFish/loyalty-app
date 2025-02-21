import time
import mysql.connector
import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")
API_URL = os.getenv("API_URL") 

def get_mysql_connection():
    """Reusable function to establish MySQL connection."""
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        buffered=True
    )

# Initial connection to MySQL
mysql_conn = get_mysql_connection()
mysql_cursor = mysql_conn.cursor()
# Set transaction isolation to avoid stale reads
mysql_cursor.execute("SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;")

def sync_to_mongodb():
    global mysql_conn, mysql_cursor

    # Fetch unsynced records
    mysql_cursor.execute("SELECT * FROM points_change_log WHERE synced = 0")
    changes = mysql_cursor.fetchall()
    
    if not changes:
        print("No new changes to sync.")
        return

    for change in changes:
        id, phone_number, old_points, new_points, timestamp, sync = change
        payload = {"phone_number": phone_number, "points": new_points}

        try:
            response = requests.post(API_URL, json=payload)
            if response.status_code == 200:
                print(f"Updated points for {phone_number} to {new_points}.")
            else:
                print(f"Failed to sync {payload}: {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error syncing {payload}: {e}")

        # Mark the record as synced
        mysql_cursor.execute("UPDATE points_change_log SET synced = 1 WHERE id = %s", (id,))
        mysql_conn.commit()

    print("Sync complete!")

# Polling loop (run indefinitely, checks every 5 seconds)
try:
    while True:
        sync_to_mongodb()
        time.sleep(5)  # Sleep for 5 seconds before checking again
except KeyboardInterrupt:
    print("Syncing stopped.")
    mysql_cursor.close()
    mysql_conn.close()