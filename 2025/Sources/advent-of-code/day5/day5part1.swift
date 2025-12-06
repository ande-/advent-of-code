//
//  day5part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/5/25.
//

private func readData() -> ([[Int]], [Int]) {
    let lines: [String] = readFile("day5/input.txt")
    
    let separatorIndex: Int = lines.firstIndex { $0.isEmpty } ?? 0
    
    let freshRanges: [[Int]] = Array(lines[0..<separatorIndex]).compactMap { range in
        return range.components(separatedBy: "-").compactMap { Int($0) }
    }
    
    let ingredients = Array(lines[separatorIndex..<lines.count]).compactMap({Int($0)})
    
    return (freshRanges, ingredients)
}

private func countFresh(ranges: [[Int]], ingredients: [Int]) -> Int {
    var sum = 0
    
    for ingredient in ingredients {
        for range in ranges {
            if ingredient >= range[0] && ingredient <= range[1] {
                sum += 1
                break
            }
        }
    }

    return sum
}


func day5part1() {
    let input = readData()
    print(countFresh(ranges: input.0, ingredients: input.1))
}
