import { Editor } from '../interfaces/editor';
export const start = (editor, at) => {
    return Editor.point(editor, at, { edge: 'start' });
};
//# sourceMappingURL=start.js.map