declare const _default: ({ mode }: {
    mode: any;
}) => {
    target: string;
    entry: {
        main: string;
    };
    mode: string;
    output: {
        filename: string;
        path: string;
        clean: boolean;
    };
    module: {
        rules: {
            test: RegExp;
            use: string;
        }[];
    };
    resolve: {
        extensions: string[];
    };
    externals: {
        bufferutil: string;
        'utf-8-validate': string;
    };
};
export default _default;
