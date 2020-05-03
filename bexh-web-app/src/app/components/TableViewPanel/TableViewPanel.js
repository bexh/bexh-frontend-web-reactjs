import React from 'react';
import './style.scss';

export default class TableViewPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="panelContainer">
                <div className="panelTitle">{this.props.title}</div>
                <div className="panelCellsContainer">
                    {this.props.children}
                </div>
            </div>
        
            );
    }
}