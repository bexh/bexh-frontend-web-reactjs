import { FETCH_BETS, NEW_BET } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_BETS:
            console.log("Fetch reducer", action.payload);
            console.log(action.payload);
            return {
                ...state,
                items: action.payload
            };
        default:
            console.log("setting initial state:", initialState);
            return state;
    }
}
