import React from 'react';
import { TableView, TableViewCell, TableViewPanel, TabBar, TabBarButton } from '../../components';
import './style.scss';

export default class Bets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "selectedTab": null,
            "Exchange": [
                {
                    "betType": "Exchange",
                    "amount": 221,
                    "teamFor": "Detroit Pistons",
                    "teamAgainst": "Cleveland Cavaliers",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                    "date": "Monday, July 13th, 10:00 PM",
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
                },
            ],
            "Friends": [
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
                },
            ]
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(e) {
        this.setState({
            selectedTab: e.currentTarget.value,
        });
    }

    render() {

        const [exchangeBets, socialBets] = [this.state.Exchange, this.state.Friends].map((betGroup, i) =>
            betGroup.map((bet, key) =>
                <TableViewCell
                    title={bet.teamFor}
                    info={["vs " + bet.teamAgainst, bet.date]}
                    tag={"$" + bet.amount + " to win $" + bet.amountToWin }
                    key={key}
                />
            )
        );

        return (
            <TableView title="Your Bets">
                <TabBar>
                    <TabBarButton
                        title="Active"
                        selected={this.state.selectedTab == "Active"}
                        onClick={this.handleOptionChange}
                    />
                    <TabBarButton
                        title="Pending"
                        selected={this.state.selectedTab == "Pending"}
                        onClick={this.handleOptionChange}
                    />
                    <TabBarButton
                        title="Complete"
                        selected={this.state.selectedTab == "Complete"}
                        onClick={this.handleOptionChange}
                    />
                </TabBar>
                <TableViewPanel title="Exchange">
                    {exchangeBets}
                </TableViewPanel>
                <TableViewPanel title="Social">
                    {socialBets}
                </TableViewPanel>
            </TableView>
        );
    }
}
