import { resolve } from 'path';

export default ({ mode }) => {
	return {
		target: 'node',
		entry: {
			main: resolve(__dirname, './index.ts'),
		},
		mode: mode === 'prod' ? 'production' : 'development',
		output: {
			filename: 'bundle.js',
			path: resolve(__dirname, './dist'),
			clean: true,
		},
		module: {
			rules: [{ test: /\.ts$/i, use: 'ts-loader' }],
		},
		resolve: {
			extensions: ['.js', '.ts'],
		},
		externals: {
			bufferutil: 'bufferutil',
			'utf-8-validate': 'utf-8-validate',
		},
	};
};
