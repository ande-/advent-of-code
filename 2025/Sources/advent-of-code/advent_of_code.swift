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
            case "day2part1":
                day2part1()
            case "day2part2":
                day2part2()
            case "day3part1":
                day3part1()
            case "day3part2":
                day3part2()
            case "day4part1":
                day4part1()
            case "day4part2":
                day4part2()
            case "day5part1":
                day5part1()
            case "day5part2":
                day5part2()
            default:
                break;
            }
        } else {
            // whichever problem I'm debugging from Xcode
            day4part2()
        }
    }
}
