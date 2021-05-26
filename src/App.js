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
import { NewOrderPage } from './features/newOrders/NewOrderPage'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/orders/:orderId' component={SingleOrderPage} /> 
          <Route exact path='/orders' component={OrdersList} />
          <Route exact path='/new_order' component={NewOrderPage} />    
          <Redirect to="/" />
        </Switch>
      </div>
    </Router> 
  )
}

export default App;
