import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
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
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert('Successfully Login', 'success'));
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

// Register
export const register = (username, email, password, birthday) => {
  return (dispatch) => {
    axios
      .post('http://localhost:8080/users', {
        username: username,
        email: email,
        password: password,
        birthday: birthday,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(
          setAlert('User succefully registered, Welcome to MyFlix!', 'success')
        );
      })
      .catch((err) => {
        if (err.response.status === 422) {
          err.response.data.errors.map((error) => {
            dispatch(setAlert(error.msg, 'info'));
          });
        } else {
          dispatch(setAlert(err.response.data, 'danger'));
        }

        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  location.reload();
};
