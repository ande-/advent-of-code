//
//  utils.swift
//  advent-of-code
//
//  Created by Andrea Houg on 11/27/25.
//


import Foundation

// returns array where each line is a string
public func readFile(_ shortPath: String) -> [String] {
    let dir = FileManager.default.homeDirectoryForCurrentUser.appending(component: "Developer/AoC_inputs")
    let fileUrl = dir.appending(component: shortPath)
    
    do {
        let content = try String.init(contentsOf: fileUrl, encoding: .utf8)
        return content.components(separatedBy: "\n")
    } catch {
        print("error reading file at \(fileUrl.absoluteString)")
    }

    return []
}

extension String {
    
    subscript(_ at: Int) -> String {
        guard let stringIndex = self.index(self.startIndex, offsetBy: at, limitedBy: self.endIndex) else { fatalError("invalid string index") }
        let character = self[stringIndex]
        return String(character)
    }
    
    func substring(_ from: Int, to: Int) -> String {
        guard let fromIndex = self.index(self.startIndex, offsetBy: from, limitedBy: self.endIndex) else { fatalError("invalid string index") }
        
        guard let toIndex = self.index(self.startIndex, offsetBy: to, limitedBy: self.endIndex) else {
            fatalError("invalid string index")
        }
        
        let sub = self[fromIndex..<toIndex]
        return String(sub)
    }
    
}

extension Array where Element : Equatable {
    func slice(_ from: Int, to: Int) -> [Element] {
        let sub = self[from..<to]
        return Array(sub)
    }
    
    func uniqued() -> [Element] {
        var new: [Element] = []
        for item in self {
            if !new.contains(item) {
                new.append(item)
            }
        }
        return new
    }
}
