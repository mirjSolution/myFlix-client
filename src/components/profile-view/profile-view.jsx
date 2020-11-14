import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { Form, Button, Accordion, Card } from 'react-bootstrap';
import './profile-view.scss';

const ProfileView = () => {
  const [usernameProfile, setUsername] = useState('');
  const [emailProfile, setEmail] = useState('');
  const [passwordProfile, setPassword] = useState('');
  const [confirmPasswordProfile, setConfirmPassword] = useState('');
  const [birthdayProfile, setBirthday] = useState('');
  const [favoriteMoviesUpdate, setFavoriteMoviesUpdate] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  const handleUnregister = (e) => {
    e.preventDefault();
  };

  const handleRemoveMovie = (movie) => {};

  let convertDate = moment(birthdayProfile).format('YYYY-MM-DD');
  console.log(convertDate);
  return (
    <React.Fragment>
      <div className='profile-view'>
        <h1 className='text-danger text-center '>Welcome to your Profile!</h1>
        <p className=' text-center'>
          You can Update, Unregister and Remove your favourite movies from here
        </p>
        <div className='form-profile'>
          <Accordion className='favourite-movies primary' defaultActiveKey='0'>
            <Accordion.Toggle as={Card.Header} eventKey='1'>
              <i className='fas fa-plus'></i> List of Favourite Movies
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <div className='movie-list-container'>
                <div>Hello</div>
                <div>
                  <i className='fas fa-trash-alt'></i>
                </div>
              </div>
            </Accordion.Collapse>
          </Accordion>

          <Form>
            <Form.Group controlId='formBasicText'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Change Password</Form.Label>
              <Form.Control
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Password'
              />
            </Form.Group>
            <Form.Group controlId='formBasicConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Enter Confirm Password'
              />
            </Form.Group>
            <Form.Group controlId='formBasicBirthday'>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type='date'
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button
              className='mr-2'
              onClick={handleSubmit}
              variant='success'
              type='submit'
            >
              Update
            </Button>
            <Button
              onClick={handleUnregister}
              variant='danger'
              type='submit'
              className='mr-2'
            >
              Unregister
            </Button>
            <Button onClick={handleCancel} variant='primary' type='submit'>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

ProfileView.propTypes = {
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileView);
