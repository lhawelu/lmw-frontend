import React, { Fragment } from 'react'
import { Login } from '../features/auth/Login'

export const LandingPage = ({ history}) => {

  return (
    <Fragment>
      <Login />
    </Fragment>
  )
}