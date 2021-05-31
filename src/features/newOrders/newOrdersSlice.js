import { createSlice } from '@reduxjs/toolkit'
import { fetchNewOrder, itemAdded, completeNewOrder } from './newOrderFetches'

const initialState = {
  currentOrder: {},
  newOrderFetchStatus: 'idle',
  newFetchErrorMessage: '',
  completeOrderSuccess: false,
  completeOrderError: false,
  completeOrderErrorMessage: '',
  addItemSuccess: false,
  addItemError: false,
  addItemErrorMessage: '',
}

const newOrdersSlice = createSlice({
  name: 'newOrders',
  initialState, 
  reducers: {
    clearNewOrderStatus: {
      reducer(state, action) {
        state.currentOrder =  {}
        state.newOrderFetchStatus = 'idle'
        state.newFetchErrorMessage = ''
    
        state.completeOrderSuccess = false
        state.completeOrderError = false
        state.completeOrderErrorMessage = ''

        state.addItemSuccess = false
        state.addItemError = false
        state.addItemErrorMessage =''

        return state
      }
    }
  },
  extraReducers: {
    [fetchNewOrder.pending]: (state, action) => {
      state.newOrderFetchStatus = 'loading'
    },
    [fetchNewOrder.fulfilled]: (state, action) => {
      state.currentOrder = action.payload.current_order
      state.newOrderFetchStatus = 'succeeded'

      return state
    },
    [fetchNewOrder.rejected]: (state, action) => {
      state.newOrderFetchStatus = 'failed'
      state.newOrderFetchErrorMessage = action.payload
    },
    [completeNewOrder.fulfilled]: (state, action) => {
      state.completeOrderSuccess = true

      return state
    },
    [completeNewOrder.rejected]: (state, action) => {
      state.completeOrderError = true
      state.completeOrderErrorMessage = action.payload
    },
    [itemAdded.fulfilled]: (state, action) => {
      state.currentOrder = action.payload.current_order
      state.addItemSuccess = true

      return state
    },
    [itemAdded.rejected]: (state, action) => {
      state.addItemErrorMessage = action.payload
      state.addItemError = true
    },
  }  
})

export const { clearNewOrderStatus } = newOrdersSlice.actions

export default newOrdersSlice.reducer

export const newOrderSelector = state => state.newOrder;
