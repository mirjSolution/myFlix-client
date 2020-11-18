import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_TO_FAVORITES,
  GET_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  PROFILE_ERROR,
  DELETE_FAVORITE,
} from './types';

// Add to favorite movie list
export const addToFavorites = (usernameProfile, title) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:8080/users/${usernameProfile}/movies/${title}`)
      .then((res) => {
        dispatch({
          type: ADD_TO_FAVORITES,
          payload: res.data,
        });
        dispatch(setAlert(res.data, 'info'));
      })
      .catch((err) => {
        dispatch(setAlert(err.response.data, 'info'));
      });
  };
};

// Delete Favorite Movie
export const deleteToFavorites = (usernameProfile, movie) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8080/users/${usernameProfile}/movies/${movie}`)
      .then((res) => {
        dispatch({
          type: DELETE_FAVORITE,
          payload: res.data,
        });
        dispatch(setAlert('Successfully removed to favourites', 'danger'));
      })
      .catch((err) => {
        console.log(err);
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

// Delete Profile
export const deleteProfile = (usernameProfile) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8080/users/${usernameProfile}`)
      .then(() => {
        dispatch({
          type: DELETE_PROFILE,
          payload: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
