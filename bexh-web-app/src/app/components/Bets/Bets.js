import React from 'react';
import { BetCell } from '../../components';
import './style.scss';

export default class Bets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "Exchange": [
                {
                    "betType": "Exchange",
                    "amount": 221,
                    "team": "Detroit Pistons",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                },
                {
                    "betType": "Exchange",
                    "amount": 20,
                    "team": "Cleveland Cavaliers",
                    "amountToWin": 150,
                    "odds": -200,
                    "status": "Pending",
                    "orderType": "Limit",
                },
                {
                    "betType": "Exchange",
                    "amount": 50,
                    "team": "Detroit Pistons",
                    "amountToWin": 22,
                    "odds": 300,
                    "status": "Active",
                    "orderType": "Limit",
                },
            ],
            "Friends": [
                {
                    "betType": "Social",
                    "amount": 10,
                    "team": "Detroit Pistons",
                    "amountToWin": 20,
                    "odds": 200,
                    "status": "PendingYou",
                    "with": "Eris Llangos",
                },
                {
                    "betType": "Social",
                    "amount": 10000,
                    "team": "Cleveland Cavaliers",
                    "amountToWin": 10000,
                    "odds": 0,
                    "status": "PendingThem",
                    "with": "Julia Rosenson",
                },
            ]
        }
    }
    render() {
        return (
            <div className="bets-flex-container">
                <h1>Your Bets</h1>
                <h2>Exchange</h2>
                {
                    this.state.Exchange.map((bet, index) => (
                        <BetCell key={index} bet={bet} />
                    ))
                }
                <h2 id="friendsHeader">Friends</h2>
                {
                    this.state.Friends.map((bet, index) => (
                        <BetCell key={index} bet={bet} />
                    ))
                }
            </div>
        );
    }
}
