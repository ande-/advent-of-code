//
//  day6part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/6/25.
//

typealias Problem = ([Int], String?)

private func readData() -> [Problem] {
    let lines: [String] = readFile("day6/input.txt")
    
    let numberOfColumns = (Array(lines[0])).count
    var columns: [[Character]] = Array(repeating: [], count: numberOfColumns)
    for line in lines {
        let chars = Array(line)
        for i in 0..<chars.count {
            columns[i].append(chars[i])
        }
    }
    
    var problems: [Problem] = []
    
    var currentProblem: Problem = ([], nil)
    for i in 0..<columns.count {
        if columns[i].allSatisfy({$0.isWhitespace}) {
            problems.append(currentProblem)
            currentProblem = ([], nil)
        }
        
        let signOrEmpty = columns[i].removeLast()
        if !signOrEmpty.isWhitespace {
            currentProblem.1 = String(signOrEmpty)
        }
        
        let digits = columns[i]
        if let num = Int(String(digits).trimmingCharacters(in: .whitespaces)) {
            currentProblem.0.append(num)
        }
    }
    problems.append(currentProblem)

    return problems
}

private func solve(_ problems: [([Int], String?)]) -> Int {
    var sum = 0
    
    for problem in problems {
        if problem.1 == "+" {
            sum += problem.0.reduce(0, +)
        } else if problem.1 == "*" {
            sum += problem.0.reduce(1, *)
        }
    }
    
    return sum
}


func day6part2() {
    let problems = readData()
    print(solve(problems))
}
