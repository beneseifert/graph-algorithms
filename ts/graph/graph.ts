import { Canvas } from "../canvas/canvas";
import { Rectangle, Line } from "../canvas/datatypes";
import { Coords } from "./datatypes";
import { Edge } from "./edge";
import { Color } from "../canvas/color";
import { cartesianProduct } from "../helper/cartesian-product";
import * as _ from "lodash";

export class Graph {

    private edges: Array<Edge> = [];
    private cellWidth: number = 1;
    private cellHeight: number = 1;
    private startEdge: Edge = null;
    private targetEdge: Edge = null;
    private edgeIteratorIndex: number = 0;

    public TOP: number = 0;
    public BOTTOM: number = 0;
    public LEFT: number = 0;
    public RIGHT: number = 0;

    public constructor(
        private canvas: Canvas,
        private dimensions: Coords) {
            this.createGrid();
            this.BOTTOM = this.dimensions.y - 1;
            this.RIGHT = this.dimensions.x - 1;
    }

    private createGrid(): void {
        this.cellWidth = Math.floor(this.canvas.getWidth() / this.dimensions.x);
        this.cellHeight = Math.floor(this.canvas.getHeight() / this.dimensions.y);
        for (let y = 0; y < this.dimensions.y; y++) {
            for (let x = 0; x < this.dimensions.x; x++) {
                let edge: Edge = new Edge({x: x, y: y});
                this.edges.push(edge);
                this.drawEdge(edge);
            }
        }
    }

    public forEachEdge(fun: (edge: Edge) => void):void {
        for (let i in this.edges) {
            let currEdge: Edge = this.edges[i];
            fun(currEdge);
        }
    }

    public iterateEdge(): Edge {
        if (this.edgeIteratorIndex >= this.edges.length) return null;
        return this.edges[this.edgeIteratorIndex++];
    }

    public resetIterator(): void {
        this.edgeIteratorIndex = 0;
    }

    public drawLineBetweenEdges(edge1: Edge, edge2: Edge, color?: Color): void {
        let edge1Coords: Coords = edge1.getCoords(),
            edge2Coords: Coords = edge2.getCoords();

        let cellOffsetWidth: number = Math.floor(this.cellWidth / 2),
            cellOffsetHeight: number = Math.floor(this.cellHeight / 2);

        let line: Line = {
            fromX: edge1Coords.x * this.cellWidth + cellOffsetWidth,
            fromY: edge1Coords.y * this.cellHeight + cellOffsetHeight,
            toX: edge2Coords.x * this.cellWidth + cellOffsetWidth,
            toY: edge2Coords.y * this.cellHeight + cellOffsetHeight,
            lineWidth: Math.ceil(this.cellWidth / 3)
        };
        this.canvas.drawLine(line, color);
    }

    public drawEdge(edge: Edge, color?: Color) {
        let edgeCoords: Coords = edge.getCoords();
        let rectangle: Rectangle = {
            x: edgeCoords.x * this.cellWidth,
            y: edgeCoords.y * this.cellHeight,
            w: this.cellWidth,
            h: this.cellHeight
        };
        if (typeof color !== "undefined") {
            this.canvas.setFillColor(color);
        } else {
            if (edge.getIsObstacle()) {
                this.canvas.setFillColor(Color.BLACK);
            } else {
                this.canvas.setFillColor(Color.WHITE);
            }
        }
        this.canvas.drawRectangle(rectangle);
    }

    public getNeighbors(edge: Edge): Array<Edge> {
        let neighbors: Array<Edge> = [],
            neighborCoords: Array<Coords> = cartesianProduct([-1, 0, 1], [-1, 0, 1]);
        _.remove(neighborCoords, (coords: Coords) => {
            return coords.x === 0 && coords.y === 0;
        });
        for (let i in neighborCoords) {
            let currCoords = neighborCoords[i],
            currNeighbor = this.getNeighbor(edge, currCoords);
            if (currNeighbor && !currNeighbor.getIsObstacle()) {
                neighbors.push(currNeighbor);
            }
        }
        return neighbors;
    }

    private getNeighbor(edge: Edge, coords: Coords): Edge {
        let edgeCoords: Coords = edge.getCoords(),
            neighborEdgeCoords: Coords = {
                x: edgeCoords.x + coords.x,
                y: edgeCoords.y + coords.y
            }
        if (neighborEdgeCoords.x < 0 || neighborEdgeCoords.x >= this.dimensions.x) {
            return null;
        }
        if (neighborEdgeCoords.y < 0 || neighborEdgeCoords.y >= this.dimensions.y) {
            return null;
        }
        return this.getEdgeByCoords(neighborEdgeCoords);
    }

    public getEdgeByCoords(coords: Coords): Edge {
        return this.edges[coords.y * this.dimensions.x + coords.x];
    }

    public setStart(coords: Coords): void {
        if (this.startEdge) {
            this.startEdge.unsetAsStartEdge();
            this.drawEdge(this.targetEdge, Color.WHITE);
        }
        this.startEdge = this.getEdgeByCoords(coords);
        if (this.startEdge) {
            this.startEdge.setAsStartEdge();
            this.drawEdge(this.startEdge, Color.ORANGE);
        }
    }

    public getStartEdge(): Edge {
        return this.startEdge;
    }

    public setTarget(coords: Coords): void {
        if (this.targetEdge) {
            this.targetEdge.unsetAsTargetEdge();
            this.drawEdge(this.targetEdge, Color.WHITE);
        }
        this.targetEdge = this.getEdgeByCoords(coords);
        if (this.targetEdge) {
            this.targetEdge.setAsTargetEdge();
            this.drawEdge(this.targetEdge, new Color(255, 255, 30));
        }
    }

    public getTargetEdge(): Edge {
        return this.targetEdge;
    }
}