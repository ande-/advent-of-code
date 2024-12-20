const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

function solve(input) {
  let regex = /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)|(don't\(\))|(do\(\))/g;
  let matches = input.matchAll(regex);
  let sum = 0;
  let skip = false;
  for (const match of matches) {
    let match0 = match[0];
    if (match0 === "don't()") {
      skip = true;
    } else if (match0 === "do()") {
      skip = false;
    } else if (skip === false) {
      let digitRegex = /\d+/g;
      let digitMatches = match0.matchAll(digitRegex);
      let product = 1;
      for (const digitMatch of digitMatches) {
        let digit = +digitMatch[0];
        product = product * digit;
      }
      sum += product;
    }
  }
  return sum;
}

console.log(solve(input));