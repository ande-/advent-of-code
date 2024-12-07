function solve(reports) {
  var safeCount = 0;
  for (var i = 0; i < reports.length; i++) {
    var report = reports[i];
    var safe = checkSafetyWithDampener(report);
    if (safe) {
      safeCount++;
    }
  }
  return safeCount;
}

function checkSafetyWithDampener(report) {
  if (checkSafety(report)) {
    return true;
  }

  for (var i = 0; i < report.length; i++) {
    var dampeningReport = [...report];
    dampeningReport.splice(i, 1);

    if (checkSafety(dampeningReport)) {
      return true;
    }
  }

  return false;
}

function checkSafety(report) {
  var direction = "";
  for (var i = 0; i < report.length - 1; i++) {
    var current = report[i];
    var next = report[i + 1];

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
