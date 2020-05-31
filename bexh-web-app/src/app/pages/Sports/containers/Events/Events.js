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
    events: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    events: state.events.items,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchEvents })
)(Events);
