import KRPredict from "../../components/StockMarket/Predict/KRPredict";
import USPredict from "../../components/StockMarket/Predict/USPredict";
import "./Predict.css";

const Predict = () => {
  return (
    <div className="predict">
      <div className="title">Stock Index Prediction</div>
      <div className="graphs-prediction">
        <div className="graph-prediction">
          <KRPredict />
        </div>
        <div className="graph-prediction">
          <USPredict />
        </div>
      </div>
    </div>
  );
};
export default Predict;
