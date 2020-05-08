import React from 'react';
import './style.scss';

export default class TableViewCellDropdown extends React.Component {
    render() {
        return (
            <div className="dropdownContainer">
                {this.props.info ? (
                    <div className="dropdownInfoContainer">
                        {this.props.info.map((text, key) =>
                            <div key={key}>{text}</div>
                        )}
                    </div>
                ) : null}
                {this.props.children ? (
                    <div className="dropdownChildrenContainer">
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        );
    }
}
