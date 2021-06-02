import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react'
import { OrderItemCard } from './OrderItemCard'
import { AddItemCard } from './AddItemPage'
import { CartOrder } from './CartOrder'
import { useDispatch} from 'react-redux'

import { selectAllItems } from '../items/itemSlicer' 
import { fetchNewOrder } from './newOrderFetches'
import { newOrderSelector } from './newOrdersSlice'

export const NewOrderPage = () => {
  const dispatch = useDispatch()
  const { newOrderFetchStatus } = useSelector(newOrderSelector)
  const items = useSelector(selectAllItems) 
  const [showPage, setShowPage] = useState(false)
  const [item, setItem] = useState('')
  
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
              {items.map(item => <OrderItemCard key={ item.id } item={ item } onAddToOrder={onAddToOrder} />)}
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