from flask import Flask,request, jsonify
from flask_cors import CORS
from essential_generators import DocumentGenerator
import re
# pip install essential-generators (comand to install)

sentence  = DocumentGenerator()
app = Flask(__name__)
CORS(app)

@app.route('/api/data/<int:word_count>')
def get_data(word_count):
    raw =  sentence.paragraph()
    raw = raw.lower()
    raw = re.sub(r"[!\"#\$%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]" , "" , raw) #removing punctuations
    data = raw.split()[:word_count]
    return jsonify(data)


#hello
@app.route('/api/new_accuracy', methods=['POST'])
def set_accur():
    try:
        global accuracy
        # Get the JSON data from the request
        data = request.get_json()
        # Assuming the data has a key 'accur'
        accuracy = data.get('accur')
        response_data = {'status': 'success', 'message': 'Data received successfully'}
        return jsonify(response_data), 200
    except Exception as e:
        # Handle any exceptions that might occur during processing
        error_message = str(e)
        response_data = {'status': 'error', 'message': error_message}
        return jsonify(response_data), 500

@app.route('/api/get_accuracy')
def get_accuracy():
    global accuracy
    return jsonify({"accurracy":accuracy})

@app.route('/api/get_words_per_min')
def get_words_per_min():
    global words_per_min
    return jsonify({"words_per_min":words_per_min})


@app.route('/api/new_user', methods=['POST'])
def new_user():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        # Assuming the data has a key 'accur'
        user = data.get('user')
        response_data = {'status': 'success', 'message': 'Data received successfully'}
        print(user)
        return jsonify(response_data), 200
    except Exception as e:
        # Handle any exceptions that might occur during processing
        error_message = str(e)
        response_data = {'status': 'error', 'message': error_message}
        return jsonify(response_data), 500

if __name__ == '__main__':
    accuracy=0
    app.run(host='0.0.0.0',port=8080 , debug=True)
    

