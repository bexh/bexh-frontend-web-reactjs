import { combineReducers } from 'redux';
import betReducer from './betReducer';

export default combineReducers({
    bets: betReducer,
});