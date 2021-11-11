import React from 'react';
import './NavBar.css'

const NavBar = () => {
    return(
        <div className="NavBar">
            <div className="Tabs">
                <li><a href="/air-pollution">Air</a></li>
                <li><a href="/stock-market">Stock</a></li>
                <li><a href="/unemployment">Unemployment</a></li>
            </div>
            Hello
        </div>
    )
}

export default NavBar;