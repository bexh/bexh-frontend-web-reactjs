import React from 'react';
import {
    TableView,
    TableViewCell,
    TableViewPanel,
    ButtonBar,
    Button,
    TableViewCellDropdown,
} from '../../components';
import './style.scss';

export default class Bets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "selectedTab": null,
            "bets": [
                {
                    "betType": "Exchange",
                    "amount": 221,
                    "teamFor": "Detroit Pistons",
                    "teamAgainst": "Cleveland Cavaliers",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                    "date": "Monday, July 13th, 10:00 PM",
                    "viewed": true,
                },
                {
                    "betType": "Exchange",
                    "amount": 20,
                    "teamFor": "Cleveland Cavaliers",
                    "teamAgainst": "Detroit Pistons",
                    "amountToWin": 150,
                    "odds": -200,
                    "status": "Pending",
                    "orderType": "Limit",
                    "date": "Monday, July 13th, 10:00 PM",
                    "viewed": false,
                },
                {
                    "betType": "Exchange",
                    "amount": 50,
                    "teamFor": "Detroit Pistons",
                    "teamAgainst": "Cleveland Cavaliers",
                    "amountToWin": 22,
                    "odds": 300,
                    "status": "Active",
                    "orderType": "Limit",
                    "date": "Monday, July 13th, 10:00 PM",
                    "viewed": true,
                },
                {
                    "betType": "Social",
                    "amount": 10,
                    "teamFor": "Detroit Pistons",
                    "teamAgainst": "Cleveland Cavaliers",
                    "amountToWin": 20,
                    "odds": 200,
                    "status": "PendingYou",
                    "with": "Eris Llangos",
                    "date": "Monday, July 13th, 10:00 PM",
                    "viewed": true,
                },
                {
                    "betType": "Social",
                    "amount": 10000,
                    "teamFor": "Cleveland Cavaliers",
                    "teamAgainst": "Detroit Pistons",
                    "amountToWin": 10000,
                    "odds": 0,
                    "status": "PendingThem",
                    "with": "Julia Rosenson",
                    "date": "Monday, July 13th, 10:00 PM",
                    "viewed": true,
                },
            ]
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSelectBet = this.handleSelectBet.bind(this);
        this.renderBets = this.renderBets.bind(this);
    }

    handleOptionChange(e) {
        this.setState({
            selectedTab: e.currentTarget.value,
        });
    }

    handleSelectBet(value) {
        // TODO: modify notification on click. redux?
    }

    renderBets() {
        const [exchangeBets, socialBets] = ["Exchange", "Social"].map((betType, i) =>
            this.state.bets.filter(bet => bet.betType === betType)
        )
        const [exchangeBetCells, socialBetCells] = [exchangeBets, socialBets].map((betGroup, i) =>
            betGroup.map((bet, key) =>
                <TableViewCell
                    title={bet.teamFor}
                    info={["vs " + bet.teamAgainst, bet.date]}
                    tag={"$" + bet.amount + " to win $" + bet.amountToWin}
                    notification={bet.viewed}
                    key={key}
                    value="thing"
                    onClick={this.handleSelectBet}
                >
                    <TableViewCellDropdown info={["Odds: +300", "On: Pistons", "With: Gilfoyle"]}>
                        <ButtonBar>
                            <Button
                                title="Accept"
                                style={{ "background": "#1E7958" }}
                            />
                            <Button
                                title="Decline"
                                style={{ background: "#A4412C" }}
                            />
                        </ButtonBar>
                    </TableViewCellDropdown>
                </TableViewCell>
            )
        );
        return [exchangeBetCells, socialBetCells];
    }

    render() {

        const [exchangeBetCells, socialBetCells] = this.renderBets();

        return (
            <TableView title="Your Bets">
                <ButtonBar>
                    <Button
                        className="tabButton"
                        title="Active"
                        selected={this.state.selectedTab === "Active"}
                        onClick={this.handleOptionChange}
                    />
                    <Button
                        className="tabButton"
                        title="Pending"
                        selected={this.state.selectedTab === "Pending"}
                        onClick={this.handleOptionChange}
                    />
                    <Button
                        className="tabButton"
                        title="Complete"
                        selected={this.state.selectedTab === "Complete"}
                        onClick={this.handleOptionChange}
                    />
                </ButtonBar>
                <TableViewPanel title="Exchange">
                    {exchangeBetCells}
                </TableViewPanel>
                <TableViewPanel title="Social">
                    {socialBetCells}
                </TableViewPanel>
            </TableView>
        );
    }
}
