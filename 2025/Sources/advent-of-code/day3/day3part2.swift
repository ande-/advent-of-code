//
//  day3part2.swift
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
        var index = 0
        var maxes: [Int] = []
        
        var passes = 12
        while passes > 0 {
            passes -= 1
            var max = 0
            
            for i in index..<row.count-passes {
                let j = row[i]
                if j > max {
                    max = j
                    index = i+1
                }
            }
            maxes.append(max)
        }
        
       
        let rowMaxStr = maxes.map(String.init).joined()
        if let rowMax = Int(rowMaxStr) {
            totalMax += rowMax
        }
    }
    return totalMax
}

func day3part2() {
    let input = readData()
    print(findMaxJoltage(input))
}
