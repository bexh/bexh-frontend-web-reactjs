import React from 'react';
import {
    EventInfo,
    EventGraph,
    MakeBet,
} from '../../components';
import Bets from './containers/Bets/Bets';
import './style.scss';
import { withRouter } from 'react-router-dom';

class Event extends React.Component {
    render() {
        const id = this.props.match.params.id;
        return (
            <div className="event">
                <EventInfo id={id}/>
                <EventGraph id={id}/>
                <MakeBet id={id}/>
                <Bets id={id}/>
            </div>
        );
    }
}

export default withRouter(Event);
