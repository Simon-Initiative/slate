import { Editor } from '../interfaces/editor';
export const pathRef = (editor, path, options = {}) => {
    const { affinity = 'forward' } = options;
    const ref = {
        current: path,
        affinity,
        unref() {
            const { current } = ref;
            const pathRefs = Editor.pathRefs(editor);
            pathRefs.delete(ref);
            ref.current = null;
            return current;
        },
    };
    const refs = Editor.pathRefs(editor);
    refs.add(ref);
    return ref;
};
//# sourceMappingURL=path-ref.js.map