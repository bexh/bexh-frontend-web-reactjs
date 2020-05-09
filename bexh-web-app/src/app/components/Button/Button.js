import React from 'react';
import './style.scss';

export default class Button extends React.Component {
    render() {
        return (
            <div 
                className={["button", this.props.selected && 'button--selected', this.props.className]
                    .filter(e => !!e)
                    .join(' ')}
                style={this.props.style ? this.props.style : null}
            >
                <button 
                    onClick={this.props.onClick}
                    value={this.props.title}
                >
                    {this.props.title}
                </button>
            </div>
        );
    }
}
