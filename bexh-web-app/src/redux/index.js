import { combineReducers } from 'redux';
import betReducer from '../app/pages/Event/containers/Bets/betReducer';

export default combineReducers({
    bets: betReducer,
});
