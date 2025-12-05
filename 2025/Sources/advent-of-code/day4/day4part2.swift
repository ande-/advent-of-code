//
//  day4part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/4/25.
//

private func readData() -> [[String]] {
    let lines: [String] = readFile("day4/input.txt")
    return lines.compactMap { line in
        line.map { String($0) }
    }
}

private func accessibleRolls(_ input: inout [[String]]) -> Int {
    var sum = 0
    for i in 0..<input.count {
        for j in 0..<input.count {
            if (isAccessible(i: i, j: j, input: &input)) {
                sum += 1
            }
        }
    }
    return sum
}

private func isRoll(i: Int, j: Int, input: [[String]]) -> Bool {
    let safe = i >= 0 && j >= 0 && i < input.count && j < input[i].count
    guard safe == true else { return false }
    let res = input[i][j] == "@" || input[i][j] == "x"
    return res
}

private func isAccessible(i: Int, j: Int, input: inout [[String]]) -> Bool {
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
    
    if (neighbors < 4) {
        input[i][j] = "x"
        return true
    }
    return false
    
}

private func removeFromData(_ input: inout [[String]]) {
    for i in 0..<input.count {
        for j in 0..<input[i].count {
            if input[i][j] == "x" {
                input[i][j] = "."
            }
        }
    }
}

func day4part2() {
    var data = readData()
    var totalRemoved = 0
    var keepGoing = true
    while keepGoing {
        let removedOnPass = accessibleRolls(&data)
        removeFromData(&data)
        if (removedOnPass == 0) {
            keepGoing = false
        }
        totalRemoved += removedOnPass
    }
    print(totalRemoved)
}
