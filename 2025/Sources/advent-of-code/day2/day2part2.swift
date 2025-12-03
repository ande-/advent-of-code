//
//  day2part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/2/25.
//

import Foundation

private func readData() -> [String] {
   let lines = readFile("day2/input.txt")
    let line = lines[0]
    let arr: [String] = line.components(separatedBy: ",")
    return arr
}

private func expandRanges(_ data: [String]) -> [[Int]] {
    var all: [[Int]] = []
    for range in data {
        var arr: [Int] = []
        let parts = range.components(separatedBy: "-")
        if let start = Int(parts[0]), let end = Int(parts[1]) {
            for i in start...end {
                arr.append(i)
            }
            all.append(arr)
        }
    }
    return all
}

private func findSumInvalids(_ ranges: [[Int]]) -> Int {
    var sum = 0
    for range in ranges {
        for i in range {
            if (isInvalid(i)) {
                sum += i
            }
        }
    }
    return sum
}

private func isInvalid(_ intId: Int) -> Bool {
    let id = String(intId)
    for i in 1..<id.count {
        let substr = id.substring(0, to: i)
        // yolo
        let parts = id.components(separatedBy: substr)
        if (parts.allSatisfy({ $0.isEmpty })) {
            return true
        }
    }
    return false
}

func day2part2() {
    let shorthand = readData()
    let ranges = expandRanges(shorthand)
    let sum = findSumInvalids(ranges)
    print(sum)
}
