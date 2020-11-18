import { TOGGLE_FILTER } from './types.js';

export const toggleFilter = (isVisible) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_FILTER, payload: isVisible });
  };
};
