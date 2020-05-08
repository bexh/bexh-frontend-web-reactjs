import React from 'react';
import './style.scss';

export default class TableViewCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
        this.handleCellSelect = this.handleCellSelect.bind(this);
    }

    handleCellSelect(value) {
        this.setState((prevState) => ({
            selected: !prevState.selected,
        }));
        this.props.onClick(value);
    }

    render() {
        const infos = this.props.info.map((item, key) =>
            <div className="info" key={key}>{item}</div>
        );
        return (
            <TableViewCellOnClickHelper value={this.props.value} onClick={this.handleCellSelect}>
                <div className="cellMainContainer">
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
                {this.state.selected ? this.props.children : null }
            </TableViewCellOnClickHelper>
        );
    }
}

class TableViewCellOnClickHelper extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.value);
    }

    render() {
        return (
            <div className="cell" onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
        
    }
}
