import axios from 'axios';
import {
  GET_MOVIE,
  GET_MOVIES,
  GET_GENRE,
  GET_DIRECTOR,
  TOGGLE_FILTER,
} from './types.js';

// Get Movies
export const getMovies = (token) => {
  return (dispatch) => {
    axios
      .get('https://myflix3.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_MOVIES, payload: res.data });
        dispatch({ type: TOGGLE_FILTER, payload: true });
      })
      .catch((err) => console.log(err));
  };
};

// Get Single Movie
export const getMovie = (title, token) => {
  return (dispatch) => {
    axios
      .get(`https://myflix3.herokuapp.com/movies/${title}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_MOVIE, payload: res.data });
        dispatch({ type: TOGGLE_FILTER, payload: false });
      })
      .catch((err) => console.log(err));
  };
};

// Get Genre
export const getMovieGenre = (genreName, token) => {
  return (dispatch) => {
    axios
      .get(`https://myflix3.herokuapp.com/movies/genre/${genreName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_GENRE, payload: res.data });
        dispatch({ type: TOGGLE_FILTER, payload: false });
      })
      .catch((err) => console.log(err));
  };
};

// Get Director
export const getMovieDirector = (directorName, token) => {
  return (dispatch) => {
    axios
      .get(`https://myflix3.herokuapp.com/movies/director/${directorName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_DIRECTOR, payload: res.data });
        dispatch({ type: TOGGLE_FILTER, payload: false });
      })
      .catch((err) => console.log(err));
  };
};
