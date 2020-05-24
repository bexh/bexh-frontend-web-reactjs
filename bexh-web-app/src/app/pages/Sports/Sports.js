import React from 'react';
import './style.scss';
import {withRouter} from 'react-router';
import Events from './containers/Events/Events';

class Sports extends React.Component {
    render() {
        const sport = this.props.match.params.sport;
        return (
            <h1>{sport} Page</h1>
        );
    }
}

export default withRouter(Sports);
