function solve(list1, list2) {
  // assume same size lists 
  if (list1.length === 0 || list2.length === 0) {
    return 0
  }

  var min1 = Math.min(...list1);
  list1.splice(list1.indexOf(min1), 1);

  var min2 = Math.min(...list2);
  list2.splice(list2.indexOf(min2), 1);

  var difference = min2 - min1;
  if (min1 > min2) {
    difference = min1 - min2;
  }

  return difference + solve(list1, list2);
}

function processInput(list) {
  var list1 = [];
  var list2 = [];
  for (var index = 0; index < list.length; index++) {
    if (index % 2 === 0) {
      list1.push(list[index]);
    } else {
      list2.push(list[index]);
    }
  }
  return [list1, list2];
}


function calculateSimilarity(list1, list2) {
  var total = 0;
  for (var i = 0; i < list1.length; i++) {
    var item = list1[i];
    var count = 0;
    for (var j = 0; j < list2.length; j++) {
      if (item === list2[j]) {
        count++;
      }
    }
    var itemSim = item * count;
    total += itemSim;
  }
  return total;
}