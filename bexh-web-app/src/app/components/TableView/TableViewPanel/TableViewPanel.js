import React from 'react';
import './style.scss';

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
            console.log("at bottom");
            // trigger prop redux action to fetch next "page"
            this.props.onReachBottom({title: this.props.title});
        }
    }

    hasReachedBottom(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        return bottom;
    }

    render() {
        return (
            <div className="tableViewPanel">
                <div className="tableViewPanel__title">{this.props.title}</div>
                <div ref={div => (this.div = div)} className="tableViewPanel__cells">
                    {this.props.children}
                </div>
            </div>

        );
    }
}