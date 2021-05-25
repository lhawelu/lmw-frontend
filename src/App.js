import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.css';
import { OrdersList } from './features/orders/OrdersList';
import { Login } from './features/login/Login'
import { SingleOrderPage } from './features/orders/SingleOrderPage'
import { NavBar } from './app/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/orders/:orderId' component={SingleOrderPage} /> 
          <Route exact path='/orders' component={OrdersList} />  
          <Redirect to="/" />
        </Switch>
      </div>
    </Router> 
  )
}

export default App;
