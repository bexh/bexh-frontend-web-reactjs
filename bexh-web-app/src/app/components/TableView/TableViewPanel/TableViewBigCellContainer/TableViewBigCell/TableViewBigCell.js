import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class TableViewBigCell extends React.Component {
    render() {
        return (
            <div className="tableViewBigCell__container">
                <div className="tableViewBigCell__title">{this.props.title}</div>
                <div className="tableViewBigCell__value">{this.props.value}</div>
            </div>
        );
    }
}

TableViewBigCell.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
