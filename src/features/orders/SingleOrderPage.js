import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router";
import { selectOrderById, fetchOrders } from './ordersSlice'
import { Card, List } from 'semantic-ui-react'

const formatDate = ( created_at ) => {
  const orderDate = new Date(created_at)
  const date = orderDate.getDate()
  const month = orderDate.getMonth()
  const year = orderDate.getFullYear()

  return  (month + 1) + "-" + date + "-" + year;
}

export const SingleOrderPage = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const order = useSelector(state => selectOrderById(state, orderId))

  const orderStatus = useSelector(state => state.orders.status)

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders())
    }
  }, [orderStatus, dispatch])
  
  if (!order && orderStatus === 'idle') {
    return (
      <section>
        <h2>Loading</h2>
      </section>
    )
  } else if (!order && orderStatus === 'succeeded'){
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  else {
    return (
      <section>
        <Card>
          <Card.Content>
            <Card.Header>Order Placed </Card.Header>
            <Card.Header>{formatDate(order.created_at)}</Card.Header>
            <Card.Meta>
            <span >Total: {order.total_amount}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <h4>Order Items:</h4>
            <List bulleted>
              {order.items.map((item, index )=> (
                <List.Item key={index}>{item.item.name}</List.Item>
              ))}
            </List>
          </Card.Content>
        </Card>
      </section>
    )
  }
}
