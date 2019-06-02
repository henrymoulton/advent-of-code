#[macro_use]

extern crate criterion;

extern crate aoc;
extern crate aoc1801;

use aoc::Solvable;
use criterion::Criterion;

fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("2018 day 1 part one", |b| {
		let input = aoc::reader(2018, 1, "input.txt");
		b.iter(|| aoc1801::PartOne::solve(&input))
	});
}

fn part_two_benchmark(c: &mut Criterion) {
	c.bench_function("2018 day 1 part two", |b| {
		let input = aoc::reader(2018, 1, "input.txt");
		b.iter(|| aoc1801::PartTwo::solve(&input))
	});
}

criterion_group!(benches, part_one_benchmark, part_two_benchmark);
criterion_main!(benches);