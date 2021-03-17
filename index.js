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
// creates a grid like this
// **********************
// false | false | false
// **********************
// false | false | false
// **********************
// false | false | false
// **********************
const grid = Array(3).fill(null).map(() => {
    Array(3).fill(false)
});

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
// const vertical = Array(3).fill(null);
// const newvertical = vertical.map(() => {
//     Array(2).fill(false)
// });

console.log(grid);