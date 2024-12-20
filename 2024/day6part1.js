const input = [
  [".", ".", ".", ".", "#", ".", ".", ".", ".", ".",],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "#",],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".",],
  [".", ".", "#", ".", ".", ".", ".", ".", ".", ".",],
  [".", ".", ".", ".", ".", ".", ".", "#", ".", ".",],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".",],
  [".", "#", ".", ".", "^", ".", ".", ".", ".", ".",],
  [".", ".", ".", ".", ".", ".", ".", ".", "#", ".",],
  ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".",],
  [".", ".", ".", ".", ".", ".", "#", ".", ".", "."]];

/* given matrix, find the ^, >, <, or v (is that a lower case v? or will it always be up?)

given starting x, y, direction
if up, subtract from y
if down, add to y
if right, add to x
if left, subtract from x
  until you hit an obstacle. 
  then change up to right, right to down, down to left
  continue until greater than length or negative 
*/

function solve(input) {
  let { x, y, xdirection, ydirection } = findGuard(input);
  input[y][x] = "X";
  const output = move(input, x + xdirection, y + ydirection, xdirection, ydirection);
  const count = countXs(input);
  return count;
}

function countXs(input) {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let spot = input[i][j];
      if (spot === "X") {
        count++;
      }
    }
  }
  return count;
}

function move(input, x, y, xdirection, ydirection) {
  if (x < 0 || y < 0 || x >= input[0].length || y >= input.length) {
    return input;
  }
  let spot = input[y][x];

  if (spot === "." || spot === "X") {
    input[y][x] = "X";
    return move(input, x + xdirection, y + ydirection, xdirection, ydirection);
  } else if (spot === "#") {
    x -= xdirection;
    y -= ydirection;
    if (xdirection === 0 && ydirection === -1) {
      // console.log("change from up to right");
      xdirection = 1;
      ydirection = 0;
    } else if (xdirection === 1 && ydirection === 0) {
      // console.log("change from right to down");
      xdirection = 0;
      ydirection = 1;
    } else if (xdirection === 0 && ydirection === 1) {
      // console.log("change from down to left");
      xdirection = -1;
      ydirection = 0;
    } else if (xdirection === -1 && ydirection === 0) {
      // console.log("change from left to up");
      xdirection = 0;
      ydirection = -1;
    }
    return move(input, x + xdirection, y + ydirection, xdirection, ydirection);
  }
}

function findGuard(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let spot = input[i][j];
      if (spot === "^") {
        return { x: j, y: i, xdirection: 0, ydirection: -1 };
      } else if (spot === ">") {
        return { x: j, y: i, xdirection: 1, ydirection: 0 };
      } else if (spot === "v") {
        return { x: j, y: i, xdirection: 0, ydirection: 1 };
      } else if (spot === "<") {
        return { x: j, y: i, xdirection: -1, ydirection: 0 };
      }
    }
  }
}

console.log(solve(input));