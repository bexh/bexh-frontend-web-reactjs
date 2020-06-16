import { FETCH_BETS, FETCH_MORE_BETS, BET_VIEWED } from '../../../../../redux/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_BETS:
            return {
                ...state,
                items: action.payload,
            };
        case FETCH_MORE_BETS:
            return {
                ...state,
                items: [
                    ...state.items,
                    ...action.payload
                ]
            };
        case BET_VIEWED:
            const items = state.items.map((bet, key) => {
                if (bet.id === action.payload.id) {
                    return ({
                        ...bet,
                        ...action.payload,
                    });
                }
                return bet;
            });
            return {
                ...state,
                items: items,
            };
        default:
            return state;
    }
}
