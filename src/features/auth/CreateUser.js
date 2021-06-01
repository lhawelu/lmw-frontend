import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';

import { createUser, authSelector, clearCreateUserState, loginPage } from './authSlice'

export const CreateUser = () => {
  const dispatch = useDispatch()
  const { register, formState: { errors }, handleSubmit } = useForm()

  const { createUserIsSuccess, createUserIsError, createUserMessage } = useSelector(authSelector)

  const handleCreateUser = (data) => {
    const body = JSON.stringify({user: data})
    dispatch(createUser(body))
  }

  useEffect(() => {
    return () => {
      dispatch(clearCreateUserState())
    };
  }, [dispatch]);

  useEffect(() => {
    if (createUserIsError) {
      alert(createUserMessage.message)
      dispatch(clearCreateUserState())
    }

    if (createUserIsSuccess) {
      alert(createUserMessage.message)
      dispatch(clearCreateUserState())
      dispatch(loginPage())
    }
  }, [createUserIsError, createUserIsSuccess, createUserMessage.message, dispatch])

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div>
          <input type="first_name" name="first_name" {...register('first_name', { required: true })} />First Name  
        </div>
        <div>
          <input type="last_name" name="last_name" {...register('last_name', { required: true })} />Last Name
        </div>
        <div>
          <input type="email_address" name="email_address" {...register('email_address', { required: true })} />Email Address
        </div>
        <div>
          <input type="username" name="username" {...register('username', { required: true })} />Username  
        </div>
        <div>
          <input type="password" name="password" {...register('password', { required: true })} />Password
        </div>
        <div style={{display: 'flex','justifyContent': 'center'}}>
          <input type="submit" value="Create User"/>
        </div>
        {errors.first_name?.type === 'required' && "First name is required"}
        <br/>
        {errors.last_name?.type === 'required' && "Last name is required"}
        <br/>
        {errors.email_address?.type === 'required' && "Email address is required"}
        <br/>
        {errors.username?.type === 'required' && "Username is required"}
        <br/>
        {errors.password?.type === 'required' && "Password is required"}
      </form>
    </div>
  )
}