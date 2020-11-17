import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMovie } from '../../actions/movie';
import { addToFavorites } from '../../actions/profile';
import AlertView from '../alert-view/alert-view';
import { TOGGLE_FILTER } from '../../actions/types';
import './movie-view.scss';

const MovieView = ({
  getMovie,
  selectedMovie: { imagePath, title, description, directorName, genreName },
  match,
  token,
  addToFavorites,
  username,
  history,
}) => {
  useEffect(() => {
    if (token !== '') {
      getMovie(match.params.title, token);
    }
  }, [getMovie, match.params.title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToFavorites(username, match.params.title);
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
  addToFavorites: PropTypes.func.isRequired,
  selectedMovie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMovie: state.movie.selectedMovie,
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  username:
    state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

const mapDispatchToProps = (dispatch) => {
  dispatch({ type: TOGGLE_FILTER, payload: false });
};

export default connect(mapStateToProps, {
  getMovie,
  addToFavorites,
  mapDispatchToProps,
})(MovieView);
