import { 
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';

import ordersReducer from '../features/orders/ordersSlice'
import newOrderReducer from '../features/newOrders/newOrdersSlice'
import itemsReducer from '../features/items/itemSlicer'
import authReducer from '../features/auth/authSlice'

const combinedReducer = combineReducers({
  orders: ordersReducer,
  newOrder: newOrderReducer,
  auth: authReducer,
  items: itemsReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    state = undefined
  }
  return combinedReducer(state, action);
}

export default configureStore({
  reducer: rootReducer ,
  middleware: [...getDefaultMiddleware()]
})
