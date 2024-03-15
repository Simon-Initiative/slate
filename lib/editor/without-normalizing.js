import { Editor } from '../interfaces/editor';
export const withoutNormalizing = (editor, fn) => {
    const value = Editor.isNormalizing(editor);
    Editor.setNormalizing(editor, false);
    try {
        fn();
    }
    finally {
        Editor.setNormalizing(editor, value);
    }
    Editor.normalize(editor);
};
//# sourceMappingURL=without-normalizing.js.map