import { FETCH_BETS, FETCH_MORE_BETS, BET_VIEWED } from '../../../../../redux/types';

export const fetchBets = (params) => dispatch => {
    fetch(`https://my.api.mockaroo.com/bets?page=${params.page}&market=${params.betMarket}&status=${params.status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": process.env.REACT_APP_MOCKAROO_API_KEY,
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
    fetch(`https://my.api.mockaroo.com/bets?page=${params.page}&market=${params.betMarket}&status=${params.status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": process.env.REACT_APP_MOCKAROO_API_KEY,
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
    fetch('https://my.api.mockaroo.com/bets', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": process.env.REACT_APP_MOCKAROO_API_KEY,
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
