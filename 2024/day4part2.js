
/*
 can it only be diagonal or can it be like a cross? I think only diagonal
 so basically the A is in the middle and it has an x in one corner and an m in the other, twice 
 so search for A and then check its corners?
*/

function solve(input) {

  for (var i = 0; i < input[0].length; i++) {
    for (var j = 0; j < input.length; j++) {
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
      var topLeft = checkForLetter(input, x - 1, y - 1, false)
      var bottomLeft = checkForLetter(input, x - 1, y + 1, false);
      var topRight = checkForLetter(input, x + 1, y - 1, false);
      var bottomRight = checkForLetter(input, x + 1, y + 1, false);

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
