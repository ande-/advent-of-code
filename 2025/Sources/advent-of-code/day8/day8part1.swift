//
//  day8part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/8/25.
//

import Foundation

private let numConnections = 1000

private func readData() -> [Coord] {
    let lines: [String] = readFile("day8/input.txt")
    
    return lines.compactMap { l in
        let parts = l.components(separatedBy: ",")
        if let x = Int(parts[0]), let y = Int(parts[1]), let z = Int(parts[2]) {
            return Coord(x: x, y: y, z: z)
        }
        return nil
    }
}

private func distance(c1: Coord, c2: Coord) -> Double {
    let xp = (c2.x - c1.x)*(c2.x - c1.x)
    let yp = (c2.y - c1.y)*(c2.y - c1.y)
    let zp = (c2.z - c1.z)*(c2.z - c1.z)
    return sqrt(Double(xp+yp+zp))
}

private func getSortedPairs(_ input: [Coord]) -> [(Coord, Coord, Double)] {
    var pairs: [(Coord, Coord, Double)] = []
    
    for i in 0..<input.count {
        for j in i+1..<input.count {
            let c1 = input[i]
            let c2 = input[j]
            let d = distance(c1: c1, c2: c2)
            pairs.append((c1, c2, d))
        }
    }

    return pairs.sorted { a, b in
        return a.2 < b.2
    }
}

private func buildSortedCircuits(_ pairs: [(Coord, Coord, Double)]) -> [Set<Coord>] {
    var circuits: [Set<Coord>] = []
    
    for i in 0..<numConnections {
        let p = pairs[i]

        let indexOfCircuitWithFirst = circuits.firstIndex { circuit in
            return circuit.contains(p.0)
        }
        let indexOfCircuitWithLast = circuits.firstIndex { circuit in
            return circuit.contains(p.1)
        }
        
        if let index0 = indexOfCircuitWithFirst, let index1 = indexOfCircuitWithLast {
            if index0 == index1 {
                // noop
            } else {
                circuits[index0] = circuits[index0].union(circuits[index1])
                circuits.remove(at: index1)
            }
        } else if let index0 = indexOfCircuitWithFirst {
            circuits[index0].insert(p.1)
        } else if let index1 = indexOfCircuitWithLast {
            circuits[index1].insert(p.0)
        } else {
            circuits.append([p.0, p.1])
        }
        
    }
    return circuits.sorted { $0.count > $1.count }
}

private func productOfThreeLargestSizes(_ circuits: [Set<Coord>]) -> Int {
    let largest = circuits.slice(0, to: 3)
    return largest.reduce(1, { $0 * $1.count })
}

func day8part1() {
    let input = readData()
    let pairs = getSortedPairs(input)
    let circuits = buildSortedCircuits(pairs)
    print(productOfThreeLargestSizes(circuits))
}
