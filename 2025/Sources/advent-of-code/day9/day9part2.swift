//
//  day9part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/10/25.
//

private func readData() -> [Point] {
    let lines: [String] = readFile("day9/input.txt")
    return lines.compactMap { line in
        let parts = line.components(separatedBy: ",")
        if let x = Int(parts[0]), let y = Int(parts[1]) {
            return Point(x: x, y: y,)
        } else {
            return nil
        }
    }
}

private func solve(_ input: [Point]) -> Int {
    let xs = input.map { $0.x }.uniqued().sorted()
    let ys = input.map { $0.y }.uniqued().sorted()
    
    var grid: [[String]] = Array.init(repeating: Array.init(repeating: ".", count: xs.count), count: ys.count)
    for i in 0..<input.count {
        let a = input[i]
        let axIndex = xs.firstIndex(of: a.x)!
        let ayIndex = ys.firstIndex(of: a.y)!
        
        for j in i+1..<input.count {
            let b = input[j]
            
            let bxIndex = xs.firstIndex(of: b.x)!
            let byIndex = ys.firstIndex(of: b.y)!
                        
            if (ayIndex == byIndex) {
                let min = min(axIndex, bxIndex)
                let max = max(axIndex, bxIndex)
                for h in min...max {
                    // no need to distinguish between red and green
                    grid[ayIndex][h] = "X"
                }
            }
            
            if (axIndex == bxIndex) {
                let min = min(ayIndex, byIndex)
                let max = max(ayIndex, byIndex)
                for v in min...max {
                    grid[v][axIndex] = "X"
                }
            }
        }
    }
    
    // fill grid - there is probably a better way to do this
    for i in 0..<grid.count {
        var span: [Int]?
        for j in 0..<grid[i].count {
            if grid[i][j] == "X" {
                if let span = span {
                    for v in span {
                        grid[i][v] = "X"
                    }
                } else {
                    span = []
                }
                
            } else if grid[i][j] == "." {
                span?.append(j)
            }
        }
    }
    
    // print(grid)
    
    // find largest
    var largest = 0
    for i in 0..<input.count {
        for j in i+1..<input.count {
            let size = rectangleSize(a: input[i], b: input[j])

            if size > largest {
                
                let axIndex = xs.firstIndex(of: input[i].x)!
                let ayIndex = ys.firstIndex(of: input[i].y)!
                let bxIndex = xs.firstIndex(of: input[j].x)!
                let byIndex = ys.firstIndex(of: input[j].y)!
                
                let a = Point(x: axIndex, y: ayIndex)
                let b = Point(x: bxIndex, y: byIndex)
                    
                if isInside(a: a, b: b, grid: grid) {
                    largest = size
                }
            }
        }
    }
    return largest
}

private func isInside(a: Point, b: Point, grid: [[String]]) -> Bool {
    let minX = min(a.x, b.x)
    let maxX = max(a.x, b.x)
    let minY = min(a.y, b.y)
    let maxY = max(a.y, b.y)
    
    for h in minX...maxX {
        for v in minY...maxY {
            if grid[v][h] == "." {
                return false
            }
        }
    }
    
    return true
}

private func rectangleSize(a: Point, b: Point) -> Int {
    let w = abs(b.x-a.x)+1
    let h = abs(b.y-a.y)+1
    return w*h
}

func day9part2() {
    let input = readData()
    print(solve(input))
}
