import React from 'react';
import './style.scss';

export default class EventGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "points": [
                {x:20, y:20},
                {x:20, y:60},
                {x:40, y:80},
                {x:60, y:20},
                {x:80, y:80},
                {x:100, y:60},
                {x:120, y:100},
                {x:140, y:90}
            ],
        }

        this.pseudoScalePoints = this.pseudoScalePoints.bind(this);
        this.coordsToPolyPoints = this.coordsToPolyPoints.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.removeHover = this.removeHover.bind(this);
        this.reducePoints = this.reducePoints.bind(this);
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
        const [scaledX, scaledY] = this.pseudoScalePoints(this.state.points, this.state.divWidth, this.state.divWidth);
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
        let hoverPoint = [this.state.points[minXDistIndex]["x"], this.state.points[minXDistIndex]["y"]];
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
    
    reducePoints(points) {
        // turn [{x:1, y:2}, {x:3, y:4}] to [[1, 3], [2, 4]]
        const [xPoints, yPoints] = points.reduce((acc, val) => {
            acc[0].push(val.x);
            acc[1].push(val.y);
            return acc;
        }, [[],[]]);
        return [xPoints, yPoints];
    }

    pseudoScalePoints(points, parentX, parentY) {
        let [xPoints, yPoints] = this.reducePoints(points);
        let maxX = Math.max(...xPoints);
        let maxY = Math.max(...yPoints);
        let minX = Math.min(...xPoints);
        let minY = Math.min(...yPoints);

        let scaleX = parentX / (maxX - minX);
        let scaledX = xPoints.map((val, key) => {
            return (val * scaleX) - (minX * scaleX);
        });

        let scaleY = parentY / (maxY - minY);
        let scaledY = yPoints.map((val, key) => {
            return (val* scaleY) - (minY * scaleY);
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
        const hoverLinePoints = (
            (this.state.hoverPointScaled !== undefined && this.state.hoverPointScaled !== null)
            ? `${this.state.hoverPointScaled[0]} 0, ${this.state.hoverPointScaled[0]} ${this.state.divHeight}`
            : null
        );

        const scaledCoords = this.state.divHeight ? this.pseudoScalePoints(this.state.points, this.state.divWidth, this.state.divHeight) : null;
        const scaledPoints = scaledCoords ? this.coordsToPolyPoints(scaledCoords) : null;
        const maxY = scaledCoords ? Math.max(...scaledCoords[1]) : 0;

        return (
            <div ref={div => (this.div = div)} onMouseMove={this.handleHover} onMouseLeave={this.removeHover} className="eventGraph__container">
                <svg className="eventGraph__svg">
                    <g transform={`translate(0, ${maxY}) scale(1, -1)`}>
                    {   this.state.divHeight &&
                        <polyline
                            fill="none"
                            stroke="#1E7958"
                            strokeWidth="3"
                            points={scaledPoints}
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
