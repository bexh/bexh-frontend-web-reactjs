import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBets, fetchMoreBets, updateBetViewed } from './betActions';
import {
    TableView,
    TableViewCell,
    TableViewPanel,
    ButtonBar,
    Button,
} from '../../../../components';
import './style.scss';

class Bets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "selectedTab": "Active",
            "exchangePage": 1,
            "socialPage": 1,
        };
        this.handleBetStatusChange = this.handleBetStatusChange.bind(this);
        this.handleSelectBet = this.handleSelectBet.bind(this);
        this.determineTag = this.determineTag.bind(this);
        this.determineBackDetails = this.determineBackDetails.bind(this);
        this.determineBackButtons = this.determineBackButtons.bind(this);
        this.renderBets = this.renderBets.bind(this);
        this.onReachBottom = this.onReachBottom.bind(this);
        this.handleSelectBetAction = this.handleSelectBetAction.bind(this);
    }

    componentDidMount() {
        this.props.fetchBets({betMarket: "all", page: 1, status: "Active"});
    }

    handleBetStatusChange(e) {
        const status = e.target.value;
        this.props.fetchBets({betMarket: "all", page: 1, status: status})
        this.setState({
            selectedTab: status,
            exchangePage: 1,
            socialPage: 1,
        });
    }

    handleSelectBet(e) {
        const id = e.target.value;
        const bet = this.props.bets.filter(bet => bet.id === id);
        const viewed = bet.viewed ? true : false;
        if (!viewed) {
            const params = {id: id};
            this.props.updateBetViewed(params);
        }
    }

    handleSelectBetAction(e) {
        const action = e.target.value.title;
        const betId = e.target.value.id;
        // TODO: redux for handle select bet action
    }

    onReachBottom(params) {
        console.log("PARAM TITLE:", params.title);
        switch (params.title) {
            case "Exchange":
                this.setState((prevState) => ({
                    exchangePage: prevState.exchangePage + 1,
                }));
                this.props.fetchMoreBets({betMarket: params.title, page: this.state.exchangePage, status: this.state.selectedTab});
                break;
            case "Social":
                this.setState((prevState) => ({
                    socialPage: prevState.socialPage + 1,
                }));
                this.props.fetchMoreBets({betMarket: params.title, page: this.state.socialPage, status: this.state.selectedTab});
                break;
            default:
                console.log("NOT A VALID PANEL TITLE");
                break;
        }
    }

    determineTag(amount, amountToWin, win, status) {
        console.log("determining tag", amount, amountToWin, win, status);
        if (status === "Complete") {
            return (win ? `+${amountToWin}` : `-${amount}`);
        }
        return (`$${amount} to win $${amountToWin}`);
    }

    determineBackDetails(status, orderType, betType, betWith, odds) {
        // if social, needs status (Pending You vs Pending Them) and with
        // if pending exchange, needs order type
        // all need odds
        let backDetails = [`Odds: ${odds}`]
        if (betType === "Social") {
            backDetails.push(`Status: ${status}`);
            backDetails.push(`With: ${betWith}`);
        }
        else if (betType === "Exchange" && status === "Pending") {
            backDetails.push(`Order Type: ${orderType}`);
        }
        return backDetails;
    }

    determineBackButtons(status, betType, id) {
        // if social and pending them, needs cancel
        // if social and pending you, needs accept decline counter
        // if exchange and pending, needs cancel
        let backButtonOptions = [];
        if (betType === "Social") {
            if (status === "PendingYou") {
                backButtonOptions = ["Accept", "Decline", "Counter"];
            }
            else if (status === "PendingThem") {
                backButtonOptions = ["Cancel"];
            }
        }
        else if (betType === "Exchange" && status === "Pending") {
            backButtonOptions = ["Cancel"];
        }
        else {
            backButtonOptions = [];
        }
        const backButtons = backButtonOptions.map((buttonTitle, key) =>
            <Button
                title={buttonTitle}
                onClick={this.handleSelectBetAction}
                value={{title: buttonTitle, id: id}}
                key={key}
            />
        )
        return backButtons;
    }

    renderBets() {
        console.log("render bets", this.props);
        const [exchangeBets, socialBets] = ["Exchange", "Social"].map((betType, i) =>
            this.props.bets.filter(bet => bet.betType === betType)
        )
        const [exchangeBetCells, socialBetCells] = [exchangeBets, socialBets].map((betGroup, i) =>
            betGroup.map((bet, key) => {
                console.log("BET", bet);
                const teamAgainstPrefix = bet.teamFor === bet.homeTeam ? "vs " : "at ";
                const tag = this.determineTag(bet.amount, bet.amountToWin, bet.win, bet.status);
                const backDetails = this.determineBackDetails(bet.status, bet.orderType, bet.betType, bet.with, bet.odds);
                const backButtons = this.determineBackButtons(bet.status, bet.betType, bet.id);
                console.log("BACK BUTTONS", backButtons);
                return (
                    <TableViewCell
                        title={bet.teamFor}
                        info={[teamAgainstPrefix + bet.teamAgainst, bet.date]}
                        tag={tag}
                        notification={!bet.viewed}
                        key={bet.id}
                        value={bet.id}
                        onClick={this.handleSelectBet}
                        backDetails={backDetails}
                        backButtons={backButtons}
                    />
                );
            })
        );
        return [exchangeBetCells, socialBetCells];
    }

    render() {

        const [exchangeBetCells, socialBetCells] = this.renderBets();

        return (
            <TableView title="Your Bets">
                <ButtonBar>
                    <Button
                        className="button--tabButton"
                        title="Active"
                        value="Active"
                        selected={this.state.selectedTab === "Active"}
                        onClick={this.handleBetStatusChange}
                    />
                    <Button
                        className="button--tabButton"
                        title="Pending"
                        value="Pending"
                        selected={this.state.selectedTab === "Pending"}
                        onClick={this.handleBetStatusChange}
                    />
                    <Button
                        className="button--tabButton"
                        title="Complete"
                        value="Complete"
                        selected={this.state.selectedTab === "Complete"}
                        onClick={this.handleBetStatusChange}
                    />
                </ButtonBar>
                <TableViewPanel title="Exchange" onReachBottom={this.onReachBottom}>
                    {exchangeBetCells}
                </TableViewPanel>
                <TableViewPanel title="Social" onReachBottom={this.onReachBottom}>
                    {socialBetCells}
                </TableViewPanel>
            </TableView>
        );
    }
}

Bets.propTypes = {
    fetchBets: PropTypes.func.isRequired,
    fetchMoreBets: PropTypes.func.isRequired,
    bets: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    bets: state.bets.items,
})

export default connect(mapStateToProps, { fetchBets, fetchMoreBets, updateBetViewed })(Bets);
