import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class TextInput extends React.Component {
    render() {
        return (
            <form className="textInput" onChange={this.props.onChange}>
                <input 
                    type="text"  
                    placeholder={this.props.default} 
                    ref={el => this.element = el}
                />
            </form> 
        );
    }
}

TextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    default: PropTypes.string,
}

TextInput.defaultProps = {
    default: "",
}
