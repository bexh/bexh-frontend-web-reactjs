import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export default class TableViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
        this.hasReachedBottom = this.hasReachedBottom.bind(this);
    }
    
    componentDidMount() {
        this.div.addEventListener("scroll", this.onScroll, false);
      }
    
    componentWillUnmount() {
        this.div.removeEventListener("scroll", this.onScroll, false);
    }

    onScroll(e) {
        if (this.hasReachedBottom(e)) {
            this.props.onReachBottom({title: this.props.title});
        }
    }

    hasReachedBottom(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        return bottom;
    }

    render() {
        const tableViewPanelClass = this.props.scrollable ? "tableViewPanel--scrollable" : "tableViewPanel";
        const tableViewPanelCellsClass = this.props.scrollable ? "tableViewPanel__cells--scrollable" : "tableViewPanel__cells";
        return (
            <div className={tableViewPanelClass}>
                <div className="tableViewPanel__title">{this.props.title}</div>
                <div ref={div => (this.div = div)} className={tableViewPanelCellsClass}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

TableViewPanel.propTypes = {
    title: PropTypes.string.isRequired,
    scrollable: PropTypes.bool,
    onReachBottom: PropTypes.func,
}

TableViewPanel.defaultProps = {
    onReachBottom: () => ({}),
    scrollable: false,
}
