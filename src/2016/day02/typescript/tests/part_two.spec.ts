import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2016 - Day 2 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 5DB3', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal('5DB3');
	});
});
