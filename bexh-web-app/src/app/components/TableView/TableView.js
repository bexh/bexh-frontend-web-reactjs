import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

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

TableView.propTypes = {
    title: PropTypes.string.isRequired,
}

TableView.defaultProps = {}
