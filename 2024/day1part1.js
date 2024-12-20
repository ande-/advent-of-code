const input = [
  3, 4,
  4, 3,
  2, 5,
  1, 3,
  3, 9,
  3, 3];

function getDifference(list1, list2) {
  // assume same size lists 
  if (list1.length === 0 || list2.length === 0) {
    return 0
  }

  let min1 = Math.min(...list1);
  list1.splice(list1.indexOf(min1), 1);

  let min2 = Math.min(...list2);
  list2.splice(list2.indexOf(min2), 1);

  let difference = min2 - min1;
  if (min1 > min2) {
    difference = min1 - min2;
  }

  return difference + getDifference(list1, list2);
}

function processInput(list) {
  let list1 = [];
  let list2 = [];
  for (let index = 0; index < list.length; index++) {
    if (index % 2 === 0) {
      list1.push(list[index]);
    } else {
      list2.push(list[index]);
    }
  }
  return [list1, list2];
}

function solve(input) {
  let [list1, list2] = processInput(input);
  return getDifference(list1, list2);
}

console.log(solve(input));