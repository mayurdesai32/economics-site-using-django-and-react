import React, { useState, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import {
  addToCartAction,
  RemoveFromCartAction,
} from '../stateManagement/action/cartAction';

import ErrorMessage from '../components/ErrorMessage';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  console.log(cartItems[0]);
  useEffect(() => {
    // dispatch(productDetail(id));
  }, []);

  const removefromcart = (id) => {
    console.log('removefromcart');
    dispatch(RemoveFromCartAction(id));
  };
  const checkOutHandler = () => {
    console.log('checkOutHandler');
    navigate(`/checkout`);
  };

  return (
    <Row>
      <h3>Shopping Cart</h3>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <ErrorMessage varient={'info'}>
            Your Cart Is Empty <Link to='/'>Go Back</Link>
          </ErrorMessage>
        ) : (
          // variant='flush'
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image scr={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>Rs {item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(ele) =>
                        dispatch(
                          addToCartAction(
                            item.product,
                            Number(ele.target.value)
                          )
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type='button'
                      varient='light'
                      onClick={() => removefromcart(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              Rs:
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
