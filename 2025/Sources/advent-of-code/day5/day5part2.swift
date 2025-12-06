//
//  day5part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/5/25.
//

private func readData() -> [[Int]] {
    let lines: [String] = readFile("day5/input.txt")
    
    let separatorIndex: Int = lines.firstIndex { $0.isEmpty } ?? 0
    
    return Array(lines[0..<separatorIndex]).compactMap { range in
        return range.components(separatedBy: "-").compactMap { Int($0) }
    }
}

private func countFresh(_ ranges: [[Int]]) -> Int {

    var count = 0
    var freshRanges = ranges
    
    while freshRanges.count > 0 {
        guard var range = freshRanges.last else { return count }

        for j in 0..<freshRanges.count-1 {
            let otherRange = freshRanges[j]
            guard range.count == 2 else { break }
                        
            // case: completely surrounded by other range or same
            if range[0] >= otherRange[0] && range[1] <= otherRange[1] {
                range = []
            }
            
            // case: completely surrounding other range
            else if range[0] < otherRange[0] && range[1] > otherRange[1] {
                let splitRange = [otherRange[1]+1, range[1]]
                range = [range[0], otherRange[0]-1]
                freshRanges.insert(splitRange, at: 0)
            }
            
            // case: left overlap (start within other range)
            else if range[0] >= otherRange[0] && range[0] <= otherRange[1] {
                range = [otherRange[1]+1, range[1]]
            }
            
            // case: right overlap (end within other range)
            else if range[1] >= otherRange[0] && range[1] <= otherRange[1] {
                range = [range[0], otherRange[0]-1]
            }

            // case: no overlap - keep range as is
        }
        
        let distance = range.count == 2 ? (range[1] - range[0] + 1) : 0
        count += distance
        freshRanges.removeLast()
    }
    
    return count
}


func day5part2() {
    let input = readData()
    let total = countFresh(input)
    print("total: \(total)")
}
