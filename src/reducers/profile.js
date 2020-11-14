import { ADD_TO_FAVORITES } from '../actions/types';

const initialState = {
  favoriteMovie: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteMovies: payload,
      };
    default:
      return state;
  }
}
