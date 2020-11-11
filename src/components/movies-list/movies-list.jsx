import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovies } from '../../actions/movie.js';

import './movies-list.scss';

const MovieList = ({ getMovies, movie: { movies } }) => {
  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <section className='movie-list'>
      {movies.map((movie) => {
        return <h1 key={movie._id}>{movie._id}</h1>;
      })}
    </section>
  );
};

MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
});

export default connect(mapStateToProps, { getMovies })(MovieList);
