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
import {
  userDetail,
  updateUserProfile,
} from '../stateManagement/action/userAction';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_PROFILE_RESET } from '../stateManagement/constant/userConstant';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { error, loading, user } = useSelector(
    (state) => state.userDetailReducer
  );

  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { success } = useSelector((state) => state.userUpdateProfileReducer);

  const submitHandler = (e) => {
    e.preventDefault();
    //
    if (password !== comfirmPassword) {
      setMessage('password and comfirm Password doesnt matches');
    } else {
      setMessage('');

      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      console.log('profile updating');
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    }

    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(userDetail('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, userInfo, success]);

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
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
              // required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='comfirmpassword'>
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Re Enter Password'
              value={comfirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
              // required
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            UPDATE
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h1>My Order</h1>
      </Col>
    </Row>
  );
};

export default ProfilePage;
