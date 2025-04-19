from flask import Flask
import keyboard  # only works on your computer

app = Flask(__name__)

key_map = {
    'a': 'x',    # Change these to match your DeSmuME controls
    'b': 'z',
    'start': 'enter',
    'select': 'shift',
    'up': 'up',
    'down': 'down',
    'left': 'left',
    'right': 'right'
}

@app.route('/press/<button>', methods=['GET'])
def press_button(button):
    if button in key_map:
        keyboard.press_and_release(key_map[button])
        return f"Pressed {button}", 200
    else:
        return f"Unknown button: {button}", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
