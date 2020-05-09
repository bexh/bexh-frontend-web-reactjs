import { ATTEMPT_LOGIN } from './types';

export const login = () => dispatch => {
    dispatch({
        type: ATTEMPT_LOGIN,
        payload: {"loggedIn": true},
    });
};
