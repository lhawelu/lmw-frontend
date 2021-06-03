import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const formatDate = ( created_at ) => {
  const orderDate = new Date(created_at)
  const date = orderDate.getDate();
  const month = orderDate.getMonth();
  const year = orderDate.getFullYear();

  return  (month + 1) + "-" + date + "-" + year;
}

const useStyles = makeStyles((theme) => ({
  accordSum: {
    textAlign: 'left'
  },
  listContainer: {
    alignContent: 'left'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '70%',
    flexShrink: 1,
  },
  accordDetails:{
    textAlign: 'left',
    display: 'block'
  },
  listItemStyle: {
    fontSize: '5px',
    color: theme.palette.text.secondary,
    paddingTop: 4
  }
}));

export const OrderCard = ({ order }) => {
  const classes = useStyles();
  const history = useHistory()
  
  return (
    <Container className={classes.listContainer} maxWidth="sm">
    <Accordion >
      <AccordionSummary
        className={classes.accordSum}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          Order Place: {formatDate(order.created_at)} <br/>
          Total Amount: {order.total_amount}
        </Typography><br/>
        <Button 
          color="primary" 
          disableElevation
          onClick={() => {
            history.push(`/orders/${order.id}`)
          }}
          >
           View Order
        </Button> 
      </AccordionSummary>
    </Accordion>
    </Container>
  )
}


