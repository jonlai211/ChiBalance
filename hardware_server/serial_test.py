import serial
import os
import dotenv
import time
dotenv.load_dotenv()
arduino_serial = os.getenv('ARDUINO_SERIAL')

ser = serial.Serial(arduino_serial, 115200)

while True:
    print(ser.readline())
    time.sleep(0.5)
