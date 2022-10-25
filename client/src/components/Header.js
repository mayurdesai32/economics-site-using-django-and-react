import React from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import { Routes, Route, NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>MD SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav row justify-content-end'>
            <Nav className='ml-auto '>
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart'></i> CART
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-user'></i> LOGIN
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
