import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMovie } from '../../actions/movie';

import './movie-view.scss';

const MovieView = ({
  getMovie,
  selectedMovie: { imagePath, title, description, directorName, genreName },
  match,
}) => {
  useEffect(() => {
    getMovie(match.params.title);
  }, [getMovie, match.params.title]);
  return (
    <React.Fragment>
      <div className='movie-view text-center'>
        <Card style={{ width: '20rem' }}>
          <Card.Img variant='top' src={imagePath} />
          <Card.Body>
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
            <Link to={`/`}>
              <Button className='m-1'>Back</Button>
            </Link>
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
  selectedMovie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMovie: state.movie.selectedMovie,
});

export default connect(mapStateToProps, { getMovie })(MovieView);
