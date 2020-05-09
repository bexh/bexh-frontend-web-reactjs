import { FETCH_BETS, FETCH_MORE_BETS, NEW_BET } from '../../../../../redux/types';

export const fetchBets = (params) => dispatch => {
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

export const fetchMoreBets = (params) => dispatch => {
    const panelTitle = params.title;
    console.log("fetch more bets for " + panelTitle);
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
            type: FETCH_MORE_BETS,
            payload: bets,
        }));
};
