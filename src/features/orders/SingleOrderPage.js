import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrderById } from './ordersSlice'
import { Card, List } from 'semantic-ui-react'

const formatDate = ( created_at ) => {
  const orderDate = new Date(created_at)
  const date = orderDate.getDate();
  const month = orderDate.getMonth(); //Be careful! January is 0 not 1
  const year = orderDate.getFullYear();

  return  (month + 1) + "-" + date + "-" + year;
}

export const SingleOrderPage = ({ match }) => {
  const { orderId } = match.params

  const order = useSelector(state => selectOrderById(state, orderId))
  
  if (!order) {
    return (
      <section>
        <h2>Order not found!</h2>
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