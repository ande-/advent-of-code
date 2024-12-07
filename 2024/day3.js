function solve(input) {
  var regex = /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/g;
  var matches = input.matchAll(regex);
  var sum = 0;
  for (const match of matches) {
    var digitRegex = /\d+/g;
    var digitMatches = match[0].matchAll(digitRegex);
    var product = 1;
    for (const digitMatch of digitMatches) {
      var digit = +digitMatch[0];
      product = product * digit;
    }
    sum += product;
  }
  return sum;
}


