import axios from 'axios';
import { SET_MOVIES } from './types.js';

// Get Movies
export const getMovies = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/movies')
      .then((res) => {
        dispatch({ type: SET_MOVIES, payload: res.data });
      })
      .catch((err) => dispatch({ type: '', payload: '' }));
  };
};
