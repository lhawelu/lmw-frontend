import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoutes({ children, ...rest}) {
  const userLoggedIn = useSelector(state => state.auth.loggedIn)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userLoggedIn ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: "/",
              state: { from: location}
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoutes
