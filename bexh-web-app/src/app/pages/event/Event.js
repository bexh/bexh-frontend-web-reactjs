import React from 'react';
import {
    MakeBet,
} from '../../components';
import Bets from './containers/Bets/Bets';
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
                <Bets id={id}/>
            </div>
        );
    }
}

export default withRouter(Event);
