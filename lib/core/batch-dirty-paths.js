// perf
const BATCHING_DIRTY_PATHS = new WeakMap();
export const isBatchingDirtyPaths = (editor) => {
    return BATCHING_DIRTY_PATHS.get(editor) || false;
};
export const batchDirtyPaths = (editor, fn, update) => {
    const value = BATCHING_DIRTY_PATHS.get(editor) || false;
    BATCHING_DIRTY_PATHS.set(editor, true);
    try {
        fn();
        update();
    }
    finally {
        BATCHING_DIRTY_PATHS.set(editor, value);
    }
};
//# sourceMappingURL=batch-dirty-paths.js.map