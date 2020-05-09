import React from 'react';
import './style.scss';

export default class ButtonBar extends React.Component {
    render() {
        return (
            <div className="buttonBar">
                {this.props.children}
            </div>
        );
    }
}
