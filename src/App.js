import {BrowserRouter as Router,Route, Switch} from "react-router-dom";

import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Inventory from './pages/Inventory'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/inventory">
            <Inventory/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
