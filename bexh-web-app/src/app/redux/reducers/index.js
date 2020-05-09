import { combineReducers } from 'redux';
import betReducer from './betReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    bets: betReducer,
    login: loginReducer,
});