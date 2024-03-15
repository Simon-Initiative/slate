import { Editor } from '../interfaces/editor';
import { Path } from '../interfaces/path';
export const parent = (editor, at, options = {}) => {
    const path = Editor.path(editor, at, options);
    const parentPath = Path.parent(path);
    const entry = Editor.node(editor, parentPath);
    return entry;
};
//# sourceMappingURL=parent.js.map