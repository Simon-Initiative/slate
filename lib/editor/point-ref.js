import { Editor } from '../interfaces/editor';
export const pointRef = (editor, point, options = {}) => {
    const { affinity = 'forward' } = options;
    const ref = {
        current: point,
        affinity,
        unref() {
            const { current } = ref;
            const pointRefs = Editor.pointRefs(editor);
            pointRefs.delete(ref);
            ref.current = null;
            return current;
        },
    };
    const refs = Editor.pointRefs(editor);
    refs.add(ref);
    return ref;
};
//# sourceMappingURL=point-ref.js.map