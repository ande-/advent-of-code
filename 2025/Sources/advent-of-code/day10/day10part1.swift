//
//  day10part1.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/11/25.
//

import Foundation

typealias Button = [Int]

private struct MachineConfig  {
    var lights: [Bool]
    var availableButtons: [Button]
}

private func readFile() -> [MachineConfig] {
    let lines: [String] = readFile("day10/input.txt")
    
    let brackets = CharacterSet(charactersIn: "[]{}")
    let parenthesis = CharacterSet(charactersIn: "()")
    var configs: [MachineConfig] = []
    for line in lines {
        let parts = line.components(separatedBy: brackets).filter({!$0.isEmpty})
        let lights: [Bool] = Array(parts[0]).map({$0 == "#" ? true : false})
        let buttonGroups: [String] = parts[1].components(separatedBy: parenthesis)
            .filter({!$0.isEmpty && !$0.trimmingCharacters(in: .whitespaces).isEmpty})
        let buttons = buttonGroups.map { str in
            str.components(separatedBy: ",").compactMap({Int($0)})
        }
        configs.append(MachineConfig(lights: lights, availableButtons: buttons))
    }
    return configs
}

private func testButtons(buttons: [Button], lights: [Bool]) -> Bool {
    var lights = lights
    for button in buttons {
        for lightSwitch in button {
            lights[lightSwitch] = !lights[lightSwitch]
        }
    }
    return lights.allSatisfy { !$0 }
}

private func fewestPresses(availableButtons: [Button], lights: [Bool]) -> Int {
    var combos: [[Button]] = []
    var startIndices: [Int] = []
    for i in 0..<availableButtons.count {
        let button = availableButtons[i]
        if (testButtons(buttons: [button], lights: lights)) {
            return 1
        }
        combos.append([availableButtons[i]])
        startIndices.append(i)
    }
    let working = generate(combos: combos, available: availableButtons, startIndices: startIndices, lights: lights)
    return working.count
}

private func generate(combos: [[Button]], available: [Button], startIndices: [Int], lights: [Bool]) -> [Button] {
    var newCombos: [[Button]] = []
    var newStarts: [Int] = []

    for i in 0..<available.count {
        let button = available[i]
        
        for j in startIndices[i]..<combos.count {
            var nc = combos[j]
            
            if nc.allSatisfy({ $0 == button }) {
                newStarts.append(i)
            }
            
            nc.append(button)
            newCombos.append(nc)
            if (testButtons(buttons: nc, lights: lights)) {
                return nc
            }
        }
    }
    
    return generate(combos: newCombos, available: available, startIndices: newStarts, lights: lights)
}

private func solve(_ input: [MachineConfig]) -> Int {
    var total = 0
    for i in 0..<input.count {
        let config = input[i]
        print("checking line \(i+1)") // line 42 is the slow one :)
        let presses = fewestPresses(availableButtons: config.availableButtons, lights: config.lights)
        total += presses
    }
    return total
}

func day10part1() {
    let input = readFile()
    print(solve(input))
}
