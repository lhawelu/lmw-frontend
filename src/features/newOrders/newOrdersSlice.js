import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const newOrderURL = "http://localhost:3000/api/v1/orders"

const initialState = {
  total_amount: 0,
  tax_amount: 0,
  subtotal: 0,
  order_items: []
}

const roundToTwo = (num) => {
  return +(Math.round(num + 'e+2')  + 'e-2');
}

export const createNewOrder = createAsyncThunk('posts/createNewOrder', async newOrder => {
  const token = window.localStorage.getItem('token')  
  const configObj = {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newOrder)
  };

  const response = await fetch(newOrderURL, configObj)
  
  return response.json()
}) 

const newOrdersSlice = createSlice({
  name: 'newOrders',
  initialState, 
  reducers: {
    itemAdded: {
      reducer(state, action) {
        state.order_items.push(action.payload)
        state.subtotal = roundToTwo(state.subtotal + action.payload.price)
        state.tax_amount = roundToTwo((state.subtotal + action.payload.price) * 0.0875)
        state.total_amount = roundToTwo((state.subtotal + action.payload.price) * 1.0875)
      }
    }
  },
  extraReducers: {
    [createNewOrder.fulfilled]: (state, action) => {
      state.total_amount = 0
      state.tax_amount = 0
      state.subtotal = 0
      state.order_items = []
    }
  }  
})

export const { itemAdded, showItem, backToItemList } = newOrdersSlice.actions

export default newOrdersSlice.reducer
