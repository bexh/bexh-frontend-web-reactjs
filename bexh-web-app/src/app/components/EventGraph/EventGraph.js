import React from 'react';
import './style.scss';

export default class EventGraph extends React.Component {
    constructor(props) {
        super(props);
        this.updateSize = this.updateSize.bind(this);
    }

    // componentDidMount() {
    //     this.div.addEventListener('resize', this.updateSize);
    // }

    // componentWillUnmount() {
    //     this.div.removeEventListener('resize', this.updateSize);
    // }

    updateSize() {
        console.log("SIZE", this.div);
    }

    render() {
        this.updateSize();
        return (
            <div ref={div => (this.div = div)} className="eventGraph__container">
                <svg className="eventGraph__svg" preserveAspectRatio="xMinYMin meet">
                    <polyline
                        className="eventGraph__svg"
                        fill="none"
                        stroke="#0074d9"
                        points="
                        00,00
                        20,60
                        40,80
                        60,20
                        80,80
                        100,80
                        120,60
                        140,100
                        160,90
                        "
                    />
                </svg>
            </div>
        );
    }
}