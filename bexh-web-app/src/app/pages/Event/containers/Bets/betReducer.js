import { FETCH_BETS, FETCH_MORE_BETS, BET_VIEWED } from '../../../../../redux/types';

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
        case BET_VIEWED:
            console.log("Bet viewed reducer", action.payload);
            console.log("state", state);
            console.log(action.payload);
            const items = state.items.map((bet, key) => {
                if (bet.id === action.payload.id) {
                    return ({
                        ...bet,
                        ...action.payload,
                    });
                }
                return bet;
            });
            console.log("MODIFIED STATE", items);
            return {
                ...state,
                items: items,
            };
        default:
            console.log("setting initial state:", initialState);
            return state;
    }
}
