import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../features/auth/Login'
import { CreateUser } from '../features/auth/CreateUser'
import { authSelector, loginPage, createPage } from '../features/auth/authSlice'
import { Container } from 'semantic-ui-react'

export const LandingPage = () => {
  const dispatch = useDispatch()
  const { userCreatePage } = useSelector(authSelector)

  const onLoginPage = () => {
    dispatch(loginPage())
  }

  const onCreatePage = () => {
    dispatch(createPage())
  }

  let content 

  if (!userCreatePage) {
    content = <Login />
  } else {
    content = <CreateUser />
  }


  return (
    <Fragment>
      <Container>
        <button onClick={e => onLoginPage()}>Login</button>    
        <button onClick={e => onCreatePage()}>Create User</button>
      </Container>
      <div>
        {content}
      </div>
    </Fragment>
  )
}