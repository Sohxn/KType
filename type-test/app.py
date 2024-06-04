from flask import Flask,request, jsonify
from flask_cors import CORS
from essential_generators import DocumentGenerator
import re
import math
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
        


#obtain the current wpm
#obtain the average wpm from database
#calculate the new average
#push it into the database
@app.route('/api/new_speed', methods=['POST'])
def update_speed():
    try:
        print("SPEED UPDATE COMMAND")
        data = request.get_json()
        usremail = data.get('email')
        curr_sp = data.get('wpm')
        profiles.update_one(
            {'email': usremail},
            {'$inc': {'sessions': 1}}
        )
        #calculation
        record = profiles.find_one({'email': usremail})
        sp = record['total_speed'] #this is the avg speed of sesh sessions
        sesh = record['sessions']
        temp = (sp + curr_sp)/sesh
        new_avg = math.ceil(temp)
        #updation
        profiles.update_one(
            {'email': usremail},
            {'$set': {'avg_speed': new_avg}}
        )
        profiles.update_one(
            {'email': usremail},
            {'$inc': {'total_speed': curr_sp}}
        )
        response_data = {'status':'success', 'message': 'speed updated successfully'}
        return jsonify(data)

    except Exception as e:
        error_message = str(e)
        response_data = {'status': 'error', 'message': error_message}
        return jsonify(response_data), 500

@app.route('/api/new_accuracy', methods=['POST'])
def update_accuracy():
    print("ACCURACY UPDATE COMMAND")
    data = request.get_json()
    return jsonify(data)

#fetch speed and accuracy from database
#send both speed and accuracy data to dashboard
#similar implementation to wordcount
@app.route('/api/stats/<email>')
def stats(email):
    try:
        record = profiles.find_one(
            {'email': email},
        )
        if record:
            speed = record['avg_speed']
            acc = record['accuracy']
            print("APP.PY")
            print(speed)
            print(acc)
            return jsonify({
                'speed': speed,
                'accuracy': acc,
            })
        else:
            return jsonify({'status': 'error', 'message': 'User does not exist'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

#creation of a new record in the database collection
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
                    "sessions": 0, #to be incremented by 1 
                    "lvl": 0,
                    "xp": 0,
                    "avg_speed": 0,
                    "total_speed": 0,
                    "accuracy": 100,
                    "consistency": 100,
                    "session_speed": [],
                    "all_sessions": [],
                    "reaction_time_shooting": 0,
                    "HBL ratio": [0,0,0],
                    "high_score_jet": 0 
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
    

