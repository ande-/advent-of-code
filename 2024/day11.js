const input = [125, 17];

const blinks = 25;

function solve(input) {
  var stones = input;
  for (var blink = 0; blink < blinks; blink++) {
    var stonesAfterBlink = [];
    for (var i = 0; i < stones.length; i++) {
      var stone = stones[i];
      var stoneString = stone.toString();
      if (stone === 0) {
        stonesAfterBlink.push(1);
      } else if (stoneString.length % 2 === 0) {
        var part1 = stoneString.substring(0, stoneString.length / 2);
        var part2 = stoneString.substring(stoneString.length / 2);
        // console.log(`splitting ${stoneString} into ${part1} and ${part2}`);
        stonesAfterBlink.push(+part1);
        stonesAfterBlink.push(+part2);
      } else {
        stonesAfterBlink.push(stone * 2024);
      }
    }
    stones = stonesAfterBlink;
    // console.log(`blink ${blink + 1}: ${stones.length}`);
  }
  return stones.length;
}

console.log(solve(input));