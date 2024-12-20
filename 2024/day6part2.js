/*
So first i would have to even know when they're in a loop
maybe, if they turn all four directions without hitting any new "."? 
that sounds good 

But then how do i know where to place the obstructions? 
Should i just try every single spot lol.
literally i have no other ideas 
*/

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


function solve(input) {
  let { x, y, xdirection, ydirection } = findGuard(input);
  input[y][x] = "X";

  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let inputCopy = copyInput(input);

      let loopLegs = {
        up: false,
        right: false,
        down: false,
        left: false,
      };

      inputCopy[i][j] = "#";
      let looped = tryBlockade(inputCopy, x, y, xdirection, ydirection, loopLegs, count);
      if (looped) {
        count++;
      }
    }
  }
  return count;
}

function copyInput(input) {
  let newArray = [];
  for (let i = 0; i < input.length; i++) {
    newArray[i] = input[i].slice();
  }
  return newArray;
}

function tryBlockade(input, x, y, xdirection, ydirection, loopLegs) {
  return move(input, x + xdirection, y + ydirection, xdirection, ydirection, loopLegs);
}

function move(input, x, y, xdirection, ydirection, loopLegs) {
  if (x < 0 || y < 0 || x >= input[0].length || y >= input.length) {
    return false;
  }

  if (loopLegs.up && loopLegs.right && loopLegs.down && loopLegs.left) {
    // in a loop
    return true;
  }

  let spot = input[y][x];

  if (spot === "." || spot === "X") {
    if (spot === ".") {
      // resetting
      loopLegs = {
        up: false,
        right: false,
        down: false,
        left: false,
      }
    }
    input[y][x] = "X";
    return move(input, x + xdirection, y + ydirection, xdirection, ydirection, loopLegs);
  } else if (spot === "#") {
    x -= xdirection;
    y -= ydirection;
    if (xdirection === 0 && ydirection === -1) {
      // console.log("change from up to right");
      xdirection = 1;
      ydirection = 0;
      loopLegs.right = true;
    } else if (xdirection === 1 && ydirection === 0) {
      // console.log("change from right to down");
      xdirection = 0;
      ydirection = 1;
      loopLegs.down = true;
    } else if (xdirection === 0 && ydirection === 1) {
      // console.log("change from down to left");
      xdirection = -1;
      ydirection = 0;
      loopLegs.left = true;
    } else if (xdirection === -1 && ydirection === 0) {
      // console.log("change from left to up");
      xdirection = 0;
      ydirection = -1;
      loopLegs.up = true;
    }
    return move(input, x + xdirection, y + ydirection, xdirection, ydirection, loopLegs);
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