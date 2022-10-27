import React, { useState, useEffect } from 'react';

import { Link, useNavigate, redirect } from 'react-router-dom';
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
import { userLogin } from '../stateManagement/action/userAction';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, loading, userInfo } = useSelector(
    (state) => state.userLoginReducer
  );
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/`);
    }
  }, [submitHandler]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loading && <Loading />}
      {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register/'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
