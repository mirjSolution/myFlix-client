import { combineReducers } from 'redux';
import movie from './movie';
import visibilityFilter from './visibilityFilter';
import auth from './auth';

export default combineReducers({
  movie,
  visibilityFilter,
  auth,
});
