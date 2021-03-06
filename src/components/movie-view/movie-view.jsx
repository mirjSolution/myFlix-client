import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

import { getMovie } from '../../actions/movie';
import { addToFavorites, getProfile } from '../../actions/profile';
import AlertView from '../alert-view/alert-view';

import './movie-view.scss';

const MovieView = ({
  getMovie,
  selectedMovie: { imagePath, title, description, directorName, genreName },
  match,
  token,
  addToFavorites,
  getProfile,
  username,
  history,
}) => {
  useEffect(() => {
    getMovie(match.params.title, token);
  }, [getMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToFavorites(username, match.params.title);
    getProfile(username, token);
  };

  const handleBack = () => {
    history.push('/');
  };

  return (
    <React.Fragment>
      <div className='movie-view text-center'>
        <Card>
          <Card.Img variant='top' src={imagePath} />

          <Card.Body>
            <AlertView />
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <span className='label text-danger'>Description: </span>
              <span className='value'>{description}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Genre: </span>
              <span className='value'>{genreName}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Director: </span>
              <span className='value'>{directorName}</span>
            </Card.Text>
            <Button onClick={handleBack} className='m-1'>
              Back
            </Button>
            <Link to={`/movies/director/${directorName}`}>
              <Button className='m-1'>Director</Button>
            </Link>

            <Link to={`/movies/genre/${genreName}`}>
              <Button className='m-1'>Genre</Button>
            </Link>

            <Button className='m-1' onClick={(e) => handleSubmit(e)}>
              Add to favorite
            </Button>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

MovieView.propTypes = {
  getMovie: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  selectedMovie: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMovie: state.movie.selectedMovie,
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  username:
    state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

export default connect(mapStateToProps, {
  getMovie,
  getProfile,
  addToFavorites,
})(MovieView);
