import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'semantic-ui-react'
import { OrderCard } from './OrderCard'

import { selectAllOrders, fetchOrders } from './ordersSlice'

export const OrdersList = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders)

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
    <section>
      <h2>Orders</h2>
      <Card.Group>
        {content}
      </Card.Group>
    </section>
  )
}
