import { read } from '@lib';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	test(
        `should resolve to ${results.two.input} when using the input`,
        async () => {
            expect(await runner((await read(year, day)()).input)).toBe(results.two.input);
        }
    );

	test('should be that that the example resolves to 4', async () => {
		expect(await runner('R8, R4, R4, R8')).toBe(4);
	});
});
