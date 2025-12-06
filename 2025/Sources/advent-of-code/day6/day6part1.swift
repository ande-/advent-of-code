//
//  day6part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/6/25.
//

private func readData() -> [([Int], String?)] {
    let lines: [String] = readFile("day6/input.txt")
 
    let length = nonWhitespaceComponents(lines[0]).count
    
    var problems: [([Int], String?)] = Array(repeating: ([], nil), count: length)
    for line in lines {
        let parts = nonWhitespaceComponents(line)
        for i in 0..<parts.count {
            let ele = parts[i].trimmingCharacters(in: .whitespaces)
            if let num = Int(ele) {
                problems[i].0.append(num)
            } else {
                problems[i].1 = ele
            }
        }
    }
    return problems
}

private func nonWhitespaceComponents(_ line: String) -> [String] {
    return line.components(separatedBy: .whitespaces).filter { p in
        !(p.trimmingCharacters(in: .whitespaces).isEmpty)
    }
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


func day6part1() {
    let input = readData()
    print(solve(input))
}
