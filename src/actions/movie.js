import axios from 'axios';
import { GET_MOVIES, GET_MOVIE, GET_GENRE, GET_DIRECTOR } from './types.js';

// Get Movies
export const getMovies = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/movies')
      .then((res) => {
        dispatch({ type: GET_MOVIES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Get Single Movie
export const getMovie = (title) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/movies/${title}`)
      .then((res) => {
        dispatch({ type: GET_MOVIE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Get Genre
export const getMovieGenre = (genreName) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/movies/genre/${genreName}`)
      .then((res) => {
        dispatch({ type: GET_GENRE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Get Director
export const getMovieDirector = (directorName) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/movies/director/${directorName}`)
      .then((res) => {
        dispatch({ type: GET_DIRECTOR, payload: res.data });
      })
      // .catch((err) => dispatch({ type: '', payload: '' }));
      .catch((err) => console.log(err));
  };
};
