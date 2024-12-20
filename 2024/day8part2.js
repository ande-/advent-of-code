
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
    antinodes.push(ipos);
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

  markAntinode(higherPos, xDistance, yDistance, input);
  markAntinode(lowerPos, -xDistance, -yDistance, input);
}

function markAntinode(pos, xDistance, yDistance, input) {
  let a1x = pos.x + xDistance;
  let a1y = pos.y + yDistance;
  if (a1x >= 0 && a1x < input[0].length && a1y >= 0 && a1y < input.length) {
    let newAntinode = { x: a1x, y: a1y };
    antinodes.push(newAntinode);
    markAntinode(newAntinode, xDistance, yDistance, input);
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