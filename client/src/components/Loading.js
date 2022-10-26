import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loading = () => {
  return (
    <>
      <Spinner
        animation='border'
        role='status'
        variant='success'
        className='loading'
      />
      <span className='sr-only'>Loading</span>
    </>
  );
};

export default Loading;
