import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import './registration-view.scss';
import { register } from '../../actions/auth.js';
import AlertView from '../alert-view/alert-view';
import { setAlert } from '../../actions/alert';

const RegistrationView = ({ register, setAlert, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Password and Confirm Password does not match!', 'info');
      return;
    }
    register(username, email, password, birthday);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <React.Fragment>
      <Form className='form-register'>
        <h1 className='text-danger text-center mt-5'>Welcome to myFlix!</h1>
        <p>Please register to continue.</p>
        <AlertView />
        <Form.Group controlId='formBasicText'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Enter Confirm Password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicBirthday'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type='date'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder='Enter Birthday'
          />
        </Form.Group>
        <div className='action-button'>
          <Button
            onClick={handleSubmit}
            className='mr-2'
            variant='primary'
            type='submit'
          >
            Submit
          </Button>
          <Link to='/login'>
            <Button variant='danger' type='submit'>
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </React.Fragment>
  );
};

RegistrationView.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(
  RegistrationView
);
