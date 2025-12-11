//
//  Point.swift
//  advent-of-code
//
//  Created by Andrea Houg on 12/10/25.
//

struct Point: Hashable, CustomDebugStringConvertible {
    var x: Int
    var y: Int

    var debugDescription: String {
        get { "(\(x), \(y))" }
    }
}
