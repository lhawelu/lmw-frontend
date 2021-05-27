import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Grid, Icon, Button } from 'semantic-ui-react'
import { OrderItemCard } from './OrderItemCard'
import { AddItemCard } from './AddItemPage'
import { useDispatch} from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { selectAllItems } from '../items/itemSlicer' 
import { itemAdded, createNewOrder } from './newOrdersSlice'

export const NewOrderPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const items = useSelector(selectAllItems)
  const cartItems = useSelector(state => state.newOrder.order_items)
  const orderTotalAmount = useSelector(state => state.newOrder.total_amount)
  const orderTaxAmount = useSelector(state => state.newOrder.tax_amount)
  const orderSubtotal = useSelector(state => state.newOrder.subtotal)
  
  const [showPage, setShowPage] = useState(false)
  const [item, setItem] = useState('')
  const [createOrderRequestStatus, setCreateOrderRequestStatus] = useState('idle')

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

  const body = {
    order: {
      total_amount: orderTotalAmount,
      tax_amount: orderTaxAmount,
      subtotal: orderSubtotal ,
    },
    items: cartItems.map( item => item.id)
  }

  const onCheckout = async () => {
      if (createOrderRequestStatus === 'idle') {
      try {
        setCreateOrderRequestStatus('pending')
        const resultAction = await dispatch(
          createNewOrder(body)
        )
        unwrapResult(resultAction)
      } catch (err) {
        console.error('Failed to save the order: ', err)
      } finally {
        setCreateOrderRequestStatus('idle')
        history.push('/orders')
      }
    }
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
            <Button onClick={onCheckout}>Checkout</Button>
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