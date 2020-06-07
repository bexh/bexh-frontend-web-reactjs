import { FETCH_GAME, NEW_BET } from '../../../redux/types'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_GAME':
            return {
                ...state,
                items: action.payload
            };
        case 'NEW_BET':
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}
