import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovieGenre } from '../../actions/movie';
import MovieCard from '../movie-card/movie-card';
import './genre-view.scss';

const GenreView = ({
  getMovieGenre,
  selectedGenre: { genreName, genreDescription },
  genreList,
  match,
  token,
}) => {
  let imageWidth;
  useEffect(() => {
    getMovieGenre(match.params.genreName, token);
  }, [getMovieGenre, match.params.genreName]);

  if (genreList.length === 1 || genreList.length === 2) {
    imageWidth = '340px';
  }

  return (
    <section className='genre-description text-center'>
      <p>Genre Description</p>
      <p className='text-danger'>{genreName}</p>
      <p>{genreDescription}</p>

      <div className='genre-list'>
        <Container>
          <Row>
            {genreList.map((movie) => {
              return (
                <Col
                  md={
                    genreList.length === 1
                      ? 12
                      : genreList.length === 2
                      ? 6
                      : genreList.length === 3
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

GenreView.propTypes = {
  getMovieGenre: PropTypes.func.isRequired,
  selectedGenre: PropTypes.object.isRequired,
  genreList: PropTypes.array.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  selectedGenre: state.movie.selectedGenre,
  genreList: state.movie.genreList,
  token: state.auth.token,
});

export default connect(mapStateToProps, { getMovieGenre })(GenreView);
