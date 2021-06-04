import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CartItems } from './CartItems'
import { CartReviewButtons} from './CartReviewButtons'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'

import { newOrderSelector } from './newOrdersSlice'
import { fetchNewOrder } from './newOrderFetches'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 10),
  },
  totalsListItem: {
    padding: theme.spacing(0, 10),
  },
  listButton: {
    padding: theme.spacing(1, 25),
  },
  noListItem: {
    padding: theme.spacing(1, 15),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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

export const CartReview = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { newOrderFetchErrorMessage, newOrderFetchStatus } = useSelector(newOrderSelector)
  const { currentOrder } = useSelector(newOrderSelector)


  useEffect(() => {
    if (newOrderFetchStatus === 'idle') {
      dispatch(fetchNewOrder())
    }
  }, [newOrderFetchStatus, dispatch])

  let content

  if (newOrderFetchStatus === 'loading') {
    content = <div className='loader'>Loading...</div>
  } else if (newOrderFetchStatus === 'succeeded') {
    content = (
    <Paper className={classes.paper} >
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <CartItems />
        <ListItem className={classes.totalsListItem}>
          <ListItemText primary='Subtotal' />
          <Typography variant='subtitle1' className={classes.total}>
            {currentOrder.subtotal ? formatter.format(currentOrder.subtotal): '$0' }
          </Typography>
        </ListItem>
        <ListItem className={classes.totalsListItem}>
          <ListItemText primary='Taxes - 8.75%'/>
          <Typography variant='subtitle1' className={classes.total}>
            {currentOrder.tax_amount ? formatter.format(currentOrder.tax_amount): '$0' }
          </Typography>
        </ListItem>
        <ListItem className={classes.totalsListItem}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' className={classes.total}>
            {currentOrder.total_amount ? formatter.format(currentOrder.total_amount): '$0' }
          </Typography>
        </ListItem>
      </List>
      <CartReviewButtons />
    </Paper>
    )
  } else if (newOrderFetchStatus === 'failed') {
    content = <div>{newOrderFetchErrorMessage}</div>
  }

  return (
    <div className={classes.root}>
     {content}
    </div>
  );
}