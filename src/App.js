import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import './App.css';
import ProtectedRoute from './routes/ProtectedRoutes';
import { useSelector } from 'react-redux'

import { OrdersList } from './features/orders/OrdersList';
import { SingleOrderPage } from './features/orders/SingleOrderPage'
import { NavBar } from './app/NavBar'
import { NewOrderPage } from './features/newOrders/NewOrderPage'
import { LandingPage } from './routes/LandingPage';

function App() {
  const userLoggedIn = !!useSelector(state => state.auth.loggedIn)

  return (
    <div className="App">
      <Router>
        {userLoggedIn ? <NavBar /> : null}
        <Switch>
          <Route exact path='/'>
            {userLoggedIn ? (
              <Redirect to="/orders" />
            ) : (
              <LandingPage />
            )}
          </Route>
          <ProtectedRoute exact path='/orders/:orderId'>
            <SingleOrderPage />
          </ProtectedRoute> 
          <ProtectedRoute exact path='/orders'>
            <OrdersList />
          </ProtectedRoute>
          <ProtectedRoute exact path='/new_order'>
            <NewOrderPage />
          </ProtectedRoute>
          <Route path="*">
            <div>404 Not found </div>
          </Route>
        </Switch>
      </Router> 
    </div>
  )
}

export default App;
