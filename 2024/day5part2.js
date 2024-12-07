
///part 2
// this took me so long because i was trying to sort it myself, finally i used the sort function
const rules = [[47, 53], [97, 13], [97, 61], [97, 47], [75, 29], [61, 13], [75, 53], [29, 13], [97, 29], [53, 29], [61, 53], [97, 53], [61, 29], [47, 13], [75, 47], [97, 75], [47, 61], [75, 61], [47, 29], [75, 13], [53, 13]];

const updates = [[75, 47, 61, 53, 29],
[97, 61, 53, 29, 13],
[75, 29, 13],
[75, 97, 47, 61, 53],
[61, 13, 29],
[97, 13, 75, 29, 47]];

function getIncorrect(updates, rules) {
  var incorrectCount = 0;
  var incorrect = [];
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
    if (!isValid) {
      incorrectCount++
      incorrect.push(update);
    }

  }
  return incorrect;
}

function correctUpdates(updates, rules) {
  var middleSum = 0;
  for (var u = 0; u < updates.length; u++) {
    var update = updates[u];
    var corrected = correct(update, rules);
    var m = Math.floor(corrected.length / 2);
    var middle = corrected[m];
    middleSum += middle;
  }
  return middleSum;
}


function correct(update, rules) {
  update.sort((a, b) => {
    var applicableRule;

    for (var r = 0; r < rules.length; r++) {
      var rule = rules[r];
      var ruleLeft = rule[0];
      var ruleRight = rule[1];

      if ((ruleRight === a && ruleLeft === b) || (ruleLeft === a && ruleRight === b)) {
        applicableRule = rule;
        break;
      }
    }

    if (!applicableRule) {
      return 0;
    }

    var applicableRuleLeft = rule[0];
    var applicableRuleRight = rule[1];

    if (applicableRuleLeft === a && applicableRuleRight === b) {
      return -1
    } else if (applicableRuleLeft === b && applicableRuleRight === a) {
      return 1;
    } else {
      return 0;
    }

  })

  return update;
}

function solve(updates, rules) {
  const incorrect = getIncorrect(updates, rules);
  return correctUpdates(incorrect, rules);
}


const res = solve(updates, rules);
console.log("===== " + res + " =====");