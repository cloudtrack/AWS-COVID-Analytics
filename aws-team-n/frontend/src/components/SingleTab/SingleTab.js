import React, { Component } from'react';
import './SingleTab.css'

const SingleTab = (props) => {
    const onClickHandler = () => {
        props.onClick()
    }

    return(
        <li className="element" onClick={onClickHandler}>
            {props.label}
        </li>
    )
}


export default SingleTab;