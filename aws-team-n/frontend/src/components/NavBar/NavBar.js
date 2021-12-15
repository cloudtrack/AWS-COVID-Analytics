import React from "react";
import "./NavBar.css";

const NavBar = () => {
  const path = window.location.pathname;
  return (
    <div className="NavBar">
      <div className="Tabs">
        <li className={path === "/main" && "active"}>
          <a href="/main">COVID</a>
        </li>
        <li className={(path === "/air-pollution" || path === "/air-pollution-graph2") && "active"}>
          <a href="/air-pollution">Air</a>
        </li>
        <li className={path === "/stock-market" && "active"}>
          <a href="/stock-market">Stock</a>
        </li>
        <li className={path === "/unemployment" && "active"}>
          <a href="/unemployment">Unemployment</a>
        </li>
      </div>
    </div>
  );
};

export default NavBar;
