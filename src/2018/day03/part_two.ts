import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export interface Claim {
	id: number;
	starting: Coord;
	size: Coord;
}

export interface Coord {
	x: number;
	y: number;
}

// `${parts[4]}_${parts[5]}`
const interpret = (line: string): Claim => {
	let parts = line.split(/#|@|,|:|x/).map(e => e.trim());
	return {
		id: Number(parts[1]),
		starting: { x: Number(parts[2]), y: Number(parts[3]) },
		size: { x: Number(parts[4]), y: Number(parts[5]) }
	};
};

export const read = new Promise<Array<Claim>>(res => {
	const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
	const reader = createInterface({
		input: createReadStream('src/2018/day03/input.txt')
	});
	const claims: Array<Claim> = [];
	reader
		.on('line', (line: string) => {
			const claim = interpret(line);
			claims.push(claim);
			for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
				for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
					const coordKey: string = `${i}_${j}`; // I used string as keys as the coordinates themselves because even if the object looks the same as the key, it's not the exact same key.
					let claims: Array<number> = [];
					if (fabric.has(coordKey)) {
						claims = fabric.get(coordKey);
					}
					claims.push(claim.id);
					fabric.set(coordKey, claims);
				}
			}
		})
		.on('close', () => {
			console.log(`File read.`);
			const goodClaims: Array<Claim> = [];
			// Absolutely barbaric
			for (let claim of claims) {
				let good = true;
				for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
					for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
						good = good && fabric.get(`${i}_${j}`).length === 1;
					}
				}
				if (good) {
					goodClaims.push(claim);
				}
			}
			res(goodClaims);
		});
});

(async () => console.log(`Result: ${await read}`))(); // [{"id":382,"starting":{"x":155,"y":316},"size":{"x":28,"y":15}}]