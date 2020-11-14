import { combineReducers } from 'redux';
import movie from './movie';
import visibilityFilter from './visibilityFilter';
import auth from './auth';
import alert from './alert';

export default combineReducers({
  auth,
  alert,
  movie,
  visibilityFilter,
});
