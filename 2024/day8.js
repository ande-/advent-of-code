
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

/* for all the 0 frequencies
 get the locations
 then take the first one, compare it with all the others
 so i if have 01, i need to compare it with 02, 03, 04... etc. Then i need to do the same thing with each of those. so it cannot be a loop

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

  var a1x = higherPos.x + xDistance;
  var a1y = higherPos.y + yDistance;
  if (a1x >= 0 && a1x < input[0].length && a1y >= 0 && a1y < input.length) {
    antinodes.push({ x: a1x, y: a1y });
  }

  var a2x = lowerPos.x - xDistance;
  var a2y = lowerPos.y - yDistance;
  if (a2x >= 0 && a2x < input[0].length && a2y >= 0 && a2y < input.length) {
    antinodes.push({ x: a2x, y: a2y });
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
  // console.log(uniqueAntinodes);
  return uniqueAntinodes.length;
}

console.log(solve(input));