import serial
import os
import dotenv
import time
import json
dotenv.load_dotenv()
arduino_serial = os.getenv('ARDUINO_SERIAL')

try:
    ser = serial.Serial(arduino_serial, 115200)
except serial.SerialException:
    ser = None

#path of os
path = os.path.join(os.path.dirname(__file__), 'data/heartrate.json')
print(path)

def collect_and_average(num_readings=20):
    # Initialize variables
    data_buffer = []

    # Check if serial is available
    if ser and ser.is_open:
        for _ in range(num_readings):
            # Read data from serial
            line = ser.readline().decode('utf-8').strip()
            data = json.loads(line)  # Assuming the data is in JSON format
            data_buffer.append(data)
    else:
        # Fallback to reading from the JSON file
        if os.path.exists(path):
            with open(path, 'r') as file:
                data_buffer = json.load(file)
        else:
            return json.dumps({"error": "No data available"})

    # Calculate averages
    avg_bpm = sum(item['BPM'] for item in data_buffer) / len(data_buffer)
    avg_avg_bpm = sum(item['Avg BPM'] for item in data_buffer) / len(data_buffer)

    # Prepare result
    result = {
        "Average BPM": avg_bpm,
        "Average Avg BPM": avg_avg_bpm
    }

    # Return result in JSON format
    return json.dumps(result)

# Example usage
result = collect_and_average(ser)
print(result)
