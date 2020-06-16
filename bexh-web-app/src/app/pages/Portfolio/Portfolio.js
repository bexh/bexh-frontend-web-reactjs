import React from 'react';
import './style.scss';
import PortfolioBets from './containers/PortfolioBets/PortfolioBets';
import RecEvents from './containers/RecEvents/RecEvents';

export default class Portfolio extends React.Component {
    render() {
        return (
            <div className="portfolio__container">
                <RecEvents />
                <PortfolioBets />
            </div>
        );
    }
}
