import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from './CartItem'

import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

import { newOrderSelector } from './newOrdersSlice'

const useStyles = makeStyles((theme) => ({
  listButton: {
    padding: theme.spacing(1, 25),
  },
  noListItem: {
    padding: theme.spacing(1, 15),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }
}));

export const CartItems = () => {
  const classes = useStyles()
  const { currentOrder } = useSelector(newOrderSelector)
  
  let listContent

  if (!currentOrder.items) {
    listContent = (
      <Fragment>
        <ListItem className={classes.noListItem}>
          <ListItemText>
            There currently aren't any items in your cart.
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listButton} alignItems='center'>
          <Button variant="contained">
            Back to Order
          </Button>
        </ListItem>
      </Fragment>
    )
  } else {
    listContent = (
      currentOrder.items.map((item) => (
        <CartItem item={item} />
      ))
    )
  }

  return (
    <Fragment>
     {listContent}
    </Fragment>
  );
}

