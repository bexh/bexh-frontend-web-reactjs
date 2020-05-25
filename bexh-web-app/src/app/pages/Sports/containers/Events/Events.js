import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchEvents } from './eventsActions';
import { withRouter } from 'react-router-dom';
import {
    TableView,
    TableViewCell,
    TableViewPanel,
} from '../../../../components';
import { Capitalize } from '../../../../../utils/utils';
import './style.scss';

class Events extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     "events": {
        //         "Monday, May 18th": [
        //             {
        //                 sport: "Basketball",
        //                 homeTeam: "Chicago Bulls",
        //                 awayTeam: "Detroit Pistons",
        //                 date: "Monday, May 18th, 12:00 PM",
        //                 odds: 300,
        //                 eventId: 1,
        //             },
        //             {
        //                 sport: "Basketball",
        //                 homeTeam: "Chicago Bulls",
        //                 awayTeam: "Phoenix Suns",
        //                 date: "Monday, May 18th, 2:000 PM",
        //                 odds: -100,
        //                 eventId: 2,
        //             }
        //         ],
        //         "Tuesday, May 19th": [
        //             {
        //                 sport: "Basketball",
        //                 homeTeam: "Chicago Bulls",
        //                 awayTeam: "Cleveland Cavaliers",
        //                 date: "Tuesday, May 19th, 2:00 PM",
        //                 odds: -50,
        //                 eventId: 3,
        //             }
        //         ],
        //         "Wednesday, May 20th": [
        //             {
        //                 sport: "Basketball",
        //                 homeTeam: "Chicago Bulls",
        //                 awayTeam: "Washington Capitals",
        //                 date: "Wednesday, May 20th, 4:00 PM",
        //                 odds: 100,
        //                 eventId: 4,
        //             }
        //         ],
        //         "Thursday, May 21st": [
        //             {
        //                 sport: "Basketball",
        //                 homeTeam: "Chicago Bulls",
        //                 awayTeam: "Detroit Pistons",
        //                 date: "Thursday, May 21st, 6:00 PM",
        //                 odds: 100,
        //                 eventId: 5,
        //             }
        //         ]
        //     }
        // }
        this.renderEventPanels = this.renderEventPanels.bind(this);
        this.navigateToEvent = this.navigateToEvent.bind(this);
    }

    componentDidMount() {
        this.props.fetchEvents({
            sport: this.props.sport,
        });
    }

    navigateToEvent(e) {
        const eventId = e.target.value;
        this.props.history.push(`/event/${eventId}`);
    }

    renderEventPanels(events) {
        let panels = []
        for (var key in events) {
            const eventCells = events[key].map((event, index) => {
                const tag = (event.odds > 0 ? "+/- "  : "-/+ ") + Math.abs(event.odds);
                const title = `${event.homeTeam} vs ${event.awayTeam}`;
                return (
                    <TableViewCell
                        title={title}
                        tag={tag}
                        info={[event.date]}
                        key={event.eventId}
                        value={event.eventId}
                        onClick={this.navigateToEvent}
                    />
                )
            });
            const panel = (
                <TableViewPanel title={key} key={key} >
                    {eventCells}
                </TableViewPanel>
            )
            panels.push(panel);
        }
        return panels;
    }

    render() {
        console.log("EVENTS", this.props.events);
        const eventPanels = this.renderEventPanels(this.props.events);
        const title = Capitalize(this.props.sport);
        return (
            <TableView title={title}>
                {eventPanels}
            </TableView>
        )
    }
}

Events.propTypes = {
    sport: PropTypes.string.isRequired,
    fetchEvents: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    events: state.events.items,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchEvents })
)(Events);
