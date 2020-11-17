import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert.js';
import { getProfile, updateProfile } from '../../actions/profile';
import { Form, Button, Accordion, Card, ListGroup } from 'react-bootstrap';
import AlertView from '../alert-view/alert-view';
import './profile-view.scss';

const ProfileView = ({
  profile: { content },
  history,
  getProfile,
  updateProfile,
  token,
  setAlert,
  user,
}) => {
  const { username, email, birthday, favoriteMovies } = content;

  let convertDate = birthday.slice(0, 10);

  const [usernameProfile, setUsername] = useState(username);
  const [emailProfile, setEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdayProfile, setBirthday] = useState(convertDate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert('Password and Confirm Password does not match!', 'info');
      return;
    }
    updateProfile(usernameProfile, emailProfile, password, birthdayProfile);
  };

  const handleUnregister = (e) => {
    e.preventDefault();
  };

  const handleRemoveMovie = (movie) => {};

  useEffect(() => {
    getProfile(user, token);
  }, [getProfile]);

  return (
    <React.Fragment>
      <div className='profile-view'>
        <h1 className='text-danger text-center '>Welcome to your Profile!</h1>
        <p className=' text-center'>
          You can Update, Unregister and Remove your favourite movies from here
        </p>
        <div className='form-profile'>
          <AlertView />
          <Accordion className='favourite-movies primary' defaultActiveKey='0'>
            <Accordion.Toggle as={Card.Header} eventKey='1'>
              <i className='fas fa-plus'></i> List of Favourite Movies
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1'>
              <div>
                {favoriteMovies.map((movie, idx) => {
                  return (
                    <div key={idx} className='movie-list-container'>
                      <ListGroup>
                        <ListGroup.Item className='favourite-list'>
                          <div>{movie}</div>
                          <div>
                            <i className='fas fa-trash-alt'></i>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  );
                })}
              </div>
            </Accordion.Collapse>
          </Accordion>
          <Form>
            <Form.Group controlId='formBasicText'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={usernameProfile}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={emailProfile}
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
                value={birthdayProfile}
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
            <Button
              onClick={() => history.push('/')}
              variant='primary'
              type='submit'
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

ProfileView.propTypes = {
  profile: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.userInfo.user.username,
  token: state.auth.userInfo.token,
});

export default withRouter(
  connect(mapStateToProps, { setAlert, getProfile, updateProfile })(ProfileView)
);
