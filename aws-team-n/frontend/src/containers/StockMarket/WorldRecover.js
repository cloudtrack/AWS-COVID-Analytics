import Geo from '../../components/StockMarket/WorldRecover/Geo';
import './WorldRecover.css';

const WorldRecover = () => {
    return(
        <div className="WorldRecover">
            <div className="title">
                Days for Financial Recovery
            </div>
            <div className="graph">
                <Geo />
            </div>
        </div>
    )
};
export default WorldRecover;
