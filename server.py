from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Create data folder
os.makedirs("data", exist_ok=True)

FILE_PATH = "data/sensor_data.csv"

# Create CSV file with header if not exists
if not os.path.exists(FILE_PATH):
    with open(FILE_PATH, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["Time","Millis","Temperature","Humidity","CO_Analog","CO_Digital"])


# 🟢 Home route (fix Not Found issue)
@app.route('/')
def home():
    return "Weather Monitoring Backend is LIVE 🚀"


# 🟢 ESP sends data here
@app.route('/data', methods=['POST'])
def receive_data():
    try:
        data = request.json

        now = datetime.now().strftime("%H:%M:%S")

        row = [
            now,
            data.get("millis"),
            data.get("temperature"),
            data.get("humidity"),
            data.get("mq7Analog"),   # sensor still MQ7
            data.get("mq7Digital")
        ]

        with open(FILE_PATH, 'a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(row)

        print("Saved:", row)

        return {"status": "saved"}

    except Exception as e:
        return {"error": str(e)}


# 🔵 React / Browser fetch data
@app.route('/get-data')
def get_data():
    result = {
        "time": [],
        "temperature": [],
        "humidity": [],
        "co": []   # ✅ changed
    }

    if not os.path.exists(FILE_PATH):
        return jsonify(result)

    try:
        with open(FILE_PATH, 'r', encoding='utf-8') as file:
            lines = file.readlines()

            # Skip header
            for line in lines[1:]:
                parts = line.strip().split(',')

                if len(parts) < 6:
                    continue

                result["time"].append(parts[0])
                result["temperature"].append(float(parts[2]))
                result["humidity"].append(float(parts[3]))
                result["co"].append(int(parts[4]))   # ✅ changed

    except Exception as e:
        print("Error:", e)

    return jsonify(result)


# 🚀 Run server (Render compatible)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)