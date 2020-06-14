import React from 'react';
import Bets from '../../../common/containers/Bets/Bets';

export default class EventBets extends React.Component {
    render() {
        return (
            <Bets id={this.props.id}/>
        );
    }
}
