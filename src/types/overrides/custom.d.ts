declare const module: {
    hot: {
        accept: (path?: string, callback?: () => void) => void;
    };
};