
const input0 = [
  ["B", "C", "D"],
  ["B", "C", "C"],
  ["E", "E", "C"]];

const input1 = [
  ["A", "A", "A", "A"],
  ["B", "B", "C", "D"],
  ["B", "B", "C", "C"],
  ["E", "E", "E", "C"]];

const input2 = [
  ["O", "O", "O", "O", "O"],
  ["O", "X", "O", "X", "O"],
  ["O", "O", "O", "O", "O"],
  ["O", "X", "O", "X", "O"],
  ["O", "O", "O", "O", "O"]];

const input3 = [
  ["E", "E", "E", "E", "E"],
  ["E", "X", "X", "X", "X"],
  ["E", "E", "E", "E", "E"],
  ["E", "X", "X", "X", "X"],
  ["E", "E", "E", "E", "E"]];

const input4 = [
  ["A", "A", "A", "A", "A", "A"],
  ["A", "A", "A", "B", "B", "A"],
  ["A", "A", "A", "B", "B", "A"],
  ["A", "B", "B", "A", "A", "A"],
  ["A", "B", "B", "A", "A", "A"],
  ["A", "A", "A", "A", "A", "A"]];

const inputSample = [
  ["R", "R", "R", "R", "I", "I", "C", "C", "F", "F"],
  ["R", "R", "R", "R", "I", "I", "C", "C", "C", "F"],
  ["V", "V", "R", "R", "R", "C", "C", "F", "F", "F"],
  ["V", "V", "R", "C", "C", "C", "J", "F", "F", "F"],
  ["V", "V", "V", "V", "C", "J", "J", "C", "F", "E"],
  ["V", "V", "I", "V", "C", "C", "J", "J", "E", "E"],
  ["V", "V", "I", "I", "I", "C", "J", "J", "E", "E"],
  ["M", "I", "I", "I", "I", "I", "J", "J", "E", "E"],
  ["M", "I", "I", "I", "S", "I", "J", "E", "E", "E"],
  ["M", "M", "M", "I", "S", "S", "J", "E", "E", "E"]];



/*********
* Edges *
**********/

function checkIfEdge(plant, i, j, input) {
  if (i > 0) {
    if (input[i - 1][j] !== plant) {
      return true;
    }
  } else {
    return true;
  }

  if (j > 0) {
    if (input[i][j - 1] !== plant) {
      return true;
    }
  } else {
    return true;
  }

  if (i < input.length - 1) {
    if (input[i + 1][j] !== plant) {
      return true;
    }
  } else {
    return true;
  }

  if (j < input.length - 1) {
    if (input[i][j + 1] !== plant) {
      return true;
    }
  } else {
    return true;
  }

  // diagonals
  if (i > 0 && j > 0) {
    if (input[i - 1][j - 1] !== plant) {
      return true;
    }
  }
  if (i > 0 && j < input[i].length - 1) {
    if (input[i - 1][j + 1] !== plant) {
      return true;
    }
  }
  if (i < input.length - 1 && j > 0) {
    if (input[i + 1][j - 1] !== plant) {
      return true;
    }
  }
  if (i < input.length - 1 && j < input[i].length - 1) {
    if (input[i + 1][j + 1] !== plant) {
      return true;
    }
  }

  return false;
}

function enlarge(input) {
  var enlarged = [];
  for (var i = 0; i < input.length; i++) {
    enlarged.push([]);
    enlarged.push([]);
    for (var j = 0; j < input[i].length; j++) {
      enlarged[i * 2].push(input[i][j]);
      enlarged[i * 2].push(input[i][j]);
      enlarged[i * 2 + 1].push(input[i][j]);
      enlarged[i * 2 + 1].push(input[i][j]);
    }
  }
  return enlarged;
}

function freshMatrix(ilen, jlen) {
  return Array(ilen).fill(" ").map(() => Array(jlen).fill(" "))
}

function buildLetterMatrices(input) {
  var letterMatrices = {};
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input[i].length; j++) {
      var plant = input[i][j];
      if (!letterMatrices[plant]) {
        // this is a waste of space but I want to be able to pretty-print the outlines
        letterMatrices[plant] = freshMatrix(input.length, input[i].length);
      }
      var isEdge = checkIfEdge(plant, i, j, input);
      if (isEdge) {
        letterMatrices[plant][i][j] = plant;
      }
    }
  }
  return letterMatrices;
}

function getNewDirection(direction) {
  if (direction === "right") {
    return "down";
  }
}

function getNewDirection(xdir, ydir) {
  if (xdir === 1 && ydir === 0) {
    return { newXDir: 0, newYDir: 1 };
  } else if (xdir === 0 && ydir === 1) {
    return { newXDir: -1, newYDir: 0 };
  } else if (xdir === -1 && ydir === 0) {
    return { newXDir: 0, newYDir: -1 };
  } else if (xdir == 0 && ydir === -1) {
    return { newXDir: 1, newYDir: 0 };
  }
  return { xdir, ydir }
}

function findStart(matrix, letter) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === letter) {
        return { x: j, y: i };
      }
    }
  }
}

function traverse(matrix, letter, x, y, xdir, ydir, stats, startx, starty) {
  var potentialx = x + xdir;
  var potentialy = y + ydir;

  // if invalid, change direction
  // right
  if (xdir === 1 && ydir === 0 && (potentialx > matrix[0].length - 1 || matrix[potentialy][potentialx] !== letter)) {
   
    // down
    if (y + 1 < matrix.length && matrix[y + 1][x] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, 0, 1, stats, startx, starty);

      // up
    } else if (y - 1 > 0 && matrix[y - 1][x] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, 0, -1, stats, startx, starty);
    }


    // down
  } else if (xdir === 0 && ydir === 1 && (potentialy > matrix.length - 1 || matrix[potentialy][potentialx] !== letter)) {

    // right
    if (x + 1 < matrix[0].length && matrix[y][x + 1] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, 1, 0, stats, startx, starty);
    }

    // left
    if (x - 1 > 0 && matrix[y][x - 1] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, -1, 0, stats, startx, starty);
    }


    // left
  } else if (xdir === -1 && ydir === 0 && (potentialx < 0 || matrix[potentialy][potentialx] !== letter)) {

    // up
    if (y - 1 > 0 && matrix[y - 1][x] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, 0, -1, stats, startx, starty);
    }

    // down
    if (y + 1 < matrix.length && matrix[y + 1][x] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, 0, 1, stats, startx, starty);
    }


    // up
  } else if (xdir === 0 && ydir === -1 && (potentialy < 0 || matrix[potentialy][potentialx] !== letter)) {

    // left
    if (x - 1 > 0 && matrix[y][x - 1] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, -1, 0, stats, startx, starty);
    }

    // right
    if (x + 1 < matrix[0].length && matrix[y][x + 1] === letter) {
      stats.edges++;
      traverse(matrix, letter, x, y, 1, 0, stats, startx, starty);
    }


  } else {
    if (!(x === startx && y === starty)) {
      matrix[y][x] = ".";
    }

    traverse(matrix, letter, potentialx, potentialy, xdir, ydir, stats, startx, starty);
  }

}

function logMatrices(matrices) {
  for (var key of Object.keys(matrices)) {
    var matrix = matrices[key];
    console.log(" ");
    for (var i = 0; i < matrix.length; i++) {
      console.log(matrix[i].join(""));
    }
  }
}


/********
* Area *
*********/

function copyInput(input) {
  var newArray = [];
  for (var i = 0; i < input.length; i++) {
    newArray[i] = input[i].slice();
  }
  return newArray;
}

function check(input, x, y, targetPlant, stats) {
  if (y < 0 || x < 0 || y > input.length - 1 || x > input[0].length - 1) {
    return;
  }

  var plant = input[y][x];
  if (plant !== targetPlant) {
    return;
  }

  input[y][x] = ".";
  stats.area++;

  check(input, x + 1, y, targetPlant, stats);
  check(input, x, y + 1, targetPlant, stats);
  check(input, x, y - 1, targetPlant, stats);
  check(input, x - 1, y, targetPlant, stats);
}


function getArea(input, i, j) {
  var ic = copyInput(input);
  var plant = ic[i][j];
  var stats = { area: 0 };
  if (plant !== ".") {
    check(ic, j, i, plant, stats);
    // console.log(`done with area for ${plant}. Area: ${stats.area}`);
  }
  return stats.area
}

/*********
* Solve *
**********/

function solve(input) {
  var lgInput = enlarge(input);
  var lgInput = enlarge(lgInput);
  var matrices = buildLetterMatrices(lgInput);
  // logMatrices(matrices);

  var total = 0;

  for (var key of Object.keys(matrices)) {
    var matrix = matrices[key];
    var start = findStart(matrix, key);
    while (start) {
      var oldX = Math.floor(start.x / 4);
      var oldY = Math.floor(start.y / 4);
      var area = getArea(input, oldY, oldX);

      var stats = { edges: 1 };
      traverse(matrix, key, start.x, start.y, 1, 0, stats, start.x, start.y);
      // console.log(`==== ${key} edges: ${stats.edges}, area: ${area}`);
      matrix[start.y][start.x] = "";
      start = findStart(matrix, key);
      var patch = (stats.edges * area);
      // console.log(`patch: ${patch}`);
      total += patch;

    }

  }
  return total;
}

console.log(solve(inputSample));
