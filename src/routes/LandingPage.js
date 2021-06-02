import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Login } from '../features/auth/Login'
import { CreateUser } from '../features/auth/CreateUser'
import { authSelector } from '../features/auth/authSlice'

export const LandingPage = () => {
  const { userCreatePage } = useSelector(authSelector)

  let content 

  if (!userCreatePage) {
    content = <Login />
  } else {
    content = <CreateUser />
  }

  return (
    <Fragment>
      {content}
    </Fragment>
  )
}