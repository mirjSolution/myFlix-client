import { SET_FILTER } from '../actions/types';

const initialState = {
  values: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        values: action.payload,
      };
    default:
      return state;
  }
}
