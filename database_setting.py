# You need to run this  just once

import pymongo
import json


# Reading json data:

with open('data/json/master_table.json') as f:
  master_data = json.load(f)

with open('data/json/kaggle_data.json') as f:
  kaggle_data = json.load(f)
  
with open('data/json/whatoplay_data.json') as f:
  whatoplay_data = json.load(f)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.project_2

# inserting our data into mongodb database
master_table = db.master
master_table.insert_one(master_data)

kaggle_table = db.kaggle
kaggle_table.insert_one(kaggle_data)

whatoplay_table = db.whatoplay
whatoplay_table.insert_one(whatoplay_data)