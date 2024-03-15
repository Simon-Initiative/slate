import { Editor } from '../interfaces/editor';
export const matchPath = (editor, path) => {
    const [node] = Editor.node(editor, path);
    return n => n === node;
};
//# sourceMappingURL=match-path.js.map