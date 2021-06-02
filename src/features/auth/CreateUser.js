import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { createUser, authSelector, clearCreateUserState, loginPage } from './authSlice'

export const CreateUser = () => {
  const dispatch = useDispatch()
  const { register, formState: { errors }, handleSubmit } = useForm()

  const { createUserIsSuccess, createUserIsError, createUserMessage } = useSelector(authSelector)

  const handleCreateUser = (data) => {
    const body = JSON.stringify({user: data})
    dispatch(createUser(body))
  }

  const onLoginPage = () => {
    dispatch(loginPage())
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
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img alt='Las Montanas Logo' src='https://www.lasmontanasmarkets.com/images/lasMontanas-logo.png' />
            <h2> Welcome </h2>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label='First Name' type='first_name' name='first_name' {...register('first_name', { required: true })}/> 
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Last Name' type='last_name' name='last_name' {...register('last_name', { required: true })}/>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Email Address' type='email_address' name='email_address' {...register('email_address', { required: true })}/>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Username' type='username' name='username' {...register('username', { required: true })}/>  
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Password' type='password' name='password' {...register('password', { required: true })}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' value='Create User' variant='contained'>
              Login
            </Button>
          </Grid>
          <div>
            {errors.first_name?.type === 'required' && 'First name is required'}
            <br/>
            {errors.last_name?.type === 'required' && 'Last name is required'}
            <br/>
            {errors.email_address?.type === 'required' && 'Email address is required'}
            <br/>
            {errors.username?.type === 'required' && 'Username is required'}
            <br/>
            {errors.password?.type === 'required' && 'Password is required'}
          </div>
          <Grid item xs={12}>
            <p>
              <Typography>
                <span>Already have an account? Click </span>
                <Link href='#' onClick={onLoginPage}>
                  here 
                </Link>
                <span> to login.</span>
              </Typography>
            </p>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
