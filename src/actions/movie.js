import axios from 'axios';
import { GET_MOVIES, GET_MOVIE, GET_GENRE, GET_DIRECTOR } from './types.js';

// Get Movies
export const getMovies = (token) => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_MOVIES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Get Single Movie
export const getMovie = (title, token) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/movies/${title}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_MOVIE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Get Genre
export const getMovieGenre = (genreName, token) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/movies/genre/${genreName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_GENRE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Get Director
export const getMovieDirector = (directorName, token) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/movies/director/${directorName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_DIRECTOR, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
