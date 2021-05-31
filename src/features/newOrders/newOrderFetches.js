import { createAsyncThunk } from '@reduxjs/toolkit'

const newOrderURL = "http://localhost:3000/api/v1/"

export const fetchNewOrder = createAsyncThunk('newOrder/fetchNewOrder', async ( thunkAPI ) => {
  const token = window.localStorage.getItem('token')  
  const configObj = {
    method: 'GET',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${newOrderURL}current_order`, configObj)
    let data = await response.json();
    if (response.status === 200) {
      return data
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data)
  }
}) 

export const itemAdded = createAsyncThunk('newOrder/itemAdded', async (body, thunkAPI) => {
  const token = window.localStorage.getItem('token')  
  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  };

  try {
    const response = await fetch(`${newOrderURL}add_item`, configObj)
    let data = await response.json();
    if (response.status === 200) {
      return data
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data)
  }
}) 

export const deleteItem = createAsyncThunk('newOrder/deleteItem', async (body, thunkAPI) => {
  const token = window.localStorage.getItem('token')  
  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  };

  try {
    const response = await fetch(`${newOrderURL}complete_order`, configObj)
    let data = await response.json();
    if (response.status === 200) {
      return data
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data)
  }
}) 

export const completeNewOrder = createAsyncThunk('newOrder/completeNewOrder', async (newOrder, thunkAPI) => {
  const token = window.localStorage.getItem('token')
  const formattedBody = { order: {id: newOrder}} 
  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formattedBody)
  };

  try {
    const response = await fetch(`${newOrderURL}complete_order`, configObj)
    let data = await response.json();
    if (response.status === 200) {
      return data
    } else {
      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data)
  }
}) 
