import React from 'react';
import { Alert } from 'react-bootstrap';
const ErrorMessage = ({ varient, children }) => {
  return <Alert varient={varient}>{children}</Alert>;
};

export default ErrorMessage;
