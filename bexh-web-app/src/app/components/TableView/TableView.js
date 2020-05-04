import React from 'react';
import './style.scss';

export default class TableView extends React.Component {
    render() {

        return (
            <div className="tableContainer">
                <div className="tableTitle">{this.props.title}</div>
                <div className="tablePanelContainer">
                    {this.props.children}
                </div>
            </div>
        );
    }
}