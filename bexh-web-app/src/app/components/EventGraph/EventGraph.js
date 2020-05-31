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
        this.coordsToPolyPoints = this.coordsToPolyPoints.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.removeHover = this.removeHover.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.setState({
            divHeight: this.div.offsetHeight,
            divWidth: this.div.offsetWidth,
        });
      }

    componentWillUnmount() {
        window.removeEventListener("resize", null);
    }

    handleHover(e) {
        let relativeX = e.clientX - this.div.offsetLeft;
        const [scaledX, scaledY] = this.pseduoScalePoints(this.state.points, this.state.divWidth, this.state.divWidth);
        let minXDistIndex = 0;
        let minXDist = 10000;
        for (var i = 0; i < scaledX.length; i++) {
            const xDist = Math.abs(relativeX - scaledX[i]);
            if (xDist < minXDist) {
                minXDist = xDist;
                minXDistIndex = i;
            }
        }
        let hoverPointScaled = [scaledX[minXDistIndex], scaledY[minXDistIndex]];
        let hoverPoint = [this.state.points["x"][minXDistIndex], this.state.points["y"][minXDistIndex]];
        this.setState({
            hoverPointScaled: hoverPointScaled,
            hoverPoint: hoverPoint,
        });
    }

    removeHover(e) {
        this.setState({
            hoverPointScaled: null,
            hoverPoint: null,
        });
    }

    handleResize(WindowSize, event) {
        this.setState({
            divHeight: this.div.offsetHeight,
            divWidth: this.div.offsetWidth,
        });
    }

    pseduoScalePoints(points, parentX, parentY) {
        let maxX = Math.max(...points["x"]);
        let maxY = Math.max(...points["y"]);
        let minX = Math.min(...points["x"]);
        let minY = Math.min(...points["y"]);

        let scaleX = parentX / (maxX - minX);
        let scaledX = points["x"].map((val, key) => {
            return (val * scaleX);
        });

        let scaleY = parentY / (maxY - minY);
        let scaledY = points["y"].map((val, key) => {
            return (val* scaleY);
        });

        return [scaledX, scaledY];
    }

    coordsToPolyPoints(coords) {
        let [xCoords, yCoords] = coords;
        let scaledPoints = ""
        for (var i = 0; i < xCoords.length; i++) {
            scaledPoints += `${xCoords[i]} ${yCoords[i]}`
            if (i !== xCoords.length - 1) {
                scaledPoints += ", "
            }
        }

        return scaledPoints;
    }

    render() {
        console.log("Hover point scaled", this.state.hoverPointScaled);
        let hoverLinePoints = (
            (this.state.hoverPointScaled !== undefined && this.state.hoverPointScaled !== null)
            ? `${this.state.hoverPointScaled[0]} 0, ${this.state.hoverPointScaled[0]} ${this.state.divHeight}`
            : null
        );
        
        return (
            <div ref={div => (this.div = div)} onMouseMove={this.handleHover} onMouseLeave={this.removeHover} className="eventGraph__container">
                <svg className="eventGraph__svg">
                    <g>
                    {   this.state.divHeight &&
                        <polyline
                            fill="none"
                            stroke="#1E7958"
                            strokeWidth="3"
                            points={
                                this.coordsToPolyPoints(
                                    this.pseduoScalePoints(
                                        this.state.points,
                                        this.state.divWidth,
                                        this.state.divHeight
                                    )
                                )
                            }
                        />
                    }
                    {
                        hoverLinePoints &&
                        <polyline
                            fill="none"
                            stroke="#1E7958"
                            strokeWidth="2"
                            points={hoverLinePoints}
                        />
                    }
                    </g>
                </svg>
            </div>
        );
    }
}
