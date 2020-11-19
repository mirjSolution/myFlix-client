import axios from 'axios';
import { setAlert } from './alert';
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Login User
export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post('https://myflix3.herokuapp.com/auth/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
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
      .post('https://myflix3.herokuapp.com/users', {
        username: username,
        email: email,
        password: password,
        birthday: birthday,
      })
      .then((res) => {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(
          setAlert(
            'User successfully registered, Welcome to MyFlix!',
            'success'
          )
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
  localStorage.clear();
  location.reload();
};
