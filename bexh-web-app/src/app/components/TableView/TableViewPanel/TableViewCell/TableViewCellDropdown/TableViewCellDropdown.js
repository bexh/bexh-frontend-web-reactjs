import React from 'react';
import './style.scss';

export default class TableViewCellDropdown extends React.Component {
    render() {
        return (
            <div className="tableViewCellDropdown">
                {this.props.info ? (
                    <div className="tableViewCellDropdown__info">
                        {this.props.info.map((text, key) =>
                            <div key={key}>{text}</div>
                        )}
                    </div>
                ) : null}
                {this.props.children ? (
                    <div className="tableViewCellDropdown__children">
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        );
    }
}
