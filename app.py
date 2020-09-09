from flask import Flask, jsonify
import pymongo
import json
import pandas as pd

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.project_2

# reading data from mongodb database
master_data = db.master.find_one()
# sale_data = db.sale.find_one()
# rating_sale_data = db.rating_sale.find_one()
# whatoplay_data = db.whatoplay.find_one()


# Create an instance of Flask
app = Flask(__name__)   
 
@app.route("/")
def master():   
    data = json.loads(master_data)
    # dc = data.to_dict()
    # print(data)
    return "hello"



# # @app.route("/api/kaggle")
# # def kaggle():   
    
# #     kaggle_results = master_table.find_one()
# #     return jsonify(kaggle_results)

# # @app.route("/api/whtoplay")
# # def kaggle():   
    
# #     whatoplay_results = master_table.find_one()
# #     return jsonify(whatoplay_results)

if __name__ == "__main__":
    app.run(debug = False)
