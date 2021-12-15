import React, {Component} from "react"
import Graph1 from "./Graph1/graph1"
import Graph2 from "./Graph2/graph2"

class AirPollution extends Component{
    constructor(props) {
      super(props);
    }
    render(){
      const path = window.location.pathname;
        return (
            <div>
              <div className="Tabs">
                <li className={path == "/main" && "active"}>
                  <a href="/air-pollution">COVID</a>
                </li>
                <li className={"active"}>
                  <a href="/air-pollution-graph2">Air</a>
                </li>
              </div>
              <div>
                {
                  this.props['graph'] == 1 ?  <Graph1/> :  <Graph2/>
                }
                  {/* <Graph1/> */}
                  {/* <Graph2/> */}
              </div>
            </div>
        )
    }
}

export default AirPollution;
