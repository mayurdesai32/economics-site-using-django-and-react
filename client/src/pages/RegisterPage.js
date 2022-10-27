import React, { useState, useEffect } from 'react';

import { useParams, Link, useNavigate, redirect } from 'react-router-dom';
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
import { userRegister } from '../stateManagement/action/userAction';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { error, loading, userInfo } = useSelector(
    (state) => state.userLoginReducer
  );
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== comfirmPassword) {
      setMessage('password and comfirm Password doesnt matches');
    } else {
      setMessage('');
      dispatch(userRegister(name, email, password));
      console.log('Register');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/`);
    }
  }, [submitHandler]);

  return (
    <FormContainer>
      <h1>Register</h1>
      {loading && <Loading />}
      {message && <ErrorMessage variant={'danger'}>{message}</ErrorMessage>}
      {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='comfirmpassword'>
          <Form.Label>Comfirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Re Enter Password'
            value={comfirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already Have An Account? <Link to='/login/'>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
