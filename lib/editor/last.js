import { Editor } from '../interfaces/editor';
export const last = (editor, at) => {
    const path = Editor.path(editor, at, { edge: 'end' });
    return Editor.node(editor, path);
};
//# sourceMappingURL=last.js.map