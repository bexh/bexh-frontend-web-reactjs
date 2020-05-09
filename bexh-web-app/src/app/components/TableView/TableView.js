import React from 'react';
import './style.scss';

export default class TableView extends React.Component {
    render() {

        return (
            <div className="tableView">
                <div className="tableView__title">{this.props.title}</div>
                <div className="tableView__body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}