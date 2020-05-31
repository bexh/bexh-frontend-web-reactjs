import React from 'react';
import {
    MakeBet,
} from '../../components';
import Bets from './containers/Bets/Bets';
import EventGraph from './containers/EventGraph/EventGraph';
import './style.scss';

export default class Event extends React.Component {
    render() {
        return (
            <div className="event">
                <EventGraph />
                <MakeBet />
                <Bets />
            </div>
        );
    }
}
