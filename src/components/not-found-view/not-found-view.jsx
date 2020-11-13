import React from 'react';
import './not-found-view.scss';

const NotFound = () => {
  return (
    <React.Fragment>
      <div className='not-found-view'>
        <h1 className='x-large text-danger'>
          <i className='fas fa-exclamation-triangle' /> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
