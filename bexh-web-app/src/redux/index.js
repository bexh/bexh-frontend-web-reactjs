import { combineReducers } from 'redux';
import betReducer from '../app/pages/Event/containers/Bets/betReducer';
import eventsReducer from '../app/pages/Sports/containers/Events/eventsReducer';
import makeBetReducer from '../app/src/components/MakeBet/makeBetReducer';

export default combineReducers({
    bets: betReducer,
    events: eventsReducer,
    makeBet: makeBetReducer,
});
