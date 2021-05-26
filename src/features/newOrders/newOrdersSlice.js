import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  total_amount: 0,
  tax_amount: 0,
  subtotal: 0,
  order_items: []
}

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}
// export const addNewPost = createAsyncThunk(
//   'posts/addNewPost',
//   // The payload creator receives the partial `{title, content, user}` object
//   async initialPost => {
//     // We send the initial data to the fake API server
//     const response = await client.post('/fakeApi/posts', { post: initialPost })
//     // The response includes the complete post object, including unique ID
//     return response.post
//   }
// )

// export const fetchOrders = createAsyncThunk('orders/fetchUsers', async () => {
//   const token = localStorage.getItem('token')
//   const response = fetch('http://localhost:3000/api/v1/orders', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//   .then(res => res.json())
//   .then(response => response.orders)
//   .catch(response => response.error);

//   return response
// })

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
        state.show_page = false
        state.show_page_item = {}
      }
    }
  },
  extraReducers: {}
  
})

export const { itemAdded, showItem, backToItemList } = newOrdersSlice.actions

export default newOrdersSlice.reducer
