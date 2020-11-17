import { ADD_TO_FAVORITES, GET_PROFILE } from '../actions/types';

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteMovies: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profiles: payload,
      };
    default:
      return state;
  }
}
