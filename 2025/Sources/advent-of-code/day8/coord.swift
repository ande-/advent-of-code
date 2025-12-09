//
//  coord.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/8/25.
//

struct Coord: Hashable, CustomDebugStringConvertible {
    var x: Int
    var y: Int
    var z: Int
    
    var debugDescription: String {
        get { "(\(x), \(y), \(z))" }
    }
}
