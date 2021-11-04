import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// import Mainpage from './containers/Mainpage/Mainpage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/air-pollution' exact render={() => <Mainpage/>} />
      </div>
    </BrowserRouter>
  );
}

export default App;
