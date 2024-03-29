export const shouldNormalize = (editor, { iteration, initialDirtyPathsLength }) => {
    const maxIterations = initialDirtyPathsLength * 42; // HACK: better way?
    if (iteration > maxIterations) {
        throw new Error(`Could not completely normalize the editor after ${maxIterations} iterations! This is usually due to incorrect normalization logic that leaves a node in an invalid state.`);
    }
    return true;
};
//# sourceMappingURL=should-normalize.js.map