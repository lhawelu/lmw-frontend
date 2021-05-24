import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from '../features/orders/ordersSlice'

export default configureStore({
  reducer: {
    orders: ordersReducer
  },
});
