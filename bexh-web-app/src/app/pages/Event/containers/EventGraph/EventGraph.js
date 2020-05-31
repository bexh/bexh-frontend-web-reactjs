import React from 'react';
import './style.scss';
import { Graph } from '../../../../components/index';
import Odometer from 'react-odometerjs';

export default class EventGraph extends React.Component {
    constructor(props) {
        super(props);
        // note: x will be unix while date is pretty format
        this.state = {
            points: [
                {x:10, y:20, date: "Saturday, April 21, 12:00 PM ET"},
                {x:20, y:60, date: "Saturday, April 21 12:30 PM ET"},
                {x:40, y:80, date: "Saturday, April 21 1:00 PM ET"},
                {x:60, y:20, date: "Saturday, April 21 1:30 PM ET"},
                {x:80, y:80, date: "Saturday, April 21 2:00 PM ET"},
                {x:100, y:60, date: "Saturday, April 21 2:30 PM ET"},
                {x:120, y:100, date: "Saturday, April 21 3:00 PM ET"},
                {x:140, y:90, date: "Saturday, April 21 3:30 PM ET"}
            ],
            homeTeam: "Cleveland Cavaliers",
            awayTeam: "Detroit Pistons",
            date: "Sunday, April 22, 12:00 PM",
            hoverPoint: null,
        };
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseOver(point) {
        console.log("MOUSE OVER", point);
        this.setState({
            hoverPoint: point,
        });
    }

    onMouseLeave(e) {
        this.setState({
            hoverPoint: null,
        })
    }

    render() {
        const marketPoint = this.state.points[this.state.points.length - 1];
        const displayPointInfo = this.state.hoverPoint !== null ? this.state.hoverPoint : marketPoint;
        const oddsChange = displayPointInfo['y'] - this.state.points[0]['y'];
        const pctOddsChange = (oddsChange / this.state.points[0]['y']) * 100;

        return (
            <div className="eventGraph__container">
                <div className="eventGraph__info">
                    <div className="eventGraph__title">
                        {`${this.state.homeTeam} vs ${this.state.awayTeam}`}
                    </div>
                    <div className="eventGraph__marketOdds">
                        {displayPointInfo['y'] > 0 ? "+" : ""}
                        <Odometer duration={500} value={displayPointInfo['y']} />
                    </div>
                    <div className="eventGraph__marketOddsChange">
                        {oddsChange >= 0 ? `+${oddsChange} (+${pctOddsChange}%)` : `${oddsChange} (${pctOddsChange}%)`}
                    </div>
                    <div className="eventGraph__eventDate">
                        {this.state.date}
                    </div>
                </div>
                <div className="eventGraph__graphContainer">
                    <Graph points={this.state.points} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}/>
                </div>
                <hr />
            </div>
        );
    }
}
