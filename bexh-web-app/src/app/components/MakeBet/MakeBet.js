import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormInput, Button, ButtonBar } from '../../components';
import { fetchGame, createBet } from './makeBetActions';
import './style.scss';


class MakeBet extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState;

        this.calcMarketOdds = this.calcMarketOdds.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleOddsChange = this.handleOddsChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.winnerButtonOnClick = this.winnerButtonOnClick.bind(this);
        this.submitButtonOnClick = this.submitButtonOnClick.bind(this);
    }

    get initialState() {
        return {
            "amount"     : 0,
            "betType"    : "Market",
            "friend"     : "",
            "note"       : "",
            "userOdds"   : "",
            "showOdds"   : true,
            // "homeTeam"   : "Jazz",
            // "awayTeam"   : "Bulls",
            "toWin"      : "-",
            // "winner"     : "Jazz",
            // "marketOdds" : this.calcMarketOdds("Jazz", "Jazz", "300"),
        };
    }

    componentDidMount() {
        this.props.fetchGame();
        this.props.makeBet.map(game => (
            this.setState({
                homeTeam: game.team1,
                awayTeam: game.team2,
                marketOdds: this.calcMarketOdds(game.team1, game.team2, game.odds),
                winner: game.team1
            })
        ));
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.newBet) {
    //         this.props.makeBet.unshift(nextProps.newPost);
    //     }
    // }

    calcMarketOdds(winner, homeTeam, odds) {
        let oddsSign = winner === homeTeam ?  "+" : "-";
        return (oddsSign + odds);
    }

    calcProfit(amount, userOdds, marketOdds, betType) {
        let profit = 0.00;
        let odds = userOdds;
        if (betType === "Market") {
            odds = marketOdds;
        }
        if (odds[0] === "-") {
            profit = parseFloat(amount) / (-1 * parseFloat(odds) / 100);
        }
        else {
            profit = parseFloat(amount) * (parseFloat(odds) / 100);
        }
        profit = `$${(Math.round(profit * 100) / 100).toFixed(2)}`;
        if (profit === "$NaN") {
            profit = "-";
        }
        return profit
    }

    handleOddsChange(event) {
        const profit = this.calcProfit(this.state.amount, event.target.value, this.state.marketOdds, this.state.betType);
        this.setState({
            userOdds: event.target.value,
            toWin: profit 
        });
    }

    handleAmountChange(event) {
        const profit = this.calcProfit(event.target.value, this.state.userOdds, this.state.marketOdds, this.state.betType);
        this.setState({
            amount: parseFloat(event.target.value),
            toWin: profit,
        });
    }

    handleNoteChange(event) {
        this.setState({note: event.target.value});
    }

    handleOptionChange(event) {
        let type = event.target.value;
        let showOddsBool = type === "Limit" ? false : true;
        let profit = this.calcProfit(this.state.amount, this.state.userOdds, this.state.marketOdds, type);
        this.setState((prevState) => ({
            betType: type,
            showOdds: showOddsBool,
            userOdds: prevState.betType === "Market" ? "" : prevState.userOdds,
            toWin: prevState.betType === "Market" ? "-" : profit,
        }));
    }

    submitButtonOnClick(e){
        e.preventDefault();

        const post = {
            betType: this.state.betType,
            winner: this.state.winner,
            amount: this.state.amount,
            odds: this.state.betType == "Market" ? this.state.marketOdds : this.state.userOdds,
            note: this.state.note,
            friend: this.state.friend
        }

        this.props.createBet(post);

        this.setState(this.initialState);
    }

    winnerButtonOnClick(e) {
        e.persist();
        const marketOddsVal = this.calcMarketOdds(e.target.value, this.state.homeTeam);
        this.setState({
            winner: e.target.value,
            marketOdds: marketOddsVal,
        });
        this.setState()
    }

    render() {
        const oddsInput = this.state.betType === "Market" ? "value" : "text";

        return (
        <div className="makeBet__flexContainer">
            <h1 className="makeBet__header">Place Your Bet</h1>
            <div className="makeBet__betButtonBar">
                <ButtonBar>
                    <Button
                        className="button--tabButton"
                        title="Market"
                        value="Market"
                        selected={this.state.betType === "Market"}
                        onClick={this.handleOptionChange}
                    />
                    <Button
                        className="button--tabButton"
                        title="Limit"
                        value="Limit"
                        selected={this.state.betType === "Limit"}
                        onClick={this.handleOptionChange}
                    />
                    <Button
                        className="button--tabButton"
                        title="Friends"
                        value="Friends"
                        selected={this.state.betType === "Friends"}
                        onClick={this.handleOptionChange}
                    />
                </ButtonBar>
            </div>
            <div className="makeBet__contentContainer">
                <div className="makeBet__betFeatures">
                    <FormInput
                        title="Winner:"
                        inputType="toggle"
                        toggleOn={this.state.homeTeam}
                        toggleOff={this.state.awayTeam}
                        toggleIsOn={this.state.winner === this.state.homeTeam}
                        onClick={this.winnerButtonOnClick}
                    />
                    <FormInput
                        title="Odds:"
                        inputType={oddsInput}
                        value={this.state.marketOdds}
                        default="+/- 200"
                        onChange={this.handleOddsChange}
                    />
                    <FormInput
                        title="Amount:"
                        inputType="text"
                        default="$0.00"
                        onChange={this.handleAmountChange}
                    />
                    <FormInput
                        title="To win:"
                        inputType="value"
                        value={this.state.toWin}
                    />
                    { this.state.betType === "Friends" ?
                    <FormInput
                        title="Friend:"
                        inputType="dropdown"
                    />
                    : null }
                    { this.state.betType === "Friends" ?
                    <FormInput
                        title="Note:"
                        inputType="textarea"
                        onChange={this.handleNoteChange}
                        className="formInput__note"
                    />
                    : null }
                </div>
            </div>
            <Button
                className="button__submit"
                title="Submit"
                onClick={this.submitButtonOnClick}
            />
        </div>
        );
    }
}

MakeBet.propTypes = {
    fethGame: PropTypes.func.isRequired,
    createBet: PropTypes.func.isRequired,
    makeBet: PropTypes.array.isRequired,
    newBet: PropTypes.object,
}

const mapStateToProps = state => ({
    // Reducer for placing new bets and getching game data
    makeBet: state.makeBet.items,
    newBet: state.makeBet.item,
})

export default connect(mapStateToProps, { fetchGame, createBet })(MakeBet)
