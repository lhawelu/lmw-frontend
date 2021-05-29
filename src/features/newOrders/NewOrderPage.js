import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Grid, Icon, Button } from 'semantic-ui-react'
import { OrderItemCard } from './OrderItemCard'
import { AddItemCard } from './AddItemPage'
import { useDispatch} from 'react-redux'

import { selectAllItems } from '../items/itemSlicer' 
import { itemAdded, createNewOrder, clearNewOrderStatus, newOrderSelector } from './newOrdersSlice'
import { resetStatus } from '../orders/ordersSlice'

export const NewOrderPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const { newOrderisSuccess, newOrderisError, newOrderErrorMessage } = useSelector(newOrderSelector)

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
      setCreateOrderRequestStatus('pending')
      dispatch(createNewOrder(body))
    }
  }


  useEffect(() => {
    console.log('new Order Error = ', newOrderisError)
    console.log('new Order Success = ', newOrderisSuccess)
    if (newOrderisError) {
      alert(newOrderErrorMessage.message)
      dispatch(clearNewOrderStatus())
    }

    if (newOrderisSuccess) {
      dispatch(clearNewOrderStatus())
      dispatch(resetStatus())
      history.push('/orders')
    }
  }, [newOrderisError, newOrderisSuccess, newOrderErrorMessage, history, dispatch]);

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