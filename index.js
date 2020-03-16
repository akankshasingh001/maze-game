const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = 600;
const height = 600;
const cells = 6;
const unitLength = width / cells;

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

//walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

//Maze generation in grid by 2D array
//function created for randomly shuffle the element of Array
const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    //Swap here
    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};
//Here outer Array is row & inner Array is column
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

//Picking random starting cells
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const moveThroughCell = (row, column) => {
  //if i have visited the cell at [row,column],then return
  if (grid[row][column]) {
    return;
  }
  //Mark this cell as being visited
  grid[row][column] = true;
  //Assemble randomly-ordered list of neighbour
  const neighbours = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left']
  ]);

  //for each neighbours...
  for (let neighbour of neighbours) {
    const [nextRow, nextCloumn, direction] = neighbour;
    //see if that neighbour is out of bound
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextCloumn < 0 ||
      nextCloumn >= cells
    ) {
      continue;
    }
    //If visited that neighbour,continue to next neighbour
    if (grid[nextRow][nextCloumn]) {
      continue;
    }
    //Remove a wall from either verticals or horizontals
    switch (direction) {
      case 'left':
        verticals[row][column - 1] = true;
        break;
      case 'right':
        verticals[row][column] = true;
        break;
      case 'up':
        horizontals[row - 1][column] = true;
        break;
      case 'down':
        horizontals[row][column] = true;
        break;
    }
    //visit that next cell(means start through moveThroughCell function again)
    moveThroughCell(nextRow, nextCloumn);
  }
};
moveThroughCell(startRow, startColumn);

//iterarting over horizontal walls
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      10,
      {
        label: 'wall',
        isStatic: true
      }
    );
    World.add(world, wall);
  });
});

//iterating through vertical walls
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      10,
      unitLength,
      {
        label: 'wall',
        isStatic: true
      }
    );
    World.add(world, wall);
  });
});

//createing square as a goal at bottom of grid
const goal = Bodies.rectangle(
  width - unitLength / 2,
  height - unitLength / 2,
  unitLength * 0.7,
  unitLength * 0.7,
  {
    label: 'goal',
    isStatic: true
  }
);

World.add(world, goal);

//Creating Ball
const ball = Bodies.circle(unitLength / 2, unitLength / 2, unitLength / 4, {
  label: 'ball'
});
World.add(world, ball);

//Handling Keypress
document.addEventListener('keydown', event => {
  const { x, y } = ball.velocity;
  switch (event.keyCode) {
    //w or up arrow
    case 87:
    case 38:
      Body.setVelocity(ball, { x, y: y - 5 });
      break;
    //d or right arrow
    case 68:
    case 39:
      Body.setVelocity(ball, { x: x + 5, y });
      break;
    //s or down arrow
    case 83:
    case 40:
      Body.setVelocity(ball, { x, y: y + 5 });
      break;
    //a or left arrow
    case 65:
    case 37:
      Body.setVelocity(ball, { x: x - 5, y });
      break;
  }
});
//Win condition
Events.on(engine, 'collisionStart', event => {
  event.pairs.forEach(collision => {
    const labels = ['ball', 'goal'];
    //condition for checking if ball collide to square box then we fall down all the
    // maze walls and ball gravity will no longer to static
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === 'wall') {
          Body.setStatic(body, false); //ball gravity will no longer to static
        }
      });
    }
  });
});
