from flask import Flask
from flask_cors import CORS
import airPollution

__name__ = "main"
app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET", "OPTIONS"])
def index():
    return "HELLO!"

@app.route("/ap-graph1/<date>")
def apGraph1(date):
    print("HELLO")
    # data = airPollution.begin()
    graph = airPollution.graph1(date)
    # response = Flask.json_encoder(graph)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return graph
    # return "AIR POLLUTION"

# @app.route("/ap-graph1")
# def apGraph():
#     graphData = airPollution.g