import { Editor } from '../interfaces/editor';
export const first = (editor, at) => {
    const path = Editor.path(editor, at, { edge: 'start' });
    return Editor.node(editor, path);
};
//# sourceMappingURL=first.js.map