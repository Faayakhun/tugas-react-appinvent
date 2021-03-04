import {BrowserRouter as Router,Route, Switch,} from "react-router-dom";
import { useState } from 'react'

import Navigation from './pages/Navigation'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Inventory from './pages/Inventory'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true)
  console.log(isLogin)
  return (
    <Router>
      <Navigation isLogin={isLogin} setIsLogin={setIsLogin} />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login setIsLogin={setIsLogin}/>
          </Route>
          <Route path="/inventory">
            <Inventory/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
