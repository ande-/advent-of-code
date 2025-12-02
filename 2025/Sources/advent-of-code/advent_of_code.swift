// The Swift Programming Language
// https://docs.swift.org/swift-book

@main
struct advent_of_code {
    static func main() {
        let arguments = CommandLine.arguments
        if arguments.count == 2 {
            let problem = arguments[1]
            switch (problem) {
            case "day1part1":
                day1part1()
            case "day1part2":
                day1part2()
            default:
                break;
            }
        } else {
            // whichever problem I'm debugging from Xcode
            
        }
    }
}
