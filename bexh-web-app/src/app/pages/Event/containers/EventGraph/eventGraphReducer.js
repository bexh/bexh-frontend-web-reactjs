import { FETCH_EVENT_INFO } from '../../../../../redux/types';

const initialState = {
    item: {
        points: [{x: 0, y: 0, date: ""}],
        homeTeam: "",
        awayTeam: "",
        date: "",
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENT_INFO:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;
    }
}
