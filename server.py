from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your phone

@app.route('/press/<key>')
def press(key):
    print(f"Received key press: {key}")
    # Replace with your emulator key press code
    return f"Pressed {key}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
