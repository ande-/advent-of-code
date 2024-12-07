/*
so if you do a nested for loop, you get every combination of two numbers, right? So wouldn't that give me every combination of * and + ? 
No, because i need more than 2 
I just feel like the loop has to be the depth of the list
and that's the part I'm afraid of
I guess i need to use recursion


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
*/


const testInput = [[190, [10, 19]],
[3267, [81, 40, 27]],
[83, [17, 5]],
[156, [15, 6]],
[7290, [6, 8, 6, 15]],
[161011, [16, 10, 13]],
[192, [17, 8, 14]],
[21037, [9, 7, 18, 13]],
[292, [11, 6, 16, 20]]];


function solve(input) {
  var workableTargets = [];

  for (var i = 0; i < input.length; i++) {
    var target = input[i][0];
    var numbers = input[i][1];
    recurse(target, numbers, 0, 0, workableTargets);
  }

  // console.log(workableTargets);
  var sum = 0;
  for (var i = 0; i < workableTargets.length; i++) {
    sum += workableTargets[i];
  }
  return sum;
}


function recurse(target, arr, resultSoFar, pos, workableTargets) {
  if (arr.length <= pos) {
    if (resultSoFar === target) {
      //console.log("got one! " + target);
      const has = workableTargets.includes(target);
      if (!has) {
        workableTargets.push(target);
      }
    }
    return;
  }
  let sum = resultSoFar + arr[pos];
  let product = resultSoFar * arr[pos];
  let concat = +(resultSoFar + "" + arr[pos]);

  recurse(target, arr, sum, pos + 1, workableTargets);
  recurse(target, arr, product, pos + 1, workableTargets);
  recurse(target, arr, concat, pos + 1, workableTargets);
}

const res = solve(testInput);
console.log("==== " + res + " ====");