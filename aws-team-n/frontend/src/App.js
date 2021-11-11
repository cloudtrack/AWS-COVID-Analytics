import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link, Navigate, Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router'

import MainPage from './containers/Mainpage/Mainpage';
import AirPollution from './containers/AirPollution/AirPollution';
import NavBar from './components/NavBar/NavBar';
import StockMarket from './containers/StockMarket/StockMarket';
import Unemployment from './containers/Unemployment/Unemployment';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/main' element={<MainPage/>} />
          <Route path='/air-pollution' element={<AirPollution/>}/>
          <Route path='/stock-market' element={<StockMarket/>}/>
          <Route path='/unemployment' element={<Unemployment/>}/>
          <Route path='/' element={<Navigate replace to="/main"/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
