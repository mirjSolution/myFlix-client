import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './not-found-view.scss';

const NotFound = ({ history }) => {
  const handleClick = () => {
    history.push('/login');
  };
  return (
    <Fragment>
      <div className='not-found'>
        <h1 className='x-large text-primary'>
          <i className='fas fa-exclamation-triangle' /> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
        <Button onClick={handleClick} variant='outline-info'>
          LOGIN TO CONTINUE
        </Button>
      </div>
    </Fragment>
  );
};

export default NotFound;
