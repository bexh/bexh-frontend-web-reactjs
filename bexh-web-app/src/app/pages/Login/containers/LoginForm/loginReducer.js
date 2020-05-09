import { ATTEMPT_LOGIN } from '../../../../../redux/types';

const initialState = {
    item: {loggedIn: false},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ATTEMPT_LOGIN:
            console.log("login reducer", action.payload);
            return {
                ...state,
                item: action.payload
            };
        default:
            console.log("setting initial login state:", initialState);
            return state;
    }
}
