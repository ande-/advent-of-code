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

// start from the end, get the file id, get the length
// then, start from the front, look for gaps big enough for that length
// if i find one, replace it, and move the end index
// if i don't find one, move the end index

function move(representation) {
  var end = representation.length - 1;
  var fileId = "-";
  var fileLength = 0;
  var finishedFileIds = [];

  for (var i = end; i >= 0; i--) {
    var spot = representation[i];
    if (spot !== ".") {
        fileId = spot;
    }
    if (finishedFileIds.includes(fileId)) {
      fileLength = 0;
      fileId = "-";
    }
    if (spot !== "." && spot === fileId) {
      fileLength++;
    }
    // i only want to do this if the _next_ spot is not the file id
    if (representation[i-1] !== fileId) { 
      finishedFileIds.push(fileId);
      // now check for blank space
      var fileStartIndex = i;
      var spaceStartIndex = findSpace(representation, fileLength, fileStartIndex);
      if (spaceStartIndex > -1) {
        replace(representation, fileId, fileLength, spaceStartIndex, fileStartIndex);
      }
      fileLength = 0
    }    

  }
  return representation;
}

function findSpace(representation, fileLength, fileStartIndex) {
  var spaceCount = 0
  for (var i = 0; i < fileStartIndex; i++) {
    var spot = representation[i];
    if (spot === ".") {
      spaceCount++;
      if (spaceCount >= fileLength) {
        // for some reason this is +1
        var spaceStartIndex = i - fileLength + 1;
        return spaceStartIndex;
      }
    } else {
      spaceCount = 0;
    }
  }
  return -1;
}


function replace(representation, fileId, fileLength, spaceStartIndex, fileStartIndex) {
  var files = new Array(fileLength).fill(fileId);
  var blanks = new Array(fileLength).fill(".");

  //console.log(`putting ${fileLength} ${fileId}s starting at ${spaceStartIndex}`);
  representation.splice(spaceStartIndex, fileLength, ...files); // replace empty spaces with file id
  //console.log(`putting ${fileLength} blanks starting at ${fileStartIndex}`);
  representation.splice(fileStartIndex, fileLength, ...blanks); // replace file ids with blanks

  //console.log(representation.join(""));
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
