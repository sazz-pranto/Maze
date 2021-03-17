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
        wireframes: true, // false => brings solid shapes instead of only outlined shapes with random colors
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

