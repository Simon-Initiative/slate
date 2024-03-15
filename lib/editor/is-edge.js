import { Editor } from '../interfaces/editor';
export const isEdge = (editor, point, at) => {
    return Editor.isStart(editor, point, at) || Editor.isEnd(editor, point, at);
};
//# sourceMappingURL=is-edge.js.map