import { FETCH_GAME, NEW_BET } from '../../../redux/types'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    console.log("redux dbg action type", action.type)
    switch(action.type) {
        case FETCH_GAME:
            console.log("redux fetch game", action.payload)
            return {
                ...state,
                item: action.payload
            };
        case NEW_BET:
            console.log("redux submit", action.payload)
            return state;
        default:
            return state;
    }
}
