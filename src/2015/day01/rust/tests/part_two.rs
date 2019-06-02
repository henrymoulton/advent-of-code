extern crate aoc1501;

use aoc::Solvable;

#[test]
fn input() {
	let input = aoc1501::get_input(Option::from(3));
	assert_eq!(aoc1501::PartTwo::solve(&input), 1795);
}

#[test]
fn example_1() {
	assert_eq!(aoc1501::PartTwo::solve(&")".to_string()), 1);
}

#[test]
fn example_2() {
	assert_eq!(aoc1501::PartTwo::solve(&"()())".to_string()), 5);
}