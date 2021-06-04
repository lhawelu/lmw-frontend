import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()
  const classes = useStyles()
  const { currentOrder } = useSelector(newOrderSelector)

  let listContent

  if (currentOrder.items.length > 0) {
    listContent = (
      currentOrder.items.map((item) => (
        <CartItem item={item} />
      ))
    )
  } else {
    listContent = (
      <Fragment>
        <ListItem className={classes.noListItem}>
          <ListItemText>
            There currently aren't any items in your cart.
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listButton} alignItems='center'>
          <Button 
            onClick={() => history.push('/new_order')} 
            variant="contained"
          >
            Back to Order
          </Button>
        </ListItem>
      </Fragment>
    )
  }

  return (
    <Fragment>
     {listContent}
    </Fragment>
  );
}

