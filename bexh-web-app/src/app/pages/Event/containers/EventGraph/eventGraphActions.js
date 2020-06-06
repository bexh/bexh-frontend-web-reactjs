import { FETCH_EVENT_INFO } from '../../../../../redux/types';

export const fetchEventInfo = (params) => dispatch => {
    fetch(`https://my.api.mockaroo.com/event/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-API-Key": "056bfb80",
        },
    })
        .then(res => res.json())
        .then(eventInfo => dispatch({
            type: FETCH_EVENT_INFO,
            payload: eventInfo,
        }))
        .catch(e => console.log(e));
};
