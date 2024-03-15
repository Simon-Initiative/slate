import { Editor, Path, Range, Transforms } from '../../index';
import { getDefaultInsertLocation } from '../../utils';
// eslint-disable-next-line no-redeclare
export const TextTransforms = {
    delete(editor, options) {
        editor.delete(options);
    },
    insertFragment(editor, fragment, options) {
        editor.insertFragment(fragment, options);
    },
    insertText(editor, text, options = {}) {
        Editor.withoutNormalizing(editor, () => {
            const { voids = false } = options;
            let { at = getDefaultInsertLocation(editor) } = options;
            if (Path.isPath(at)) {
                at = Editor.range(editor, at);
            }
            if (Range.isRange(at)) {
                if (Range.isCollapsed(at)) {
                    at = at.anchor;
                }
                else {
                    const end = Range.end(at);
                    if (!voids && Editor.void(editor, { at: end })) {
                        return;
                    }
                    const start = Range.start(at);
                    const startRef = Editor.pointRef(editor, start);
                    const endRef = Editor.pointRef(editor, end);
                    Transforms.delete(editor, { at, voids });
                    const startPoint = startRef.unref();
                    const endPoint = endRef.unref();
                    at = startPoint || endPoint;
                    Transforms.setSelection(editor, { anchor: at, focus: at });
                }
            }
            if ((!voids && Editor.void(editor, { at })) ||
                Editor.elementReadOnly(editor, { at })) {
                return;
            }
            const { path, offset } = at;
            if (text.length > 0)
                editor.apply({ type: 'insert_text', path, offset, text });
        });
    },
};
//# sourceMappingURL=text.js.map