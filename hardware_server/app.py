import json
from flask import Flask, jsonify
from heartbeat import collect_and_average
import os
import dotenv
dotenv.load_dotenv()
port = os.getenv('PORT')

app = Flask(__name__)

# Initialize the serial connection

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/heartbeat')
def heartbeat():
    result = collect_and_average(20)
    print(result)
    return result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)