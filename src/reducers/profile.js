import {
  ADD_TO_FAVORITES,
  GET_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from '../actions/types';

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
    case UPDATE_PROFILE:
      return {
        ...state,
        content: payload,
      };
    case DELETE_PROFILE: {
      return {
        ...state,
        content: {
          username: '',
          email: '',
          birthday: '',
          favoriteMovies: [],
        },
      };
    }
    default:
      return state;
  }
}
