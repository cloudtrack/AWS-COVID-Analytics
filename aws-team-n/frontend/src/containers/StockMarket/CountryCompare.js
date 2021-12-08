import Africa from "../../components/StockMarket/Continent/Africa";
import Asia from "../../components/StockMarket/Continent/Asia";
import Europe from "../../components/StockMarket/Continent/Europe";
import NAmerica from "../../components/StockMarket/Continent/NAmerica";
import Oceania from "../../components/StockMarket/Continent/Oceania";
import SAmerica from "../../components/StockMarket/Continent/SAmerica";
import './CountryCompare.css';

const CountryCompare = () => {
    return(
        <div className="CountryCompare" id="section">
            <div className="title">
                World Stock Index
            </div>
            <div className="graph">
                <Africa />
                <Asia />
                <Oceania />
                <NAmerica />
                <SAmerica />
                <Europe />
            </div>
        </div>
    )
};
export default CountryCompare;
