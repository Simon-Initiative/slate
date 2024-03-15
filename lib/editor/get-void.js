import { Editor } from '../interfaces/editor';
import { Element } from '../interfaces/element';
export const getVoid = (editor, options = {}) => {
    return Editor.above(editor, {
        ...options,
        match: n => Element.isElement(n) && Editor.isVoid(editor, n),
    });
};
//# sourceMappingURL=get-void.js.map