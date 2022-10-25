import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

// import products from '../resources/products';

import Product from '../components/Product';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/products/');
        setProducts(response.data);
      } catch (error) {
        console.log(`error :${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((ele) => (
          <Col key={ele._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={ele} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
