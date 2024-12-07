const rules = [[47, 53], [97, 13], [97, 61], [97, 47], [75, 29], [61, 13], [75, 53], [29, 13], [97, 29], [53, 29], [61, 53], [97, 53], [61, 29], [47, 13], [75, 47], [97, 75], [47, 61], [75, 61], [47, 29], [75, 13], [53, 13]];

const updates = [[75, 47, 61, 53, 29],
[97, 61, 53, 29, 13],
[75, 29, 13],
[75, 97, 47, 61, 53],
[61, 13, 29],
[97, 13, 75, 29, 47]];
// for each update
// take the first update page
// check for it on the left side of any rule
// if found, check the right side of the rule, whether it is in the update (its index)
// if so, check whether the indexes need to be reversed
// if so, insert the page to the left of the right side in the update (unless it already is)
// check for it on the right side of any rule - do i need to do this?


function solve(updates, rules) {
  var correctCount = 0;
  var middleSum = 0;
  for (var u = 0; u < updates.length; u++) {
    var update = updates[u];
    var isValid = true;
    for (var i = 0; i < update.length; i++) {
      var page = update[i];
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (page === rule[0]) {
          // is on left side of rule
          var rightSide = rule[1];
          var iRightSide = update.indexOf(rightSide);
          if (iRightSide >= 0 && iRightSide < i) {
            isValid = false;
            break; // invalid
          }
        }
      }
      if (!isValid) {
        break;
      }
    }
    if (isValid) {
      correctCount++;
      var m = Math.floor(update.length / 2);
      var middle = update[m];
      middleSum += middle;
    }

  }
  console.log("total correct: " + correctCount);
  return middleSum;
}

const res = solve(updates, rules);
console.log("===== " + res + " =====");
