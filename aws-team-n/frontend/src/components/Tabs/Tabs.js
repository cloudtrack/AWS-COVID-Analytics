import React, { Component } from 'react';
import SingleTab from '../SingleTab/SingleTab';
import './Tabs.css'

class Tabs extends Component{
    state = {
        children: [],
        activeTabLabel: 'air-pollution',
    }
    componentDidMount(){
        this.setState({children: this.props.children})
    }

    onClickHandler(label){
        this.setState({activeTabLabel: label})
    }

    render(){
        let labels = this.state.children.map((comp) => {
            const label = comp.props.label ? comp.props.label : 'DEFAULT-LABEL'
            return(
                <SingleTab label={label} onClick={() => this.onClickHandler(label)}/>
            )
        })

        let activeTab = this.state.children.filter((comp) =>
            comp.props.label === this.state.activeTabLabel
        )

        return(
            <div className="Tabs">
                <ol className="TabBar">
                    {labels}
                </ol>
                <ol className="TabContent">
                    {activeTab}
                </ol>
            </div>
    )
    }
}



export default Tabs;