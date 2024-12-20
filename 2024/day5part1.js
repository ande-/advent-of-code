const rules = [[47, 53], [97, 13], [97, 61], [97, 47], [75, 29], [61, 13], [75, 53], [29, 13], [97, 29], [53, 29], [61, 53], [97, 53], [61, 29], [47, 13], [75, 47], [97, 75], [47, 61], [75, 61], [47, 29], [75, 13], [53, 13]];

const updates = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47]];

function solve(updates, rules) {
  let correctCount = 0;
  let middleSum = 0;
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
    if (isValid) {
      correctCount++;
      let m = Math.floor(update.length / 2);
      let middle = update[m];
      middleSum += middle;
    }

  }
  return middleSum;
}

console.log(solve(updates, rules));
