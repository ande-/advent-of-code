const input = [
  ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
  ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
  ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
  ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
  ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
  ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
  ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
  ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
  ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
  ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"]];


const target = ["X", "M", "A", "S"];
let total = 0;

function solve(input) {
  for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input.length; j++) {
      checkForLetter(input, i, j, 0);
    }
  }

  return total;
}

function checkForLetter(input, x, y, targetIndex, xDirection, yDirection) {
  if (x < 0 || y < 0 || x >= input[0].length || y >= input.length) {
    return;
  }

  let desiredLetter = target[targetIndex];
  if (input[x][y] === desiredLetter) {
    if (desiredLetter === "S") {
      total++;
      return;
    }
    else if (desiredLetter === "X") {
      // found x, check in all directions
      targetIndex++;
      checkForLetter(input, x - 1, y - 1, targetIndex, -1, -1);
      checkForLetter(input, x - 1, y, targetIndex, -1, 0);
      checkForLetter(input, x - 1, y + 1, targetIndex, -1, 1);
      checkForLetter(input, x, y - 1, targetIndex, 0, -1);
      checkForLetter(input, x, y + 1, targetIndex, 0, 1);
      checkForLetter(input, x + 1, y - 1, targetIndex, 1, -1);
      checkForLetter(input, x + 1, y, targetIndex, 1, 0);
      checkForLetter(input, x + 1, y + 1, targetIndex, 1, 1);
    } else {
      // found m, a, check in same direction 
      targetIndex++;
      checkForLetter(input, x + xDirection, y + yDirection, targetIndex, xDirection, yDirection);
    }
  } else {
    return;
  }
}

console.log(solve(input));