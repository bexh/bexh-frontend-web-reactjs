import React from 'react';
import {
    EventInfo,
    EventGraph,
    MakeBet,
    Bets
} from '../../components';

export default class Event extends React.Component {
    render() {
        return (
            <div>
                <EventInfo />
                <EventGraph />
                <MakeBet />
                <Bets />
            </div>
        );
    }
}