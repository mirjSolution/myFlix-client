import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertView from '../alert-view/alert-view';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import './login-view.scss';

const LoginView = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <React.Fragment>
      <Form className='form-login'>
        <h1 className='text-danger text-center mt-5'>Welcome to myFlix!</h1>
        <p>Please login to continue.</p>

        <Form.Group controlId='formBasicUsername'>
          <AlertView />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter Password'
          />
        </Form.Group>
        <p>
          Dont have an account?
          <Link to='/register'> Register</Link>
        </p>
        <Button onClick={handleSubmit} variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};
LoginView.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginView);
