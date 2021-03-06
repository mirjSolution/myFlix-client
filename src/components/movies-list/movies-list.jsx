import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { getMovies } from '../../actions/movie';
import { getProfile } from '../../actions/profile';
import MovieCard from '../movie-card/movie-card';
import AlertView from '../alert-view/alert-view';

import './movies-list.scss';

const MovieList = ({
  getMovies,
  getProfile,
  movie: { movies },
  visibilityFilter,
  token,
  username,
}) => {
  useEffect(() => {
    if (token !== '') {
      getMovies(token);
      getProfile(username, token);
    }
  }, [getMovies, getProfile]);

  let filteredMovies = movies,
    imageWidth;

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
  getProfile: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  visibilityFilter: state.visibilityFilter.values,
  movie: state.movie,
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
  username:
    state.auth.userInfo === null ? '' : state.auth.userInfo.user.username,
});

export default connect(mapStateToProps, { getMovies, getProfile })(MovieList);
