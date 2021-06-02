import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OrderCard } from './OrderCard'

import { selectAllOrders, fetchOrders } from './ordersSlice'

export const OrdersList = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders).slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  const orderStatus = useSelector(state => state.orders.status)
  const error = useSelector(state => state.orders.error)

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders())
    }
  }, [orderStatus, dispatch])

  let content

  if (orderStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (orderStatus === 'succeeded') {
    content = orders.map(order => (
      <OrderCard key={order.id} order={order}/>
    ))
  } else if (orderStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <div >
      <h2>Orders</h2>
      <div>
        {content}
      </div>  
    </div>
  )
}
