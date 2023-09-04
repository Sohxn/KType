from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    raw = "Generating a random sentence can be a great way to start a skit or improv."
    data = raw.split()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
    

