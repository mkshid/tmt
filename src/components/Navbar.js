import React from 'react';
import {
  Nav, Navbar, NavItem
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        <Nav pullRight>
          <NavItem eventKey={1} href="#">About</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
