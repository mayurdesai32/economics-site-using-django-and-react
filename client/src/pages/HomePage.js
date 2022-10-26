import React, { useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

// statemanagement
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../stateManagement/action/productActions';

import Product from '../components/Product';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.ProductListReducer
  );
  // console.log(`post: ${products}, loading: ${loading} error:${error}`);

  useEffect(() => {
    dispatch(productList());
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage varient={'danger'} children={error} />
      ) : (
        <Row>
          {products.map((ele) => (
            <Col key={ele._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={ele} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
