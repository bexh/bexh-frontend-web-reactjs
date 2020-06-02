import React from 'react';
import {
    Button,
} from '../../../components';
import PropTypes from 'prop-types';
import './style.scss';

export default class Toggle extends React.Component {
    render() {
        this.toggleOnStyle = this.props.toggleIsOn ?  "toggle__on toggle--selected" : "toggle__on";
        this.toggleOffStyle = this.props.toggleIsOn ?  "toggle__off" : "toggle__off toggle--selected";

        return (
            <div className="toggle">
                <Button
                    className={this.toggleOnStyle}
                    title={this.props.toggleOn}
                    value={this.props.toggleOn}
                    selected={this.props.toggleIsOn}
                    onClick={this.props.onClick}
                    classNameSelected={this.toggleOnStyle}
                />
                <Button
                    className={this.toggleOffStyle}
                    title={this.props.toggleOff}
                    value={this.props.toggleOff}
                    selected={!this.props.toggleIsOn}
                    onClick={this.props.onClick}
                    classNameSelected={this.toggleOffStyle}
                />
            </div>
        );
    }
}

Toggle.propTypes = {
    toggleOn: PropTypes.string.isRequired,
    toggleOff: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    toggleIsOn: PropTypes.bool,
}

Toggle.defaultProps = {
    toggleIsOn: false,
}
