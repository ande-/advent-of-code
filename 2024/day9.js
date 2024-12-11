const input = "2333133121414131402";

function processInput(input) {
  var representation = []
  var fileId = -1;
  for (let i = 0; i < input.length; i++) {
    var c;
    var size = +input.charAt(i);
    if (i % 2 === 0) {
      fileId++;
      c = fileId;
    } else {
      c = "."
    }
    for (var j = 0; j < size; j++) {
      representation.push(c)
    }

  }
  return representation;
}

// start from the last index, move back until you get to a number
// then start from the first index, move forward until you get to a .
// then swap

function move(representation) {
  var firstEmptySpace = 0;
  var lastFileSpace = representation.length;
  while (firstEmptySpace < lastFileSpace) {
    for (var i = 0; i < representation.length; i++) {
      var spot = representation[i];
      if (spot === ".") {
        firstEmptySpace = i;
        break;
      }
    }
    for (var i = representation.length - 1; i > 0; i--) {
      var spot = representation[i];
      if (spot !== ".") {
        lastFileSpace = i;
        break;
      }
    }

    if (firstEmptySpace < lastFileSpace) { // lazy fix off-by-one issue
      representation[firstEmptySpace] = representation[lastFileSpace];
      representation[lastFileSpace] = ".";
    }

  }

  return representation;
}

function calculateChecksum(representation) {
  var sum = 0
  for (var i = 0; i < representation.length; i++) {
    var fileId = representation[i];
    if (fileId !== ".") {
      var product = i * representation[i];
      sum += product;
    }
  }
  return sum;
}

function solve(input) {
  var rep = processInput(input);
  // console.log("starting: " + rep.join(""));
  var res = move(rep);
  console.log("ending: " + res.join(""));
  return calculateChecksum(res);
}

console.log(solve(input));