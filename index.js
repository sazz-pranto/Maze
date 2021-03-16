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
const {Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse} = Matter;
const engine = Engine.create();
const { world } = engine;

//width & height for the canvas
const canvasWidth = 800, canvasHeight = 600;
const render = Render.create({
    element: document.body,  //creates a canvas with 'canvas' element in the html body
    engine: engine,
    options: {
        wireframes: false, //brings solid shapes instead of only outlined shapes with random colors
        width: canvasWidth,
        height: canvasHeight
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);
// boiler plate for maze

// add mouse constraint
World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

//walls
/*
Bodies.rectangle(pos along X, pos along Y, width, height, obj{some properties for the shape});
*/
const walls = [
    //top
    Bodies.rectangle(400, 0, 800, 40, {
        isStatic: true 
    }),
    //left
    Bodies.rectangle(0, 300, 40, 600, {
        isStatic: true 
    }),
    //bottom
    Bodies.rectangle(400, 600, 800, 40, {
        isStatic: true 
    }),
    //right
    Bodies.rectangle(800, 300, 40, 600, {
        isStatic: true 
    }),
];

// add walls to the world
World.add(world, walls);

//add multiple shapes randomly
for(let i = 0; i < 50; i++) {
    if(Math.random() < .5) {
        World.add(world, Bodies.rectangle(
            //setting initial position of the shape randomly
            Math.random() * canvasWidth, Math.random() * canvasHeight, 50, 50
        ));
    } else {
        World.add(world, Bodies.circle(
            Math.random() * canvasWidth, Math.random() * canvasHeight, 35
        ));
    }
}


// //create a rectangle using Bodies object
// const shape = Bodies.rectangle(200, 200, 50, 50, { //first 2 params->position along X & Y, 2nd 2 params->width & height
//     isStatic: true //keeps the shape stable
// });

// // adding the rectangle to the World object to show up on the body
// World.add(world, shape);