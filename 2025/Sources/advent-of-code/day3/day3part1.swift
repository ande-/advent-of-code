//
//  day3part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/3/25.
//

private func readData() -> [[Int]] {
    let lines = readFile("day3/input.txt")
    var joltages: [[Int]] = []
    for line in lines {
        let parts = line.map { c in
            c.wholeNumberValue
        }
        joltages.append(parts.compactMap({$0}))
    }
    return joltages
}

private func findMaxJoltage(_ input: [[Int]]) -> Int {
    var totalMax = 0
    for row in input {
        var max1 = 0
        var max1Index = 0
        
        for i in 0..<row.count-1 {
            let j = row[i]
            if j > max1 {
                max1 = j
                max1Index = i
            }
        }
        
        var max2 = 0
        for i in max1Index+1..<row.count {
            let j = row[i]
            if j > max2 {
                max2 = j
            }
        }
        
        let rowMaxStr = String(max1).appending(String(max2))
        if let rowMax = Int(rowMaxStr) {
            totalMax += rowMax
        }
    }
    return totalMax
}

func day3part1() {
    let input = readData()
    print(findMaxJoltage(input))
}
