import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

const formatDate = ( created_at ) => {
  const orderDate = new Date(created_at)
  const date = orderDate.getDate();
  const month = orderDate.getMonth();
  const year = orderDate.getFullYear();

  return  (month + 1) + "-" + date + "-" + year;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const useStyles = makeStyles((theme) => ({
  orderCard: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    textAlign: 'left'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

export const OrderCard = ({ order }) => {
  const classes = useStyles();
  const history = useHistory()
  
  return (
    <div className={classes.orderCard}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='flex-start' >
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Order Placed: {formatDate(order.created_at)}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  Number of items: {order.items.length}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' style={{ cursor: 'pointer' }}>
                  <Button 
                    size='small'
                    variant='contained'
                    color='primary' 
                    disableElevation
                    onClick={() => {
                    history.push(`/orders/${order.id}`)
                    }}
                  >
                    Order Details
                  </Button> 
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
             <Typography variant='subtitle1'>{formatter.format(order.total_amount)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}


