import React from 'react';
import {
    TableView,
    TableViewCell,
    TableViewPanel,
} from '../../../../components';import './style.scss';

export default class Overview extends React.Component {
    render() {
        return (
            <div className="overview__tableContainer">
                <TableView title="Overview">
                    <TableViewPanel title="Active Bets" style={{height: "50%"}}>
                        <div className="overview__bigCellContainer">
                            <div className="overview__bigCell">
                                <div className="overview__bigCell__title">In Play</div>
                                <div className="overview__bigCell__value">$250</div>
                            </div>
                            <div className="overview__bigCell">
                                <div className="overview__bigCell__title">To Win</div>
                                <div className="overview__bigCell__value">$400</div>
                            </div>
                        </div>
                    </TableViewPanel>
                    <TableViewPanel title="Savings" style={{height: "50%"}}>
                        <div className="overview__bigCellContainer">
                            <div className="overview__bigCell">
                                <div className="overview__bigCell__title">Account Balance</div>
                                <div className="overview__bigCell__value">$4200</div>
                            </div>
                            <div className="overview__bigCell">
                                <div className="overview__bigCell__title">Vig Savings</div>
                                <div className="overview__bigCell__value">$25</div>
                            </div>
                        </div>
                    </TableViewPanel>
                </TableView>
            </div>
            
        );
    }
}
