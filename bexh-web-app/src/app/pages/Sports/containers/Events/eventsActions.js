import { FETCH_EVENTS } from '../../../../../redux/types';

export const fetchEvents = (params) => dispatch => {
    fetch(`https://my.api.mockaroo.com/sports/${params.sport}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": process.env.REACT_APP_MOCKAROO_API_KEY,
        },
    })
        .then(res => res.json())
        .then(events => dispatch({
            type: FETCH_EVENTS,
            payload: events,
        }))
        .catch(e => console.log(e));
};
