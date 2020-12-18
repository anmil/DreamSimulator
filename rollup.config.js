import del from 'rollup-plugin-delete';
import prettier from 'rollup-plugin-prettier';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import rust from '@wasm-tool/rollup-plugin-rust';

export default {
	input: 'js/simworker.js',
	output: {
		dir: 'out',
		format: 'cjs',
		exports: 'default',
	},
	plugins: [
		del({
			targets: 'out/*',
		}),
		webWorkerLoader({targetPlatform: 'node'}),
		prettier({
			singleQuote: true,
			useTabs: true,
			semi: true,
			trailingComma: 'es5',
		}),
		rust({
			watchPatterns: ['src/**/*'],
		}),
	],
};
