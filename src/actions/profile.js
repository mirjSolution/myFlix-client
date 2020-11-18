import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TO_FAVORITES,
  GET_PROFILE,
  TOGGLE_FILTER,
  UPDATE_PROFILE,
  PROFILE_ERROR,
} from './types';

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
export const getProfile = (username, token) => {
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

// Update Profile
export const updateProfile = (
  usernameProfile,
  emailProfile,
  password,
  birthdayProfile
) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8080/users/${usernameProfile}`, {
        username: usernameProfile,
        email: emailProfile,
        password: password,
        birthday: birthdayProfile,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data,
        });
        dispatch(setAlert('Profile Successfully Update', 'success'));
      })
      .catch((err) => {
        let myObject = {};
        myObject = err.response.data.errors;
        for (let key in myObject) {
          if (myObject.hasOwnProperty(key)) {
            dispatch(setAlert(myObject[key].msg, 'info'));
          }
        }
        dispatch({
          type: PROFILE_ERROR,
          payload: err.response.data.statusText,
        });
      });
  };
};
