from flask import Flask, jsonify
from flask_cors import CORS
from essential_generators import DocumentGenerator
# pip install essential-generators (comand to install)

sentense  = DocumentGenerator()
app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    raw =  sentense.paragraph()
    data = raw[0:200].split()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080 , debug=True)
    

