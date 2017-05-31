import { Coords } from "./graph/datatypes";

export class Config {

    public static dimension: Coords = {
        x: 660,
        y: 660
    };

    public static graphDimension: Coords = {
        x: 60,
        y: 60
    };

    public static obstacleProbability: number = .15;

    public static timeBetweenIterations: number = 1000 / 60;
}