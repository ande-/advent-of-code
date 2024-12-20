const input = [
  3, 4,
  4, 3,
  2, 5,
  1, 3,
  3, 9,
  3, 3];

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

function calculateSimilarity(list1, list2) {
  let total = 0;
  for (let i = 0; i < list1.length; i++) {
    let item = list1[i];
    let count = 0;
    for (let j = 0; j < list2.length; j++) {
      if (item === list2[j]) {
        count++;
      }
    }
    let itemSim = item * count;
    total += itemSim;
  }
  return total;
}

function solve(input) {
  let [list1, list2] = processInput(input);
  return calculateSimilarity(list1, list2);
}

console.log(solve(input));