// i made this unnecessarily hard by building the paths
const input = [
  [8, 9, 0, 1, 0, 1, 2, 3],
  [7, 8, 1, 2, 1, 8, 7, 4],
  [8, 7, 4, 3, 0, 9, 6, 5],
  [9, 6, 5, 4, 9, 8, 7, 4],
  [4, 5, 6, 7, 8, 9, 0, 3],
  [3, 2, 0, 1, 9, 0, 1, 2],
  [0, 1, 3, 2, 9, 8, 0, 1],
  [1, 0, 4, 5, 6, 7, 3, 2]];


const summitHeight = 9;

function findTrailheads(input) { // just do this separately to keep it readable
  let trailheads = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let spot = input[i][j];
      if (spot === 0) {
        trailheads.push({ x: j, y: i });
      }
    }
  }
  return trailheads;
}

function check(input, x, y, targetHeight, paths, currentPath) {

  if (y < 0 || x < 0 || y > input.length - 1 || x > input[0].length - 1) {
    return [];
  }

  if (input[y][x] === targetHeight) {
    let coords = { x: x, y: y };
    let newPath = [coords, ...currentPath]; // a new path for each branching point

    if (targetHeight === summitHeight) {
      // got summit
      paths.push(newPath);
      return;
    }
    targetHeight++;
    check(input, x + 1, y, targetHeight, paths, newPath); 
    check(input, x, y + 1, targetHeight, paths, newPath);
    check(input, x, y - 1, targetHeight, paths, newPath);
    check(input, x - 1, y, targetHeight, paths, newPath);
  }
}

// a path is a list of coordinates. paths is a list of these.

function solve(input) {
  let total = 0;
  let trailheads = findTrailheads(input);
  for (let t = 0; t < trailheads.length; t++) {
    let targetHeight = 0;
    let paths = [];
    let trailhead = trailheads[t];
    check(input, trailhead.x, trailhead.y, targetHeight++, paths, []);
    total += paths.length;
  }
  return total;
}

console.log(solve(input));

