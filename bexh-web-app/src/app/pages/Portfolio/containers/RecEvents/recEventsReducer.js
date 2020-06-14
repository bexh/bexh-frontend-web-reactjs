import { FETCH_REC_EVENTS } from '../../../../../redux/types';

const initialState = {
    items: {},
};

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_REC_EVENTS:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
}
