from flask import Flask, request
import json
import pandas as pd

//Create instance for flask app:

app = Flask(__name__)

// Create route that renders html and javascript for each page:
@app.route("/")
def page1():
    return(index.html, map.js)

@app.route("/")
def page2():
    return(per_year.html, per_year.js)

@app.route("/")
def page3():
    return(over_year.html, overyear1.js, overyear2.js)   

@app.route("/")
def page4():
    return(correlation.html, correlations.js)


if __name__ == "__main__":
    app.run(debug = True)
