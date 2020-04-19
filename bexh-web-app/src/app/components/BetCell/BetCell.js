import React from 'react';
import './style.scss';

export default class BetCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
        }
        this.changeShowOptions = this.changeShowOptions.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    changeShowOptions(e) {
        this.setState(prevState => ({
            showOptions: !prevState.showOptions
        }));
    }

    renderInfo() {
        /*
            Determines info based on type of bet and status
                option 1: exchange bet
                    option 1.1: active => To win, odds, status
                    option 1.2: pending => To win, odds, status, order type
                option 2: social bet
                    => To win, odds, status, with

        */

        const betAmountToWin = (
            <div className="rightInfo">
                To win: ${this.props.bet.amountToWin}
            </div>
        );
        const betOdds = (
            <div className="rightInfo">
                Odds: {this.props.bet.odds > 0 ? "+" : ""}{this.props.bet.odds}
            </div>
        );
        const betStatus = ((this.props.bet.status &&
            (this.props.bet.status === "Active" ?
                (
                    <div className="rightInfo">
                        Status:<span id="active">&nbsp;{(this.props.bet.status).toUpperCase()}</span>
                    </div>
                ) : (
                    <div className="rightInfo">
                        Status:<span id="pending">&nbsp;{(this.props.bet.status).toUpperCase()}</span>
                    </div>
                )
            )
        ));
        const betOrderType = (this.props.bet.orderType &&
            (<div className="rightInfo">
                Order Type: {this.props.bet.orderType}
            </div>)
        );
        const betWith = (this.props.bet.with &&
            (<div className="rightInfo">
                With: {this.props.bet.with}
            </div>)
        );

        switch(this.props.bet.betType) {
            case "Exchange":
                switch(this.props.bet.status) {
                    case "Active":
                        return [betAmountToWin, betOdds, betStatus];
                    case "Pending":
                        return [betAmountToWin, betOdds, betStatus, betOrderType];
                    default:
                        console.warn("Require bet status");
                }
                break;
            case "Social":
                return [betAmountToWin, betOdds, betStatus, betWith];
            default:
                console.warn("Unexpected bet type");
        }
    }

    renderOptions() {
        /*
            Determines options for bet based on type of bet and status
                option 1: exchange bet
                    option 1.1: active => None
                    option 1.2: pending => Cancel
                option 2: social bet
                    option 2.1: active => None
                    option 2.2: pending on you => Accept, decline, counter
                    option 2.3: pending on them => Cancel
        */
        const cancelButton = (<div className="button redBackground">Cancel</div>);
        const acceptButton = (<div className="button greenBackground">Accept</div>);
        const declineButton = (<div className="button redBackground">Decline</div>);
        const counterButton = (<div className="button yellowBackground">Counter</div>);

        if (this.props.bet.betType === "Exchange" && this.props.bet.status === "Pending") {
            return [cancelButton];
        }
        else if (this.props.bet.betType === "Social") {
            if (this.props.bet.status === "PendingYou") {
                return [acceptButton, declineButton, counterButton];
            }
            else if (this.props.bet.status === "PendingThem") {
                return [cancelButton];
            }
        }
    }

    render() {
        return (
            <div className="boxshadow-flex-container" onClick={this.changeShowOptions}>
                <div className="betMain">
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
                            {this.renderInfo()}
                        </div>
                    </div>
                </div>
                {
                    this.state.showOptions && (
                        <div className="betOption">
                            {this.renderOptions()}
                        </div>
                    )
                }
            </div>
        );
    }
}
