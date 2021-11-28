import Detail from '../../components/StockMarket/KospiSector/Detail';
import SectorOverview from '../../components/StockMarket/KospiSector/SectorOverview';
import './KospiSector.css';

const KospiSector = () => {

    return(
        <div className="KospiSector">
            <div className="title">
                Kospi Sector
            </div>
            <div className="graph">
                <Detail />
                <div className="overview">
                    <SectorOverview />
                </div>
            </div>
        </div>
    )
};
export default KospiSector;
