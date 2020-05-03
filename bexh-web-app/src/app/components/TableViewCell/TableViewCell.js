import React from 'react';
import './style.scss';

export default class TableViewCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const infos = this.props.info.map((item, key) =>
            <div className="info">{item}</div>
        );
        return (
            <div className="cell">
                <div className="cellNotification">
                    {this.props.notification && <span className="dot" />}
                </div>
                <div className="cellLeft">

                    <div className="title">{this.props.title}</div>
                    {infos}
                </div>
                <div className="cellRight">
                    <div className="tag">{this.props.tag}</div>
                </div>
            </div>
        );
    }
}
