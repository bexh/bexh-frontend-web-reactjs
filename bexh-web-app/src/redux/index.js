import { combineReducers } from 'redux';
import betReducer from '../app/pages/Event/containers/Bets/betReducer';
import loginReducer from '../app/pages/Login/containers/LoginForm/loginReducer';

export default combineReducers({
    bets: betReducer,
    login: loginReducer,
});
