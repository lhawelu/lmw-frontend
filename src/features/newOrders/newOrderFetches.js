import { createAsyncThunk } from '@reduxjs/toolkit'
import { loadStripe } from '@stripe/stripe-js'

const newOrderURL = "http://localhost:3000/api/v1/"

const stripePromise = loadStripe('pk_test_51IxxlgKln4p9blIpIG0dgACGx5GupT1ZwOt55KkRVLcl1ZnMTUt7n8k0efW87YRBRjCAhrZtxug7XfwV502OxTMy00j7mp58YW')

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
    method: 'DELETE',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  };

  try {
    const response = await fetch(`${newOrderURL}order_items/${body.order_item.order_item_id}`, configObj)
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

export const completeNewOrder = createAsyncThunk('newOrder/completeNewOrder', async (currentOrder, thunkAPI) => {
  const token = window.localStorage.getItem('token')  

  const formattedBody = { 
    order_id: currentOrder.id,
  } 

  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formattedBody)
  }

  const stripe = await stripePromise;
  const response = await fetch(`${newOrderURL}checkout/`, configObj);
  const session = await response.json();
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.log(result.error.message)
  }
  
  // const token = window.localStorage.getItem('token')
  // const formattedBody = { order: {id: newOrder}} 
  // const configObj = {
  //   method: 'POST',
  //   headers: {
  //   'content-type': 'application/json',
  //   'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(formattedBody)
  // };

  // try {
  //   const response = await fetch(`${newOrderURL}complete_order`, configObj)
  //   let data = await response.json();
  //   if (response.status === 200) {
  //     return data
  //   } else {
  //     return thunkAPI.rejectWithValue(data)
  //   }
  // } catch (e) {
  //   thunkAPI.rejectWithValue(e.response.data)
  // }
}) 
