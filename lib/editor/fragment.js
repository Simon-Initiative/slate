import { Editor } from '../interfaces/editor';
import { Node } from '../interfaces/node';
export const fragment = (editor, at) => {
    const range = Editor.range(editor, at);
    return Node.fragment(editor, range);
};
//# sourceMappingURL=fragment.js.map