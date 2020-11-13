import { SET_FILTER } from './types';

export const setFilter = (values) => {
  return (dispatch) => {
    dispatch({ type: SET_FILTER, payload: values });
  };
};
