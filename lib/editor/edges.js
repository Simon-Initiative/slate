import { Editor } from '../interfaces/editor';
export const edges = (editor, at) => {
    return [Editor.start(editor, at), Editor.end(editor, at)];
};
//# sourceMappingURL=edges.js.map