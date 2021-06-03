import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { completeNewOrder } from './newOrderFetches'
import { newOrderSelector, clearNewOrderStatus } from './newOrdersSlice'
import { resetStatus } from '../orders/ordersSlice'

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}))

export const CartReviewButtons = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  const { currentOrder, completeOrderSuccess, completeOrderError, completeOrderErrorMessage } = useSelector(newOrderSelector)

  const onCheckout = (currentOrder) => {
    dispatch(completeNewOrder(currentOrder))
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

  return (
    <div className={classes.buttons}>
      <Button 
        onClick={() => history.push('/new_order')} 
        className={classes.button}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onCheckout(currentOrder)}
        className={classes.button}
      >
        Place order
      </Button>
    </div>
  )
}