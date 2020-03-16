//above lines are in utils.js
//walls generation
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, heighgit t, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

document.querySelector('canvas').classList.add('hidden');

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
const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

//Picking random starting cells
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

//function for generation of maze
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
      nextRow >= cellsVertical ||
      nextCloumn < 0 ||
      nextCloumn >= cellsHorizontal
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
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: '#22c1c3'
        }
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
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: '#22c1c3'
        }
      }
    );
    World.add(world, wall);
  });
});

//createing square as a goal at bottom of grid
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  {
    label: 'goal',
    isStatic: true,
    render: {
      fillStyle: '#fdbb2d',
      strokeStyle: '#b5b4b1',
      lineWidth: 5
    }
  }
);

World.add(world, goal);

//Creating Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: 'ball',
  render: {
    fillStyle: '#fc466b',
    strokeStyle: '#b5b4b1',
    lineWidth: 5
  }
});
World.add(world, ball);

//Handling Keypress
//Handling keyPress is in handleKeyPress.js

//Win condition
//Win condition is in winner.js file
