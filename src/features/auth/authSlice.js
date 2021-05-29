import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const loginURL = 'http://localhost:3000/api/v1/login'

const initialState = {
  loggedIn: !!window.localStorage.getItem('token'),
  status: 'idle',
  isSuccess: false,
  isError: false,
  errorMessage: '',
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
    const response = await fetch(loginURL, configObj)
    let data = await response.json();
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

const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      return state
    }
  },
  extraReducers: {
    [loginAuth.fulfilled]: (state, action) => {
      state.isSuccess = true
      state.loggedIn = true
      state.status = 'succeeded'
      return state
    },
    [loginAuth.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload;
    }
  }
  
})

export const { clearState } = authSlice.actions

export default authSlice.reducer

export const authSelector = state => state.auth;