import { SET_MOVIES } from '../actions/types';

const initialState = {
  movies: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: payload,
      };
    default:
      return state;
  }
}
