import { combineReducers } from 'redux';
import GameReducer from './reducer_game';

const rootReducer = combineReducers({
  GameReducer,
});

export default rootReducer;
