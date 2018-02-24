import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PROJECT_NAME } from '../settings';

const NavBar = (props) => {
  return (
    <Navbar collapseOnSelect className='bg-transparent'>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to={`${PROJECT_NAME}/`}>
            TmT <br/>
            <small>Take my Time</small>
          </NavLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Text pullRight>
        <NavLink to={`${PROJECT_NAME}/about`}>About</NavLink>
      </Navbar.Text>
    </Navbar>
  );
}

export default NavBar;
