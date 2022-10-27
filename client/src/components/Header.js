import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// statemanagement

import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../stateManagement/action/userAction';
const Header = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { error, loading, userInfo } = useSelector(
    (state) => state.userLoginReducer
  );
  const logOutHandler = () => {
    dispatch(userLogout());
  };

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

              {userInfo ? (
                <NavDropdown title='USER' id='username'>
                  <NavDropdown.Item>
                    <NavLink to='/profile'>Profile</NavLink>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logOutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href='/login'>
                  <i className='fas fa-user'></i> LOGIN
                </Nav.Link>
              )}
            </Nav>
            <Nav.Link href='/profile'>Profile</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
