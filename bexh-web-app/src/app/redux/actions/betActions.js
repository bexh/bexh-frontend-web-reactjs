import { FETCH_BETS, NEW_BET } from './types';

export const fetchBets = () => dispatch => {
    console.log("fetching bets");
    fetch('https://my.api.mockaroo.com/bets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": "63cd1670",
        },
    })
        .then(res => res.json())
        .then(bets => dispatch({
            type: FETCH_BETS,
            payload: bets,
        }));
};
