import React from 'react';
import {
    EventInfo,
    EventGraph,
    MakeBet,
    Bets
} from '../../components';
import './style.scss';

export default class Event extends React.Component {
    render() {
        return (
            <div id="flex">
                <EventInfo />
                <EventGraph />
                <MakeBet />
                <Bets />
            </div>
        );
    }
}