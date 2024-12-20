const input = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

function solve(input) {
  let regex = /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/g;
  let matches = input.matchAll(regex);
  let sum = 0;
  for (const match of matches) {
    let digitRegex = /\d+/g;
    let digitMatches = match[0].matchAll(digitRegex);
    let product = 1;
    for (const digitMatch of digitMatches) {
      let digit = +digitMatch[0];
      product = product * digit;
    }
    sum += product;
  }
  return sum;
}

console.log(solve(input));
