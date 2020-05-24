import React from 'react';
import {
    EventInfo,
    EventGraph,
    MakeBet,
} from '../../components';
import Bets from './containers/Bets/Bets';
import './style.scss';

export default class Event extends React.Component {
    render() {
        return (
            <div className="event">
                <EventInfo />
                <EventGraph />
                <MakeBet />
                <Bets />
            </div>
        );
    }
}
