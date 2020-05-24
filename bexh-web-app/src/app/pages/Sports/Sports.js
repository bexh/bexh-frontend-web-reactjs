import React from 'react';
import './style.scss';
import {withRouter} from 'react-router';

class Sports extends React.Component {
    render() {
        const sport = this.props.match.params.sport;
        return (
            <h1>{sport} Page</h1>
        );
    }
}

export default withRouter(Sports);
