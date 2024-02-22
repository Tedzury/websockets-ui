"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = ({ mode }) => {
    return {
        target: 'node',
        entry: {
            main: (0, path_1.resolve)(__dirname, './index.ts'),
        },
        mode: mode === 'prod' ? 'production' : 'development',
        output: {
            filename: 'bundle.js',
            path: (0, path_1.resolve)(__dirname, './dist'),
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
//# sourceMappingURL=webpack.config.js.map