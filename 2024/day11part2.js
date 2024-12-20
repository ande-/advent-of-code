const input = [125, 17];

/**********
 * Cache *
 **********/

let cache;
// cache keys are stones and values are arrays of results where index corresponds to blinks (index 0 is after 1 blink)

function getUniqueNumbers(input, blinks) {
  let stones = input;
  let dict = {};
  for (let blink = 0; blink < blinks; blink++) {
    let stonesAfterBlink = [];
    for (let i = 0; i < stones.length; i++) {
      let stone = stones[i];
      dict[stone] = [];
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
  return dict;
}

function buildResults(startStone, blinks, dict) {
  let stones = [startStone];
  for (let blink = 0; blink < blinks; blink++) {
    let stonesAfterBlink = [];
    for (let i = 0; i < stones.length; i++) {
      let stone = stones[i];
      let stoneString = stone.toString();
      if (stone == 0) { // This needs to be not strict
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

    if (dict[startStone]) {
      dict[startStone][blink] = stones.length;
    } else {
      console.log(`dictionary missing stone ${startStone}`);
    }
  }
  return stones.length;
}


function buildCache(input, blinks) {
  cache = getUniqueNumbers(input, blinks);

  for (let i = 0; i < Object.keys(cache).length; i++) {
    let key = Object.keys(cache)[i];
    buildResults(key, blinks, cache);
  }
}

/**********
 * Solve *
 **********/

let count = 0;

function traverse(stone, blinkIndex, blinks) {
  if (blinkIndex >= blinks) {
    return;
  }

  if (cache[stone]) {
    const remaining = blinks - blinkIndex;
    if (cache[stone][remaining - 1]) {
      let c = cache[stone][remaining - 1];
      // console.log(`cache hit found stone ${stone} in cache at index ${remaining - 1}. count: ${c}`);
      count += c;
      count -= 1;
      return;
    }
  }

  blinkIndex++;

  if (stone === 0) {
    traverse(1, blinkIndex, blinks);
  } else {
    let stoneString = stone.toString();
    if (stoneString.length % 2 === 0) {
      let first = stoneString.substring(0, stoneString.length / 2);
      let second = stoneString.substring(stoneString.length / 2);
      // console.log(`splitting ${stone} into ${first} and ${second}`);
      traverse(+first, blinkIndex, blinks);
      traverse(+second, blinkIndex, blinks);
      count++;
    } else {
      traverse(stone * 2024, blinkIndex, blinks);
    }
  }
}

function solve(input) {
  buildCache(input, 30); // 40 about is the max before it crashes due to array length
  console.log(`done building cache`);

  count = input.length;
  for (let i = 0; i < input.length; i++) {
    let stone = input[i];
    traverse(stone, 0, 75);
  }
  return count;
}

console.log(solve(input));

