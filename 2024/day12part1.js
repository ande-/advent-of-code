
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

function check(input, x, y, targetPlant, stats, path) {
  if (y < 0 || x < 0 || y > input.length - 1 || x > input[0].length - 1) {
    return;
  }

  let plant = input[y][x];
  if (plant !== targetPlant) {
    return;
  }

  input[y][x] = ".";
  let coords = { x: x, y: y };
  stats.area++;
  let peri = 4;

  for (let n = 0; n < path.length; n++) {
    let space = path[n];
    if (space.x === x && Math.abs(space.y - y) === 1) {
      peri -= 2;
    }
    if (space.y === y && Math.abs(space.x - x) === 1) {
      peri -= 2;
    }
  }

  stats.perimeter += peri;
  path.push(coords)
  //console.log(`marking ${plant} as ${input[y][x]} at ${x}, ${y}. Area: ${stats.area}, perimeter: ${stats.perimeter}`);

  check(input, x + 1, y, targetPlant, stats, path);
  check(input, x, y + 1, targetPlant, stats, path);
  check(input, x, y - 1, targetPlant, stats, path);
  check(input, x - 1, y, targetPlant, stats, path);
}


function solve(input) {
  let price = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let plant = input[i][j];
      if (plant !== ".") {
        let path = [];
        let stats = { area: 0, perimeter: 0 };
        check(input, j, i, plant, stats, path);
        // console.log(`done with ${plant}. Area: ${stats.area}, perimeter: ${stats.perimeter}`);
        price += (stats.area * stats.perimeter);
      }
    }
  }

  return price;
}

console.log(solve(inputSample));