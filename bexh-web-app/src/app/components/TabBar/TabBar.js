import React from 'react';
import './style.scss';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tabBarContainer">
                {this.props.children}
            </div>
        );
    }
}