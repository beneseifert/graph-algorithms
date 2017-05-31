import { Coords } from "./datatypes";
import { Config } from "../config";


export class Edge {

    private isObstacle: boolean = false;
    private previousEdge: Edge = null;
    private isStart: boolean = false;
    private isTarget: boolean = false;
    private gValue: number = null;
    private fValue: number = null;

    public constructor(private coords: Coords) {
        this.setObstacle();
    }

    public getCoords(): Coords {
        let coords: Coords = {
            x: this.coords.x,
            y: this.coords.y
        }
        return coords;
    }

    public getIsObstacle(): boolean {
        return this.isObstacle;
    }

    private setObstacle(): void {
        this.isObstacle = Math.random() <= Config.obstacleProbability;
    }

    public setAsStartEdge(): void {
        this.isStart = true;
        this.isObstacle = false;
    }

    public unsetAsStartEdge(): void {
        this.isStart = false;
    }

    public isStartEdge(): boolean {
        return this.isStart;
    }

    public setAsTargetEdge(): void {
        this.isTarget = true;
        this.isObstacle = false;
    }

    public unsetAsTargetEdge(): void {
        this.isTarget = false;
    }

    public isTargetEdge(): boolean {
        return this.isTarget;
    }

    public setPreviousEdge(edge: Edge) {
        if (!this.equals(edge)) {
            this.previousEdge = edge;
        }
    }

    public computeFValue(target: Edge, gValue?: number): number {
        if (typeof gValue !== "undefined") {
            return gValue + this.computeDistance(target);
        }
        return this.gValue + this.computeDistance(target);
    }

    public setGValue(gValue: number): void {
        this.gValue = gValue;
    }

    public getGValue(): number {
        return this.gValue;
    }

    public setFValue(fValue: number): void {
        this.fValue = fValue;
    }

    public getFValue(): number {
        return this.fValue;
    }

    public hasPreviousEdge(): boolean {
        return (this.previousEdge !== null);
    }

    public getPreviousEdge(): Edge {
        return this.previousEdge;
    }

    public computeDistance(edge: Edge, grade?: number): number {
        grade = (typeof grade !== "undefined") ? grade : 2;
        let distX = Math.pow(edge.coords.x - this.coords.x, grade),
            distY = Math.pow(edge.coords.y - this.coords.y, grade);
        return Math.pow(distX + distY, 1 / grade);
    }

    public equals(edge: Edge): boolean {
        if (typeof edge === "undefined") {
            return false;
        }
        if (edge.coords.x !== this.coords.x || edge.coords.y !== this.coords.y) {
            return false;
        }
        return true;
    }

}