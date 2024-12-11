
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
  var dict = {};
  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input[i].length; j++) {
      var frequency = input[i][j];
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
  var keys = Object.keys(dict);
  for (var i = 0; i < keys.length; i++) {
    var frequency = keys[i];
    var nodePositions = dict[frequency];
    // console.log(`doing ${frequency}`);
    doFrequency(nodePositions, input);
  }

}

var antinodes = [];


function doFrequency(nodes, input) {
  for (var i = 0; i < nodes.length; i++) {
    var ipos = nodes[i];
    antinodes.push(ipos);
    for (var j = i + 1; j < nodes.length; j++) {
      var jpos = nodes[j];
      // console.log(`comparing ${ipos.x},${ipos.y} to ${jpos.x},${jpos.y}`);
      calculateDistanceAndMarkAnitnodes(ipos, jpos, input);
    }
  }
}

function calculateDistanceAndMarkAnitnodes(ipos, jpos, input) {
  var xDistance = jpos.x - ipos.x;
  var yDistance = jpos.y - ipos.y;
  // console.log(`distance is ${xDistance},${yDistance}`);

  var higherPos = ipos.y > jpos.y ? ipos : jpos;
  var lowerPos = higherPos === jpos ? ipos : jpos;

  markAntinode(higherPos, xDistance, yDistance, input);
  markAntinode(lowerPos, -xDistance, -yDistance, input);
}

function markAntinode(pos, xDistance, yDistance, input) {
  var a1x = pos.x + xDistance;
  var a1y = pos.y + yDistance;
  if (a1x >= 0 && a1x < input[0].length && a1y >= 0 && a1y < input.length) {
    var newAntinode = { x: a1x, y: a1y };
    antinodes.push(newAntinode);
    markAntinode(newAntinode, xDistance, yDistance, input);
  }
}

function solve(input) {
  const dict = createDictionary(input);
  doAllFrequencies(dict, input);
  // console.log(antinodes);
  var uniqueAntinodes = [];
  for (var i = 0; i < antinodes.length; i++) {
    var antinode = antinodes[i];
    var found = uniqueAntinodes.find((a) => a.x === antinode.x && a.y === antinode.y);
    if (!found) {
      uniqueAntinodes.push(antinode);
    }
  }
  return uniqueAntinodes.length;
}

console.log(solve(input));