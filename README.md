# Some graphical implementations of path finding algorithms
Only A* so far

# Installation instructions

1. install node.js with npm
1. **cd** to cloned workspace
1. **npm i**
1. **npm run build**
1. open a-star.html in browser

# A*

## interactions
With the play button you can start the algorithm.
Pause button stops the current running algorithm from there you can continue with play or just step iteration by iteration with the fast forward button.
The graphical interface will stop, when the shortest path is found and the path is printed to console.log.

## graphical explanations
The red line shows the current path from the current edge taken from the open list.
Purple edges are already evaluated edges from the closed list.
Blue edges are in the open list.
The start is in the top left corner and the target resides on the bottom right.