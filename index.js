//Here Matter is a global object from matter js libriary
/*
World => contains all of the different things/shapes
Engine => reads the current state of the world from World object, calculates changes of positions of all the different shapes
Runner => gets the engine and world to work together, runs about 60 times/sec
Render => renders any update from the engine and show them on the screen
Bodies => any shape that gets displayed, like circle, rectangle, oval etc.
MouseConstraint => responds to mouse input
*/

// boiler plate for maze
const {Engine, Render, Runner, World, Bodies} = Matter;
const engine = Engine.create();
const { world } = engine;

//width & height for the canvas
const canvasWidth = 600, canvasHeight = 600;

const cells = 3; //number of cells vertically & horizontally is same for a square grid

const render = Render.create({
    element: document.body,  //creates a canvas with 'canvas' element in the html body
    engine: engine,
    options: {
        wireframes: true, // false => brings solid shapes with random colors instead of only outlined shapes
        width: canvasWidth,
        height: canvasHeight
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);
// boiler plate for maze

//walls
/*
Bodies.rectangle(pos along X, pos along Y, width, height, obj{some properties for the shape});
*/
const walls = [
    //top
    Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 40, {
        isStatic: true 
    }),
    //left
    Bodies.rectangle(0, canvasHeight / 2, 40, canvasHeight, {
        isStatic: true 
    }),
    //bottom
    Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 40, {
        isStatic: true 
    }),
    //right
    Bodies.rectangle(canvasWidth, canvasHeight / 2, 40, canvasHeight, {
        isStatic: true 
    }),
];

// add walls to the world
World.add(world, walls);

// Maze generation
// *****************
// creating a grid, a 2d array using fill and map
// first, fill the first dimension with null values
// then assign false to every 'row' using fill again
// outer fill assigns to rows, inner fill assigns to columns
// a grid containing 3 cells along the vertical & horizontal axis creates a grid like this
// **********************
// false | false | false
// **********************
// false | false | false
// **********************
// false | false | false
// **********************

const grid = Array(cells).fill(null).map(() => Array(cells).fill(false))

// create vertical and horizontal columns
/* in a 3x3 grid, there will be 6 vertical walls,
3 in rows and 2 in columns, 6 horizontal walls, 2 in rows and 3 in columns
demonstration =>

*********************
|    vtc    vtc     |
**hrz***hrz****hrz***
|    vtc    vtc     |
**hrz***hrz****hrz***
|    vtc    vtc     |
*********************

*/
const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));

// shuffling an array
const shuffle = (arr) => {
    let counter = arr.length;
    while(counter > 0) {
        const idx = Math.floor(Math.random() * counter);
        counter --;

        const temp = arr[counter];
        arr[counter] = arr[idx];
        arr[idx] = temp;
    }
    return arr;
};

// pick where to start in the grid 
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);


//traverse through the grid and remove vertical & horizontal walls to form a maze
const stepThroughCells = (row, column) => {
    // if any position ([row, column]) in the grid is visited, then return 
    if(grid[row][column]) {
        return; // the grid array only contains boolean values, so grid[row][column] would either be true or false
    }

    // mark any cell that is visited
    grid[row][column] = true;

    // assemble a randomly-ordered list of neighbors with shuffle function
    const neighbors = shuffle([
        [row - 1, column, 'up'], //above
        [row, column + 1, 'right'], //right
        [row + 1, column, 'down'], //below
        [row, column - 1, 'left'] //left
    ]);

    /* for each neighbor, check if there is any valid/available neighbor to visit, if so, 
    call stepThroughCells recursively with the corresponding row(nextRow) and column(nextColumn) */ 
    for(let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor; // destructuring each neighbor
        // check if that neighbor is out of bounds
        if(nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }
        // if any neighbor is visited, continue to the next neighbor
        if(grid[nextRow][nextColumn]) {
            continue;
        }

        // remove a wall from either verticals or horizontals to visit the cell that is next to the current cell vertically or horizontally

        // for a movement to left or right, the VERTICAL ROW is equal to the current row
        /* since there are two vertical walls in each row, vertical column either becomes equal to the current
        column (when moves to right) or equal to column - 1 (when moves to left) */

        // for a movement to up or down, the HORIZONTAL COLUMN is equal to the current column
        /* since there are two horizontal walls in each column, horizontal row either becomes equal (when moves to up)
        to row - 1 or equal to the current row (when moves to down) */

        if(direction === 'left') {
            verticals[row][column - 1] = true;
        } else if(direction === 'right') {
            verticals[row][column] = true;
        } else if(direction === 'up') {
            horizontals[row - 1][column] = true;
        } else if(direction === 'down') {
            horizontals[row][column] = true;    
        }
        stepThroughCells(nextRow, nextColumn);
    }
    // visit the next cell

};

stepThroughCells(startRow, startColumn);

verticals.forEach((row) => {
    row.forEach((open) => {
        if(open) return
        else {
            const wall
        }
    })
});