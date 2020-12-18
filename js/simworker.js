import wasm from '../Cargo.toml';


export default function () {
	const UPDATE_EVERY = BigInt(100000);
	let max_pearls = 0;
	let max_rods = 0;
	let iterations = BigInt(0);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		let odds = wasm.simulate_stream();
		let pearls = odds[0], rods = odds[1];
		max_pearls = Math.max(pearls, max_pearls);
		max_rods = Math.max(rods, max_rods);
		iterations++;
		if (!(iterations % UPDATE_EVERY)) {
			postMessage({max_pearls, max_rods, iterations});
		}
	}
}
