import { FETCH_REC_EVENTS } from '../../../../../redux/types';

export const fetchRecEvents = (params) => dispatch => {
    fetch(`https://my.api.mockaroo.com/portfolio/recEvents?uid=${params.uid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": process.env.REACT_APP_MOCKAROO_API_KEY,
        },
    })
        .then(res => res.json())
        .then(recEvents => dispatch({
            type: FETCH_REC_EVENTS,
            payload: recEvents,
        }))
        .catch(e => console.log(e));
};
