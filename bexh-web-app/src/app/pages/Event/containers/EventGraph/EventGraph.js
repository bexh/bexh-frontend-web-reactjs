import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Odometer from 'react-odometerjs';
import { Graph } from '../../../../components/index';
import { connect } from 'react-redux';
import { fetchEventInfo } from './eventGraphActions';

class EventGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverPoint: null,
        };
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    componentDidMount() {
        this.props.fetchEventInfo({
            eventId: this.props.id,
        });
    }

    onMouseOver(point) {
        this.setState({
            hoverPoint: point,
        });
    }

    onMouseLeave(e) {
        this.setState({
            hoverPoint: null,
        });
    }

    render() {
        if (this.props.points.length < 2) return(<div className="eventGraph__container" />);

        const marketPoint = this.props.points[this.props.points.length - 1];
        const displayPointInfo = this.state.hoverPoint !== null ? this.state.hoverPoint : marketPoint;
        const oddsChange = displayPointInfo['y'] - this.props.points[0]['y'];
        const pctOddsChange = (oddsChange / this.props.points[0]['y']) * 100;

        return (
            <div className="eventGraph__container">
                <div className="eventGraph__info">
                    <div className="eventGraph__title">
                        {`${this.props.homeTeam} vs ${this.props.awayTeam}`}
                    </div>
                    <div className="eventGraph__marketOdds">
                        {displayPointInfo['y'] > 0 ? "+" : ""}
                        <Odometer duration={500} value={displayPointInfo['y']} />
                    </div>
                    <div className="eventGraph__marketOddsChange">
                        {oddsChange >= 0 ? `+${oddsChange} (+${pctOddsChange}%)` : `${oddsChange} (${pctOddsChange}%)`}
                    </div>
                    <div className="eventGraph__eventDate">
                        {this.props.date}
                    </div>
                </div>
                <div className="eventGraph__graphContainer">
                    <Graph points={this.props.points} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} displayField="date"/>
                </div>
                <hr />
            </div>
        );
    }
}

EventGraph.propTypes = {
    fetchEventInfo: PropTypes.func.isRequired,
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
    })),
    homeTeam: PropTypes.string.isRequired,
    awayTeam: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    points: state.eventInfo.item.points,
    homeTeam: state.eventInfo.item.homeTeam,
    awayTeam: state.eventInfo.item.awayTeam,
    date: state.eventInfo.item.date,
});

export default connect(mapStateToProps, { fetchEventInfo })(EventGraph);
