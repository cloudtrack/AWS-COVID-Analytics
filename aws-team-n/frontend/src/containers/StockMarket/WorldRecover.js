import './WorldRecover.css';
import { useState } from 'react';
import MapChart from '../../components/StockMarket/WorldRecover/MapChart';
import ReactTooltip from "react-tooltip";
import CountryInfo from '../../components/StockMarket/WorldRecover/CountryInfo';

const WorldRecover = () => {
    const [content, setContent] = useState("");
    const [country, setCountry] = useState("");

    return(
        <div className="WorldRecover" id="section">
            <div className="title">
                Days for Financial Recovery
            </div>
            <div className="graph">
                <MapChart setTooltipContent={setContent} setCountry={setCountry} />
                <ReactTooltip>{content}</ReactTooltip>
                {country === "" ? (
                    <div className="no-info">
                        Choose a country from the map for detailed information.
                    </div>
                ) : (
                <CountryInfo country={country} />
                )}
            </div>
        </div>
    )
};
export default WorldRecover;
