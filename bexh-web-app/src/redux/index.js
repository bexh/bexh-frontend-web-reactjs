import { combineReducers } from 'redux';
import betReducer from '../app/pages/Event/containers/Bets/betReducer';
import eventsReducer from '../app/pages/Sports/containers/Events/eventsReducer';
import eventGraphReducer from '../app/pages/Event/containers/EventGraph/eventGraphReducer';

export default combineReducers({
    bets: betReducer,
    events: eventsReducer,
    eventInfo: eventGraphReducer,
});
