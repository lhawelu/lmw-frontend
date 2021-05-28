import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Menu } from 'semantic-ui-react'

export const NavBar = () => {
  const history = useHistory()
  const [activeItem, setActiveItem] = useState('orders')

  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  
  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          as={Link} 
          to='/orders'
          name='orders'
          active={activeItem === 'orders'}
          onClick={e => (setActiveItem('orders'))}
        />
        <Menu.Item
          as={Link} 
          to='/new_order'
          name='new order'
          active={activeItem === 'new order'}
          onClick={e => (setActiveItem('new order'))}
        />
        <Menu.Menu position='right'>
          <Menu.Item 
            name='logout' 
            onClick={() => {
              logOut()
              history.push('/')
            }}
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
}