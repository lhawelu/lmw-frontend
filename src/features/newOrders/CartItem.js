import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon, Item } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';

import { newOrderSelector } from './newOrdersSlice'
import { deleteItem } from './newOrderFetches'

export const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const { currentOrder } = useSelector(newOrderSelector)
  const body = {
    order_item: {
      order_item_id: item.order_item_id,
      order_id: currentOrder.id
    }
  }

  const onDeleteItem = (body) => {
    dispatch(deleteItem(body))
  }
    
  return (
      <Item>
        <Item.Content verticalAlign='middle'>
          <Item.Header>
            {item.item.name} <Icon name='dollar' />{item.item.price}
          </Item.Header>
        </Item.Content>
        <Item.Extra>
          <Button primary='true' floated='right' onClick={e => onDeleteItem(body)}>
            <Icon name='delete' />
          </Button>
        </Item.Extra>
      </Item>
  )
}
