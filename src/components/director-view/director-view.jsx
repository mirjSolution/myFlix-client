import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getMovieDirector } from '../../actions/movie';
import MovieCard from '../movie-card/movie-card';

import './director-view.scss';

const DirectorView = ({
  getMovieDirector,
  selectedDirector: { directorName, directorBio, directorDeath, directorBirth },
  directorList,
  match,
  token,
}) => {
  let imageWidth;

  useEffect(() => {
    getMovieDirector(match.params.directorName, token);
  }, [getMovieDirector]);

  if (directorList.length === 1 || directorList.length === 2) {
    imageWidth = '340px';
  }

  return (
    <section className='director-description text-center'>
      <p>Director Description</p>
      <h2 className='text-danger'>{directorName}</h2>
      <p>{directorBio}</p>
      <p>Birth: {directorBirth}</p>
      <p>{directorDeath ? `Death: ${directorDeath}` : ''}</p>
      <div className='director-list'>
        <Container>
          <Row>
            {directorList.map((movie) => {
              return (
                <Col
                  md={
                    directorList.length === 1
                      ? 12
                      : directorList.length === 2
                      ? 6
                      : directorList.length === 3
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

DirectorView.propTypes = {
  getMovieDirector: PropTypes.func.isRequired,
  selectedDirector: PropTypes.object.isRequired,
  directorList: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedDirector: state.movie.selectedDirector,
  directorList: state.movie.directorList,
  token: state.auth.userInfo === null ? '' : state.auth.userInfo.token,
});

export default connect(mapStateToProps, { getMovieDirector })(DirectorView);
