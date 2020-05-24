import { FETCH_BETS, FETCH_MORE_BETS, BET_VIEWED } from '../../../../../redux/types';

export const fetchBets = (params) => dispatch => {
    console.log("FETCH BETS", params);
    fetch(`https://my.api.mockaroo.com/bets?page=${params.page}&market=${params.betMarket}&status=${params.status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": "61eb77c0",
        },
    })
        .then(res => res.json())
        .then(bets => dispatch({
            type: FETCH_BETS,
            payload: bets,
        }))
        .catch(e => console.log(e));
};

export const fetchMoreBets = (params) => dispatch => {
    console.log("FETCH MORE BETS", params);
    console.log("FETCH URL", `https://my.api.mockaroo.com/bets?page=${params.page}&market=${params.betMarket}&status=${params.status}`);
    fetch(`https://my.api.mockaroo.com/bets?page=${params.page}&market=${params.betMarket}&status=${params.status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": "61eb77c0",
        },
    })
        .then(res => res.json())
        .then(bets => dispatch({
            type: FETCH_MORE_BETS,
            payload: bets,
        }))
        .catch(e => console.log(e));
};

export const updateBetViewed = (params) => dispatch => {
    console.log("UPDATE BET VIEWED", params);
    fetch('https://my.api.mockaroo.com/bets', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": "61eb77c0",
        },
        body: JSON.stringify({
            id: params.id,
            viewed: true,
        }),
    })
        .then(res => res.json())
        .then(bet => dispatch({
            type: BET_VIEWED,
            payload: {
                id: params.id,
                viewed: true,
            },
        }))
        .catch(e => console.log(e));
};
