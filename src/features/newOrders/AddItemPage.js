import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Card, Button, Icon, TextArea } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import { newOrderSelector } from './newOrdersSlice'
import { itemAdded } from './newOrderFetches'


export const AddItemCard = ({ item, onGoBack }) => {
  const dispatch = useDispatch()

  const { currentOrder } = useSelector(newOrderSelector)
  const [specialInstructions, setSpecialInstructions] = useState('')

  const body = {
    order_item: {
      order_id: currentOrder.id,
      item_id: item.id,
      special_instructions: specialInstructions
    }
  }

  const onItemAdded = (body) => {
    dispatch(itemAdded(body))
    onGoBack()
  }
  
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
      <Card.Content>
        <TextArea placeholder='Special Instructions' onChange={e => setSpecialInstructions(e.target.value)} />
      </Card.Content>
      <Card.Content extra>
          <span className='ui right floated'>
            <Button onClick={e => {
              onItemAdded(body)
              }}>
                Add to Order
            </Button>
          </span>
          <span className='ui right floated'>
            <Button onClick={onGoBack}>Go Back</Button>
          </span>
        </Card.Content>
    </Card>
  )
}
