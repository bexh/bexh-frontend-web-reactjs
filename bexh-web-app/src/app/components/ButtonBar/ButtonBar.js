import React from 'react';
import './style.scss';

export default class ButtonBar extends React.Component {
    render() {
        return (
            <div className="buttonBarContainer">
                {this.props.children}
            </div>
        );
    }
}
