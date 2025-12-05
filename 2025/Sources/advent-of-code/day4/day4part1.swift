//
//  day4part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/3/25.
//

private func readData() -> [[String]] {
    let lines: [String] = readFile("day4/input.txt")
    
    return lines.compactMap { line in
        line.map { String($0) }
    }
}

private func accessibleRolls(_ input: [[String]]) -> Int {
    var sum = 0
    for i in 0..<input.count {
        for j in 0..<input.count {
            if (isAccessible(i: i, j: j, input: input)) {
                sum += 1
            }
        }
    }
    return sum
}

private func isRoll(i: Int, j: Int, input: [[String]]) -> Bool {
    let safe = i >= 0 && j >= 0 && i < input.count && j < input[i].count
    guard safe == true else { return false }
    let res = input[i][j] == "@"
    return res
}

private func isAccessible(i: Int, j: Int, input: [[String]]) -> Bool {
    if !isRoll(i: i, j: j, input: input) {
        return false
    }
    
    var neighbors = 0
    if isRoll(i: i-1, j: j-1, input: input) {
        neighbors += 1
    }
    
    if isRoll(i: i-1, j: j, input: input) {
        neighbors += 1
    }
    
    if isRoll(i: i-1, j: j+1, input: input) {
        neighbors += 1
    }
    
    if isRoll(i: i, j: j-1, input: input) {
        neighbors += 1
    }
    
    if isRoll(i: i, j: j+1, input: input) {
        neighbors += 1
    }
    
    if isRoll(i: i+1, j: j-1, input: input)  {
        neighbors += 1
    }
    
    if isRoll(i: i+1, j: j, input: input)  {
        neighbors += 1
    }
    
    if isRoll(i: i+1, j: j+1, input: input)  {
        neighbors += 1
    }
        
    return neighbors < 4
}

func day4part1() {
    let data = readData()
    print(accessibleRolls(data))
}

