import { FETCH_GAME, NEW_BET } from '../../../redux/types'

export const fetchGame = () => dispatch => {
    fetch('https://my.api.mockaroo.com/game', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-Key': 'ed862270',
    },
    })
    .then(res =>res.json())
    .then(game => dispatch({
        type: FETCH_GAME,
        payload: game
    }))
    .catch(e => console.log(e));
};

export const createBet = (postData) => dispatch => {
    fetch('https://my.api.mockaroo.com/bets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-Key': 'ed862270',
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(bet => dispatch({
        type: NEW_BET,
        payload: bet  
    }))
    .catch(e => console.log(e));
};
