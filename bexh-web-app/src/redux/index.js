import { combineReducers } from 'redux';
import betsReducer from '../app/pages/common/containers/Bets/betsReducer';
import eventsReducer from '../app/pages/Sports/containers/Events/eventsReducer';
import eventGraphReducer from '../app/pages/Event/containers/EventGraph/eventGraphReducer';
import recEventsReducer from '../app/pages/Portfolio/containers/RecEvents/recEventsReducer';
import makeBetReducer from '../app/components/MakeBet/makeBetReducer';

export default combineReducers({
    bets: betsReducer,
    events: eventsReducer,
    eventInfo: eventGraphReducer,
    recEvents: recEventsReducer,
    makeBet: makeBetReducer,
});
