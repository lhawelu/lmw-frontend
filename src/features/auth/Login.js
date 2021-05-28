import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { loginAuth, authSelector, clearState } from './authSlice'

export const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()

  const { isSuccess, isError, errorMessage } = useSelector(authSelector)

  const handleLogin = (data) => {
    const body = JSON.stringify({user: data})
    dispatch(loginAuth(body))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      alert(errorMessage.message)
      dispatch(clearState())
    }

    if (isSuccess) {
      dispatch(clearState())
      history.push('/orders')
    }
  }, [isError, isSuccess, errorMessage.message, history, dispatch]);

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
          <input type="submit" value="GO"/>
        </div> 
      </form>
    </div>
  )
}