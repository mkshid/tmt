import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { PROJECT_NAME } from '../settings';

const NavBar = (props) => {
  return (
    <Navbar collapseOnSelect className='bg-transparent'>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={`${PROJECT_NAME}/`}>TmT (Take my Time)</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Text pullRight>
          <NavLink to={`${PROJECT_NAME}/about`}>About</NavLink>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
