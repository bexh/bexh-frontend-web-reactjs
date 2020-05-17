import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

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

TableViewCellDropdown.propTypes = {
    info: PropTypes.arrayOf(PropTypes.string).isRequired,
}
