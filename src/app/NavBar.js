import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar = () => {
  const history = useHistory()
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const path = window.location.pathname;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  let menuHeader 

  if (path === '/orders'){
    menuHeader = 'My Orders'
  } else if ( path === '/new_order'){
    menuHeader = 'New Order'
  }
  
  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton edge='start' onClick={handleClick} className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem >Profile</MenuItem>
            <MenuItem 
              onClick={() => {
                history.push('/orders')
                handleClose()
              }}
            >
              My Orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push('/new_order')
                handleClose()
              }} 
            >
              New Order
            </MenuItem>
          </Menu>
          <Typography variant='h6' align='left' className={classes.title}>
            {menuHeader}
          </Typography>
          <Button
            color='inherit' 
            onClick={() => {
              logOut()
              history.push('/')
              }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
