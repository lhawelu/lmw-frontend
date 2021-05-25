import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


export const NavBar = () => {
  
  const [activeItem, setActiveItem] = useState('orders')

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
          name='new order'
          active={activeItem === 'new order'}
          onClick={e => (setActiveItem('new order'))}
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={e => (setActiveItem('logout'))}
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
}