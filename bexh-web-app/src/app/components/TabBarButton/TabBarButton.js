import React from 'react';
import './style.scss';

export default class TabBarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const selectedStyle = this.props.selected ? " selected" : "";
        return (
            <div className={"buttonTitle" + selectedStyle}>
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
