from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    raw = "look life through become run over what more then not such also feel which this need I what it line nation help about more into not in say each who at group many tell during for man both any thing after other than when line which go turn call little"
    data = raw.split()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080 , debug=True)
    

