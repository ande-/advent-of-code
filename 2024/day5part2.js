const rules = [[47, 53], [97, 13], [97, 61], [97, 47], [75, 29], [61, 13], [75, 53], [29, 13], [97, 29], [53, 29], [61, 53], [97, 53], [61, 29], [47, 13], [75, 47], [97, 75], [47, 61], [75, 61], [47, 29], [75, 13], [53, 13]];

const updates = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47]];

function getIncorrect(updates, rules) {
  let incorrectCount = 0;
  let incorrect = [];
  for (let u = 0; u < updates.length; u++) {
    let update = updates[u];
    let isValid = true;
    for (let i = 0; i < update.length; i++) {
      let page = update[i];
      for (let r = 0; r < rules.length; r++) {
        let rule = rules[r];
        if (page === rule[0]) {
          // is on left side of rule
          let rightSide = rule[1];
          let iRightSide = update.indexOf(rightSide);
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
  let middleSum = 0;
  for (let u = 0; u < updates.length; u++) {
    let update = updates[u];
    let corrected = correct(update, rules);
    let m = Math.floor(corrected.length / 2);
    let middle = corrected[m];
    middleSum += middle;
  }
  return middleSum;
}


function correct(update, rules) {
  update.sort((a, b) => {
    let applicableRule;

    for (let r = 0; r < rules.length; r++) {
      let rule = rules[r];
      let ruleLeft = rule[0];
      let ruleRight = rule[1];

      if ((ruleRight === a && ruleLeft === b) || (ruleLeft === a && ruleRight === b)) {
        applicableRule = rule;
        break;
      }
    }

    if (!applicableRule) {
      return 0;
    }

    let applicableRuleLeft = applicableRule[0];
    let applicableRuleRight = applicableRule[1];

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

console.log(solve(updates, rules));