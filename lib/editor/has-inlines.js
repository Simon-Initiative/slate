import { Editor } from '../interfaces/editor';
import { Text } from '../interfaces/text';
export const hasInlines = (editor, element) => {
    return element.children.some(n => Text.isText(n) || Editor.isInline(editor, n));
};
//# sourceMappingURL=has-inlines.js.map