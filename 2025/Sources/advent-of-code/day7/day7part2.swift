//
//  day7part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/7/25.
//

private func readData() -> [[Character]] {
    let lines: [String] = readFile("day7/input.txt")
    return lines.map { Array($0) }
}

private func numTimelines(_ input: [[Character]]) -> Int {
    
    guard let start: Int = input[0].firstIndex(of: "S") else { return 0 }
    
    var cache: Dictionary<Point, Int> = [:]

    return step(y: 0, x: start, input: input, cache: &cache)
}

private func step(y: Int, x: Int, input: [[Character]], cache: inout Dictionary<Point, Int>) -> Int {
    
    if (y == input.count - 1) {
        return 1
    }
    
    let nextValue = input[y+1][x]
    let nextPoint = Point(x: x, y: y)

    if (nextValue == "^") {
        if let paths = cache[nextPoint]  {
            return paths
        } else {
            let paths = step(y: y+1, x: x-1, input: input, cache: &cache) + step(y: y+1, x: x+1, input: input, cache: &cache)
            cache[nextPoint] = paths
            return paths
        }
    }
    else {
        if let paths = cache[nextPoint] {
            return paths
        } else {
            let paths = step(y: y+1, x: x, input: input, cache: &cache)
            cache[nextPoint] = paths
            return paths
        }
    }
}

func day7part2() {
    let input = readData()
    print(numTimelines(input))
}
