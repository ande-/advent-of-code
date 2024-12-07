/* find X, then loook in all directions for an M, then look in that direction for an A, then look in that direction for an S
how do i even look in all directions? If it's a matrix, I guess:
if "X" is [1, 1], then i need to look at [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]
so i need to
x - 1
y - 1
y
y + 1
x
y - 1
y + 1
x + 1
y - 1
y
y + 1

but then if i get a success, whatever i did- adding to x and subtracting from y for example, i need to only keep doing that 
for example if "M" is at [2, 0]
*/




const input = [["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
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

  for (var i = 0; i < input[0].length; i++) {
    for (var j = 0; j < input.length; j++) {
      checkForLetter(input, i, j, 0);
    }
  }

  return total;
}

function checkForLetter(input, x, y, targetIndex, xDirection, yDirection) {
  if (x < 0 || y < 0 || x >= input[0].length || y >= input.length) {
    return;
  }

  var desiredLetter = target[targetIndex];
  // console.log("checking [" + x + "," + y +"] for " + desiredLetter);  
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



