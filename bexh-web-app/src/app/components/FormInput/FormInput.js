import React from 'react';
import {
    Toggle,
    TextInput,
    TextAreaInput,
} from '../../components';
import './style.scss';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);

        this.renderSwitch = this.renderSwitch.bind(this);
    }

    renderSwitch(inputType) {
        switch(inputType) {
            case "toggle":
                return (
                    <Toggle
                        toggleOn={this.props.toggleOn}
                        toggleOff={this.props.toggleOff}
                        toggleIsOn={this.props.toggleIsOn}
                        onClick={this.props.onClick}
                    />
                );
            case "text":
                return (
                    <TextInput
                        onChange={this.props.onChange}
                        default={this.props.default}
                    />
                );
            case "value":
                return (<div className="formInput__value">{this.props.value}</div>);
            case "dropdown":
                return (<div>&lt;dropdown&gt;</div>);
            case "textarea":
                return (
                    <TextAreaInput
                        onChange={this.props.onChange}
                    />
                );
            default:
                console.log(`Invalid \`inputType\`.`);
                return
        }
    }

    render() {
        const rowClass = this.props.className ? "formInput__inputRow " + this.props.className : "formInput__inputRow"
        return (
            <div className={rowClass}>
                <div className="formInput__inputRowLeft">{this.props.title}</div>
                <div className="formInput__inputRowRight">
                    {this.renderSwitch(this.props.inputType)}
                </div>
            </div>
        );
    }
}

/*  Required props for each inputType are as follows:
*   dropdown - TODO
*   text - default, onChange
*   textarea - onChange
*   toggle - toggleOn, toggleOff, toggleIsOn
*   value - value
*/
FormInput.propTypes = {
    inputType: (props, componentName) => {
        if (!props.inputType) {
            return new Error(`No \`inputType\` specified in '${componentName}'.`)
        }
        switch(props.inputType) {
            case "dropdown":
                // TODO: define propTypes needed once dropdown component is created
                return
            case "text":
                if (!props.default || !props.onChange) {
                    return new Error(`If '${componentName}' is \`text\` then \`default\` and \`onChange\` must be specified.`)
                }
                return
            case "textarea":
                if (!props.onChange) {
                    return new Error(`If '${componentName}' is \`textarea\` then \`onChange\` must be specified.`)
                }
                return
            case "toggle":
                if (!props.onClick || !props.toggleOn || !props.toggleOff) {
                    console.log(!props.toggleIsOn)
                    return new Error(`If '${componentName}' is \`toggle\` then \`toggleOn\`, \`toggleOff\`, \`onClick\` must be specified.`)
                }
                return
            case "value":
                if (!props.value) {
                    return new Error(`If '${componentName}' is \`value\` then \`value\` must be specified.`)
                }
                return
            default:
                return new Error(`Invalid '${componentName}' specified.`)
        }
    }
}

FormInput.defaultProps = {}
