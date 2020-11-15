import { TOGGLE_FILTER } from '../actions/types';

const initialState = {
  search: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        search: action.payload,
      };
    default:
      return state;
  }
}
