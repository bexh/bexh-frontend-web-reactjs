import React from 'react';
import './style.scss';

export default class EventGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "points": {
                x: [
                    0,
                    20,
                    40,
                    60,
                    80,
                    100,
                    120,
                    140
                ],
                y: [
                    0,
                    60,
                    80,
                    20,
                    80,
                    60,
                    100,
                    90
                ]
            }
        }
        this.pseduoScalePoints = this.pseduoScalePoints.bind(this);
    }

    pseduoScalePoints(points) {
        let maxX = Math.max(points["x"]);
        let maxY = Math.max(points["y"]);
        let minX = Math.min(points["x"]);
        let minY = Math.min(points["y"]);

        console.log("div", this.div);

        let parentX = (typeof this.div?.offsetWidth !== "undefined") ? this.div.offsetWidth : 10;
        let parentY = (typeof this.div?.offsetHeight !== "undefined") ? this.div.offsetHeight : 10;

        let scaleX = parentX / (maxX - minX);
        let scaledX = points["x"].map((val, key) => {
            console.log("scale X", scaleX);
            console.log("val", val);
            return (val * scaleX);
        });

        let scaleY = parentY / (maxY - minY);
        let scaledY = points["y"].map((val, key) => {
            return (val* scaleY);
        });

        console.log("scaled x", scaledX);
        console.log("scaled y", scaledY);
    }
    
    // this.setState({
    //     viewBoxHeight: this.div.offsetHeight,
    //     viewBoxWidth: this.div.offsetWidth
    //   });

    render() {
        return (
            <div ref={div => (this.div = div)} className="eventGraph__container">
                <svg className="eventGraph__svg">
                    <polyline
                        fill="none"
                        stroke="#0074d9"
                        points={this.pseduoScalePoints(this.state.points)}
                    />
                </svg>
            </div>
        );
    }
}