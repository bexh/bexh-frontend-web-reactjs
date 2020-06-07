import { FETCH_GAME, NEW_BET } from '../../../redux/types'

export const fetchGame = () => dispatch => {
    fetch('', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-Key': '63cd1670',
    },
    })
    .then(res =>res.json())
    .then(game => dispatch({
        type: FETCH_GAME,
        payload: game
    }));
};

export const createBet = (postData) => dispatch => {
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-Key': '63cd1670',
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(bet => dispatch({
        type: NEW_BET,
        payload: bet  
    }));
};
