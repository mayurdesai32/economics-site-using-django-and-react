import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

import Rating from '../components/Rating';

const ProductPage = () => {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(`error :${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        go back
      </Link>
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

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            <ListGroup.Item>Price: {product.price}</ListGroup.Item>
            <ListGroup.Item>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button disabled={product.countInStock === 0}>ADD TO CART</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/* <Col md={5}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:{product.price}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col> */}
      </Row>
    </div>
  );
};

export default ProductPage;