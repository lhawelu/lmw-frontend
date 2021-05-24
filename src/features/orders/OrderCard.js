import { Card, List } from 'semantic-ui-react'
import { OrderItems } from './OrderItems'

const formatDate = ( created_at ) => {
  const orderDate = new Date(created_at)
  const date = orderDate.getDate();
  const month = orderDate.getMonth(); //Be careful! January is 0 not 1
  const year = orderDate.getFullYear();

  return  (month + 1) + "-" + date + "-" + year;
}

export const OrderCard = ({ order }) => {
  
  return (
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
          {order.items.map(item => (
            <OrderItems item={item}/>
          ))}
        </List>
      </Card.Content>
    </Card>
  )
}
