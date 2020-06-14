import React from 'react';
import {
    MakeBet,
} from '../../components';
import EventBets from './containers/EventBets/EventBets';
import EventGraph from './containers/EventGraph/EventGraph';
import './style.scss';
import { withRouter } from 'react-router-dom';

class Event extends React.Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <div className="event">
                <EventGraph id={id}/>
                <MakeBet id={id}/>
                <EventBets id={id}/>
            </div>
        );
    }
}

export default withRouter(Event);
