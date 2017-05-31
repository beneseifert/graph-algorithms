import { Canvas } from "./canvas/canvas";
import { Color } from "./canvas/color";
import { Config } from "./config";
import { Graph } from "./graph/graph";
import { Edge } from "./graph/edge";
import { DrawableAlgorithm } from "./algorithms/drawable-algorithm";
import { AStar } from "./algorithms/a-star";

/*
TODO:
- implement better data structure for open list
- add unit tests
- make UI class
- make the graph with a gradient
- make start and target arbitrary in config
- load obstacles from image
- refresh obstacle drawing to fix graphic bug with lines over obstacles
- make more UI components (going backwards, jump to end/beginning), alter config params from UI
- implement Dijkstra
- implement D*
- improve design
 */

let canvas: Canvas = new Canvas("path-wrapper");
canvas.setHeight(Config.dimension.y)
    .setWidth(Config.dimension.x);

let graph: Graph = new Graph(canvas,
    {
        x: Config.graphDimension.x,
        y: Config.graphDimension.y
    }
);

graph.setStart({x: graph.LEFT, y: graph.TOP});
graph.setTarget({x: graph.RIGHT, y: graph.BOTTOM});

let aStar = new AStar(graph);
let drawableAStar = new DrawableAlgorithm(aStar);
let stop: boolean = false;

let loop = function(): any {
    if (stop) return;
    drawableAStar.iteration();
    if (drawableAStar.result === null) {
        setTimeout(() => {
            loop();
        }, Config.timeBetweenIterations);
    } else {
        aStar.drawLists();
        aStar.drawPath(drawableAStar.result);
        console.log(drawableAStar.result);
    }
}

loop();

let fastForwardButton: HTMLElement = document.getElementById("fast-forward");
fastForwardButton.addEventListener("click", (ev: Event) => {
    if (fastForwardButton.className.match("disabled")) return;
    drawableAStar.iteration();
    if (drawableAStar.result !== null) {
        fastForwardButton.className += " disabled";
    }
});

let pauseButton: HTMLElement = document.getElementById("pause");
pauseButton.addEventListener("click", (ev: Event) => {
    if (pauseButton.className.match("disabled")) return;
    stop = true;
    pauseButton.className += " disabled";
    fastForwardButton.className = fastForwardButton.className.replace(" disabled", "");
    playButton.className = playButton.className.replace(" disabled", "");
});

let playButton: HTMLElement = document.getElementById("play");
playButton.addEventListener("click", (ev: Event) => {
    if (playButton.className.match("disabled")) return;
    stop = false;
    loop();
    playButton.className += " disabled";
    fastForwardButton.className += " disabled";
    pauseButton.className = pauseButton.className.replace(" disabled", "");
});