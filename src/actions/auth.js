import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

// Login User
export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post('http://localhost:8080/auth/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        localStorage.setItem('token', res.data.token);
      })
      .catch((err) => {
        let errors = [];
        errors.push(err.response.data.message);
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  location.reload();
};
