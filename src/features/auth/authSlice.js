import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = 'http://localhost:3000/api/v1/'

const initialState = {
  loggedIn: !!window.localStorage.getItem('token'),
  status: 'idle',
  loginIsSuccess: false,
  loginIsError: false,
  loginErrorMessage: '',
  createUserIsSuccess: false,
  createUserIsError: false,
  createUserMessage: '',
  userCreatePage: false
}

export const loginAuth = createAsyncThunk('auth/loginAuth', async (body, thunkAPI) => {
  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json'
    },
    body: body
  };

  try {
    const response = await fetch(`${URL}login`, configObj)
    let data = await response.json()
    if (response.status === 202) {
      window.localStorage.setItem('token', data.jwt)
      window.localStorage.setItem('username', data.user.username)
      return data
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data)
  }
})

export const createUser = createAsyncThunk('auth/createUser', async (body, thunkAPI) => {
  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json'
    },
    body: body
  };

  try {
    const response = await fetch(`${URL}users`, configObj)
    let data = await response.json()
    if (response.status === 201) {
      return data
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    clearLoginState: (state) => {
      state.loginIsError = false
      state.loginIsSuccess = false
      return state
    },
    clearCreateUserState: (state) => {
      state.createUserIsError = false
      state.createUserIsSuccess = false
      return state
    },
    createPage: (state) => {
      state.userCreatePage = true
      return state
    },
    loginPage: (state) => {
      state.userCreatePage = false
      return state
    }
  },
  extraReducers: {
    [loginAuth.fulfilled]: (state, action) => {
      state.loginIsSuccess = true
      state.loggedIn = true
      state.status = 'succeeded'
      return state
    },
    [loginAuth.rejected]: (state, action) => {
      state.loginIsError = true
      state.loginErrorMessage = action.payload
    },
    [createUser.fulfilled]: (state, action) => {
      state.createUserIsSuccess = true
      state.createUserMessage = action.payload
      return state
    },
    [createUser.rejected]: (state, action) => {
      state.createUserIsError = true
      state.createUserMessage = action.payload
      return state
    }
  }
  
})

export const { clearLoginState, clearCreateUserState, createPage, loginPage } = authSlice.actions

export default authSlice.reducer

export const authSelector = state => state.auth
