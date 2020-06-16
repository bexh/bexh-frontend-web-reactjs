import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchRecEvents } from './recEventsActions';
import { withRouter } from 'react-router-dom';
import {
    TableView,
    TableViewCell,
    TableViewPanel,
} from '../../../../components';
import './style.scss';

class RecEvents extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventPanels = this.renderEventPanels.bind(this);
        this.navigateToEvent = this.navigateToEvent.bind(this);
    }

    componentDidMount() {
        // TODO: fix this when sessions are in place
        this.props.fetchRecEvents({
            uid: "123",
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
        const eventPanels = this.renderEventPanels(this.props.recEvents);
        return (
            <div className="recEvents__tableContainer" >
                <TableView title="Recommended Bets">
                    {eventPanels}
                </TableView>
            </div>
        )
    }
}

RecEvents.propTypes = {
    fetchRecEvents: PropTypes.func.isRequired,
    recEvents: PropTypes.shape({}),
}

const mapStateToProps = state => ({
    recEvents: state.recEvents.items,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchRecEvents })
)(RecEvents);
