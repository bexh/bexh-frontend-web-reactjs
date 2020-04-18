import React from 'react';
import './style.css';

export default class BetCell extends React.Component {
    render() {
        return (
            <div className="boxshadow-flex-container">
                <div className="left">
                    <div id="amount">
                        ${this.props.bet.amount}
                    </div>
                    <div id="team">
                        on {this.props.bet.team}
                    </div>
                </div>
                <div className="right">
                    <div className="rightInner">
                        <div className="rightInfo">
                            To win: ${this.props.bet.amountToWin}
                        </div>
                        <div className="rightInfo">
                            Odds: {this.props.bet.odds > 0 ? "+" : ""}{this.props.bet.odds}
                        </div>
                        <div className="rightInfo">
                            Status:<span id="active">&nbsp;{this.props.bet.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}