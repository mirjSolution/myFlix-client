import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovies } from '../../actions/movie.js';
import MovieCard from '../movie-card/movie-card';
import AlertView from '../alert-view/alert-view';
import './movies-list.scss';

const MovieList = ({
  getMovies,
  movie: { movies },
  visibilityFilter,
  token,
}) => {
  let filteredMovies = movies,
    imageWidth;

  useEffect(() => {
    getMovies(token);
  }, [getMovies]);

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (filteredMovies.length === 1 || filteredMovies.length === 2) {
    imageWidth = '340px';
  }

  return (
    <section className='movie-description text-center'>
      <div className='movie-list'>
        <AlertView />
        <Container>
          <Row>
            {filteredMovies.map((movie) => {
              return (
                <Col
                  md={
                    filteredMovies.length === 1
                      ? 12
                      : filteredMovies.length === 2
                      ? 6
                      : filteredMovies.length === 3
                      ? 4
                      : 3
                  }
                  key={movie._id}
                  className='p-1'
                >
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    imageWidth={imageWidth}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </section>
  );
};

MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  visibilityFilter: state.visibilityFilter.values,
  token: state.auth.token,
});

export default connect(mapStateToProps, { getMovies })(MovieList);
