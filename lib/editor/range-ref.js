import { Editor } from '../interfaces/editor';
export const rangeRef = (editor, range, options = {}) => {
    const { affinity = 'forward' } = options;
    const ref = {
        current: range,
        affinity,
        unref() {
            const { current } = ref;
            const rangeRefs = Editor.rangeRefs(editor);
            rangeRefs.delete(ref);
            ref.current = null;
            return current;
        },
    };
    const refs = Editor.rangeRefs(editor);
    refs.add(ref);
    return ref;
};
//# sourceMappingURL=range-ref.js.map