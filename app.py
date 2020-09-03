from flask import Flask, jsonify
import pymongo
import json

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.project_2

# reading data from mongodb database
master_data = db.master.find_one()
kaggle_data = db.kaggle.find_one()
whatoplay_data = db.whatoplay.find_one()

# Create an instance of Flask
app = Flask(__name__)   
 
@app.route("/")
def master():   
    
    return jsonify(master_data)

# @app.route("/api/kaggle")
# def kaggle():   
    
#     kaggle_results = master_table.find_one()
#     return jsonify(kaggle_results)

# @app.route("/api/whtoplay")
# def kaggle():   
    
#     whatoplay_results = master_table.find_one()
#     return jsonify(whatoplay_results)

if __name__ == "__main__":
    app.run(debug = False)
