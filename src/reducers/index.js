import { combineReducers } from 'redux';
import movie from './movie';
import visibilityFilter from './visibilityFilter';
import auth from './auth';
import alert from './alert';
import profile from './profile';

export default combineReducers({
  auth,
  alert,
  movie,
  profile,
  visibilityFilter,
});
