import React from 'react';
import './style.scss';

export default class TableViewPanel extends React.Component {
    render() {
        return (
            <div className="tableViewPanel">
                <div className="tableViewPanel__title">{this.props.title}</div>
                <div className="tableViewPanel__cells">
                    {this.props.children}
                </div>
            </div>
        
            );
    }
}