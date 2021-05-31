import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Item, Grid, Icon, Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import { clearNewOrderStatus, newOrderSelector } from './newOrdersSlice'
import { completeNewOrder } from './newOrderFetches'

import { CartItem } from './CartItem'
import { resetStatus } from '../orders/ordersSlice'

export const CartOrder = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { newOrderFetchStatus, currentOrder, completeOrderSuccess, completeOrderError, completeOrderErrorMessage } = useSelector(newOrderSelector)
  
  const onCheckout = (itemId) => {
    dispatch(completeNewOrder(itemId))
  }

  useEffect(() => {
    if (completeOrderError) {
      alert(completeOrderErrorMessage.message)
    }

    if (completeOrderSuccess) {
      dispatch(clearNewOrderStatus())
      dispatch(resetStatus())
      history.push('/orders')
    }

  }, [completeOrderError, completeOrderSuccess, completeOrderErrorMessage.message, history, dispatch])

  let cartContent 

  if (newOrderFetchStatus === 'loading') {
    cartContent  = <div className="loader">Loading...</div>
  } else if (newOrderFetchStatus === 'succeeded') {
    cartContent  = (
      <Grid.Column width={3} textAlign="center" >  
        Subtotal: <Icon name='dollar' /> {currentOrder.subtotal} 
        <br/>
        <Button onClick={e => onCheckout(currentOrder.id)}>Checkout</Button>
        <Item.Group>
          {currentOrder.items.map(item => (
            <CartItem item={item} />
          ))}
        </Item.Group>    
      </Grid.Column>
    )
  } else if (newOrderFetchStatus === 'failed') {
    cartContent  = <div>Error</div>
  }

  return (
    <Fragment>
      {cartContent} 
    </Fragment>
  )
}