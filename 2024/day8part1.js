const input = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "0", ".", ".", "."],
  [".", ".", ".", ".", ".", "0", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", "0", ".", ".", ".", "."],
  [".", ".", ".", ".", "0", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "A", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "A", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "A", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
];

// i want a dictionary with key: frequency, and value: list of positions

function createDictionary(input) {
  let dict = {};
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let frequency = input[i][j];
      if (frequency !== ".") {
        if (!dict.hasOwnProperty(frequency)) {
          dict[frequency] = [];
        }
        dict[frequency].push({ x: j, y: i });
      }

    }
  }
  return dict;
}

/* for all the 0 frequencies
 get the locations
 then take the first one, compare it with all the others

 start with 01, get position
 take 02, get distance between the two
 take 03, get distance between the two
 take 04, get distance between the two
 take 02, get position
 take 03, get distance between the two
 take 04, get distance between the two
 take 03, get position
 take 04, get distance between the two

 actually this is a nested loop
 */


function doAllFrequencies(dict, input) {
  let keys = Object.keys(dict);
  for (let i = 0; i < keys.length; i++) {
    let frequency = keys[i];
    let nodePositions = dict[frequency];
    // console.log(`doing ${frequency}`);
    doFrequency(nodePositions, input);
  }

}

let antinodes = [];


function doFrequency(nodes, input) {
  for (let i = 0; i < nodes.length; i++) {
    let ipos = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      let jpos = nodes[j];
      // console.log(`comparing ${ipos.x},${ipos.y} to ${jpos.x},${jpos.y}`);
      calculateDistanceAndMarkAnitnodes(ipos, jpos, input);
    }
  }
}

function calculateDistanceAndMarkAnitnodes(ipos, jpos, input) {
  let xDistance = jpos.x - ipos.x;
  let yDistance = jpos.y - ipos.y;
  // console.log(`distance is ${xDistance},${yDistance}`);

  let higherPos = ipos.y > jpos.y ? ipos : jpos;
  let lowerPos = higherPos === jpos ? ipos : jpos;

  let a1x = higherPos.x + xDistance;
  let a1y = higherPos.y + yDistance;
  if (a1x >= 0 && a1x < input[0].length && a1y >= 0 && a1y < input.length) {
    antinodes.push({ x: a1x, y: a1y });
  }

  let a2x = lowerPos.x - xDistance;
  let a2y = lowerPos.y - yDistance;
  if (a2x >= 0 && a2x < input[0].length && a2y >= 0 && a2y < input.length) {
    antinodes.push({ x: a2x, y: a2y });
  }
}

function solve(input) {
  const dict = createDictionary(input);
  doAllFrequencies(dict, input);
  let uniqueAntinodes = [];
  for (let i = 0; i < antinodes.length; i++) {
    let antinode = antinodes[i];
    let found = uniqueAntinodes.find((a) => a.x === antinode.x && a.y === antinode.y);
    if (!found) {
      uniqueAntinodes.push(antinode);
    }
  }
  return uniqueAntinodes.length;
}

console.log(solve(input));