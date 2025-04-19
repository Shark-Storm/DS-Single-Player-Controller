from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your phone

# Example game state or action handler (for illustration)
valid_keys = ["up", "down", "left", "right", "start", "select"]  # Example list of keys

@app.route('/press/<key>')
def press(key):
    if key in valid_keys:
        print(f"Received key press: {key}")
        # Add your emulator/game key press handling code here
        return jsonify({"status": "success", "key": key, "message": f"Pressed {key}"})
    else:
        print(f"Invalid key press: {key}")
        return jsonify({"status": "error", "message": "Invalid key"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
