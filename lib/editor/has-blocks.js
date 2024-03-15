import { Editor } from '../interfaces/editor';
import { Element } from '../interfaces/element';
export const hasBlocks = (editor, element) => {
    return element.children.some(n => Element.isElement(n) && Editor.isBlock(editor, n));
};
//# sourceMappingURL=has-blocks.js.map