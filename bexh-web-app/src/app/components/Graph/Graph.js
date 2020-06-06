import React from 'react';
import './style.scss';
import EventGraph from '../../pages/Event/containers/EventGraph/EventGraph';
import PropTypes from 'prop-types';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            divHeight: null,
            divWidth: null,
        };

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
        const [scaledX, scaledY] = this.pseudoScalePoints(this.props.points, this.state.divWidth, this.state.divWidth);
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
        let hoverPoint = [this.props.points[minXDistIndex]["x"], this.props.points[minXDistIndex]["y"]];
        this.setState({
            hoverPointScaled: hoverPointScaled,
            hoverPoint: hoverPoint,
            hoverPointRaw: this.props.points[minXDistIndex], 
        });
        this.props.onMouseOver(this.props.points[minXDistIndex]);
    }

    removeHover(e) {
        this.setState({
            hoverPointScaled: null,
            hoverPoint: null,
        });
        this.props.onMouseLeave(e);
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
        // Scale points such that maxX is div width and minX is 0. Same for Y.
        // We do this because svg multiline points correspond to pixel values.
        
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
            return (val * scaleY) - (minY * scaleY);
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

        const scaledCoords = this.state.divHeight ? this.pseudoScalePoints(this.props.points, this.state.divWidth, this.state.divHeight) : null;
        const scaledPoints = scaledCoords ? this.coordsToPolyPoints(scaledCoords) : null;
        const maxY = scaledCoords ? Math.max(...scaledCoords[1]) : 0;
        const reducedCoords = this.reducePoints(this.props.points);
        const nonScaleMaxY = Math.max(...reducedCoords[1]);
        const nonScaleMinY = Math.min(...reducedCoords[0]);
        const yAxisPoints = [nonScaleMaxY]
        const numYAxisMarkers = 10;
        for (var i = 1; i < numYAxisMarkers; i++) {
            yAxisPoints.push(yAxisPoints[yAxisPoints.length - 1] - ((nonScaleMaxY - nonScaleMinY) / numYAxisMarkers));
        }

        return (
            <div className="graph__colContainer">
                <div className="graph__hoverDisplayContainer">
                    <div style={{width: '6%', height: '20px'}} />
                    <div className="graph__hoverDisplay">
                        {
                            this.state.hoverPointScaled &&
                        <div className="graph__hoverDisplayText" style={{left: `${this.state.hoverPointScaled[0] - 60}px`}}>{this.state.hoverPointRaw[this.props.displayField]}</div>
                        }
                    </div>
                </div>
                <div className="graph__rowContainer">
                    <div className="graph__yAxis">
                        {yAxisPoints.map((val, key) => (
                            <div key={key} className="graph__yAxis__val">{val}</div>
                        ))}
                    </div>
                    <div ref={div => (this.div = div)} onMouseMove={this.handleHover} onMouseLeave={this.removeHover} className="graph__graphContainer">
                        <svg className="graph__svg">
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
                                    stroke="rgba(201, 201, 201, 0.4)"
                                    strokeWidth="1"
                                    points={hoverLinePoints}
                                />
                            }
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

Graph.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    })),
    onMouseOver: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    displayField: PropTypes.string.isRequired,
}
