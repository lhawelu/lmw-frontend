import React from 'react'
import { Icon, Item, Button } from 'semantic-ui-react'

import { } from './newOrderFetches'

export const CartItem = ({ item }) => {

  return (
      <Item>
        <Item.Content verticalAlign='middle'>
          <Item.Header>
            {item.item.name} <Icon name='dollar' />{item.item.price}
          </Item.Header>
        </Item.Content>
        <Item.Extra>
          <Button primary floated='right'>
            <Icon name='delete' />
          </Button>
        </Item.Extra>
      </Item>
  )
}
