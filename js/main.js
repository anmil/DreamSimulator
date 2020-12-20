// eslint-disable-next-line no-unused-vars
import wasm from '../Cargo.toml';
import SimWorker from 'web-worker:./simworker';

var worker = null;

// source: https://stackoverflow.com/questions/47879864/how-can-i-check-if-a-browser-supports-webassembly
const supported = (() => {
	try {
		if (
			typeof WebAssembly === 'object' &&
			typeof WebAssembly.instantiate === 'function'
		) {
			const module = new WebAssembly.Module(
				Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
			);
			if (module instanceof WebAssembly.Module)
				return (
					new WebAssembly.Instance(module) instanceof
					WebAssembly.Instance
				);
		}
	} catch (e) {}
	return false;
})();

if (supported) {
	document.addEventListener('DOMContentLoaded', function (event) {
		document.getElementById('start-sim').onclick = function () {
			if (worker !== null) {
				console.log('worker stopped');
				worker.terminate();
			}
			worker = new SimWorker();
			worker.onerror = function (e) {
				console.log(e.message, e);
			};
			worker.onmessage = function (e) {
				document.getElementById(
					'max-pearls'
				).textContent = e.data.max_pearls.toString();
				document.getElementById(
					'max-rods'
				).textContent = e.data.max_rods.toString();
				document.getElementById(
					'avg-pearls'
				).textContent = e.data.avg_pearls.toString();
				document.getElementById(
					'avg-rods'
				).textContent = e.data.avg_rods.toString();
				document.getElementById(
					'iterations'
				).textContent = e.data.iterations.toString();
			};
			worker.onmessageerror = function (e) {
				console.log(e.message, e);
			};
			console.log(worker);
		};

		document.getElementById('stop-sim').onclick = function () {
			if (worker !== null) {
				worker.terminate();
			}
			worker = null;
		};
	});
} else {
	alert('WebAssembly support is needed to use DreamSimulator!');
}
