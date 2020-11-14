import axios from 'axios';
import { setAlert } from './alert';
import { ADD_TO_FAVORITES, GET_PROFILE } from './types';

// Add to favorites
export const addToFavorites = (username, title) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:8080/users/${username}/movies/${title}`)
      .then((res) => {
        dispatch({
          type: ADD_TO_FAVORITES,
          payload: res.data,
        });
        dispatch(setAlert('Successfully added to favourites', 'success'));
      })
      .catch((err) => {
        let errors = [];
        errors.push(err.response.data);
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
      });
  };
};

// Get Single Movie
export const getCurrentProfile = (username, token) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_PROFILE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
