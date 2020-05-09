import { FETCH_BETS, FETCH_MORE_BETS, NEW_BET } from '../../../../../redux/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_BETS:
            console.log("Fetch reducer", action.payload);
            console.log("state", state);
            console.log(action.payload);
            return {
                ...state,
                items: action.payload,
            };
        case FETCH_MORE_BETS:
            console.log("Fetch more reducer", action.payload);
            console.log("state", state);
            console.log(action.payload);
            return {
                ...state,
                items: [
                    ...state.items,
                    ...action.payload
                ]
            };

        default:
            console.log("setting initial state:", initialState);
            return state;
    }
}
