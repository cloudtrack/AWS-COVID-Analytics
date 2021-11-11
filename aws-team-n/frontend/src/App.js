import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Routes, Link } from 'react-router-dom';

import MainPage from './containers/Mainpage/Mainpage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/main' element={<MainPage/>} />
          {/* <Redirect exact from='/' to='/main'/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
