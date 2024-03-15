import { Editor } from '../interfaces/editor';
export const end = (editor, at) => {
    return Editor.point(editor, at, { edge: 'end' });
};
//# sourceMappingURL=end.js.map