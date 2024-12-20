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


let total = 0;

function solve(input) {
  for (let i = 0; i < input[0].length; i++) {
    for (let j = 0; j < input.length; j++) {
      checkForLetter(input, i, j, true);
    }
  }

  return total;
}

function checkForLetter(input, x, y, isMiddle) {
  if (x < 0 || y < 0 || x >= input[0].length || y >= input.length) {
    return;
  }

  if (isMiddle) {
    if (input[x][y] === "A") {
      // found a, check in all directions
      let topLeft = checkForLetter(input, x - 1, y - 1, false)
      let bottomLeft = checkForLetter(input, x - 1, y + 1, false);
      let topRight = checkForLetter(input, x + 1, y - 1, false);
      let bottomRight = checkForLetter(input, x + 1, y + 1, false);

      if (topLeft === "M" && bottomRight === "S") {
        if (topRight == "M" && bottomLeft === "S") {
          total++;
          return true;
        } else if (bottomLeft === "M" && topRight === "S") {
          total++;
          return true;
        }
      } else if (topLeft === "S" && bottomRight === "M") {
        if (topRight == "M" && bottomLeft === "S") {
          total++;
          return true;
        } else if (bottomLeft === "M" && topRight === "S") {
          total++;
          return true;
        }
      }
    }

  } else {
    if (input[x][y] === "M" || input[x][y] === "S") {
      return input[x][y];
    }

  }
}

console.log(solve(input));