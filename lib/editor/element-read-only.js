import { Element } from '../interfaces/element';
import { Editor } from '../interfaces/editor';
export const elementReadOnly = (editor, options = {}) => {
    return Editor.above(editor, {
        ...options,
        match: n => Element.isElement(n) && Editor.isElementReadOnly(editor, n),
    });
};
//# sourceMappingURL=element-read-only.js.map