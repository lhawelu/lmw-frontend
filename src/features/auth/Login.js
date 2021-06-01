import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { loginAuth, authSelector, clearLoginState } from './authSlice'

export const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, formState: { errors }, handleSubmit } = useForm()

  const { loginIsSuccess, loginIsError, loginErrorMessage } = useSelector(authSelector)

  const handleLogin = (data) => {
    const body = JSON.stringify({user: data})
    dispatch(loginAuth(body))
  }

  useEffect(() => {
    return () => {
      dispatch(clearLoginState())
    };
  }, [dispatch]);

  useEffect(() => {
    if (loginIsError) {
      alert(loginErrorMessage.message)
      dispatch(clearLoginState())
    }

    if (loginIsSuccess) {
      dispatch(clearLoginState())
      history.push('/orders')
    }
  }, [loginIsError, loginIsSuccess, loginErrorMessage.message, history, dispatch])

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input type="username" name="username" {...register('username', { required: true })} />Username  
        </div>
        <div>
          <input type="password" name="password" {...register('password', { required: true })} />Password
        </div>
        <div style={{display: 'flex','justifyContent': 'center'}}>
          <input type="submit" value="Login"/>
        </div>
        {errors.username?.type === 'required' && "Username is required"}
        <br/>
        {errors.password?.type === 'required' && "Password is required"}
      </form>
    </div>
  )
}
