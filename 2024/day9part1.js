const input = "2333133121414131402";

function processInput(input) {
  let representation = []
  let fileId = -1;
  for (let i = 0; i < input.length; i++) {
    let c;
    let size = +input.charAt(i);
    if (i % 2 === 0) {
      fileId++;
      c = fileId;
    } else {
      c = "."
    }
    for (let j = 0; j < size; j++) {
      representation.push(c)
    }

  }
  return representation;
}

/*
 start from the last index, move back until you get to a number
 then start from the first index, move forward until you get to a .
 then swap
 */

function move(representation) {
  let firstEmptySpace = 0;
  let lastFileSpace = representation.length;
  while (firstEmptySpace < lastFileSpace) {
    for (let i = 0; i < representation.length; i++) {
      let spot = representation[i];
      if (spot === ".") {
        firstEmptySpace = i;
        break;
      }
    }
    for (let i = representation.length - 1; i > 0; i--) {
      let spot = representation[i];
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
  let sum = 0
  for (let i = 0; i < representation.length; i++) {
    let fileId = representation[i];
    if (fileId !== ".") {
      let product = i * representation[i];
      sum += product;
    }
  }
  return sum;
}

function solve(input) {
  let rep = processInput(input);
  let res = move(rep);
  return calculateChecksum(res);
}

console.log(solve(input));