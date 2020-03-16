const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;

const easyValue = document.querySelector('#btnEasy').value;
const mediumValue = document.querySelector('#btnMedium').value;
const hardValue = document.querySelector('#btnHard').value;

let cellsHorizontal = 0; // Number of columns
let cellsVertical = 0; // Number of rows

let playingLevel = easyValue;
switch (playingLevel) {
  case easyValue:
    cellsHorizontal = 5;
    cellsVertical = 5;
    break;
  case mediumValue:
    cellsHorizontal = 15;
    cellsVertical = 15;
    break;
  case hardValue:
    cellsHorizontal = 20;
    cellsVertical = 20;
    break;
  default:
    cellsHorizontal = 3;
    cellsVertical = 3;
    break;
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
