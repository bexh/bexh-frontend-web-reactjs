import React from 'react';
import './style.scss';

export default class TableViewCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
        this.handleCellSelect = this.handleCellSelect.bind(this);
    }

    handleCellSelect(value) {
        this.setState((prevState) => ({
            selected: !prevState.selected,
        }));
        this.props.onClick(value);
    }

    render() {
        const infos = this.props.info.map((item, key) =>
            <div className="tableViewCell__info" key={key}>{item}</div>
        );
        return (
            // <TableViewCellOnClickHelper value={this.props.value} onClick={this.handleCellSelect}>
            //     {!this.state.selected ?
            //         <div className="tableViewCell">
            //             <div className="tableViewCell__notification">
            //                 {this.props.notification && <span className="tableViewCell__dot" />}
            //             </div>
            //             <div className="tableViewCell__left">
            //                 <div className="tableViewCell__title">{this.props.title}</div>
            //                 {infos}
            //             </div>
            //             <div className="tableViewCell__right">
            //                 <div className="tableViewCell__tag">{this.props.tag}</div>
            //             </div>
            //         </div>
            //         :
            //         <div/>}
            // </TableViewCellOnClickHelper>
            <div class={this.state.selected ? "flip-card flip-card-selected" : " flip-card"} onClick={this.handleCellSelect}>
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div className="tableViewCell__notification">
                            {this.props.notification && <span className="tableViewCell__dot" />}
                        </div>
                        <div className="tableViewCell__left">
                            <div className="tableViewCell__title">{this.props.title}</div>
                            {infos}
                        </div>
                        <div className="tableViewCell__right">
                            <div className="tableViewCell__tag">{this.props.tag}</div>
                        </div>
                    </div>
                    <div class="flip-card-back">
                        back
                    </div>
                </div>
            </div>
        );
    }
}

class TableViewCellOnClickHelper extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.value);
    }

    render() {
        return (
            <div className="tableViewCellOnClickHelper" onClick={this.handleClick}>
                {this.props.children}
            </div>
        );

    }
}
