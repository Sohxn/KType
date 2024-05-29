from flask import Flask,request, jsonify
from flask_cors import CORS
from essential_generators import DocumentGenerator
import re
from flask_pymongo import PyMongo
from datetime import datetime
# pip install essential-generators (comand to install)

sentence  = DocumentGenerator()
app = Flask(__name__)
#adding pymongo
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

#profiles collection ~ analogous to a table in sql 
profiles = mongo.db.users

#CORS 
CORS(app)

@app.route('/api/data/<int:word_count>')
def get_data(word_count):
    while(True):
        raw =  sentence.paragraph()
        raw = raw.lower()
        raw = re.sub(r"[!\"#\$%&\'\(\)\*\+,-\./:;<=>\?@\[\\\]\^_`{\|}~]" , "" , raw) #removing punctuations
        data = raw.split()
        if(len(data)>=word_count):
            return jsonify(data[:word_count])


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
        useremail = data.get('userEmail')
        username = data.get('displayName')
        response_data = {'status': 'success', 'message': 'Data received successfully'}
        print("USER PARSED: " ,useremail)
        print("USERNAME PARSED: ", username)
        
        #checking if already exists in the database
        if useremail and username :
            user_exists = profiles.find_one({"email": useremail})
            if user_exists:
                response_data = {'status': 'error', 'message': 'user already exists in collection'}
            else:
                #create a record in the collection
                new_user_data = {
                    "email": useremail,
                    "username": username,
                    "DOJ": datetime.utcnow(),
                    "lvl": 0,
                    "xp": 0,
                    "speed": 0,
                    "accuracy": 100
                }
                profiles.insert_one(new_user_data)
                response_data = {'status': 'success', 'message': 'user added in collection'}
        else:
            response_data = {'status': 'error', 'message': 'user could not be added in collection'}
        
        return jsonify(response_data), 200
    

    except Exception as e:
        # Handle any exceptions that might occur during processing
        error_message = str(e)
        response_data = {'status': 'error', 'message': error_message}
        return jsonify(response_data), 500

if __name__ == '__main__':
    accuracy=0
    app.run(host='0.0.0.0',port=8080 , debug=True)
    

