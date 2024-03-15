import { POINT_REFS } from '../utils/weak-maps';
export const pointRefs = editor => {
    let refs = POINT_REFS.get(editor);
    if (!refs) {
        refs = new Set();
        POINT_REFS.set(editor, refs);
    }
    return refs;
};
//# sourceMappingURL=point-refs.js.map