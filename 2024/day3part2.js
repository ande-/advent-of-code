

function solve(input) {
  var regex = /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)|(don't\(\))|(do\(\))/g;
  var matches = input.matchAll(regex);
  var sum = 0;
  var skip = false;
  for (const match of matches) {
    var match0 = match[0];
    if (match0 === "don't()") {
      skip = true;
    } else if (match0 === "do()") {
      skip = false;
    } else if (skip === false) {
      var digitRegex = /\d+/g;
      var digitMatches = match0.matchAll(digitRegex);
      var product = 1;
      for (const digitMatch of digitMatches) {
        var digit = +digitMatch[0];
        product = product * digit;
      }
      sum += product;
    }
  }
  return sum;
}
