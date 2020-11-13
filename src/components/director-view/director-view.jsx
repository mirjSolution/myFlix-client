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
}) => {
  let imageWidth;
  useEffect(() => {
    getMovieDirector(match.params.directorName);
  }, [getMovieDirector, match.params.directorName]);

  if (directorList.length === 1 || directorList.length === 2) {
    imageWidth = '250px';
  }

  return (
    <section className='director-description text-center'>
      <p>Director Description</p>
      <p className='text-danger'>{directorName}</p>
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
};

const mapStateToProps = (state) => ({
  selectedDirector: state.movie.selectedDirector,
  directorList: state.movie.directorList,
});

export default connect(mapStateToProps, { getMovieDirector })(DirectorView);

// const DirectorView = () => {
//   return (
//     <section className='director-description text-center'>
//       <h1>Test</h1>
//     </section>
//   );
// };

// export default DirectorView;
