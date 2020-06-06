import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    render() {
        let classSelected = this.props.classNameSelected ? this.props.classNameSelected : 'button--selected'
        return (
            <div 
                className={["button", this.props.selected && classSelected, this.props.className]
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
    classNameSelected: PropTypes.string,
}

Button.defaultProps = {
    selected: false,
    className: null,
    style: null,
    classNameSelected: null,
}
