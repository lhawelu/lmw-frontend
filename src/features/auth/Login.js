import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { loginAuth, authSelector, clearLoginState, createPage } from './authSlice'

export const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, formState: { errors }, handleSubmit } = useForm()

  const { loginIsSuccess, loginIsError, loginErrorMessage } = useSelector(authSelector)

  const handleLogin = (data) => {
    const body = JSON.stringify({user: data})
    dispatch(loginAuth(body))
  }

  const onCreatePage = () => {
    dispatch(createPage())
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
      history.push('/new_order')
    }
  }, [loginIsError, loginIsSuccess, loginErrorMessage.message, history, dispatch])

  return (
    <Container maxWidth='xs' >
      <form onSubmit={handleSubmit(handleLogin)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img alt='Las Montanas Logo' src='https://www.lasmontanasmarkets.com/images/lasMontanas-logo.png' />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label='Username' type='username' name='username' {...register('username', { required: true })} />    
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Password' type='password' name='password' {...register('password', { required: true })} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' value='Login' variant='contained'>
              Login
            </Button>
          </Grid>
          <div>
            {errors.username?.type === 'required' && 'Username is required'}
            <br/>
            {errors.password?.type === 'required' && 'Password is required'}
          </div>
          <Grid item xs={12}>
            <Typography>
              <span>New to Las Montañas? Click </span>
              <Link href='#' onClick={onCreatePage}>
                here 
              </Link>
              <span> to create a new account!</span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
