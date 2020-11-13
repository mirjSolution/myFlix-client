import { combineReducers } from 'redux';
import movie from './movie';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  movie,
  visibilityFilter,
});
