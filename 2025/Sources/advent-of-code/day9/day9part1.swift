//
//  day9part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/10/25.
//

private func readData() -> [Point] {
    let lines: [String] = readFile("day9/input.txt")
    return lines.compactMap { line in
        let parts = line.components(separatedBy: ",")
        if let x = Int(parts[0]), let y = Int(parts[1]) {
            return Point(x: x, y: y)
        } else {
            return nil
        }
    }
}

private func findLargest(_ input: [Point]) -> Int {
    var largest = 0
    for i in 0..<input.count {
        for j in i+1..<input.count {
            let size = rectangleSize(a: input[i], b: input[j])
            if size > largest {
                largest = size
            }
        }
    }
    return largest
}

private func rectangleSize(a: Point, b: Point) -> Int {
    let w = abs(b.x-a.x)+1
    let h = abs(b.y-a.y)+1
    return w*h
}

func day9part1() {
    let input = readData()
    print(findLargest(input))
}
