import { combineReducers } from 'redux';
import ratingReducer from './ratingReducer';
import regionReducer from './regionReducer.js';

const rootReducer = combineReducers({
  rating: ratingReducer,
  region: regionReducer,
});

export default rootReducer;