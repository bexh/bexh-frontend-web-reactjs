import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBets, fetchMoreBets, updateBetViewed } from './betActions';
import {
    TableView,
    TableViewCell,
    TableViewPanel,
} from '../../../../components';
import './style.scss';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "events": {
                "Monday, May 18th": [
                    {
                        sport: "Basketball",
                        homeTeam: "Chicago Bulls",
                        awayTeam: "Detroit Pistons",
                        date: "Monday, May 18th, 12:00 PM",
                        odds: 300,
                        id: 1,
                    },
                    {
                        sport: "Basketball",
                        homeTeam: "Chicago Bulls",
                        awayTeam: "Phoenix Suns",
                        date: "Monday, May 18th, 2:000 PM",
                        odds: -100,
                        id: 2,
                    }
                ],
                "Tuesday, May 19th": [
                    {
                        sport: "Basketball",
                        homeTeam: "Chicago Bulls",
                        awayTeam: "Cleveland Cavaliers",
                        date: "Tuesday, May 19th, 2:00 PM",
                        odds: -50,
                        id: 3,
                    }
                ],
                "Wednesday, May 20th": [
                    {
                        sport: "Basketball",
                        homeTeam: "Chicago Bulls",
                        awayTeam: "Washington Capitals",
                        date: "Wednesday, May 20th, 4:00 PM",
                        odds: 100,
                        id: 4,
                    }
                ],
                "Thursday, May 21st": [
                    {
                        sport: "Basketball",
                        homeTeam: "Chicago Bulls",
                        awayTeam: "Detroit Pistons",
                        date: "Thursday, May 21st, 6:00 PM",
                        odds: 100,
                        id: 5,
                    }
                ]
            }
        }
    }

    renderEventCell(events) {
        let panels = []
        for (var key in events) {
            const eventCells = events.key.map((event, index) => {
                const tag = (event.odds > 0 ? "+/-" : "-/+") + Math.abs(event.odds);
                return (
                    <TableViewCell
                        title={title}
                        tag={tag}
                        info={[`vs ${event.awayTeam}`, `${event.date}`]}
                        key={event.id}
                        value={event.id}
                    />
                )
            });
            const panel = (
                <TableViewPanel title={key} >

                </TableViewPanel>
            )
        }
    }

    render() {
        const eventCells = this.renderEventCells(this.state.events);
        return (
            <TableView title={this.props.sport}>
                {eventCells}
            </TableView>
        )
    }
}


Events.propTypes = {
    sport: PropTypes.string.isRequired,
    // fetchEvents: PropTypes.func.isRequired,
}