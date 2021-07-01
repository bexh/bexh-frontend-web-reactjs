import React from 'react';
import Bets from '../../../common/containers/Bets/Bets';

export default class PortfolioBets extends React.Component {
    render() {
        return (
            <Bets style={{"maxWidth": "300px", "minWidth": "300px"}}/>
        );
    }
}
