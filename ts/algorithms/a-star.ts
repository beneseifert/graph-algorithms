import { Edge } from "../graph/edge";
import { Graph } from "../graph/graph";
import { Color } from "../canvas/color";
import * as _ from "lodash";

export class AStar {

    private closedList: Array<Edge> = [];
    // TODO: implement a better data structure
    private openList: Array<Edge> = [];

    public constructor(private graph: Graph) {}

    public init(): void {
        let startEdge: Edge = this.graph.getStartEdge();
        startEdge.setFValue(0);
        startEdge.setGValue(0);
        this.openList.push(startEdge);
    }

    public run(): Array<Edge> {
        if (this.openList.length <= 0) {
            return [];
        }
        let currEdge = this.removeMinFromOpenList();
        if (currEdge.isTargetEdge()) {
            return this.constructPath(currEdge);
        }
        this.closedList.push(currEdge);
        this.expandEdge(currEdge);
        this.graph.drawGrid();
        this.drawLists();
        this.drawPath(this.constructPath(currEdge));
        return null;
    }

    private removeMinFromOpenList(): Edge {
        let minEdge: Edge = this.openList[0],
            minFValue: number = minEdge.getFValue(),
            index: number = 0
        for (let i in this.openList) {
            let currEdge = this.openList[i];
            if (currEdge.getFValue() < minFValue) {
                minEdge = currEdge;
                minFValue = currEdge.getFValue();
                index = parseInt(i, 10);
            }
        }
        this.openList.splice(index, 1);
        return minEdge;
    }

    private constructPath(lastEdge: Edge): Array<Edge> {
        let currEdge: Edge = lastEdge,
            path: Array<Edge> = [currEdge];
        while (currEdge.hasPreviousEdge()) {
            currEdge = currEdge.getPreviousEdge()
            path.splice(0, 0, currEdge);
        }
        return path;
    }

    private expandEdge(edge: Edge): void {
        let neighbors = this.graph.getNeighbors(edge);
        for (let i in neighbors) {
            let currNeighbor = neighbors[i];
            if (this.closedListContains(currNeighbor)) {
                continue;
            }
            let currentG = edge.getPreviousEdge() !== null ? edge.getPreviousEdge().getGValue() : 0,
                tentativeG = currentG + currNeighbor.computeDistance(edge);
            if (currNeighbor.getGValue() !== null && tentativeG >= currNeighbor.getGValue()) {
                continue;
            }
            currNeighbor.setPreviousEdge(edge);
            currNeighbor.setGValue(tentativeG);
            let fValue: number = currNeighbor.computeFValue(this.graph.getTargetEdge());
            currNeighbor.setFValue(fValue);
            if (!this.openListContains(currNeighbor)) {
                this.openList.push(currNeighbor);
            }
        }
    }

    private closedListContains(edge: Edge): boolean {
        return _.findIndex(this.closedList, (edgeFromClosedList: Edge) => {
            return edgeFromClosedList.getCoords().x === edge.getCoords().x &&
                edgeFromClosedList.getCoords().y === edge.getCoords().y;
        }) >= 0;
    }

    private openListContains(edge: Edge): boolean {
        return _.findIndex(this.openList, (edgeFromOpenList: Edge) => {
            return edgeFromOpenList.getCoords().x === edge.getCoords().x &&
                edgeFromOpenList.getCoords().y === edge.getCoords().y;
        }) >= 0;
    }

    public drawLists(): void {
        for (let i in this.openList) {
            let currEdge: Edge = this.openList[i];
            this.graph.drawEdge(currEdge, Color.BLUE);
        }
        for (let i in this.closedList) {
            let currEdge: Edge = this.closedList[i];
            this.graph.drawEdge(currEdge, Color.PURPLE);
        }
    }

    public drawPath(path: Array<Edge>): void {
        let currColor: Color = Color.LIGHTBLUE;
        for (let i in path) {
            currColor = currColor.nextColorForGradient();
            let currEdge: Edge = path[i];
            if (currEdge.getPreviousEdge()) {
                this.graph.drawLineBetweenEdges(currEdge, currEdge.getPreviousEdge(), currColor);
            }
        }
    }

}