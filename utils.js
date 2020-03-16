const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;

let cellsHorizontal; // Number of columns
let cellsVertical; // Number of rows
const easyLevel = document.querySelector('#btnEasy').value;

if (easyLevel === 'Easy') {
  console.log(easyLevel);
  cellsHorizontal = 10;
  cellsVertical = 10;
} else {
  cellsHorizontal = 20;
  cellsVertical = 20;
}
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0; // for disable gravity of ball
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);
