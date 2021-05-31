import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, Grid, Icon, Button } from 'semantic-ui-react'
import { OrderItemCard } from './OrderItemCard'
import { AddItemCard } from './AddItemPage'
import { CartOrder } from './CartOrder'
import { useDispatch} from 'react-redux'

import { selectAllItems } from '../items/itemSlicer' 
import { fetchNewOrder, completeNewOrder } from './newOrderFetches'
import { clearNewOrderStatus, newOrderSelector } from './newOrdersSlice'
import { resetStatus } from '../orders/ordersSlice'

export const NewOrderPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const { 
    currentOrder,
    newOrderFetchStatus,
    newFetchErrorMessage, 
    completeOrderSuccess,
    completeOrderError,
    completeOrderErrorMessage,
    addItemError,
    ddItemErrorMessage
  } = useSelector(newOrderSelector)

  const items = useSelector(selectAllItems)
  
  const [showPage, setShowPage] = useState(false)
  const [item, setItem] = useState('')
  const [orderLoadingStatus, setOrderLoadingStatus] = useState()
  

  const onAddToOrder = (item) => {
    setShowPage(true)
    setItem(item)
  }

  const onGoBack = () => {
    setShowPage(false)
    setItem("")
  }

  useEffect(() => {
    if (newOrderFetchStatus === 'idle') {
      dispatch(fetchNewOrder())
    }

  }, [newOrderFetchStatus, dispatch])


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
              {items.map(item => <OrderItemCard key={ item.id } item={ item } onAddToOrder={onAddToOrder} /*onAddToOrder={onAddToOrder}*//>)}
            </Card.Group>
          </Grid.Column>
          <CartOrder />
        </Grid.Row>
      </Grid>
    ) 
  } else {
    content = (
      <AddItemCard item={item} onGoBack={onGoBack} />
    )
  }
  
  return (
    <Fragment>
      {content}
    </Fragment>
  )
}