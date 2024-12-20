
const input = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9]];

function solve(reports) {
  let safeCount = 0;
  for (let i = 0; i < reports.length; i++) {
    let report = reports[i];
    let safe = checkSafety(report);
    if (safe) {
      safeCount++;
    }
  }
  return safeCount;
}


function checkSafety(report) {
  let direction = "";
  for (let i = 0; i < report.length - 1; i++) {
    let current = report[i];
    let next = report[i + 1];

    if (direction === "") {
      if (next > current) {
        direction = "up";
      } else if (current > next) {
        direction = "down";
      } else {
        return false;
      }
    }

    if ((direction === "up" && next <= current) || (direction === "down" && current <= next)) {
      return false;
    }

    if (next - current > 3 || current - next > 3) {
      return false;
    }
  }
  return true;
}

console.log(solve(input));
