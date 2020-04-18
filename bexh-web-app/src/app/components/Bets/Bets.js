import React from 'react';
import { BetCell } from '../../components';
import './style.scss';

export default class Bets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "Exchange": [
                {
                    "amount": 221,
                    "team": "Detroit Pistons",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                },
                {
                    "amount": 221,
                    "team": "Detroit Pistons",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                },
                {
                    "amount": 221,
                    "team": "Detroit Pistons",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                },
            ],
            "Friends": [
                {
                    "amount": 221,
                    "team": "Detroit Pistons",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
                },
                {
                    "amount": 221,
                    "team": "Detroit Pistons",
                    "amountToWin": 151,
                    "odds": 300,
                    "status": "Active",
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
                <br /><br />
                <h2>Friends</h2>
                {
                    this.state.Friends.map((bet, index) => (
                        <BetCell key={index} bet={bet} />
                    ))
                }
            </div>
        );
    }
}