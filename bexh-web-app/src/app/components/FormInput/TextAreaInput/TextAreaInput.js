import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class TextAreaInput extends React.Component {
    render() {
        return (
            <form onChange={this.props.onChange} className={this.props.className}>
                <textarea  
                    className="textAreaInput"
                    placeholder={this.props.default}
                />
            </form> 
        );
    }
}

TextAreaInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    default: PropTypes.string,
}

TextAreaInput.defaultProps = {
    default: "",
}
