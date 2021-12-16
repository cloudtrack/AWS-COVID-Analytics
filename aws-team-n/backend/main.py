from flask import Flask
from flask_cors import CORS
import stockMarket
import unemployment
import covid
from flask import jsonify, json

__name__ = "main"
app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET", "OPTIONS"])
def index():
    return "HELLO!"


@app.route("/unemployment/covid", methods=["GET"])
def confirmed_cases():
    data = unemployment.confirmed_cases()
    return data


@app.route("/unemployment/all", methods=["GET"])
def unemployment_rate():
    data = unemployment.rate()
    return data


@app.route("/unemployment/youth", methods=["GET"])
def unemployment_rate_youth():
    data = unemployment.youth()
    return data


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
