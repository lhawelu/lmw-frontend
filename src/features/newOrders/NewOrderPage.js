import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Grid, Icon, Button } from 'semantic-ui-react'
import { OrderItemCard } from './OrderItemCard'
import { AddItemCard } from './AddItemPage'
import { useDispatch } from 'react-redux'

import { selectAllItems } from '../items/itemSlicer' 
import { itemAdded } from './newOrdersSlice'

export const NewOrderPage = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectAllItems)
  const cartItems = useSelector(state => state.newOrder.order_items)
  const orderSubtotal = useSelector(state => state.newOrder.subtotal)
  const [showPage, setShowPage] = useState(false)
  const [item, setItem] = useState('')

  const onAddToOrder = (item) => {
    setShowPage(true)
    setItem(item)
  }

  const onItemAdded = (item) => {
    setShowPage(false)
    setItem("")
    dispatch(itemAdded(item))
  }

  const onGoBack = () => {
    setShowPage(false)
    setItem("")
  }

  let content

  if (!showPage) {
    content = (
      <Grid columns={2} centered >
        <Grid.Row columns={2} >
          <Grid.Column textAlign="center" width={10}>
            <h2>Menu</h2>
          </Grid.Column>
          <Grid.Column textAlign="center" width={3}>
            <h2>Cart</h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} >
          <Grid.Column width={10}>
            <Card.Group className="ui four stackable cards">
              {items.map(item => <OrderItemCard key={ item.id } item={ item } onAddToOrder={onAddToOrder}/>)}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={3} textAlign="center" >  
            Subtotal: <Icon name='dollar' /> {orderSubtotal} 
            <br/>
            <Button>Checkout</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) 
  } else {
    content = (
      <AddItemCard item={item} onItemAdded={onItemAdded} onGoBack={onGoBack} />
    )
  }
  
  return (
    <Fragment>
      {content}
    </Fragment>
  )
}