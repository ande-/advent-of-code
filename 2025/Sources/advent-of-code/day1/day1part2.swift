//
//  day1part2.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/1/25.
//


private func readData() -> [Int] {
   let lines = readFile("day1/input.txt")
    
    var arr: [Int] = []
    
    for line in lines {
        let direction = line[0]
        let dist = line.split(separator: direction)[0]
        if let distance = Int(dist) {
            if direction == "L" {
                arr.append(distance * -1)
            } else {
                arr.append(distance)
            }
        }
    }
    return arr
}

private func numberOfZeroes(input: [Int]) -> Int {
    var start = 50
    var zeroCount = 0
    for click in input {
        let count = abs(click)
        for _ in 0..<count {
            if (click < 0) {
                start -= 1
            } else if (click > 0){
                start += 1
            }
            if (start == 0 || start % 100 == 0) {
                zeroCount += 1
            }
        }
    }
    return zeroCount

}


func day1part2() {
    let data = readData()
    let result = numberOfZeroes(input: data)
    print("password is: \(result)")
    
}

