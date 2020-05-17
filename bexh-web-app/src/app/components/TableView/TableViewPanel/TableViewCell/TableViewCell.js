import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

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
            <div className="tableViewCell__info" key={key}>{item}</div>
        );
        return (
            <div className={this.state.selected ? "tableViewCell__flipCard tableViewCell__flipCardSelected" : " tableViewCell__flipCard"} onClick={this.handleCellSelect}>
                <div className="tableViewCell__flipCardInner">
                    <div className="tableViewCell__flipCardFront">
                        <div className="tableViewCell__notification">
                            {this.props.notification && <span className="tableViewCell__dot" />}
                        </div>
                        <div className="tableViewCell__left">
                            <div className="tableViewCell__title">{this.props.title}</div>
                            {infos}
                        </div>
                        <div className="tableViewCell__right">
                            <div className="tableViewCell__tag">{this.props.tag}</div>
                        </div>
                    </div>
                    <div className="tableViewCell__flipCardBack">
                        <div className="tableViewCell__left">
                            {this.props.backDetails.map((item, key) =>
                                <div key={key}>{item}</div>
                            )}
                        </div>
                        <div className="tableViewCell__backRight">
                        {this.props.backButtons.map((item, key) =>
                                <div key={key}>{item}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// TODO: change this when buttons are actually buttons
TableViewCell.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    info: PropTypes.arrayOf(PropTypes.string),
    notification: PropTypes.bool,
    backButtons: PropTypes.string,
    backDetails: PropTypes.arrayOf(PropTypes.string),
    tag: PropTypes.string,
}

TableViewCell.defaultProps = {
    info: [],
    notification: false,
    backButtons: [],
    backDetails: [],
    tag: null,
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
            <div className="tableViewCellOnClickHelper" onClick={this.handleClick}>
                {this.props.children}
            </div>
        );

    }
}
