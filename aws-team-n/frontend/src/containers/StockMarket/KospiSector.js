import Detail from '../../components/StockMarket/KospiSector/Detail';
import SectorOverview from '../../components/StockMarket/KospiSector/SectorOverview';
import './KospiSector.css';

const KospiSector = () => {

    return(
        <div className="KospiSector">
            <div className="title">
                Kospi Sector
            </div>
            <div className="graphs-sector">
                <div className="graph-sector">
                    <Detail />
                </div>
                <div className="graph-sector">
                    <SectorOverview />
                </div>
            </div>
        </div>
    )
};
export default KospiSector;
