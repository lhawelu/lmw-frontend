import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { newOrderSelector } from './newOrdersSlice'
import { deleteItem } from './newOrderFetches'

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 10),
  },
}));

export const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { currentOrder } = useSelector(newOrderSelector)
  const body = {
    order_item: {
      order_item_id: item.order_item_id,
      order_id: currentOrder.id
    }
  }

  const onDeleteItem = (body) => {
    dispatch(deleteItem(body))
  }
    
  return (
    <ListItem className={classes.listItem} key={item.item.name}>
      <ListItemText primary={item.item.name} secondary={item.item.description} />
      <Typography variant="body1">{item.item.price}</Typography>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={e => onDeleteItem(body)}/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
