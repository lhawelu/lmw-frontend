import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from '../features/orders/ordersSlice'
import newOrderReducer from '../features/newOrders/newOrdersSlice'
import itemsReducer from '../features/items/itemSlicer'

export default configureStore({
  reducer: {
    orders: ordersReducer,
    newOrder: newOrderReducer,
    items: itemsReducer
  },
});
