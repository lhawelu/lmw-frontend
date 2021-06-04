import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export const WelcomePage = () => {
  const history = useHistory()

  return (
    <Fragment>
      <Container maxWidth='xs'>
        <Box display='flex' justifyContent='center' m={1} p={1} bgcolor='background.paper'>
          <img src='https://www.lasmontanasmarkets.com/images/lasMontanas-logo.png' alt='Las Montans Logo'/>
        </Box>
        <Button
          onClick={() => {
            history.push('/new_order')
          }}
          variant='contained' 
          color='secondary'
        >
          Get Started
        </Button>
        <Box display='flex' justifyContent='center' m={1} p={1} bgcolor='background.paper'>
          <img src='https://www.lasmontanasmarkets.com/images/home/home-img-right-restaurant.png' alt='Las Montanas Taqueria'/>
        </Box>
      </Container>
    </Fragment>
  )
}