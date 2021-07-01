import React from 'react';
import './style.scss';


export default class TableViewBigCellContainer extends React.Component {
    render() {
        return(
            <div className="tableViewBigCellContainer">
                { this.props.children }
            </div>
        );
    }
}