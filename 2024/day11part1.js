const input = [125, 17];

const blinks = 25;

function solve(input) {
  let stones = input;
  for (let blink = 0; blink < blinks; blink++) {
    let stonesAfterBlink = [];
    for (let i = 0; i < stones.length; i++) {
      let stone = stones[i];
      let stoneString = stone.toString();
      if (stone === 0) {
        stonesAfterBlink.push(1);
      } else if (stoneString.length % 2 === 0) {
        let part1 = stoneString.substring(0, stoneString.length / 2);
        let part2 = stoneString.substring(stoneString.length / 2);
        stonesAfterBlink.push(+part1);
        stonesAfterBlink.push(+part2);
      } else {
        stonesAfterBlink.push(stone * 2024);
      }
    }
    stones = stonesAfterBlink;
  }
  return stones.length;
}

console.log(solve(input));