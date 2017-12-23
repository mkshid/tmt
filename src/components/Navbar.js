import React from 'react';
import {
  Nav, Navbar, NavItem
} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavBar = (props) => {
  
  return (
    <Navbar collapseOnSelect className='bg-transparent'>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>TmT (Take my Time)</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Tv</NavItem>
          <NavItem eventKey={2} href="#">About</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
