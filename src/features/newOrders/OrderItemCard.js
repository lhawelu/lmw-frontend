import { Card, Icon } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import "semantic-ui-css/semantic.min.css";

export const OrderItemCard = ( props ) => {
  
  return (
    <Card >
      <Card.Content>
        <Card.Header>{props.item.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <h4>Description:</h4>
        <p>{props.item.description}</p>
        <span >
            <Icon name='dollar' />
            {props.item.price} 
          </span>
      </Card.Content>
      <Card.Content extra>
          
          <span className="ui center floated">
            <Button onClick={e => props.onAddToOrder(props.item)}>Add to Order</Button>
          </span>
        </Card.Content>
    </Card>
  )
}