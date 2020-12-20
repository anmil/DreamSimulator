import wasm from '../Cargo.toml';
import { BigFloat } from 'bigfloat-esnext';

(async () => {
	const UPDATE_EVERY = BigInt(25000);
	const RESEED_EVERY = BigInt(1000);
	const SMALL_THRESHOLD = BigInt(16);
	const Sim = await wasm();
	var max_pearls = 0;
	var max_rods = 0;
	var num_pearls = BigInt(0);
	var num_rods = BigInt(0);
	var iterations = BigInt(0);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		let odds = Sim.simulate_stream();
		let pearls = odds[0],
			rods = odds[1];
		max_pearls = Math.max(pearls, max_pearls);
		max_rods = Math.max(rods, max_rods);
		num_pearls += BigInt(pearls);
		num_rods += BigInt(rods);
		iterations++;
		if (!(iterations % RESEED_EVERY)) {
			Sim.reseed();
		}
		if (!(iterations % UPDATE_EVERY) || iterations <= SMALL_THRESHOLD) {
			let iterations_f = new BigFloat(iterations);
			let avg_pearls = new BigFloat(num_pearls) / iterations_f;
			let avg_rods = new BigFloat(num_rods) / iterations_f;
			postMessage({
				max_pearls,
				max_rods,
				iterations,
				avg_pearls: avg_pearls.toString().slice(0, 10),
				avg_rods: avg_rods.toString().slice(0, 10),
			});
		}
	}
})();
