/*
start with the first gap, make it a +. with the next gap
  make it a +. with the next gap,
    make it a +. with the next gap,
      make it a +
      make it a *
    make it a *. with the next gap
      make it a +
      make it a *
  make it a *. with the next gap,
    make it a +. with the next gap
      make it a +
      make it a *
    make it a *. with the next gap
      make it a +
      make it a *

  has to be recursive
*/


const input = [
  [190, [10, 19]],
  [3267, [81, 40, 27]],
  [83, [17, 5]],
  [156, [15, 6]],
  [7290, [6, 8, 6, 15]],
  [161011, [16, 10, 13]],
  [192, [17, 8, 14]],
  [21037, [9, 7, 18, 13]],
  [292, [11, 6, 16, 20]]];


function solve(input) {
  let workableTargets = [];

  for (let i = 0; i < input.length; i++) {
    let target = input[i][0];
    let numbers = input[i][1];
    recurse(target, numbers, 0, 0, workableTargets);
  }

  let sum = 0;
  for (let i = 0; i < workableTargets.length; i++) {
    sum += workableTargets[i];
  }
  return sum;
}


function recurse(target, arr, resultSoFar, pos, workableTargets) {
  if (arr.length <= pos) {
    if (resultSoFar === target) {
      // got one!
      const has = workableTargets.includes(target);
      if (!has) {
        workableTargets.push(target);
      }
    }
    return;
  }
  let sum = resultSoFar + arr[pos];
  let product = resultSoFar * arr[pos];

  recurse(target, arr, sum, pos + 1, workableTargets);
  recurse(target, arr, product, pos + 1, workableTargets);
}

console.log(solve(input));