import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = []

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = fetch('http://localhost:3000/api/v1/items', {
    method: 'GET',
  })
  .then(res => res.json())
  .then(response => response)
  .catch(response => response.error);

  return response
})

const itemsSlice = createSlice({
  name: 'items',
  initialState, 
  reducers: {},
  extraReducers: {
    [fetchItems.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default itemsSlice.reducer
