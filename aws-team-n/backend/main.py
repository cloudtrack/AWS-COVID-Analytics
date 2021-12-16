from flask import Flask
from flask_cors import CORS
import airPollution
import stockMarket
from flask import jsonify, json

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
@app.route("/sm-graph1/africa", methods=["GET"])
def africa():
    graph = stockMarket.africa()
    return graph

@app.route("/sm-graph1/asia", methods=["GET"])
def asia():
    graph = stockMarket.asia()
    return graph

@app.route("/sm-graph1/europe", methods=["GET"])
def europe():
    graph = stockMarket.europe()
    return graph

@app.route("/sm-graph1/namerica", methods=["GET"])
def namerica():
    graph = stockMarket.namerica()
    return graph

@app.route("/sm-graph1/samerica", methods=["GET"])
def samerica():
    graph = stockMarket.samerica()
    return graph

@app.route("/sm-graph1/oceania", methods=["GET"])
def oceania():
    graph = stockMarket.oceania()
    return graph

@app.route("/sm-graph2/worldmap", methods=["GET"])
def worldmap():
    graph = stockMarket.worldmap()
    return graph

@app.route("/sm-graph3/krpredict", methods=["GET"])
def krpredict():
    graph = stockMarket.krpredict()
    return graph

@app.route("/sm-graph3/usapredict", methods=["GET"])
def usapredict():
    graph = stockMarket.usapredict()
    return graph

@app.route("/sm-graph4/sectordetail", methods=["GET"])
def sectorDetail():
    graph = stockMarket.sectorDetail()
    return graph

if __name__ == "__main__":
    app.debug=True
    app.run('0.0.0.0', port=5001)