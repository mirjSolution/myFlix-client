import { ADD_TO_FAVORITES, GET_PROFILE } from '../actions/types';

const initialState = {
  content: {
    username: '',
    email: '',
    birthday: '',
    favoriteMovies: [],
  },
};

export default function (state = initialState, action) {
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
        content: payload,
      };
    default:
      return state;
  }
}
