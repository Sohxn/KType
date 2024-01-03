from flask import Flask, jsonify
from flask_cors import CORS
from essential_generators import DocumentGenerator
import re
# pip install essential-generators (comand to install)

sentence  = DocumentGenerator()
app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    raw =  sentence.paragraph()
    raw = re.sub(r"[!\"#\$%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]" , "" , raw) #removing punctuations
    data = raw[0:200].split()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080 , debug=True)
    

