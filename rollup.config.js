import del from 'rollup-plugin-delete';
import rust from '@wasm-tool/rollup-plugin-rust';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'js/main.js',
	output: {
		dir: 'web',
		format: 'cjs',
	},
	plugins: [
		del({
			targets: 'web/assets/*',
		}),
		webWorkerLoader({
			targetPlatform: 'browser',
			inline: false,
		}),
		nodeResolve({ browser: true }),
		rust({
			watchPatterns: ['src/**/*'],
		}),
		terser(),
	],
};
