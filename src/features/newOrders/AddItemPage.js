import { Card, Button, Icon } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";

export const AddItemCard = ({ item, onGoBack, onItemAdded  }) => {
  
  return (
    <Card >
      <Card.Content>
        <Card.Header>{item.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <h4>Description:</h4>
        <p>{item.description}</p>
        <span >
          <Icon name='dollar' />
          {item.price} 
        </span>
      </Card.Content>
      <Card.Content extra>
          <span className="ui right floated">
            <Button onClick={e => onItemAdded(item)}>Add to Order</Button>
          </span>
          <span className="ui right floated">
            <Button onClick={onGoBack}>Go Back</Button>
          </span>
        </Card.Content>
    </Card>
  )
}
