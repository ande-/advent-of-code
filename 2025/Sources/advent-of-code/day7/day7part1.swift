//
//  day7part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/7/25.
//

private func readData() -> [[Character]] {
    let lines: [String] = readFile("day7/input.txt")
    return lines.map { Array($0) }
}

private func numSplits(_ input: [[Character]]) -> Int {
    
    guard let start: Int = input[0].firstIndex(of: "S") else { return 0 }

    var beams: [Set<Int>] = Array(repeating: [], count: input.count)
    beams[0].insert(start)

    var splits = 0
    for i in 1..<input.count {
        let line = input[i]
        let lastXposes = beams[i-1]
        for x in lastXposes {
            let newVal = line[x]
            if newVal == "^" {
                splits += 1
                // don't need to worry about safety with this input
                beams[i].insert(x-1)
                beams[i].insert(x+1)
            } else {
                beams[i].insert(x)
            }
        }
    }
    
    return splits
}

func day7part1() {
    let input = readData()
    print(numSplits(input))
}
