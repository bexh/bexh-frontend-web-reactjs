import React from 'react';
import {
    TableView,
    TableViewPanel,
    TableViewBigCellContainer,
    TableViewBigCell,
} from '../../../../components';
import './style.scss';

export default class Overview extends React.Component {
    render() {
        return (
            <div className="overview__tableContainer">
                <TableView title="Overview">
                    <TableViewPanel title="Active Bets" style={{height: "50%"}}>
                        <TableViewBigCellContainer>
                            <TableViewBigCell title="In Play" value="$250" />
                            <TableViewBigCell title="To Win" value="$400" />
                        </TableViewBigCellContainer>
                    </TableViewPanel>
                    <TableViewPanel title="Savings" style={{height: "50%"}}>
                        <TableViewBigCellContainer>
                            <TableViewBigCell title="Account Balance" value="$4200" />
                            <TableViewBigCell title="Vig Savings" value="$25" />
                        </TableViewBigCellContainer>
                    </TableViewPanel>
                </TableView>
            </div>
        );
    }
}
