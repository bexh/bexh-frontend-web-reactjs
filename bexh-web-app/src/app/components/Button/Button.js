import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

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
                    value={this.props.value}
                >
                    {this.props.title}
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.shape({}),
}

Button.defaultProps = {
    selected: false,
    className: null,
    style: null,
}
