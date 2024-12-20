const input = [
  [8, 9, 0, 1, 0, 1, 2, 3],
  [7, 8, 1, 2, 1, 8, 7, 4],
  [8, 7, 4, 3, 0, 9, 6, 5],
  [9, 6, 5, 4, 9, 8, 7, 4],
  [4, 5, 6, 7, 8, 9, 0, 3],
  [3, 2, 0, 1, 9, 0, 1, 2],
  [0, 1, 3, 2, 9, 8, 0, 1],
  [1, 0, 4, 5, 6, 7, 3, 2]];


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

function check(input, x, y, targetHeight, summits) {

  if (y < 0 || x < 0 || y > input.length - 1 || x > input[0].length - 1) {
    return;
  }

  if (input[y][x] === targetHeight) {

    if (targetHeight === 9) {
      // got one!
      summits.push({ x: x, y: y });
      return;
    }
    targetHeight++;
    check(input, x + 1, y, targetHeight, summits);
    check(input, x, y + 1, targetHeight, summits);
    check(input, x, y - 1, targetHeight, summits);
    check(input, x - 1, y, targetHeight, summits);
  } else {
    return;
  }
}

function solve(input) {
  let total = 0;
  let trailheads = findTrailheads(input);
  for (let t = 0; t < trailheads.length; t++) {
    let targetHeight = 0;
    let summits = [];
    let trailhead = trailheads[t];
    check(input, trailhead.x, trailhead.y, targetHeight, summits);
    let score = summits.length;
    total += score;
  }
  return total;
}

console.log(solve(input));
