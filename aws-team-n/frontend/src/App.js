import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Routes, Link } from 'react-router-dom';
// import {withRouter} from 'react-router'

import MainPage from './containers/Mainpage/Mainpage';
import AirPollution from './containers/AirPollution/AirPollution';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/main' element={<MainPage/>} />
          <Route path='air-pollution' element={<AirPollution/>}/>
          {/* <Redirect exact from='/' to='/main'/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
