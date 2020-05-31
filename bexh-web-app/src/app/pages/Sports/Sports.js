import React from 'react';
import './style.scss';
import {withRouter} from 'react-router';
import Events from './containers/Events/Events';

class Sports extends React.Component {
    render() {
        const sport = this.props.match.params.sport;
        return (
            <div className="sports">
                <Events sport={sport} />
            </div>
        );
    }
}

export default withRouter(Sports);
