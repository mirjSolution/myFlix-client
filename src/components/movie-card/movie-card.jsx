import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

const MovieCard = ({ movie, imageWidth }) => {
  return (
    <div className='movie-cards text-center'>
      <Link to={`/movies/${movie.title}`}>
        <Card border='danger' style={{ width: imageWidth, height: 'auto' }}>
          <Card.Header>{movie.title}</Card.Header>
          <img
            className='movie-poster'
            src={movie.imagePath}
            alt={movie.title}
          />
        </Card>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
