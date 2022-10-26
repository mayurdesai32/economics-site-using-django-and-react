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

// statemanagement
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../stateManagement/action/productActions';
import { addToCartAction } from '../stateManagement/action/cartAction';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

import Rating from '../components/Rating';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.ProductDetailReducer
  );
  // console.log(`post: ${product}, loading: ${loading} error:${error}`);
  // console.log('hello' + state);

  useEffect(() => {
    dispatch(productDetail(id));
  }, []);

  const addToCart = (id) => {
    // console.log('id ' + id);
    dispatch(addToCartAction(id, qty));

    // addToCart;
    navigate(`/cart`);
  };

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        go back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage varient={'danger'} children={error} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={'#f8e825'}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
              <ListGroup.Item>Price: {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(ele) => setQty(Number(ele.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={() => {
                    addToCart(id);
                  }}
                  disabled={product.countInStock === 0}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductPage;
