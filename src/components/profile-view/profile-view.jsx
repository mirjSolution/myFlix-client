import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { logout } from '../../actions/auth';
import {
  updateProfile,
  getProfile,
  deleteProfile,
} from '../../actions/profile';
import {
  Form,
  Button,
  Accordion,
  Card,
  ListGroup,
  Modal,
} from 'react-bootstrap';
import AlertView from '../alert-view/alert-view';
import './profile-view.scss';

const ProfileView = ({
  profile: { content },
  history,
  updateProfile,
  getProfile,
  setAlert,
  token,
  user,
  deleteProfile,
  logout,
}) => {
  useEffect(() => {
    getProfile(user, token);
  }, [getProfile]);

  const { username, email, birthday, favoriteMovies } = content;

  let convertDate = birthday.slice(0, 10);
  const [emailProfile, setEmail] = useState(email);
  const [passwordProfile, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdayProfile, setBirthday] = useState(convertDate);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordProfile !== confirmPassword) {
      setAlert('Password and Confirm Password does not match!', 'info');
      return;
    } else if (passwordProfile === '' || confirmPassword === '') {
      setAlert('Provide password to continue!', 'info');
      return;
    } else {
      updateProfile(username, emailProfile, passwordProfile, birthdayProfile);
      setConfirmPassword('');
      setPassword('');
    }
  };

  const handleUnregister = (e) => {
    e.preventDefault();
    deleteProfile(username);
    localStorage.clear();
    history.push('/login');
  };

  const handleRemoveMovie = (e) => {
    e.preventDefault();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <React.Fragment>
      <div className='profile-view'>
        <h1 className='text-danger text-center '>Welcome to your Profile!</h1>
        <p className=' text-center'>
          You can Update, Unregister and Remove your favourite movies from here
        </p>

        <div className='form-profile'>
          <AlertView />
          <Modal show={show} onHide={handleClose} backdrop='static' centered>
            <Modal.Header closeButton>
              <Modal.Title>MyFlix Movie App</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to unregister?</Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={handleUnregister}>
                Yes
              </Button>
              <Button variant='secondary' onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
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
                          <div>
                            <Link to={`/movies/${movie}`}>{movie}</Link>
                          </div>
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
                value={passwordProfile}
              />
            </Form.Group>
            <Form.Group controlId='formBasicConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Enter Confirm Password'
                value={confirmPassword}
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
              onClick={handleShow}
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
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  user: state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

export default withRouter(
  connect(mapStateToProps, {
    setAlert,
    updateProfile,
    getProfile,
    deleteProfile,
    logout,
  })(ProfileView)
);
